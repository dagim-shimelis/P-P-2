<script setup>
// Render unknown page routes normally so analytics can record a pageview,
// without treating a missing URL as an application exception.
setResponseStatus(404);
useHead({
    title: 'Page not found — Dagim Shimelis',
    meta: [{ name: 'robots', content: 'noindex, follow' }],
});
</script>

<template>
    <main id="main-content" class="not-found-page page-gutter">
        <div class="not-found-content">
            <p class="not-found-number" aria-hidden="true">404<span>↗</span></p>
            <div class="not-found-copy">
                <h1>This page doesn’t exist.</h1>
                <p>The link may have moved, or the address might be off. There’s more to explore from here.</p>
                <div class="not-found-actions">
                    <NuxtLink to="/" class="button">Back home <span aria-hidden="true">↗</span></NuxtLink>
                    <NuxtLink to="/projects/list" class="text-link">See selected work <span aria-hidden="true">↗</span></NuxtLink>
                </div>
            </div>
        </div>
    </main>
</template>
