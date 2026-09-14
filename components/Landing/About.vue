<script setup>
    const tools = ref([
        {
            name: "Vue",
            icon: "mdi:vuejs",
            originalIcon: "vscode-icons:file-type-vue",
            link: "https://vuejs.org/",
        },
        {
            name: "Nuxt",
            icon: "simple-icons:nuxtdotjs",
            originalIcon: "logos:nuxt-icon",
            link: "https://nuxt.com/",
        },
        {
            name: "React",
            icon: "simple-icons:react",
            originalIcon: "logos:react",
            link: "https://legacy.reactjs.org/",
        },
        {
            name: "Typescript",
            icon: "cib:typescript",
            originalIcon: "devicon:typescript",
            link: "https://www.typescriptlang.org/",
        },
        {
            name: "Tailwind",
            icon: "file-icons:tailwind",
            originalIcon: "devicon:tailwindcss",
            link: "https://tailwindcss.com/",
        },
        {
            name: "GSAP",
            icon: "simple-icons:greensock",
            originalIcon: "logos:greensock-icon",
            link: "https://gsap.com/",
        },
        {
            name: "Figma",
            icon: "simple-icons:figma",
            originalIcon: "logos:figma",
            link: "https://www.figma.com/",
        },
    ]);
</script>

<template>
    <div class="relative min-h-screen py-32 overflow-hidden">
        <div class="side-space relative z-10">
            <div class="flex flex-col lg:flex-row gap-20 items-center">
                <!-- Text Content -->
                <div class="flex-1 flex flex-col gap-y-12">
                    <div class="flex flex-col">
                        <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">Background</p>
                        <h2 class="title-big">A Little About Me</h2>
                    </div>
                    <div class="flex flex-col gap-y-6">
                        <p class="para-text">
                            With 5 years of experience across corporate teams and
                            freelance projects, I bring designs to life on the web.
                            I focus on responsive layouts, reusable components,
                            and interactions that feel natural. From Figma to Vue
                            and Nuxt, I care about the details — typography, spacing,
                            and motion — that make an interface feel considered.
                        </p>
                        <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
                            <div class="border-l border-green-400/30 pl-6">
                                <h4 class="text-green-400 font-mono text-xs mb-2 uppercase">Design</h4>
                                <p class="text-sm">UI/UX, Design Systems, Prototyping</p>
                            </div>
                            <div class="border-l border-green-400/30 pl-6">
                                <h4 class="text-green-400 font-mono text-xs mb-2 uppercase">Frontend</h4>
                                <p class="text-sm">Vue, Nuxt, Responsive Components</p>
                            </div>
                            <div class="border-l border-green-400/30 pl-6">
                                <h4 class="text-green-400 font-mono text-xs mb-2 uppercase">Interaction</h4>
                                <p class="text-sm">Motion, Micro-interactions, GSAP</p>
                            </div>
                        </div>
                    </div>
                    <!-- Tools -->
                    <div class="flex flex-col gap-y-4">
                        <p class="text-xs uppercase tracking-widest text-green-400/50">My Frontend &amp; Design Toolkit</p>
                        <ul class="flex flex-wrap items-center gap-6">
                            <li v-for="(tool, i) in tools" :key="i" :title="tool.name">
                                <a :href="tool.link" target="_blank" class="grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110 block">
                                    <Icon :name="tool.icon" class="w-6 h-6 text-green-400" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <!-- Visual/Image -->
                <div class="flex-1 relative">
                    <div class="relative border border-green-400/20 p-8 backdrop-blur-sm bg-green-400/5 group overflow-hidden">
                        <NuxtImg
                            class="grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700 w-full"
                            src="/images/about-image.png"
                            alt="about-image"
                            width="800"
                            height="800"
                            loading="lazy"
                            :quality="80"
                        />
                        <div class="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/80 to-transparent"></div>
                        <div class="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-green-400"></div>
                        <div class="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-green-400"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .tool-icons {
        @apply w-[24px] sm:w-[25px] sm:h-[25px];
    }
</style>
