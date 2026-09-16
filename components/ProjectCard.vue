<script setup>
const props = defineProps({ project: { type: Object, required: true }, index: { type: Number, default: 0 } });
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
        <component :is="project.broken ? 'div' : 'a'" :href="project.broken ? undefined : project.link" :target="project.broken ? undefined : '_blank'" :rel="project.broken ? undefined : 'noopener noreferrer'" class="project-visual" :class="{ 'cursor-visible': cursorVisible }" :aria-label="project.broken ? undefined : `Visit ${project.name} (opens in a new tab)`" @pointermove="moveCursor" @pointerleave="hideCursor">
            <img class="project-backdrop" src="/images/rebrand/project-background.jpeg" alt="" aria-hidden="true" loading="lazy" />
            <span class="project-corner eyebrow">{{ project.personal ? 'Independent product' : project.category }}</span>
            <div class="project-preview">
                <div class="project-window-bar" aria-hidden="true">
                    <span class="project-window-controls"><i></i><i></i><i></i></span>
                    <span class="project-window-title">{{ project.name }}</span>
                    <span class="project-window-arrow">↗</span>
                </div>
                <NuxtImg :src="project.thumbnailImage" :alt="`${project.name} interface`" width="1440" format="webp" :quality="85" loading="lazy" />
            </div>
            <span class="project-image-number mono" aria-hidden="true">{{ String(index + 1).padStart(2, '0') }}</span>
            <span v-if="!project.broken" class="project-open mono" aria-hidden="true">Visit project ↗</span>
            <span v-else class="project-open mono">Archived / Offline</span>
            <span v-if="!project.broken" class="project-cursor mono" aria-hidden="true">View website ↗</span>
        </component>
        <div class="project-meta"><h3 class="mono">{{ project.name }}</h3><p class="eyebrow">[ {{ project.category }} ] <span aria-hidden="true">—</span> [ {{ project.personal ? 'My startup' : 'Development' }} ]</p></div>
        <p class="project-description">{{ project.cardDescription }}</p>
    </article>
</template>
