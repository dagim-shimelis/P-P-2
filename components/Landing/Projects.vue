<script setup>
    import { Carousel, Slide, Pagination } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";
    import projects from "@/data/landing-projects.json";

    const router = useRouter();

    const tooltip = ref({ visible: false, text: "", x: 0, y: 0 });

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

    // carousel settings
    const settings = ref({
        itemsToShow: 1.3,
        snapAlign: "center",
    });

    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    const breakpoints = ref({
        // 1024 and up
        1024: {
            itemsToShow: 2.3,
            snapAlign: "start",
        },
        // 1536 and up
        1359: {
            itemsToShow: 3,
            snapAlign: "start",
        },
    });

    onMounted(async () => {
        const { gsap } = await import("gsap");
        const { ScrollTrigger } = await import("gsap/ScrollTrigger");
        gsap.registerPlugin(ScrollTrigger);

        /* ---------------------------- Projects Section ---------------------------- */
        const projectsElement = document.querySelector("#projectsList");

        function getScrollAmount() {
            let projectsWidth = projectsElement.scrollWidth;
            return -(projectsWidth - window.innerWidth);
        }
        const tween = gsap.to(projectsElement, {
            x: getScrollAmount,
            duration: 15,
            ease: "none",
        });

        ScrollTrigger.create({
            trigger: "#projects",
            start: "top top",
            end: () => `+=${getScrollAmount() * -1}`,
            pin: true,
            animation: tween,
            scrub: 1,
            invalidateOnRefresh: true,
        });
    });
</script>

<template>
    <div
        id="projectsWrapper"
        class="relative overflow-x-clip w-screen min-h-screen py-32"
    >
        <div
            id="projectsList"
            class="px-4 md:px-16 3xl:px-44 relative lg:flex flex-col gap-y-32 z-10"
        >
            <!-- Projects Content -->
            <div class="flex flex-col gap-y-16 justify-center max-w-4xl mx-auto text-center items-center">
                <!-- Title -->
                <div class="flex flex-col items-center">
                    <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">Selected Work</p>
                    <h2 class="title-big">THE_PROJECT</h2>
                </div>
                <!-- About me text -->
                <div class="flex flex-col gap-y-6">
                    <p class="para-text">
                        A collection of websites and apps I've designed and built.
                        Each one was a unique challenge that pushed me to think creatively
                        and deliver real results.
                    </p>
                </div>
            </div>
            <!-- Projects list -->
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:px-28">
                <div
                    v-for="(project, i) in projects"
                    :key="i"
                    class="group relative border border-green-400/20 p-4 transition-all duration-500 hover:border-green-400 hover:bg-green-400/5"
                    @mouseenter="showTooltip($event, project.cardDescription)"
                    @mousemove="moveTooltip"
                    @mouseleave="hideTooltip"
                >
                    <a
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
                        <div class="flex flex-col gap-y-3 mt-3">
                            <div class="flex justify-between items-start">
                                <div>
                                    <p class="text-xs text-green-400 font-mono mb-1">{{ (i + 1).toString().padStart(2, '0') }}</p>
                                    <h3 class="text-2xl font-[700] uppercase tracking-tighter">{{ project.name }}</h3>
                                </div>
                                <span class="text-green-400 group-hover:translate-x-2 transition-transform duration-300 mt-1">→</span>
                            </div>
                            <p class="text-xs font-mono text-green-400/60 line-clamp-2">{{ project.cardDescription }}</p>
                        </div>
                    </a>
                </div>
            </div>
            <div class="flex justify-center mt-8">
                <router-link
                    to="/projects"
                    class="btn"
                >
                    View All
                </router-link>
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
</style>
