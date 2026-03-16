<script setup>
    import projects from "@/data/projects-list.json";
</script>

<template>
    <div class="relative min-h-screen pt-32 pb-32 bg-[#1c1c1e] text-green-50">
        <div class="side-space relative z-10">
            <div class="flex flex-col items-center mb-24 text-center">
                <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">Archive_Index</p>
                <h1 class="title-big">ALL_THE_PROJECTS</h1>
                <p class="mt-10 max-w-2xl para-text">
                    A comprehensive log of developed modules, web architectures, and 
                    digital machines. Each entry represents a unique engineering cycle.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div
                    v-for="(project, i) in projects"
                    :key="i"
                    class="group relative border border-green-400/20 p-4 transition-all duration-500 hover:border-green-400 hover:bg-green-400/5"
                >
                    <a
                        :href="project.link"
                        target="_blank"
                        class="block"
                    >
                        <div class="mb-4 overflow-hidden grayscale contrast-125 transition-all duration-500 group-hover:grayscale-0 group-hover:contrast-100">
                             <img
                                :src="project.thumbnailImage"
                                alt="project screenshot"
                                class="object-cover w-full aspect-video border border-green-400/10"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between items-end">
                                <div>
                                    <p class="text-[10px] text-green-400 font-mono mb-1">REG_ID_{{ i.toString().padStart(3, '0') }}</p>
                                    <h3 class="text-xl font-[700] uppercase tracking-tighter">{{ project.name }}</h3>
                                </div>
                                <span class="text-green-400 group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </div>
                            <p class="text-xs font-mono text-green-400/60 line-clamp-2">
                                {{ project.cardDescription }}
                            </p>
                        </div>
                    </a>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
