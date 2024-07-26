<script setup>
    import { gsap } from "gsap";
    import { ScrollTrigger } from "gsap/ScrollTrigger";
    import { Carousel, Slide, Pagination } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";
    import projects from "@/data/landing-projects.json";
    gsap.registerPlugin(ScrollTrigger);

    const router = useRouter();
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

    onMounted(() => {
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
        class="relative overflow-x-clip w-screen"
    >
        <div
            id="projectsList"
            class="min-h-screen px-4 md:px-16 3xl:px-44 relative lg:flex gap-x-28 z-10"
        >
            <!-- Projects Content -->
            <div class="flex flex-col gap-y-16 justify-start m-auto">
                <!-- Title -->
                <div class="title-box lg:!w-[800px]">
                    <p class="title-small">Some of the</p>
                    <div>
                        <h1 class="title-big">projects</h1>
                        <img
                            src="@/assets/image/graphic-lines/underline.svg"
                            alt="title-underline"
                            class="title-underline"
                        />
                    </div>
                    <p class="title-small">I've worked on</p>
                </div>
                <!-- About me text -->
                <div class="flex flex-col gap-y-6">
                    <p class="para-text">
                        As I navigate this dynamic field, I embrace new
                        challenges and technologies, constantly seeking
                        innovative ways to elevate user experiences. This
                        section serves as a window into the world of my recent
                        web development endeavors. Each project here represents
                        a fusion of creativity, technical skill, and a
                        relentless pursuit of excellence.
                    </p>
                    <p class="para-text">
                        As you explore the projects, you'll see the diverse
                        range of work I've undertaken, from dynamic web apps to
                        static landing pages. Each project tells a unique story
                        of challenges met, problems solved, and innovation
                        realized.
                    </p>
                </div>
            </div>
            <!-- Projects list -->
            <div class="flex items-center gap-x-8 lg:pr-28 4xl:pr-40">
                <!-- Desktop View -->
                <ul
                    class="hidden lg:flex items-center gap-x-8 lg:pr-28 4xl:pr-40"
                >
                    <li
                        v-for="(project, i) in projects"
                        :key="i"
                        class="!w-[80vw] scale-90"
                        :class="i == projects.length - 1 && 'hidden'"
                    >
                        <a
                            :href="project.link"
                            target="_blank"
                            aria-label="Visit project site"
                            class="relative rounded-xl overflow-clip cursor-custom-pointer"
                        >
                            <p class="text-end text-3xl font-[600] mb-3">
                                {{ project.name }}
                            </p>
                            <nuxt-img
                                :src="project.thumbnailImage"
                                alt="project screenshot"
                                class="object-fill !h-full !w-full rounded-xl overflow-clip bg-white/5 aspect-video"
                                :srcset="`
                                    ${project.thumbnailImage}?format=webp&w=400 400w,
                                    ${project.thumbnailImage}?format=webp&w=800 800w,
                                    ${project.thumbnailImage}?format=webp&w=1200 1200w
                                `"
                                fit="cover"
                                loading="lazy"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </a>
                    </li>
                    <li class="!w-[80vw] scale-90">
                        <router-link
                            :to="projects[projects.length - 1].link"
                            class="relative rounded-xl overflow-clip cursor-custom-pointer"
                        >
                            <p class="text-end text-3xl font-[600] mb-3">
                                {{ projects[projects.length - 1].name }}
                            </p>
                            <img
                                :src="
                                    projects[projects.length - 1].thumbnailImage
                                "
                                alt="project screenshot"
                                :draggable="false"
                                class="object-fill !h-full !w-full rounded-xl overflow-clip bg-white/5 aspect-video"
                            />
                            <div
                                class="absolute top-0 left-0 z-20 w-full h-full flex flex-col items-center justify-center gap-y-8 from-black/0 to-black bg-gradient-to-r"
                                @click.stop="router.push('/projects/list')"
                            >
                                <p class="title-big">+12</p>
                                <button class="btn">See more projects</button>
                            </div>
                        </router-link>
                    </li>
                </ul>
                <!-- Mobile View -->
                <carousel
                    :settings="settings"
                    :breakpoints="breakpoints"
                    class="lg:hidden w-full mt-5 mb-16 md:mt-10 space-x-8"
                >
                    <slide
                        v-for="(project, i) in projects"
                        :key="i"
                        class="mx-4 px-0 md:px-3 xl:px-3 2xl:px-2 draggable"
                    >
                        <div
                            :href="project.link"
                            target="_blank"
                            class="w-[90%]"
                        >
                            <img
                                :src="project.thumbnailImage"
                                alt="project screenshot"
                                :draggable="false"
                                class="object-fill !rounded-xl"
                            />
                            <div
                                v-if="i == projects.length - 1"
                                class="absolute top-0 left-0 z-20 w-full h-full flex flex-col items-center justify-center gap-y-8 from-black/0 to-black bg-gradient-to-r"
                            >
                                <p class="text-3xl">+11</p>
                            </div>
                        </div>
                    </slide>
                </carousel>
            </div>
            <router-link
                to="/projects"
                class="lg:hidden w-full"
            >
                <button class="btn whitespace-nowrap !text-sm !px-2 mx-auto">
                    See more projects
                </button>
            </router-link>
        </div>
        <div class="lg:absolute bottom-0 left-0">
            <img
                src="@/assets/image/graphic-lines/landing-6.png"
                alt="graphic-lines-landing-6"
                :draggable="false"
                class="w-[100px] 2xl:w-[200px]"
            />
        </div>
    </div>
</template>

<style scoped></style>
