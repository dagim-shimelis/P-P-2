<script setup>
import { projectHazeglow } from '~/data/project-hazeglow';

const props = defineProps({ project: { type: Object, required: true }, index: { type: Number, default: 0 } });
const projectHaze = computed(() => projectHazeglow[props.project.name]);
const cursorVisible = ref(false);
const hideCursor = () => { cursorVisible.value = false; };
onMounted(() => window.addEventListener('scroll', hideCursor, { capture: true, passive: true }));
onBeforeUnmount(() => window.removeEventListener('scroll', hideCursor, true));

function moveCursor(event) {
    if (props.project.broken || event.pointerType === 'touch') return;
    const { left, top } = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--cursor-x', `${event.clientX - left}px`);
    event.currentTarget.style.setProperty('--cursor-y', `${event.clientY - top}px`);
    cursorVisible.value = true;
}

</script>

<template>
    <article class="project-card" :class="{ 'project-archived': project.broken }">
        <component :is="project.broken ? 'div' : 'a'" :href="project.broken ? undefined : project.link" :target="project.broken ? undefined : '_blank'" :rel="project.broken ? undefined : 'noopener noreferrer'" class="project-visual" :class="{ 'cursor-visible': cursorVisible, 'project-visual-hazeglow': projectHaze, 'project-visual-hazeglow-dark': projectHaze?.dark }" :style="projectHaze ? { backgroundColor: projectHaze.fallback } : undefined" :aria-label="project.broken ? undefined : `Visit ${project.name} (opens in a new tab)`" @pointermove="moveCursor" @pointerleave="hideCursor">
            <HazeglowMedia v-if="projectHaze" :poster="projectHaze.poster" :video="projectHaze.video" />
            <span v-if="!project.broken && !project.openSource && (project.personal || project.category !== 'Web experience')" class="project-corner eyebrow">{{ project.personal ? 'Independent product' : project.category }}</span>

            <!-- Realistic macOS-style title bar -->
            <div class="project-preview">
                <div class="project-window-bar" aria-hidden="true">
                    <span class="project-window-controls"><i></i><i></i><i></i></span>
                    <span class="project-window-title">{{ project.name }}</span>
                </div>
                <ProgressiveProjectImage :src="project.thumbnailImage" :alt="`${project.name} interface`" />
            </div>

            <span class="project-image-number mono" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span v-if="!project.broken" class="project-open mono" aria-hidden="true">Visit project ↗</span>
            <span v-else class="project-open mono">Archived / Offline</span>
            <span v-if="!project.broken" class="project-cursor mono" aria-hidden="true">View website ↗</span>
        </component>
        <svg v-if="project.broken || project.openSource" class="project-stamp" :class="project.broken ? 'archive-stamp' : 'open-source-stamp'" viewBox="0 0 240 240" role="img" :aria-label="project.broken ? 'Archived project' : 'Open-source project'">
            <defs>
                <filter :id="`project-stamp-rough-${index}`" x="-8%" y="-8%" width="116%" height="116%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.045" numOctaves="3" seed="8" result="noise" />
                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="1.6" xChannelSelector="R" yChannelSelector="G" />
                </filter>
            </defs>
            <g :filter="`url(#project-stamp-rough-${index})`">
                <circle cx="120" cy="120" r="94" fill="var(--paper)" stroke="currentColor" stroke-width="8" />
                <circle cx="120" cy="120" r="82" fill="none" stroke="currentColor" stroke-width="3.5" />
                <g class="project-stamp-band" transform="rotate(-12 120 120)">
                    <rect x="3" y="84" width="234" height="72" fill="var(--paper)" stroke="currentColor" stroke-width="8" />
                    <rect x="13" y="94" width="214" height="52" fill="none" stroke="currentColor" stroke-width="3.5" />
                    <text x="120" y="134" text-anchor="middle">{{ project.broken ? 'Archived' : 'Open source' }}</text>
                </g>
            </g>
        </svg>

        <div class="project-meta"><h3 class="mono">{{ project.name }}</h3><p class="eyebrow">[ {{ project.category }} ] <span aria-hidden="true">—</span> [ {{ project.passionProject ? 'Passion project' : project.personal ? 'My startup' : 'Development' }} ] <a v-if="project.openSource" class="project-source" :href="project.repository" target="_blank" rel="noopener noreferrer" :aria-label="`View ${project.name} source code on GitHub (opens in a new tab)`">[ Open source ↗ ]</a></p></div>
        <p class="project-description">{{ project.cardDescription }}</p>
    </article>
</template>
