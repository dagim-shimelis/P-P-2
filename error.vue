<script setup>
defineProps({ error: Object });
</script>

<template>
    <main id="main-content" class="error-page page-gutter"><p class="eyebrow">A small detour / {{ error?.statusCode }}</p><h1>{{ error?.statusCode === 404 ? 'Nothing here. Yet.' : 'Something went wrong.' }}</h1><p>Let's get you back to the good stuff.</p><button class="button button-solid" @click="clearError({ redirect: '/' })">Back home ↗</button></main>
</template>
