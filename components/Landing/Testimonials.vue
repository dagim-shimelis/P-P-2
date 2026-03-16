<script setup>
    import { Carousel, Slide } from "vue3-carousel";
    import "vue3-carousel/dist/carousel.css";
    import testimonials from "@/data/testimonials.json";

    const carouselRef = ref(null);

    // carousel settings
    const settings = ref({
        itemsToShow: 1,
        snapAlign: "center",
        wrapAround: "true",
        // autoplay: "4000",
    });
</script>

<template>
    <div class="relative min-h-screen py-32 flex flex-col items-center justify-center">
        <div class="side-space relative z-10 w-full">
            <div class="flex flex-col items-center mb-24">
                <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">Peer_Validation</p>
                <h2 class="title-big">THE_FEEDBACK</h2>
            </div>
            
            <div class="max-w-4xl mx-auto">
                <carousel
                    ref="carouselRef"
                    :settings="settings"
                    class="w-full"
                >
                    <slide
                        v-for="(testimonial, i) in testimonials"
                        :key="i"
                        class="px-4"
                    >
                        <div class="flex flex-col items-center text-center gap-12 p-12 border border-green-400/10 bg-green-400/5 backdrop-blur-sm relative">
                            <div class="absolute top-0 left-0 w-2 h-2 border-t border-l border-green-400"></div>
                            <div class="absolute top-0 right-0 w-2 h-2 border-t border-r border-green-400"></div>
                            <div class="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-green-400"></div>
                            <div class="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-green-400"></div>

                            <p class="text-xl md:text-2xl font-[300] leading-relaxed italic text-green-50/90">
                                "{{ testimonial.testimony }}"
                            </p>

                            <div class="flex flex-col items-center">
                                <a :href="testimonial.linkedin_link" target="_blank" class="group">
                                    <p class="text-green-400 font-[700] uppercase tracking-widest mb-1 group-hover:underline">
                                        {{ testimonial.name }}
                                    </p>
                                    <p class="text-[10px] font-mono text-green-400/50 uppercase tracking-[0.2em]">
                                        {{ testimonial.title }}
                                    </p>
                                </a>
                            </div>
                        </div>
                    </slide>
                </carousel>

                <div class="mt-12 flex justify-center items-center gap-6">
                    <button
                        @click="carouselRef?.prev()"
                        class="w-10 h-10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/10 hover:border-green-400 transition-all duration-300"
                        aria-label="Previous testimonial"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M15 18l-6-6 6-6" />
                        </svg>
                    </button>
                    <span class="text-[10px] font-mono text-green-400/50 uppercase tracking-[0.3em]">Navigate</span>
                    <button
                        @click="carouselRef?.next()"
                        class="w-10 h-10 border border-green-400/30 flex items-center justify-center text-green-400 hover:bg-green-400/10 hover:border-green-400 transition-all duration-300"
                        aria-label="Next testimonial"
                    >
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 18l6-6-6-6" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
