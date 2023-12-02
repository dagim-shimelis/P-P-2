<script setup>
    import { Carousel, Slide, Pagination } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";

    const articles = ref([
        {
            image: "/images/articles/dos-and-donts.png",
            date: "15 Apr 2023",
            title: "Dos and Don'ts for a Junior Developer",
            subTitle: "Tips and lessons from a fellow junior web developer",
            link: "https://medium.com/@dagimshimelis1992/dos-and-donts-for-a-junior-developer-b74ff9830f89",
        },
        {
            image: "/images/articles/focus.png",
            date: "20 Oct 2023",
            title: "Mastering the Art of Laser-Focused Productivity",
            subTitle:
                "A  Comprehensive Guide to Staying Laser-Focused in a World of Distractions",
            link: "https://medium.com/@dagimshimelis1992/mastering-the-art-of-laser-focused-productivity-65123baa340e",
        },
        {
            image: "/images/articles/sleep.png",
            date: "30 Oct 2023",
            title: "To sleep or not to sleep, that is the question",
            subTitle: "The importance of sleep explained ",
            link: "#",
        },
    ]);

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
        <div class="side-space pt-10">
            <!-- About Content -->
            <div class="flex flex-col gap-y-5 justify-start mx-auto">
                <div class="flex items-center justify-between">
                    <!-- Title -->
                    <div class="title-box">
                        <div>
                            <h1 class="title-big">articles</h1>
                            <img
                                src="@/assets/image/graphic-lines/underline.svg"
                                alt="title-underline"
                                class="w-full"
                            />
                        </div>
                    </div>
                    <!-- Read All CTO -->
                    <a
                        href="https://medium.com/@dagimshimelis1992"
                        target="_blank"
                        class="relative block space-y-1 group w-fit"
                    >
                        <span class="tracking-wider">See All Article</span>
                        <img
                            src="@/assets/image/graphic-lines/arrow-2.png"
                            alt="arrow"
                            class="absolute -top-1 -left-10 group-hover:translate-x-4 group-hover:-translate-y-2 ease-in-out duration-300"
                        />
                    </a>
                </div>
                <!-- Article List -->
                <div class="w-full">
                    <carousel
                        :settings="settings"
                        :breakpoints="breakpoints"
                        class="w-full mt-5 md:mt-10"
                    >
                        <slide
                            v-for="(article, i) in articles"
                            :key="i"
                            class="px-0 md:px-3 xl:px-3 2xl:px-2 draggable"
                        >
                            <ArticleCard
                                :articleContent="article"
                            ></ArticleCard> </slide
                    ></carousel>
                </div>
            </div>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute -bottom-32 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-7.png"
                alt="graphic-lines-landing-7"
                :draggable="false"
            />
        </div>
    </div>
</template>

<style scoped></style>
