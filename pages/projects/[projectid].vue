<script setup>
import projects from '~/data/projects-detail.json';
const route = useRoute();
const project = computed(() => projects.find(item => item.id === route.params.projectid && item.title));
if (!project.value) throw createError({ statusCode: 404, statusMessage: 'Project not found' });
useSeoMeta({
    title: () => `${project.value?.title || 'Project'} — Dagim Shimelis`,
    description: () => project.value?.description,
    ogTitle: () => `${project.value?.title || 'Project'} — Dagim Shimelis`,
    ogDescription: () => project.value?.description,
    ogImage: () => `https://dagim.codes${project.value?.thumbnailImage}`,
});
</script>

<template>
    <main v-if="project" id="main-content" class="case-page page-gutter">
        <NuxtLink to="/projects/list" class="text-link">← Back to all work</NuxtLink>
        <div class="case-heading"><p class="eyebrow">Web experience / Case study</p><h1>{{ project.title }}</h1><a :href="project.link" target="_blank" rel="noopener noreferrer" class="button button-solid">Visit the website ↗</a></div>
        <figure class="case-cover"><NuxtImg format="webp" :quality="85" :src="project.thumbnailImage" :alt="`${project.title} homepage`" width="1440" height="900" /></figure>
        <div class="case-overview"><dl><div><dt class="eyebrow">Built with</dt><dd>{{ project.technologies.join(' / ') }}</dd></div><div><dt class="eyebrow">Released</dt><dd>{{ project.date }}</dd></div></dl><div><h2>Connecting people.<br />Creating possibilities.</h2><p>{{ project.description }}</p></div></div>
        <figure><div class="case-mobile"><NuxtImg format="webp" :quality="85" v-for="(image, index) in project.mobilePreviewImages" :key="image" :src="image" :alt="`${project.title} mobile interface ${index + 1}`" width="444" height="790" loading="lazy" /></div><figcaption>{{ project.mobilePreviewDescription }}</figcaption></figure>
        <figure v-for="feature in project.featurePreviews" :key="feature.image" class="case-feature"><NuxtImg format="webp" :quality="85" :src="feature.image" :alt="feature.description" width="1440" height="900" loading="lazy" /><figcaption>{{ feature.description }}</figcaption></figure>
        <NuxtLink to="/projects/list" class="button button-outline">Explore more work ↗</NuxtLink>
    </main>
</template>

<style scoped>
.case-page { padding-top: 140px; padding-bottom: 100px; }
.case-heading { padding: 80px 0 55px; }
.case-heading h1 { margin: 25px 0 35px; }
.case-cover img,.case-feature img { width: 100%; height: auto; }
.case-overview { display: grid; grid-template-columns: 1fr 2fr; gap: 8%; padding: 100px 0; }
dl { margin: 0; } dl > div + div { margin-top: 35px; } dt { color: var(--muted); } dd { margin: 12px 0 0; font-size: 14px; }
.case-overview p { color: var(--muted); font-size: 18px; line-height: 1.65; margin-top: 30px; max-width: 700px; }
.case-mobile { display: grid; grid-template-columns: repeat(3,minmax(0,1fr)); gap: 4%; padding: 6%; background: #b6b5b0; align-items: start; }
.case-mobile img { width: 100%; height: auto; }
figcaption { color: var(--muted); font-size: 14px; max-width: 650px; line-height: 1.6; }
.case-feature { margin: 90px 0; }
@media (max-width: 767px) { .case-page { padding-top: 110px; } .case-heading { padding-top: 50px; } .case-heading h1 { font-size: 52px; } .case-overview { grid-template-columns: 1fr; padding: 60px 0; gap: 45px; } dl { display: flex; gap: 30px; } dl > div + div { margin-top: 0; } .case-overview p { font-size: 16px; } .case-feature { margin: 55px 0; } }
</style>
