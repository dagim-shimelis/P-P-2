<script setup>
defineProps({
    src: { type: String, required: true },
    alt: { type: String, required: true },
    // Above-fold images load immediately; the rest stay lazy so the full
    // projects archive does not download every thumbnail at once.
    eager: { type: Boolean, default: false },
});
</script>

<template>
    <span class="progressive-project-image">
        <NuxtImg
            class="progressive-project-image__img"
            :src="src"
            :alt="alt"
            width="1600"
            sizes="88vw md:55vw lg:50vw xl:800px"
            densities="x1 x2"
            format="webp"
            :quality="95"
            :loading="eager ? 'eager' : 'lazy'"
            :fetchpriority="eager ? 'high' : 'auto'"
        />
    </span>
</template>

<style scoped>
.progressive-project-image {
    position: relative;
    display: block;
    overflow: hidden;
    background: #fff;
}

.progressive-project-image__img {
    display: block;
    width: 100%;
    height: auto;
}
</style>
