<script setup>
const props = defineProps({
    src: { type: String, required: true },
    alt: { type: String, required: true },
});

const root = ref(null);
const pageLoaded = ref(false);
const nearViewport = ref(false);
const highRequested = ref(false);
const highLoaded = ref(false);
let observer;
let idleId;

function requestHighQuality() {
    if (!pageLoaded.value || !nearViewport.value || highRequested.value) return;
    const start = () => { highRequested.value = true; };
    if ('requestIdleCallback' in window) idleId = window.requestIdleCallback(start, { timeout: 2200 });
    else idleId = window.setTimeout(start, 350);
}

function markPageLoaded() {
    pageLoaded.value = true;
    requestHighQuality();
}

onMounted(() => {
    if (document.readyState === 'complete') markPageLoaded();
    else window.addEventListener('load', markPageLoaded, { once: true });

    observer = new IntersectionObserver(([entry]) => {
        nearViewport.value = entry.isIntersecting;
        requestHighQuality();
        if (entry.isIntersecting && highRequested.value) observer?.disconnect();
    }, { rootMargin: '100% 0px' });

    if (root.value) observer.observe(root.value);
});

onBeforeUnmount(() => {
    window.removeEventListener('load', markPageLoaded);
    observer?.disconnect();
    if (idleId !== undefined) {
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId);
        else window.clearTimeout(idleId);
    }
});
</script>

<template>
    <span ref="root" class="progressive-project-image" :class="{ 'is-sharp': highLoaded }" role="img" :aria-label="alt">
        <NuxtImg
            class="progressive-project-image__low"
            :src="src"
            alt=""
            aria-hidden="true"
            width="720"
            sizes="88vw md:55vw lg:50vw xl:800px"
            densities="x1"
            format="webp"
            :quality="38"
            loading="lazy"
        />
        <NuxtImg
            v-if="highRequested"
            class="progressive-project-image__high"
            :src="src"
            alt=""
            aria-hidden="true"
            width="2880"
            sizes="88vw md:55vw lg:50vw xl:800px"
            densities="x1 x2"
            format="webp"
            :quality="92"
            loading="eager"
            @load="highLoaded = true"
        />
    </span>
</template>

<style scoped>
.progressive-project-image {
    position: relative;
    display: block;
    overflow: hidden;
    background: #fff;
}

.progressive-project-image__low,
.progressive-project-image__high {
    display: block;
    width: 100%;
    height: auto;
}

.progressive-project-image__low {
    filter: blur(.45px);
    transform: scale(1.002);
    transition: opacity .3s ease;
}

.progressive-project-image__high {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity .3s ease;
}

.progressive-project-image.is-sharp .progressive-project-image__low { opacity: 0; }
.progressive-project-image.is-sharp .progressive-project-image__high { opacity: 1; }

@media (prefers-reduced-motion: reduce) {
    .progressive-project-image__low,
    .progressive-project-image__high { transition: none; }
}
</style>
