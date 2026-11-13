<script setup>
import { createRenderer } from 'hazeglow/core';

const props = defineProps({
    config: { type: Object, required: true },
});

// Browsers cap live WebGL contexts (~8-16) and force-loss the oldest ones beyond
// that, which shows up as frozen/black canvases. Keep created renderers alive
// across visibility changes and evict only the least-recently-used hidden ones
// beyond a small pool, so fast scrolling never churns context creation.
const MAX_CONTEXTS = 8;
const contextPool = [];

const container = ref(null);
const canvas = ref(null);
const active = ref(false);
let renderer;
let rendererHandle;
let resizeObserver;
let intersectionObserver;
let motionQuery;
let animationFrame;
let visible = false;
let reducedMotion = false;
let startedAt = 0;
let elapsedBeforePause = 0;
let activationId = 0;

function renderFrame(timestamp = performance.now()) {
    if (!renderer) return;

    const elapsed = reducedMotion ? 0 : elapsedBeforePause + (timestamp - startedAt) / 1000;
    renderer.render(props.config, elapsed);

    if (!reducedMotion && visible && !document.hidden) {
        animationFrame = requestAnimationFrame(renderFrame);
    }
}

function stopAnimation() {
    if (animationFrame) cancelAnimationFrame(animationFrame);
    animationFrame = undefined;
    if (startedAt) elapsedBeforePause += (performance.now() - startedAt) / 1000;
    startedAt = 0;
}

function startAnimation() {
    stopAnimation();
    if (!renderer || !visible || document.hidden) return;
    if (reducedMotion) {
        renderFrame();
        return;
    }
    startedAt = performance.now();
    renderFrame(startedAt);
}

function resize() {
    if (!renderer || !container.value) return;
    const { width, height } = container.value.getBoundingClientRect();
    const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    renderer.resize(
        Math.min(Math.max(1, Math.round(width * pixelRatio)), renderer.maxSize),
        Math.min(Math.max(1, Math.round(height * pixelRatio)), renderer.maxSize),
    );
    renderFrame();
}

function disposeRenderer() {
    activationId += 1;
    stopAnimation();
    renderer?.dispose();
    renderer = undefined;
    rendererHandle = undefined;
    active.value = false;
}

function promoteRenderer() {
    if (!rendererHandle) return;
    const index = contextPool.indexOf(rendererHandle);
    if (index !== -1) contextPool.splice(index, 1);
    contextPool.unshift(rendererHandle);
    for (let i = contextPool.length - 1; i >= MAX_CONTEXTS; i--) {
        const candidate = contextPool[i];
        if (candidate.isVisible()) continue;
        contextPool.splice(i, 1);
        candidate.dispose();
    }
}

async function activate() {
    if (renderer) {
        startAnimation();
        promoteRenderer();
        return;
    }

    const id = ++activationId;
    active.value = true;
    await nextTick();
    if (id !== activationId || !canvas.value || !visible) return;

    renderer = createRenderer(canvas.value);
    if (!renderer) return;
    rendererHandle = { isVisible: () => visible, dispose: disposeRenderer };
    resize();
    startAnimation();
    promoteRenderer();
}

function deactivate() {
    // Keep the renderer alive so re-entering the viewport is instant and no
    // WebGL contexts are created/disposed while scrolling fast. Only the
    // animation loop stops until the card is visible again.
    stopAnimation();
}

function handleVisibilityChange() {
    if (document.hidden) stopAnimation();
    else startAnimation();
}

function handleMotionChange(event) {
    reducedMotion = event.matches;
    reducedMotion ? (stopAnimation(), renderFrame()) : startAnimation();
}

onMounted(async () => {
    await nextTick();
    if (!container.value) return;

    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedMotion = motionQuery.matches;
    motionQuery.addEventListener('change', handleMotionChange);

    resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container.value);

    intersectionObserver = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        visible ? activate() : deactivate();
    }, { rootMargin: '240px 0px' });
    intersectionObserver.observe(container.value);

    document.addEventListener('visibilitychange', handleVisibilityChange);
});

onBeforeUnmount(() => {
    if (rendererHandle) {
        const index = contextPool.indexOf(rendererHandle);
        if (index !== -1) contextPool.splice(index, 1);
    }
    disposeRenderer();
    resizeObserver?.disconnect();
    intersectionObserver?.disconnect();
    motionQuery?.removeEventListener('change', handleMotionChange);
    document.removeEventListener('visibilitychange', handleVisibilityChange);
});

watch(() => props.config, () => renderFrame(), { deep: true });
</script>

<template>
    <div ref="container" class="hazeglow-layer" aria-hidden="true">
        <canvas v-if="active" ref="canvas" class="hazeglow-canvas"></canvas>
    </div>
</template>
