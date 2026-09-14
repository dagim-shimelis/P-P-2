<script setup>
const route = useRoute();
if (route.path === '/projects' || route.path === '/projects/') await navigateTo('/projects/list', { replace: true, redirectCode: 301 });
</script>

<template>
    <NuxtPage />
</template>
