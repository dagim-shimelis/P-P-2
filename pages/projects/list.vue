<script setup>
import { work } from '~/data/portfolio';
const filter = ref('All');
const filters = ['All', 'Independent products', 'Collaborations', 'Archive'];
const filteredWork = computed(() => work.filter(project => {
    if (filter.value === 'Independent products') return project.personal && !project.broken;
    if (filter.value === 'Collaborations') return !project.personal && !project.broken;
    if (filter.value === 'Archive') return project.broken;
    return true;
}));
useSeoMeta({ title: 'Selected work — Dagim Shimelis', description: 'A collection of independent products, websites, and collaborations by frontend developer and UI designer Dagim Shimelis.' });
</script>

<template>
    <main id="main-content" class="archive-page page-gutter">
        <div class="archive-heading"><p class="eyebrow">An ongoing collection / {{ work.length }} projects</p><h1>Made with care.</h1><p>Products, websites, and ideas brought to life.<br />A selection of what I've been working on.</p></div>
        <div class="archive-toolbar"><div class="archive-filters" role="group" aria-label="Filter projects"><button v-for="option in filters" :key="option" class="eyebrow" :aria-pressed="filter === option" @click="filter = option">{{ option }}</button></div><span class="eyebrow" role="status">{{ filteredWork.length }} projects</span></div>
        <div class="archive-gallery" role="region" aria-label="Project gallery"><ProjectCard v-for="(project, index) in filteredWork" :key="project.name" :project="project" :index="index" /></div>
        <div class="archive-contact"><h2>Something on your mind?</h2><NuxtLink to="/#contact" class="button button-solid">Let's talk <span aria-hidden="true">↗</span></NuxtLink></div>
    </main>
</template>
