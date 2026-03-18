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
            name: "NodeJS",
            icon: "fontisto:nodejs",
            originalIcon: "logos:nodejs-icon",
            link: "https://nodejs.org/en",
        },
        {
            name: "MongoDB",
            icon: "devicon-plain:mongodb-wordmark",
            originalIcon: "devicon:mongodb-wordmark",
            link: "https://www.mongodb.com/",
        },
        {
            name: "Typescript",
            icon: "cib:typescript",
            originalIcon: "devicon:typescript",
            link: "https://www.typescriptlang.org/",
        },
        {
            name: "GraphQL",
            icon: "simple-icons:graphql",
            originalIcon: "logos:graphql",
            link: "https://graphql.org/",
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
                        <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">About Me</p>
                        <h2 class="title-big">THE_ENGINEER</h2>
                    </div>
                    <div class="flex flex-col gap-y-6">
                        <p class="para-text">
                            With 5 years of experience across big corporate
                            environments and freelance work, I build end-to-end
                            web experiences — from pixel-perfect interfaces and
                            thoughtful design systems on the frontend, to robust
                            APIs and scalable architecture on the backend. I care
                            about the full picture, making sure every layer works
                            together seamlessly.
                        </p>
                        <div class="grid grid-cols-3 gap-8 mt-8">
                            <div class="border-l border-green-400/30 pl-6">
                                <h4 class="text-green-400 font-mono text-xs mb-2 uppercase">Design</h4>
                                <p class="text-sm">UI/UX, Design Systems, Prototyping</p>
                            </div>
                            <div class="border-l border-green-400/30 pl-6">
                                <h4 class="text-green-400 font-mono text-xs mb-2 uppercase">Frontend</h4>
                                <p class="text-sm">Responsive Interfaces, Animations, SPAs</p>
                            </div>
                            <div class="border-l border-green-400/30 pl-6">
                                <h4 class="text-green-400 font-mono text-xs mb-2 uppercase">Backend</h4>
                                <p class="text-sm">REST & GraphQL APIs, Databases, Auth</p>
                            </div>
                        </div>
                    </div>
                    <!-- Tools -->
                    <div class="flex flex-col gap-y-4">
                        <p class="text-xs uppercase tracking-widest text-green-400/50">Tools I Use</p>
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
                            class="grayscale contrast-125 opacity-80 group-hover:scale-105 transition-transform duration-700"
                            src="@/assets/image/about-image.png"
                            alt="about-image"
                            loading="lazy"
                            quality="80"
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
