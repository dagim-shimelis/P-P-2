<script setup>
    import { Carousel, Slide, Pagination } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";

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
</script>

<template>
    <div
        id="projectsWrapper"
        class="relative overflow-x-clip"
    >
        <div
            id="projectsList"
            class="min-h-screen px-4 lg:px-44 relative lg:flex gap-x-28 z-10"
        >
            <!-- Projects Content -->
            <div
                class="lg:w-[1200px] flex flex-col gap-y-16 justify-start m-auto"
            >
                <!-- Title -->
                <div class="title-box">
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
            <div class="flex items-center gap-x-8 pr-20">
                <!-- Desktop View -->
                <div
                    v-for="i in 3"
                    :key="i"
                    class="hidden lg:inline !h-[80vh] !w-[80vw] rounded-xl overflow-clip"
                >
                    <router-link
                        to="#"
                        class="flex items-center justify-end mb-4 cursor-custom-pointer"
                    >
                        <p class="text-end text-3xl font-[600]">
                            HahuJobs Primary
                        </p>
                    </router-link>

                    <img
                        :src="`/images/projects/${i}.png`"
                        alt="project screenshot"
                        :draggable="false"
                        class="object-fill !h-full !w-full rounded-xl overflow-clip cursor-custom-pointer"
                    />
                </div>
                <!-- Mobile View -->
                <carousel
                    :settings="settings"
                    :breakpoints="breakpoints"
                    class="lg:hidden w-full mt-5 md:mt-10 space-x-8"
                >
                    <slide
                        v-for="i in 4"
                        :key="i"
                        class="mx-4 px-0 md:px-3 xl:px-3 2xl:px-2 draggable"
                    >
                        <img
                            src="/images/project-1.jpg"
                            alt="project screenshot"
                            :draggable="false"
                            class="object-fill w-[90%] !rounded-xl"
                        /> </slide
                ></carousel>
            </div>
        </div>
        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <!-- <div class="absolute top-0 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-4.png"
                alt="graphic-lines-landing-4"
                :draggable="false"
                class="w-[100px] xl:w-[200px] 3xl:w-full"
            />
        </div> -->
        <div class="lg:absolute bottom-0 left-0">
            <img
                src="@/assets/image/graphic-lines/landing-6.png"
                alt="graphic-lines-landing-6"
                :draggable="false"
                class="w-[100px] xl:w-[200px]"
            />
        </div>
    </div>
</template>

<style scoped></style>
