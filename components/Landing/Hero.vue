<script setup>
import { ref, inject, watch, onMounted } from "vue";

const letters = "DAGIM".split("");
const titleRef = ref(null);
const overlayRef = ref(null);
const subtitleRef = ref(null);
const descRef = ref(null);
const separatorRef = ref(null);
const showSpinner = ref(true);

const pageLoaded = inject('pageLoaded', ref(false));
let started = false;
let gsap;

onMounted(async () => {
    const mod = await import('gsap');
    gsap = mod.default || mod.gsap;

    const title = titleRef.value;
    if (!title) return;

    // Hide subtitle/desc/separator
    gsap.set([subtitleRef.value, descRef.value, separatorRef.value], { autoAlpha: 0, y: 20 });

    // Center the title in viewport
    const titleRect = title.getBoundingClientRect();
    const offsetX = window.innerWidth / 2 - (titleRect.left + titleRect.width / 2);
    const offsetY = window.innerHeight / 2 - (titleRect.top + titleRect.height / 2);
    gsap.set(title, { x: offsetX, y: offsetY });

    if (pageLoaded.value) runSequence();
});

watch(pageLoaded, (loaded) => {
    if (loaded && gsap) runSequence();
});

function runSequence() {
    if (started) return;
    started = true;

    const title = titleRef.value;
    const overlay = overlayRef.value;
    if (!title || !overlay) return;

    showSpinner.value = false;

    const tl = gsap.timeline();

    // Move title from center to its natural position
    tl.to(title, {
        x: 0,
        y: 0,
        duration: 0.9,
        ease: "power3.inOut",
    }, "+=0.2");

    // Fade out the dark overlay
    tl.to(overlay, {
        autoAlpha: 0,
        duration: 0.5,
        ease: "power2.inOut",
    }, "-=0.5");

    // Fade in subtitle, desc, separator
    tl.to(subtitleRef.value, {
        autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out",
    }, "-=0.2");

    tl.to(descRef.value, {
        autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out",
    }, "-=0.48");

    tl.to(separatorRef.value, {
        autoAlpha: 1, y: 0, duration: 0.6, ease: "power2.out",
    }, "-=0.48");
}
</script>

<template>
    <div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <Landing-Engine />

        <!-- Dark overlay -->
        <div ref="overlayRef" class="hero-overlay" style="position:fixed;inset:0;z-index:40;background:#1c1c1e;display:flex;align-items:center;justify-content:center;pointer-events:none;">
            <div v-if="showSpinner" class="spinner-wrapper">
                <div class="spinner"></div>
            </div>
        </div>

        <div class="relative z-10 flex flex-col items-center text-center w-full" id="hero">
            <div class="flex flex-col items-center gap-y-12 max-w-5xl px-4">

                <!-- Title -->
                <div class="flex flex-col items-center">
                    <h1 ref="titleRef" class="hero-title flex items-center">
                        <span
                            v-for="(char, i) in letters"
                            :key="i"
                            class="hero-char"
                        >{{ char }}</span>
                        <span class="hero-dot">.</span>
                    </h1>
                </div>

                <!-- Subtitle -->
                <p ref="subtitleRef" class="[font-size:clamp(2rem,3vw,3.5rem)] font-normal tracking-[-0.02em] [text-shadow:0_0_40px_rgba(28,28,30,1),0_0_80px_rgba(28,28,30,0.9)] text-white text-center leading-snug max-w-3xl">
                    Full Stack Engineer &amp; UI/UX Designer
                </p>

                <!-- Description -->
                <p ref="descRef" class="font-mono font-normal uppercase text-center leading-relaxed tracking-[0.12em] text-white max-w-xl">
                    Building thoughtful web experiences
                    from idea to launch
                </p>

                <!-- Dashed separator -->
                <div ref="separatorRef" class="w-44 border-t border-dashed border-white/20"></div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hero-overlay {
    position: fixed;
    inset: 0;
    z-index: 40;
    background: #1c1c1e;
    pointer-events: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

.spinner-wrapper {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 51;
}

.spinner {
    width: 28px;
    height: 28px;
    border: 3px dotted #4ade80;
    border-radius: 50%;
    animation: spin 1.2s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}

.hero-title {
    font-family: 'Chakra Petch', sans-serif;
    font-weight: 700;
    font-size: clamp(4rem, 12vw, 12rem);
    line-height: 0.85;
    letter-spacing: -0.02em;
    text-transform: uppercase;
    gap: clamp(0.3rem, 0.8vw, 0.7rem);
    position: relative;
    z-index: 50;
}

.hero-char {
    color: #4ade80;
    -webkit-text-stroke: 5px rgba(74, 222, 128, 0.8);
    padding: 0.08em 0.12em;
    border: 1px solid rgba(74, 222, 128, 0.2);
    position: relative;
    min-width: 0.6em;
    display: inline-flex;
    justify-content: center;
}

.hero-char::before,
.hero-char::after {
    content: '';
    position: absolute;
    background: rgba(74, 222, 128, 0.15);
}

.hero-char::before {
    width: 1px;
    height: 130%;
    top: -15%;
    left: 50%;
}

.hero-char::after {
    height: 1px;
    width: 130%;
    left: -15%;
    top: 50%;
}

.hero-dot {
    color: #4ade80;
    font-family: 'Chakra Petch', sans-serif;
    font-weight: 700;
    margin-left: -0.05em;
}
</style>
