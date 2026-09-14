<script setup>
import { work } from '~/data/portfolio';
</script>

<template>
    <section id="about" class="about-section light-section section-space page-gutter" aria-labelledby="about-heading">
        <div class="section-marker"><span class="eyebrow">01 / The person behind the pixels</span><span class="eyebrow">Based in Addis Ababa, ET</span></div>
        <div class="about-layout">
            <figure class="portrait-frame">
                <img src="/images/about-image.png" alt="Dagim working at his desk" width="800" height="800" loading="lazy" />
                <figcaption class="eyebrow">Dagim Shimelis <span>Portrait / 01</span></figcaption>
            </figure>
            <div class="about-copy">
                <h2 id="about-heading">One person.<br />Many ways to make<br />something good.</h2>
                <div class="about-description">
                    <p>I'm Dagim, a frontend developer and UI designer. I care about how things look, how they work, and the small details that make them feel right.</p>
                    <p>Over five years of working with corporate teams, startups, and my own ideas, I've turned designs into responsive websites and useful products. From Figma to Vue and Nuxt, I stay close to the whole process.</p>
                </div>
                <a class="text-link" href="/file/DagimShimelisResume.pdf" download>Get my résumé <span aria-hidden="true">↗</span></a>
                <div class="personal-stats">
                    <div><span class="stat-value">5<span>+</span></span><p class="eyebrow">Years building for the web</p></div>
                    <div><span class="stat-value">{{ work.length }}<span>+</span></span><p class="eyebrow">Projects in the collection</p></div>
                    <div><span class="stat-value">01</span><p class="eyebrow">Person, from idea to delivery</p></div>
                </div>
            </div>
        </div>
    </section>
</template>
