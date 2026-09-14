<script setup>
import { socialLinks } from '~/data/portfolio';
const gridVisible = ref(false);
const accent = ref(0);
function toggleGrid() {
    gridVisible.value = !gridVisible.value;
    document.documentElement.classList.toggle('show-design-grid', gridVisible.value);
}
function changeColor() {
    accent.value = (accent.value + 1) % 3;
    document.documentElement.dataset.accent = String(accent.value);
}
function onKey(event) {
    if (event.target instanceof Element && (event.target.closest('input,textarea,select,[contenteditable="true"],dialog') || document.querySelector('dialog[open]'))) return;
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'g') { event.preventDefault(); toggleGrid(); }
    else if (!event.metaKey && !event.ctrlKey && !event.altKey && event.key.toLowerCase() === 'c') changeColor();
}
onMounted(() => window.addEventListener('keydown', onKey));
onBeforeUnmount(() => { window.removeEventListener('keydown', onKey); document.documentElement.classList.remove('show-design-grid'); });
</script>

<template>
    <footer class="site-footer page-gutter">
        <div class="footer-top"><p class="eyebrow"><span class="status-dot"></span> Open to a good conversation</p><a class="eyebrow" href="#main-content">Back to top ↑</a></div>
        <div class="footer-center"><p>Thanks for<br />stopping by.</p><div class="footer-links"><NuxtLink to="/projects/list">The work ↗</NuxtLink><NuxtLink to="/#about">The person ↗</NuxtLink><a :href="socialLinks[0].url" target="_blank" rel="noopener noreferrer">The code ↗</a></div></div>
        <div class="footer-hands"><AsciiPortrait src="/images/rebrand/hand-left.webp" interactive label="Invert left ASCII hand" /><AsciiPortrait src="/images/rebrand/hand-right.webp" interactive label="Invert right ASCII hand" /></div>
        <div class="footer-wordmark" aria-hidden="true">dagim<span>✳</span></div>
        <div class="footer-bottom eyebrow"><span>© {{ new Date().getFullYear() }} Dagim Shimelis</span><span>Addis Ababa → Everywhere</span><div class="footer-tools"><button :aria-pressed="gridVisible" @click="toggleGrid">⌘G Grid</button><button @click="changeColor">C Change color <span class="color-swatch" aria-hidden="true"></span></button></div></div>
    </footer>
</template>
