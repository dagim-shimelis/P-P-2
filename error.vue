<script setup>
    const props = defineProps({
        error: Object,
    });
</script>

<template>
    <div
        class="relative flex flex-col items-center justify-center gap-y-6 text-center min-h-screen bg-black text-white font-poppins overflow-y-hidden w-screen center-content cursor-custom"
    >
        <h2
            class="uppercase font-[600] text-8xl"
        >
            {{ error.statusCode }}
        </h2>
        <!-- Lost Description -->
        <p v-if="error?.statusCode === 404">
            Oops! Looks like you've wandered into the unknown. <br />
            Click here to find your way back.
        </p>
        <!-- Problem Description -->
        <p v-else>
            Uh-oh! Looks like something is wrong. <br />
            Click here to find your way back.
        </p>
        <router-link to="/">
            <button
                @click="handleError"
                class="btn mt-10"
            >
                Go Home
            </button>
        </router-link>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->

        <div class="absolute -top-9 left-0">
            <img
                src="@/assets/image/graphic-lines/landing-7.png"
                alt="graphic-lines-landing-7"
                :draggable="false"
                class="w-[200px] xl:w-[200px] 3xl:w-full -scale-x-100 -scale-y-100"
            />
        </div>
        <!-- <div class="absolute -top-9 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-7.png"
                alt="graphic-lines-landing-7"
                :draggable="false"
                class="w-[200px] xl:w-[200px] 3xl:w-full -scale-y-100"
            />
        </div> -->
        <div class="absolute bottom-0 right-0 z-10">
            <img
                src="@/assets/image/graphic-lines/landing-8.png"
                alt="graphic-lines-landing-8"
                :draggable="false"
                class="w-[100px] xl:w-[200px] 3xl:w-full -scale-x-100"
            />
        </div>
        <!-- <div class="absolute bottom-0 left-0 z-10">
            <img
                src="@/assets/image/graphic-lines/landing-8.png"
                alt="graphic-lines-landing-8"
                :draggable="false"
                class="w-[100px] xl:w-[200px] 3xl:w-full"
            />
        </div> -->
    </div>
</template>
