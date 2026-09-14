<script setup>
import { selectedWork, work } from '~/data/portfolio';
const active = ref(0);
const section = ref(null);
let observer;
onMounted(() => {
    observer = new IntersectionObserver(entries => {
        for (const entry of entries) if (entry.isIntersecting) active.value = Number(entry.target.dataset.index);
    }, { rootMargin: '-15% 0px -45% 0px', threshold: 0 });
    section.value.querySelectorAll('[data-index]').forEach(element => observer.observe(element));
});
onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
    <section id="projects" ref="section" class="work-section section-space page-gutter" aria-labelledby="work-heading">
        <div class="work-intro">
            <p class="eyebrow">02 / Selected work</p>
            <h2 id="work-heading">A few things<br />out in the world.</h2>
            <p>Independent products and client collaborations. Different challenges. The same care for the details.</p>
            <nav class="work-index" aria-label="Selected projects">
                <a v-for="(project, index) in selectedWork" :key="project.name" :href="`#work-${index}`" :class="{ active: active === index }" :aria-current="active === index ? 'true' : undefined">
                    <NuxtImg :src="project.thumbnailImage" alt="" width="128" format="webp" loading="lazy" />
                    <span class="mono">{{ project.name }}</span><span class="eyebrow">0{{ index + 1 }}</span>
                </a>
            </nav>
            <NuxtLink to="/projects/list" class="button button-outline">View all work ({{ work.length }}) <span aria-hidden="true">↗</span></NuxtLink>
        </div>
        <div class="work-projects">
            <div v-for="(project, index) in selectedWork" :id="`work-${index}`" :key="project.name" :data-index="index" class="work-item"><ProjectCard :project="project" :index="index" /></div>
        </div>
    </section>
</template>
