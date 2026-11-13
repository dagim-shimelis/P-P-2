import { existsSync } from 'node:fs';
import { mkdir, readFile, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright-core';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const projects = JSON.parse(await readFile(join(root, 'data/projects-list.json'), 'utf8'));
const outputDirectory = join(root, 'public/images/projects');
const chromeExecutable = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const args = Object.fromEntries(process.argv.slice(2).map((argument) => {
    const [key, value = 'true'] = argument.replace(/^--/, '').split('=');
    return [key, value];
}));
const selectedName = args.only;
const force = args.force === 'true';
const width = 1920;
const height = 1080;

if (!existsSync(chromeExecutable)) throw new Error(`Google Chrome was not found at ${chromeExecutable}`);

const slugify = (value) => value
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

function convertToWebp(input, output) {
    return new Promise((resolvePromise, reject) => {
        const process = spawn('cwebp', ['-quiet', '-q', '92', '-m', '6', input, '-o', output], { stdio: 'inherit' });
        process.on('error', reject);
        process.on('exit', (code) => code === 0 ? resolvePromise() : reject(new Error(`cwebp exited with code ${code}`)));
    });
}

async function dismissObstructions(page) {
    const labels = [
        /accept all/i,
        /accept cookies/i,
        /allow all/i,
        /agree/i,
        /got it/i,
        /continue/i,
        /close/i,
    ];

    for (const label of labels) {
        const button = page.getByRole('button', { name: label }).first();
        if (await button.isVisible().catch(() => false)) {
            await button.click({ timeout: 1500 }).catch(() => {});
            await page.waitForTimeout(300);
        }
    }
}

await mkdir(outputDirectory, { recursive: true });
const entries = projects.filter((project) => !project.broken && (!selectedName || project.name === selectedName));
if (!entries.length) throw new Error(selectedName ? `No active project named "${selectedName}"` : 'No active projects found');

const browser = await chromium.launch({
    executablePath: chromeExecutable,
    headless: true,
    args: ['--hide-scrollbars'],
});
const results = [];

try {
    for (let index = 0; index < entries.length; index += 1) {
        const project = entries[index];
        const slug = slugify(project.name);
        const outputPath = join(outputDirectory, `${slug}-1080.webp`);
        const temporaryPath = join(outputDirectory, `.${slug}-1080.png`);

        if (!force && existsSync(outputPath)) {
            console.log(`[${index + 1}/${entries.length}] ${project.name}: already captured`);
            results.push({ name: project.name, path: `/images/projects/${slug}-1080.webp`, status: 'existing' });
            continue;
        }

        const page = await browser.newPage({
            viewport: { width, height },
            deviceScaleFactor: 1,
            colorScheme: 'light',
        });

        try {
            console.log(`[${index + 1}/${entries.length}] ${project.name}: ${project.link.trim()}`);
            await page.goto(project.link.trim(), { waitUntil: 'domcontentloaded', timeout: 45000 });
            await page.waitForTimeout(4500);
            await dismissObstructions(page);
            await page.evaluate(() => window.scrollTo(0, 0));
            await page.waitForTimeout(500);
            await page.screenshot({ path: temporaryPath, type: 'png', fullPage: false });
            await convertToWebp(temporaryPath, outputPath);
            await rm(temporaryPath, { force: true });
            results.push({ name: project.name, path: `/images/projects/${slug}-1080.webp`, status: 'captured' });
        } catch (error) {
            await rm(temporaryPath, { force: true });
            console.error(`  Failed: ${error.message}`);
            results.push({ name: project.name, status: 'failed', error: error.message });
        } finally {
            await page.close();
        }
    }
} finally {
    await browser.close();
}

console.log('\nCapture results:');
for (const result of results) console.log(JSON.stringify(result));
if (results.some((result) => result.status === 'failed')) process.exitCode = 1;
