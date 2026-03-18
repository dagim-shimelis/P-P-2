<script setup>
const route = useRoute()
const baseUrl = 'https://dagim.codes'

useHead({
    link: [
        { rel: 'canonical', href: computed(() => `${baseUrl}${route.path}`) },
    ],
})
</script>

<template>
    <div class="relative">
        <Nav></Nav>
        <slot></slot>
        <Footer></Footer>
    </div>
</template>
