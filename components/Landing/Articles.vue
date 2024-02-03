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
        // {
        //     image: "/images/articles/sleep.png",
        //     date: "30 Oct 2023",
        //     title: "To sleep or not to sleep, that is the question",
        //     subTitle: "The importance of sleep explained ",
        //     link: "#",
        // },
    ]);

    // breakpoints are mobile first
    // any settings not specified will fallback to the carousel settings
    const breakpoints = ref({
        // 1024 and up
        780: {
            itemsToShow: 1,
            snapAlign: "start",
        },
        924: {
            itemsToShow: 1.5,
            snapAlign: "start",
        },
        1024: {
            itemsToShow: 2,
            snapAlign: "start",
        },
        // 1024: {
        //     itemsToShow: 2.5,
        //     snapAlign: "start",
        // },
        // // 1536 and up
        // 1359: {
        //     itemsToShow: 3,
        //     snapAlign: "start",
        // },
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
                                class="title-underline"
                            />
                        </div>
                        <p class="title-small">I've Written</p>
                    </div>
                    <!-- Read All CTO -->
                    <a
                        href="https://medium.com/@dagimshimelis1992"
                        target="_blank"
                        class="hidden md:block relative space-y-1 group w-fit cursor-custom-pointer"
                    >
                        <span class="text-xs md:text-base tracking-wider"
                            >See All Article</span
                        >
                        <img
                            src="@/assets/image/graphic-lines/arrow-2.png"
                            alt="arrow"
                            class="absolute -top-1 -left-5 md:-left-10 md:group-hover:translate-x-4 md:group-hover:-translate-y-2 ease-in-out duration-300"
                        />
                    </a>
                </div>
                <!-- Article List -->
                <div class="w-full md:mt-10">
                    <carousel
                        :breakpoints="breakpoints"
                        class="w-full mt-5 md:mt-10 mb-auto"
                    >
                        <slide
                            v-for="(article, i) in articles"
                            :key="i"
                            class="!mb-8 px-6 md:px-3 draggable"
                        >
                            <ArticleCard
                                :articleContent="article"
                            ></ArticleCard>
                        </slide>
                        <template #addons> <pagination /> </template>
                    </carousel>
                </div>

                <a
                    href="https://medium.com/@dagimshimelis1992"
                    target="_blank"
                    class="md:hidden relative ml-12 my-12 block space-y-1 group w-fit cursor-custom-pointer"
                >
                    <span class="text-base tracking-wider"
                        >See All Article</span
                    >
                    <img
                        src="@/assets/image/graphic-lines/arrow-2.png"
                        alt="arrow"
                        class="absolute -top-1 -left-10 md:group-hover:translate-x-4 md:group-hover:-translate-y-2 ease-in-out duration-300"
                    />
                </a>
            </div>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute bottom-4 md:-bottom-32 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-7.png"
                alt="graphic-lines-landing-7"
                :draggable="false"
                class="w-[200px] xl:w-[200px] 3xl:w-full"
            />
        </div>
    </div>
</template>

<style scoped></style>
