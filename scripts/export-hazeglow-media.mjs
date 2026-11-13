import { createServer } from 'node:http';
import { once } from 'node:events';
import { createReadStream, existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';
import { projectHazeglow } from '../data/project-hazeglow.js';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outputDirectory = join(root, 'public/media/hazeglow');
const coreModule = join(root, 'node_modules/hazeglow/dist/core.mjs');
const chromeExecutable = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const args = Object.fromEntries(process.argv.slice(2).map((argument) => {
    const [key, value = 'true'] = argument.replace(/^--/, '').split('=');
    return [key, value];
}));
const width = Number(args.width || 1280);
const height = Number(args.height || 960);
const fps = Number(args.fps || 30);
const duration = Number(args.duration || 8);
const selectedName = args.only;
const force = args.force === 'true';
const totalFrames = Math.round(duration * fps);

if (!existsSync(chromeExecutable)) {
    throw new Error(`Google Chrome was not found at ${chromeExecutable}`);
}
if (![width, height, fps, duration].every(Number.isFinite) || width < 1 || height < 1 || fps < 1 || duration <= 0 || totalFrames < 1) {
    throw new Error('width, height, fps and duration must produce at least one frame');
}

const pageHtml = `<!doctype html>
<html>
<head><meta charset="utf-8"><style>*{box-sizing:border-box}html,body{margin:0;background:#000;overflow:hidden}canvas{display:block}</style></head>
<body>
<canvas id="canvas"></canvas>
<script type="module">
import { createRenderer } from '/hazeglow-core.mjs';
const canvas = document.querySelector('#canvas');
let renderer;
let config;
window.hazeglowExport = {
  setup(nextConfig, width, height) {
    renderer?.dispose();
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    renderer = createRenderer(canvas);
    if (!renderer) throw new Error('Hazeglow could not create a hardware WebGL2 renderer');
    renderer.resize(width, height);
    config = nextConfig;
  },
  render(time) {
    renderer.render(config, time);
    const gl = canvas.getContext('webgl2');
    gl?.finish();
  }
};
</script>
</body>
</html>`;

function createAssetServer() {
    return createServer(async (request, response) => {
        if (request.url === '/hazeglow-core.mjs') {
            response.writeHead(200, { 'content-type': 'text/javascript; charset=utf-8' });
            createReadStream(coreModule).pipe(response);
            return;
        }
        response.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        response.end(pageHtml);
    });
}

function startEncoder(outputPath) {
    const ffmpeg = spawn('ffmpeg', [
        '-hide_banner', '-loglevel', 'error', '-y',
        '-f', 'image2pipe', '-framerate', String(fps), '-vcodec', 'png', '-i', 'pipe:0',
        '-an', '-c:v', 'libx264', '-preset', 'medium', '-crf', '20',
        '-pix_fmt', 'yuv420p', '-movflags', '+faststart', outputPath,
    ], { stdio: ['pipe', 'inherit', 'inherit'] });
    return ffmpeg;
}

async function writeFrame(stream, frame) {
    if (!stream.write(frame)) await once(stream, 'drain');
}

await mkdir(outputDirectory, { recursive: true });
const entries = Object.entries(projectHazeglow).filter(([name]) => !selectedName || name === selectedName);
if (!entries.length) throw new Error(`No Hazeglow config named "${selectedName}"`);

const server = createAssetServer();
server.listen(0, '127.0.0.1');
await once(server, 'listening');
const { port } = server.address();

const browser = await chromium.launch({
    executablePath: chromeExecutable,
    headless: true,
    args: ['--enable-gpu', '--use-angle=metal'],
});
const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: 1 });
await page.goto(`http://127.0.0.1:${port}`, { waitUntil: 'networkidle' });
const canvas = page.locator('#canvas');

try {
    for (let entryIndex = 0; entryIndex < entries.length; entryIndex += 1) {
        const [name, media] = entries[entryIndex];
        const posterPath = join(root, 'public', media.poster);
        const videoPath = join(root, 'public', media.video);
        await mkdir(dirname(videoPath), { recursive: true });

        if (!force && existsSync(posterPath) && existsSync(videoPath)) {
            console.log(`[${entryIndex + 1}/${entries.length}] ${name}: already exported`);
            continue;
        }

        console.log(`[${entryIndex + 1}/${entries.length}] ${name}: rendering ${totalFrames} ping-pong frames`);
        await page.evaluate(({ config, width, height }) => {
            window.hazeglowExport.setup(config, width, height);
        }, { config: media.config, width, height });

        const encoder = startEncoder(videoPath);
        const encoderExit = once(encoder, 'exit');

        for (let frameIndex = 0; frameIndex < totalFrames; frameIndex += 1) {
            // A triangular time curve makes the second half retrace the first.
            // The end frame is included once, while the start frame is not
            // duplicated at the file boundary, preventing a pause or jump.
            const phase = frameIndex / totalFrames;
            const renderTime = phase <= 0.5
                ? phase * duration
                : (1 - phase) * duration;
            await page.evaluate((time) => window.hazeglowExport.render(time), renderTime);
            const frame = await canvas.screenshot({ type: 'png' });
            if (frameIndex === 0) await writeFile(posterPath, frame);
            await writeFrame(encoder.stdin, frame);
            if ((frameIndex + 1) % fps === 0) {
                process.stdout.write(`  ${frameIndex + 1}/${totalFrames} frames\r`);
            }
        }

        encoder.stdin.end();
        const [exitCode] = await encoderExit;
        if (exitCode !== 0) throw new Error(`ffmpeg exited with code ${exitCode} while exporting ${name}`);
        console.log(`  ${totalFrames}/${totalFrames} frames — saved ${media.video} and ${media.poster}`);
    }
} finally {
    await browser.close();
    server.close();
}
