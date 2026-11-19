<script setup>
import { work } from '~/data/portfolio';
</script>

<template>
    <section id="about" class="about-section section-space page-gutter" aria-labelledby="about-heading">
        <div class="section-marker"><span class="eyebrow">01 / The person behind the pixels</span><span class="eyebrow">Based in Addis Ababa, ET</span></div>
        <div class="about-layout">
            <figure class="portrait-frame">
                <img src="/images/about-image.webp" alt="Dagim working at his desk" width="800" height="800" loading="lazy" />
                <figcaption class="eyebrow">Dagim Shimelis <span>Portrait / 01</span></figcaption>
            </figure>
            <div class="about-copy">
                <h2 id="about-heading">One person.<br />Many ways to make<br />something good.</h2>
                <div class="about-description">
                    <p>I'm Dagim, a full-stack product engineer and designer. I care about how products look, how their systems work, and the small details that make the whole experience feel right.</p>
                    <p>Over six years of working with corporate teams, startups, and my own ideas, I've built responsive interfaces and useful products from end to end. From product thinking and Figma to Vue, Nuxt, APIs, and databases, I stay close to the whole process.</p>
                </div>
                <a class="text-link" href="/file/DagimShimelisResume.pdf" download>Get my résumé <span aria-hidden="true">↗</span></a>
                <div class="personal-stats">
                    <div><span class="stat-value">6<span>+</span></span><p class="eyebrow">Years building for the web</p></div>
                    <div><span class="stat-value">{{ work.length }}<span>+</span></span><p class="eyebrow">Projects in the collection</p></div>
                </div>
            </div>
        </div>
    </section>
</template>
