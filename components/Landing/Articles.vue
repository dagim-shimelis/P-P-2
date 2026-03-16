<script setup>
    import { Carousel, Slide } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";

    const carouselRef = ref(null);

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
            link: "https://medium.com/@dagimshimelis1992/d3eb7f678180",
        },
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
        // 1024: {
        //     itemsToShow: 2,
        //     snapAlign: "start",
        // },
        1024: {
            itemsToShow: 2.5,
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
    <div class="relative min-h-screen py-32">
        <div class="side-space relative z-10">
            <div class="flex flex-col items-center mb-24">
                <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">Writing</p>
                <h2 class="title-big">THE_THOUGHTS</h2>
            </div>
            
            <div class="w-full">
                <carousel
                    ref="carouselRef"
                    :breakpoints="breakpoints"
                    class="w-full"
                >
                    <slide
                        v-for="(article, i) in articles"
                        :key="i"
                        class="px-4"
                    >
                        <ArticleCard
                            :articleContent="article"
                            class="border border-green-400/20 bg-green-400/5 backdrop-blur-sm transition-all duration-500 hover:border-green-400"
                        ></ArticleCard>
                    </slide>
                </carousel>

                <div class="mt-12 flex justify-center items-center gap-6">
                    <button
                        @click="carouselRef?.prev()"
                        class="w-10 h-10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/10 hover:border-green-400 transition-all duration-300"
                        aria-label="Previous article"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <span class="text-[10px] font-mono text-green-400/50 uppercase tracking-[0.3em]">Navigate</span>
                    <button
                        @click="carouselRef?.next()"
                        class="w-10 h-10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/10 hover:border-green-400 transition-all duration-300"
                        aria-label="Next article"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>

            <div class="flex justify-center mt-20">
                <a
                    href="https://medium.com/@dagimshimelis1992"
                    target="_blank"
                    class="btn flex items-center gap-4"
                >
                    Read More on Medium <Icon name="mdi:medium" />
                </a>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
