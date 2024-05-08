<script setup>
    const props = defineProps({
        articleContent: {
            type: Object,
            required: true,
        },
    });
</script>

<template>
    <div
        class="h-full max-w-[420px] text-left border border-white/5 lg:border-transparent hover:border-white/5 rounded-[20px]"
    >
        <!-- Image -->
        <img
            :src="articleContent.image"
            alt="article-image"
            class="w-full rounded-t-[20px]"
        />
        <div class="!space-y-3 md:!space-y-4 p-4">
            <!-- Publication Date -->
            <p class="text-xs font-[200] opacity-60">
                {{ articleContent.date }}
            </p>
            <!-- Title -->
            <h1
                class="texxt-lg md:text-2xl font-[500] uppercase tracking-wider"
            >
                {{ articleContent.title }}
            </h1>
            <!-- Sub Title -->
            <h2
                class="text-sm md:text-base font-[200] tracking-wider opacity-60"
            >
                {{ articleContent.subTitle }}
            </h2>
            <!-- CTA -->
            <a
                :href="articleContent.link"
                target="_blank"
                class="block space-y-1 group w-fit cursor-custom-pointer"
            >
                <span class="text-sm md:text-base tracking-wider"
                    >Read Article</span
                >
                <img
                    src="@/assets/image/graphic-lines/arrow.png"
                    alt="arrow"
                    class="group-hover:translate-x-4 ease-in-out duration-300"
                />
            </a>
        </div>
    </div>
</template>

<style scoped></style>
