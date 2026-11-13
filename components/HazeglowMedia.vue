<script setup>
const props = defineProps({
    poster: { type: String, required: true },
    video: { type: String, required: true },
    eager: { type: Boolean, default: false },
});

const container = ref(null);
const videoElement = ref(null);
const sourceEnabled = ref(false);
const ready = ref(false);
let observer;
let motionQuery;
let visible = false;

async function startVideo() {
    if (!visible || motionQuery?.matches) return;
    const needsLoad = !sourceEnabled.value;
    sourceEnabled.value = true;
    await nextTick();
    if (needsLoad) videoElement.value?.load();
    videoElement.value?.play().catch(() => {});
}

function handleIntersection([entry]) {
    visible = entry.isIntersecting;
    if (visible) startVideo();
    else videoElement.value?.pause();
}

function handleMotionChange() {
    if (motionQuery.matches) videoElement.value?.pause();
    else startVideo();
}

onMounted(() => {
    motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', handleMotionChange);
    observer = new IntersectionObserver(handleIntersection, { rootMargin: '240px 0px' });
    observer.observe(container.value);
});

onBeforeUnmount(() => {
    observer?.disconnect();
    motionQuery?.removeEventListener('change', handleMotionChange);
});
</script>

<template>
    <div ref="container" class="hazeglow-layer hazeglow-media" aria-hidden="true">
        <img
            :src="poster"
            alt=""
            class="hazeglow-media-poster"
            :loading="eager ? 'eager' : 'lazy'"
            :fetchpriority="eager ? 'high' : 'auto'"
            decoding="async"
        />
        <video
            ref="videoElement"
            class="hazeglow-media-video"
            :class="{ 'is-ready': ready }"
            :preload="sourceEnabled ? 'auto' : 'none'"
            muted
            loop
            playsinline
            @canplay="ready = true"
        >
            <source v-if="sourceEnabled" :src="video" type="video/mp4" />
        </video>
    </div>
</template>

<style scoped>
.hazeglow-media-poster,
.hazeglow-media-video {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.hazeglow-media-video {
    opacity: 0;
    transition: opacity .2s ease;
}

.hazeglow-media-video.is-ready {
    opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
    .hazeglow-media-video {
        display: none;
    }
}
</style>
