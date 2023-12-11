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
    <div class="relative min-h-screen">
        <div
            class="px-4 lg:px-44 lg:overflow-x-auto pt-24 relative lg:flex gap-x-28 z-10"
        >
            <!-- Projects Content -->
            <div
                class="lg:w-[1200px] flex flex-col gap-y-16 justify-start mx-auto"
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
                <div
                    class="flex flex-col gap-y-6 text-base font-[200] leading-8 tracking-wider"
                >
                    <p>
                        Over the past two years, I've embarked on an exciting
                        journey as a frontend web developer, crafting digital
                        experiences that marry form and function. This section
                        serves as a window into the world of my recent web
                        development endeavors. Each project here represents a
                        fusion of creativity, technical skill, and a relentless
                        pursuit of excellence
                    </p>
                    <p>
                        As you explore the projects listed below, you'll see the
                        diverse range of work I've undertaken, from dynamic web
                        apps. Each project tells a unique story of challenges
                        met, problems solved, and innovation realized.
                    </p>
                    <p>
                        I honed my skills on web development, technical writing,
                        and product design at Addis Ababa Science and Technology
                        University. Being a diligent, hardworking and result
                        oriented person, I always work towards achieving best
                        result on each project I lay my hands on.
                    </p>
                </div>
            </div>
            <!-- Projects list -->
            <div class="flex items-center gap-x-8 mt-20 md:mt-0">
                <!-- Desktop View -->
                <div
                    v-for="i in 4"
                    :key="i"
                    class="hidden lg:inline !h-[494px] !w-[900px] rounded-xl overflow-clip"
                >
                    <img
                        src="/images/project-1.jpg"
                        alt="project screenshot"
                        :draggable="false"
                        class="object-fill w-full"
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
                        class=" mx-4 px-0 md:px-3 xl:px-3 2xl:px-2 draggable"
                    >
                        <img
                            src="/images/project-1.jpg"
                            alt="project screenshot"
                            :draggable="false"
                            class="object-fill w-[90%] !rounded-xl "
                        /> </slide
                ></carousel>
            </div>
        </div>
        <!-- Swipe direction -->
        <div class="hidden md:flex items-end mt-8 mr-8 w-fit ml-auto">
            <p class="text-lg font-[200] tracking-wider">Swipe this way</p>
            <img
                src="@/assets/image/graphic-lines/landing-5.png"
                alt="graphic-lines-landing-5"
            />
        </div>
        <!-- Companies list -->
        <div class="side-space !space-y-4 mt-10 lg:!pl-20">
            <p class="text-base tracking-wider">Made projects with</p>
            <img
                src="@/assets/image/product-companies.png"
                alt=""
            />
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute top-0 lg:-top-40 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-4.png"
                alt="graphic-lines-landing-4"
                :draggable="false"
                class="w-[100px] xl:w-[200px] 3xl:w-full"
            />
        </div>
        <div class="lg:absolute -bottom-16 left-0">
            <img
                src="@/assets/image/graphic-lines/landing-6.png"
                alt="graphic-lines-landing-6"
                :draggable="false"
                class="w-[100px] xl:w-[200px] 3xl:w-full"
            />
        </div>
    </div>
</template>

<style scoped></style>
