<script setup>
    const props = defineProps({
        articleContent: {
            type: Object,
            required: true,
        },
    });
</script>

<template>
    <div class="max-w-[420px] h-[700px] !space-y-6 !p-5 text-left">
        <!-- Image -->
        <img
            :src="articleContent.image"
            alt="article-image"
            class="w-full rounded-t-2xl"
        />
        <!-- Publication Date -->
        <p class="text-xs font-[200]">{{ articleContent.date }}</p>
        <!-- Title -->
        <h1 class="text-2xl font-[500] uppercase tracking-wider">
            {{ articleContent.title }}
        </h1>
        <!-- Sub Title -->
        <h3 class="text-base font-[200] tracking-wider">
            {{ articleContent.subTitle }}
        </h3>
        <!-- CTA -->
        <a
            :href="articleContent.link"
            target="_blank"
            class="block space-y-1 group w-fit"
        >
            <span class="tracking-wider">Read Article</span>
            <img
                src="@/assets/image/graphic-lines/arrow.png"
                alt="arrow"
                class="group-hover:translate-x-4 ease-in-out duration-300"
            />
        </a>
    </div>
</template>

<style scoped></style>
