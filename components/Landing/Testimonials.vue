<script setup>
    import { Carousel, Slide, Pagination } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";
    import testimonials from "@/data/testimonials.json";

    // carousel settings
    const settings = ref({
        itemsToShow: 1,
        snapAlign: "center",
        wrapAround: "true",
        // autoplay: "4000",
    });
</script>

<template>
    <div class="relative min-h-screen my-14">
        <div class="side-space pt-10">
            <!-- Testimonial Content -->
            <div class="flex flex-col gap-y-5 justify-start mx-auto">
                <div class="flex items-center justify-between">
                    <!-- Title -->
                    <div class="title-box">
                        <div>
                            <h1 class="title-big">testimonials</h1>
                            <img
                                src="@/assets/image/graphic-lines/underline-big.svg"
                                alt="title-underline"
                                class="title-underline"
                            />
                        </div>
                        <p class="title-small">From Clients & Colleagues</p>
                    </div>
                </div>
                <!-- Article List -->
                <div class="w-full">
                    <carousel
                        :settings="settings"
                        class="w-full mt-5 md:mt-24 mb-auto"
                    >
                        <slide
                            v-for="(testimonial, i) in testimonials"
                            :key="i"
                            class="py-32 px-16 xl:px-3 draggable mx-10 md:mx-0"
                        >
                            <div
                                class="w-[800px] flex flex-col justify-center items-center gap-y-32 lg:gap-y-40"
                            >
                                <div class="relative">
                                    <!-- route graphics -->
                                    <div
                                        class="absolute -top-16 lg:-top-24 -left-10"
                                    >
                                        <img
                                            src="@/assets/image/graphic-lines/quotes-1.png"
                                            alt="graphic-lines-quotes-1"
                                            :draggable="false"
                                            class="w-[70px] 3xl:w-full"
                                        />
                                    </div>
                                    <div
                                        class="absolute -bottom-16 lg:-bottom-24 -right-10"
                                    >
                                        <img
                                            src="@/assets/image/graphic-lines/quotes-2.png"
                                            alt="graphic-lines-quotes-2"
                                            :draggable="false"
                                            class="w-[70px] 3xl:w-full"
                                        />
                                    </div>
                                    <p
                                        class="text-center text-sm lg:text-base font-[200] leading-8 tracking-wider"
                                    >
                                        {{ testimonials[0].testimony }}
                                    </p>
                                </div>
                                <div class="flex items-center gap-x-4">
                                    <img
                                        :src="testimonials[0].image"
                                        alt=""
                                        class="w-[50px] h-[50px] lg:!w-[80px] lg:h-[80px] rounded-full border border-white"
                                    />
                                    <div class="text-left">
                                        <p
                                            class="font-[600] text-base lg:text-lg"
                                        >
                                            {{ testimonials[0].name }}
                                        </p>
                                        <p
                                            class="text-sm lg:text-base font-[200]"
                                        >
                                            {{ testimonials[0].title }}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </slide>
                        <template #addons> <pagination /> </template
                    ></carousel>
                </div>
            </div>
        </div>
        <!-- <div
            class="side-space h-24 mt-24 flex items-center overflow-x-hidden z-10"
        >
            <Common-Companies />
        </div> -->

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="hidden lg:inline absolute top-0 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-4.png"
                alt="graphic-lines-landing-4"
                :draggable="false"
                class="w-[100px] xl:w-[200px] 3xl:w-full"
            />
        </div>
    </div>
</template>

<style scoped></style>
