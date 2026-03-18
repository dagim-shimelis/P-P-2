<script setup>
    import projects from "@/data/projects-list.json";

    const tooltip = ref({ visible: false, text: "", x: 0, y: 0 });
    const toast = ref({ visible: false, message: "" });
    let toastTimer = null;

    function showTooltip(event, text) {
        tooltip.value = { visible: true, text, x: event.clientX, y: event.clientY };
    }

    function moveTooltip(event) {
        tooltip.value.x = event.clientX;
        tooltip.value.y = event.clientY;
    }

    function hideTooltip() {
        tooltip.value.visible = false;
    }

    function showBrokenToast() {
        toast.value = { visible: true, message: "This site is no longer online." };
        clearTimeout(toastTimer);
        toastTimer = setTimeout(() => { toast.value.visible = false; }, 3500);
    }
</script>

<template>
    <div class="relative min-h-screen pt-32 pb-32 bg-[#1c1c1e] text-green-50">
        <div class="side-space relative z-10">
            <div class="flex flex-col items-center mb-24 text-center">
                <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">Full List</p>
                <h1 class="title-big">ALL_THE_PROJECTS</h1>
                <p class="mt-10 max-w-2xl para-text">
                    Everything I've worked on — from client websites and web apps
                    to personal experiments. Each project tells its own story.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                <div
                    v-for="(project, i) in projects"
                    :key="i"
                    class="group relative border p-4 transition-all duration-500"
                    :class="project.broken
                        ? 'border-green-400/10 opacity-50 cursor-default'
                        : 'border-green-400/20 hover:border-green-400 hover:bg-green-400/5 cursor-pointer'"
                    @mouseenter="showTooltip($event, project.cardDescription)"
                    @mousemove="moveTooltip"
                    @mouseleave="hideTooltip"
                >
                    <a
                        v-if="!project.broken"
                        :href="project.link"
                        target="_blank"
                        class="block"
                    >
                        <div class="mb-4 overflow-hidden transition-all duration-500">
                            <NuxtImg
                                :src="project.thumbnailImage"
                                alt="project screenshot"
                                class="object-cover w-full aspect-video border border-green-400/10"
                                loading="lazy"
                                quality="75"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between items-end">
                                <div>
                                    <p class="text-[10px] text-green-400 font-mono mb-1">{{ (i + 1).toString().padStart(3, '0') }}</p>
                                    <h3 class="text-xl font-[700] uppercase tracking-tighter">{{ project.name }}</h3>
                                </div>
                                <span class="text-green-400 group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </div>
                            <p class="text-xs font-mono text-green-400/60 line-clamp-2">
                                {{ project.cardDescription }}
                            </p>
                        </div>
                    </a>

                    <div
                        v-else
                        class="block"
                        @click="showBrokenToast"
                    >
                        <div class="mb-4 overflow-hidden transition-all duration-500">
                            <NuxtImg
                                :src="project.thumbnailImage"
                                alt="project screenshot"
                                class="object-cover w-full aspect-video border border-green-400/10 grayscale"
                                loading="lazy"
                                quality="75"
                            />
                        </div>
                        <div class="flex flex-col gap-2">
                            <div class="flex justify-between items-end">
                                <div>
                                    <p class="text-[10px] text-green-400/40 font-mono mb-1">{{ (i + 1).toString().padStart(3, '0') }}</p>
                                    <h3 class="text-xl font-[700] uppercase tracking-tighter">{{ project.name }}</h3>
                                </div>
                            </div>
                            <p class="text-xs font-mono text-green-400/40 line-clamp-2">
                                {{ project.cardDescription }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tooltip -->
    <Teleport to="body">
        <div
            v-if="tooltip.visible"
            class="project-tooltip"
            :style="{ top: tooltip.y + 16 + 'px', left: tooltip.x + 'px' }"
        >
            <span class="tooltip-prefix">// </span>{{ tooltip.text }}
        </div>
    </Teleport>

    <!-- Toast -->
    <Teleport to="body">
        <Transition name="toast">
            <div v-if="toast.visible" class="project-toast">
                <span class="toast-icon">⚠</span> {{ toast.message }}
            </div>
        </Transition>
    </Teleport>
</template>

<style scoped>
.project-tooltip {
    position: fixed;
    z-index: 9999;
    max-width: 280px;
    padding: 10px 14px;
    background: #0d0d0d;
    border: 1px solid rgba(74, 222, 128, 0.35);
    color: rgba(74, 222, 128, 0.85);
    font-family: monospace;
    font-size: 11px;
    line-height: 1.6;
    pointer-events: none;
    box-shadow: 0 0 20px rgba(74, 222, 128, 0.08);
    transform: translateX(-50%);
}

.tooltip-prefix {
    color: rgba(74, 222, 128, 0.4);
}

.project-toast {
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
    padding: 12px 20px;
    background: #0d0d0d;
    border: 1px solid rgba(74, 222, 128, 0.35);
    color: rgba(74, 222, 128, 0.85);
    font-family: monospace;
    font-size: 12px;
    white-space: nowrap;
    box-shadow: 0 0 24px rgba(74, 222, 128, 0.08);
}

.toast-icon {
    margin-right: 8px;
    color: rgba(74, 222, 128, 0.5);
}

.toast-enter-active,
.toast-leave-active {
    transition: opacity 0.3s ease, transform 0.3s ease;
}

.toast-enter-from,
.toast-leave-to {
    opacity: 0;
    transform: translateX(-50%) translateY(8px);
}
</style>
