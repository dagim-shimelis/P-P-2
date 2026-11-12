<script setup>
const route = useRoute();
const open = ref(false);
const scrolled = ref(false);
const active = ref('');
const soundEnabled = useState('click-sounds-enabled', () => true);
const navigation = [
    { name: 'Home', to: '/' },
    { name: 'Work', to: '/projects/list' },
    { name: 'About', to: '/#about' },
    { name: 'Notes', to: '/#articles' },
    { name: 'Contact', to: '/#contact' },
];
const spySections = [
    { id: 'about', name: 'About' },
    { id: 'articles', name: 'Notes' },
    { id: 'contact', name: 'Contact' },
];

function closeMobile() { open.value = false; }

// Scroll-spy: while scrolling the homepage, highlight the section currently in view.
function syncActive() {
    if (route.path.startsWith('/projects')) { active.value = 'Work'; return; }
    if (route.path !== '/') { active.value = ''; return; }
    let current = 'Home';
    for (const section of spySections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= window.innerHeight * 0.42) current = section.name;
    }
    const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
    if (atBottom) current = spySections[spySections.length - 1].name;
    active.value = current;
}

let ticking = false;
function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        scrolled.value = window.scrollY > 24;
        syncActive();
        ticking = false;
    });
}

function onKeydown(event) { if (event.key === 'Escape') closeMobile(); }
watch(open, value => {
    if (import.meta.server) return;
    if (value) document.addEventListener('keydown', onKeydown);
    else document.removeEventListener('keydown', onKeydown);
});
watch(() => route.fullPath, () => { closeMobile(); nextTick(syncActive); });
onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    document.removeEventListener('keydown', onKeydown);
});
</script>

<template>
    <a href="#main-content" class="skip-link">Skip to content</a>
    <header class="site-header" :class="{ 'is-scrolled': scrolled }">
        <div class="header-inner page-gutter">
            <NuxtLink to="/" class="wordmark" aria-label="Dagim Shimelis — Home">dagim<span>✳</span></NuxtLink>
            <nav class="header-nav" aria-label="Primary">
                <NuxtLink v-for="(item, index) in navigation" :key="item.name" :to="item.to" class="header-link mono" :class="{ 'is-active': active === item.name }" :style="{ '--i': index }">
                    <span class="roll"><span>{{ item.name }}</span><span aria-hidden="true">{{ item.name }}</span></span>
                </NuxtLink>
            </nav>
            <div class="header-actions">
                <a href="/file/DagimShimelisResume.pdf" class="button" download>Get Resume <span class="arrow-down" aria-hidden="true">↓</span></a>
                <NuxtLink to="/#contact" class="button">Let's talk <span aria-hidden="true">↗</span></NuxtLink>
            </div>
            <button class="menu-toggle mono" aria-controls="mobile-panel" :aria-expanded="open" @click="open = !open">
                <span class="menu-icon" aria-hidden="true"><i></i><i></i></span>Menu
            </button>
        </div>
    </header>
    <div id="mobile-panel" class="mobile-panel" :class="{ 'is-open': open }" @click.self="closeMobile">
        <div class="mobile-sheet">
            <nav aria-label="Mobile navigation">
                <NuxtLink v-for="(item, index) in navigation" :key="item.name" :to="item.to" class="mobile-link" :class="{ 'is-active': active === item.name }" :style="{ '--i': index }" @click="closeMobile">
                    <span class="mono">0{{ index + 1 }}</span>{{ item.name }}
                </NuxtLink>
            </nav>
            <div class="mobile-actions">
                <a href="/file/DagimShimelisResume.pdf" class="button" download>Get Resume <span class="arrow-down" aria-hidden="true">↓</span></a>
                <NuxtLink to="/#contact" class="button">Let's talk <span aria-hidden="true">↗</span></NuxtLink>
            </div>
            <button class="button mobile-sound" data-click-sound="off" :aria-pressed="soundEnabled" @click="soundEnabled = !soundEnabled">Click sounds: {{ soundEnabled ? 'on' : 'off' }}</button>
        </div>
    </div>
</template>