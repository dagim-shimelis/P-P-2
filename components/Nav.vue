<script setup>
import { email, socialLinks } from '~/data/portfolio';
const route = useRoute();
const menu = ref(null);
const open = ref(false);
const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Work', to: '/projects/list' },
    { name: 'About', to: '/#about' },
    { name: 'Notes', to: '/#articles' },
    { name: 'Contact', to: '/#contact' },
];
function openMenu() { menu.value.showModal(); open.value = true; }
function closeMenu() { menu.value.close(); open.value = false; }
watch(() => route.fullPath, () => { if (open.value) closeMenu(); });
</script>

<template>
    <a href="#main-content" class="skip-link">Skip to content</a>
    <header class="site-header page-gutter">
        <NuxtLink to="/" class="wordmark" aria-label="Dagim Shimelis — Home">dagim<span>✳</span></NuxtLink>
        <button class="menu-toggle mono" aria-controls="site-menu" :aria-expanded="open" @click="openMenu">
            <span class="menu-icon" aria-hidden="true"><i></i><i></i></span> Menu
        </button>
        <div class="header-actions">
            <a href="/file/DagimShimelisResume.pdf" class="button" download>Get Resume <span aria-hidden="true">↓</span></a>
            <NuxtLink to="/#contact" class="button">Let's talk <span aria-hidden="true">↗</span></NuxtLink>
        </div>
    </header>
    <dialog id="site-menu" ref="menu" class="site-menu" aria-label="Site navigation" @close="open = false" @click="event => { if (event.target === menu) closeMenu(); }">
        <div class="menu-top page-gutter">
            <NuxtLink to="/" class="wordmark" @click="closeMenu">dagim<span>✳</span></NuxtLink>
            <button class="menu-toggle mono" autofocus @click="closeMenu">Close <span aria-hidden="true">×</span></button>
        </div>
        <div class="menu-layout page-gutter">
            <nav aria-label="Main navigation">
                <NuxtLink v-for="(item, index) in navigation" :key="item.name" :to="item.to" @click="closeMenu">
                    <span class="mono">0{{ index + 1 }}</span>{{ item.name }}<span class="menu-arrow" aria-hidden="true">↗</span>
                </NuxtLink>
            </nav>
            <div class="menu-details">
                <p class="eyebrow">Independent developer &amp; designer</p>
                <a :href="`mailto:${email}`" class="menu-email">{{ email }}</a>
                <div class="menu-socials"><a v-for="link in socialLinks" :key="link.name" :href="link.url" target="_blank" rel="noopener noreferrer">{{ link.name }} ↗</a></div>
                <NuxtLink class="menu-portrait" to="/#about" @click="closeMenu"><img src="/images/about-image.png" alt="Dagim working at his desk" width="800" height="800" /><span class="eyebrow">The person behind the pixels ↗</span></NuxtLink>
                <p class="eyebrow">Addis Ababa, Ethiopia · Working globally</p>
            </div>
        </div>
    </dialog>
</template>
