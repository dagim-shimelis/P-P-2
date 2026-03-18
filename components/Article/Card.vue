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
        class="h-full max-w-[420px] text-left border border-green-400/20 bg-green-400/5 backdrop-blur-sm transition-all duration-500 hover:border-green-400 group relative overflow-hidden"
    >
        <!-- Corner Decorations -->
        <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-400/30 group-hover:border-green-400 transition-colors"></div>
        <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-400/30 group-hover:border-green-400 transition-colors"></div>

        <!-- Image -->
        <div class="relative overflow-hidden grayscale contrast-125 group-hover:grayscale-0 group-hover:contrast-100 transition-all duration-700">
            <NuxtImg
                :src="articleContent.image"
                alt="article-image"
                class="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-700"
                loading="lazy"
                quality="75"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#1c1c1e] to-transparent opacity-60"></div>
        </div>

        <div class="space-y-4 p-6">
            <!-- Header -->
            <div class="flex justify-between items-center">
                <p class="text-[10px] font-mono text-green-400/50 uppercase tracking-[0.2em]">
                    {{ articleContent.date }}
                </p>
                <div class="w-1 h-1 bg-green-400 animate-pulse"></div>
            </div>

            <!-- Title -->
            <h1
                class="text-xl md:text-2xl font-[700] uppercase tracking-tighter leading-tight text-white group-hover:text-green-400 transition-colors"
            >
                {{ articleContent.title }}
            </h1>

            <!-- Sub Title -->
            <p
                class="text-sm font-[300] tracking-wide text-green-100/60 line-clamp-2"
            >
                {{ articleContent.subTitle }}
            </p>

            <!-- CTA -->
            <a
                :href="articleContent.link"
                target="_blank"
                class="flex items-center gap-4 text-xs font-mono text-green-400 uppercase tracking-[0.3em] group/link mt-6"
            >
                Read More 
                <span class="group-hover/link:translate-x-2 transition-transform duration-300">→</span>
            </a>
        </div>
    </div>
</template>

<style scoped></style>
