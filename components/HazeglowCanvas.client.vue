<script setup>
import { createRenderer } from 'hazeglow/core';

const props = defineProps({
    config: { type: Object, required: true },
});

const container = ref(null);
const canvas = ref(null);
const active = ref(false);
let renderer;
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

async function activate() {
    if (renderer || active.value) {
        startAnimation();
        return;
    }

    const id = ++activationId;
    active.value = true;
    await nextTick();
    if (id !== activationId || !canvas.value || !visible) return;

    renderer = createRenderer(canvas.value);
    if (!renderer) return;
    resize();
    startAnimation();
}

function deactivate() {
    activationId += 1;
    stopAnimation();
    renderer?.dispose();
    renderer = undefined;
    active.value = false;
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
    deactivate();
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
