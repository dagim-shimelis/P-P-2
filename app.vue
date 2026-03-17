<script setup>
    const pageLoaded = ref(false);

    provide('pageLoaded', pageLoaded);

    onMounted(() => {
        document.documentElement.lang = "en";
        pageLoaded.value = true;
    });
</script>

<template>
    <div
        id="parent"
        class="relative min-h-screen bg-[#1c1c1e] text-green-50 font-lexend overflow-x-hidden w-screen selection:bg-green-400 selection:text-black"
    >
        <NuxtLayout>
            <lenis>
                <NuxtPage />
            </lenis>

            <!-- Screen Size Indicator (Dev Only) -->
            <div
                v-if="useRuntimeConfig().public.mode == 'development'"
                class="fixed px-3 py-1 text-[10px] font-mono text-green-400 bg-green-400/5 border border-green-400/20 bottom-4 left-4 z-50 uppercase tracking-widest"
            >
                Viewport:
                <span class="hidden 2xs:inline-block xs:hidden">2XS</span>
                <span class="hidden xs:inline-block sm:hidden">XS</span>
                <span class="hidden sm:inline-block md:hidden">SM</span>
                <span class="hidden md:inline-block lg:hidden">MD</span>
                <span class="hidden lg:inline-block xl:hidden">LG</span>
                <span class="hidden xl:inline-block 2xl:hidden">XL</span>
                <span class="hidden 2xl:inline-block 3xl:hidden">2XL</span>
                <span class="hidden 3xl:inline-block 4xl:hidden">3XL</span>
                <span class="hidden 4xl:inline-block 4_2xl:hidden">4XL</span>
                <span class="hidden 4_2xl:inline-block 5xl:hidden">4_2XL</span>
                <span class="hidden 5xl:inline-block">5XL</span>
            </div>
        </NuxtLayout>
    </div>
</template>

<style>
    body {
        background-color: #1c1c1e;
        margin: 0;
    }
</style>
