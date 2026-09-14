<script setup>
import { email, socialLinks } from '~/data/portfolio';
const copyStatus = ref('');
let timer;
async function copyEmail() {
    clearTimeout(timer);
    try {
        await navigator.clipboard.writeText(email);
        copyStatus.value = 'Email copied';
    } catch {
        copyStatus.value = 'Select the email address to copy it.';
    }
    timer = setTimeout(() => { copyStatus.value = ''; }, 3500);
}
onBeforeUnmount(() => clearTimeout(timer));
</script>

<template>
    <section id="contact" class="contact-section light-section section-space page-gutter" aria-labelledby="contact-heading">
        <div class="section-marker"><h2 id="contact-heading">Make something<br />good together.</h2><span class="eyebrow">06 / Your idea, my inbox</span></div>
        <div class="contact-layout">
            <figure class="contact-portrait"><img src="/images/rebrand/contact-portrait.webp" alt="Dagim relaxing with a kitten" width="800" height="1267" loading="lazy" /><figcaption class="eyebrow">A person on the other side.</figcaption></figure>
            <div class="contact-copy">
                <h3>Have something in mind?<br />I'd love to hear about it.</h3>
                <p>I'm looking for frontend roles where design matters. If your team needs someone who cares about the details, let's talk.</p>
                <a :href="`mailto:${email}`" class="contact-email">{{ email }} <span aria-hidden="true">↗</span></a>
                <div class="contact-actions"><a :href="`mailto:${email}`" class="button button-dark">Get in touch <span aria-hidden="true">↗</span></a><button class="button" @click="copyEmail">Copy email <span aria-hidden="true">＋</span></button><span class="copy-status eyebrow" role="status">{{ copyStatus }}</span></div>
                <div class="contact-socials"><a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer" class="eyebrow">{{ link.name }} ↗</a></div>
            </div>
        </div>
    </section>
</template>
