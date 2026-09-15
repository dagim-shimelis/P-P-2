<script setup>
import { socialLinks } from '~/data/portfolio';
</script>

<template>
    <footer class="site-footer page-gutter">
        <div class="footer-top"><p class="eyebrow"><span class="status-dot"></span> Open to a good conversation</p></div>
        <div class="footer-center"><p>Thanks for<br />stopping by.</p><div class="footer-links"><NuxtLink to="/projects/list">The work ↗</NuxtLink><NuxtLink to="/#about">The person ↗</NuxtLink><a :href="socialLinks[0].url" target="_blank" rel="noopener noreferrer">The code ↗</a></div></div>
        <div class="footer-hands"><AsciiPortrait src="/images/rebrand/hand-left.webp" interactive label="Invert left ASCII hand" /><AsciiPortrait class="footer-hand-right" src="/images/rebrand/hand-right.webp" interactive label="Invert right ASCII hand" /></div>
        <div class="footer-wordmark" aria-hidden="true">dagim<span>✳</span></div>
        <div class="footer-bottom eyebrow"><span>© {{ new Date().getFullYear() }} Dagim Shimelis</span><span>Addis Ababa → Everywhere</span><a class="footer-back-top" href="#main-content">Back to top <span aria-hidden="true">↑</span></a></div>
    </footer>
</template>
