<script setup>
const props = defineProps({
    src: { type: String, default: '/images/rebrand/pearl-study.webp' },
    interactive: { type: Boolean, default: false },
    label: { type: String, default: 'Invert ASCII artwork' },
});
const canvas = ref(null);
const inverted = ref(false);
let changeArtwork = () => {};
let dispose = () => {};

onMounted(() => {
    const element = canvas.value;
    const context = element.getContext('2d');
    const sample = document.createElement('canvas');
    const source = sample.getContext('2d', { willReadFrequently: true });
    if (!context || !source) return;

    const portrait = new Image();
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let pixels, columns, rows, width, height, cell, frame = 0, started = 0;
    let visible = false, removed = false, pointerX = 0, pointerY = 0;
    let hovering = false, impactStarted = 0, impactX = .5, impactY = .5;
    let hoverAmount = 0, targetX = 0, targetY = 0, previousFrame = 0;
    let accent = '#ff6b4a';
    const glyphs = ' .,:;+=xX$&#@';

    function draw(now) {
        frame = 0;
        if (!pixels || removed) return;
        if (!started) started = now;
        const ease = 1 - Math.exp(-Math.min(now - previousFrame || 16, 64) / 180);
        previousFrame = now;
        const approach = (value, target) => Math.abs(target - value) < .004 ? target : value + (target - value) * ease;
        hoverAmount = motion.matches ? 0 : approach(hoverAmount, hovering ? 1 : 0);
        pointerX = motion.matches ? 0 : approach(pointerX, targetX);
        pointerY = motion.matches ? 0 : approach(pointerY, targetY);
        const progress = motion.matches ? 1 : Math.min((now - started) / 1900, 1);
        const impact = motion.matches || !impactStarted ? 1 : Math.min((now - impactStarted) / 800, 1);
        const impactRadius = Math.hypot(width, height) * impact;
        context.clearRect(0, 0, width, height);
        context.font = `${cell * 1.14}px "Geist Mono", monospace`;
        context.textBaseline = 'top';
        context.fillStyle = accent;
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < columns; x++) {
                const index = (y * columns + x) * 4;
                if (pixels[index + 3] < 100) continue;
                const luminance = (pixels[index] * .2126 + pixels[index + 1] * .7152 + pixels[index + 2] * .0722) / 255;
                if (luminance < .035) continue;
                const reveal = (1 - y / rows) * .65 + x / columns * .2;
                if (progress < reveal) continue;
                const depth = (luminance - .35) * cell * 2;
                const distance = Math.hypot(x * cell - (pointerX + 1) * width / 2, y * cell - (pointerY + 1) * height / 2);
                const influence = hoverAmount * Math.max(0, 1 - distance / (cell * 16));
                const wave = Math.sin(distance / cell - now * .006) * influence * cell;
                const reached = impact === 1 || Math.hypot(x * cell - impactX * width, y * cell - impactY * height) < impactRadius;
                const tone = (reached ? inverted.value : !inverted.value) ? 1 - luminance : luminance;
                const shimmer = (progress < 1 ? .13 : influence * .2) * Math.sin(x * 12 + y * 8 + now * .01);
                const glyph = glyphs[Math.max(1, Math.min(glyphs.length - 1, Math.floor((tone + shimmer) * glyphs.length)))];
                context.globalAlpha = Math.min(1, .3 + tone * .95);
                context.fillText(glyph, x * cell + pointerX * depth + wave, y * cell + pointerY * depth + wave * .5);
            }
        }
        context.globalAlpha = 1;
        element.dataset.ready = 'true';
        if (impact === 1) impactStarted = 0;
        if (visible && (progress < 1 || hoverAmount > 0 || pointerX !== targetX || pointerY !== targetY || impact < 1) && !motion.matches) frame = requestAnimationFrame(draw);
    }

    function requestDraw() {
        if (!frame && visible && !removed) frame = requestAnimationFrame(draw);
    }

    function resize() {
        if (!portrait.complete || !portrait.naturalWidth || removed) return;
        const box = element.getBoundingClientRect();
        width = box.width;
        height = box.height;
        if (!width || !height) return;
        const ratio = Math.min(window.devicePixelRatio || 1, 2);
        element.width = Math.round(width * ratio);
        element.height = Math.round(height * ratio);
        context.setTransform(ratio, 0, 0, ratio, 0, 0);
        cell = width < 440 ? 6 : 8;
        columns = Math.ceil(width / cell);
        rows = Math.ceil(height / cell);
        sample.width = columns;
        sample.height = rows;
        const scale = Math.min(columns / portrait.width, rows / portrait.height);
        const imageWidth = portrait.width * scale, imageHeight = portrait.height * scale;
        source.clearRect(0, 0, columns, rows);
        source.drawImage(portrait, (columns - imageWidth) / 2, rows - imageHeight, imageWidth, imageHeight);
        pixels = source.getImageData(0, 0, columns, rows).data;
        requestDraw();
    }

    function move(event) {
        if (motion.matches || event.pointerType === 'touch') return;
        const box = element.getBoundingClientRect();
        hovering = props.interactive;
        targetX = (event.clientX - box.left) / box.width * 2 - 1;
        targetY = (event.clientY - box.top) / box.height * 2 - 1;
        requestDraw();
    }
    function reset() { hovering = false; targetX = targetY = 0; requestDraw(); }
    changeArtwork = event => {
        if (!props.interactive) return;
        const box = element.getBoundingClientRect();
        impactX = event.detail ? (event.clientX - box.left) / box.width : .5;
        impactY = event.detail ? (event.clientY - box.top) / box.height : .5;
        inverted.value = !inverted.value;
        impactStarted = performance.now();
        requestDraw();
    };
    function recolor() {
        accent = getComputedStyle(element).getPropertyValue('--ascii-color').trim() || '#ff6b4a';
        requestDraw();
    }

    const resizeObserver = new ResizeObserver(resize);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        if (visible) requestDraw();
        else { cancelAnimationFrame(frame); frame = 0; }
    });
    resizeObserver.observe(element);
    intersectionObserver.observe(element);
    element.addEventListener('pointermove', move);
    element.addEventListener('pointerleave', reset);
    motion.addEventListener('change', reset);
    portrait.onload = resize;
    portrait.src = props.src;
    recolor();
    document.fonts.ready.then(() => { if (!removed) requestDraw(); });

    dispose = () => {
        removed = true;
        cancelAnimationFrame(frame);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        element.removeEventListener('pointermove', move);
        element.removeEventListener('pointerleave', reset);
        motion.removeEventListener('change', reset);
        portrait.onload = null;
        changeArtwork = () => {};
    };
});
onBeforeUnmount(() => dispose());
</script>

<template>
    <component :is="interactive ? 'button' : 'div'" class="ascii-portrait" :class="{ 'ascii-interactive': interactive }" :type="interactive ? 'button' : undefined" :aria-hidden="interactive ? undefined : 'true'" :aria-label="interactive ? label : undefined" :aria-pressed="interactive ? inverted : undefined" @click="changeArtwork($event)">
        <canvas ref="canvas" aria-hidden="true" />
    </component>
</template>

<style scoped>
.ascii-portrait { width: 100%; height: 100%; }
.ascii-interactive,.ascii-interactive:hover { display: block; padding: 0; background: transparent; pointer-events: auto; }
.ascii-interactive:focus-visible { outline-offset: -6px; }
canvas { display: block; width: 100%; height: 100%; }
</style>
