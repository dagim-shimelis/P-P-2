<script setup>
import testimonials from '~/data/testimonials.json';
const active = ref(0);
const current = computed(() => testimonials[active.value]);
</script>

<template>
    <section id="testimonials" class="testimonials-section section-space page-gutter" aria-labelledby="testimonials-heading">
        <div class="testimonials-intro"><h2 id="testimonials-heading">Good words.<br />Good people.</h2><p class="eyebrow">04 / From the people I've worked with</p></div>
        <div class="testimony-content">
            <span class="quote-mark" aria-hidden="true">“</span>
            <div aria-live="polite" aria-atomic="true">
                <blockquote>{{ current.testimony.replace(/^"|"$/g, '') }}</blockquote>
                <a :href="current.linkedin_link" target="_blank" rel="noopener noreferrer" class="quote-author"><span>{{ current.name }} ↗</span><span class="eyebrow">{{ current.title }}</span></a>
            </div>
            <div class="quote-controls"><span class="eyebrow">0{{ active + 1 }} / 0{{ testimonials.length }}</span><div><button class="arrow-button" aria-label="Previous testimonial" @click="active = (active + testimonials.length - 1) % testimonials.length">←</button><button class="arrow-button" aria-label="Next testimonial" @click="active = (active + 1) % testimonials.length">→</button></div></div>
        </div>
    </section>
</template>
