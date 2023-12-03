<script setup></script>

<template>
    <div class="relative">
        <div class="side-space mt-20">
            <div
                class="hero grid grid-rows-2 md:grid-cols-2 md:grid-rows-1"
                id="hero"
            >
                <!-- Hero Image -->
                <div
                    class="row-span-1 row-start-2 row-end-2 md:row-start-auto md:row-end-auto md:-mt-[18vh] !z-0"
                >
                    <div class="relative overflow-y-visible">
                        <img
                            class="relative left-0 top-0"
                            src="@/assets/image/mac-box.jpg"
                            alt="mac-pc"
                            width="100%"
                            height="100%"
                            :draggable="false"
                        />
                        <img
                            class="absolute left-0 top-0 ease-in-out duration-1000 overflow-hidden cutout1"
                            src="@/assets/image/binary-cutout.png"
                            alt="mac-pc-screen"
                            width="100%"
                            height="100%"
                            :draggable="false"
                        />
                        <img
                            class="absolute left-0 top-0 ease-in-out duration-1000 overflow-hidden cutout2"
                            src="@/assets/image/code-cutout.png"
                            alt="mac-pc-screen"
                            width="100%"
                            height="100%"
                            :draggable="false"
                        />
                        <img
                            class="absolute left-0 top-0 ease-in-out duration-1000 overflow-hidden cutout3"
                            src="@/assets/image/project-cutout.png"
                            alt="mac-pc-screen"
                            width="100%"
                            height="100%"
                            :draggable="false"
                        />
                    </div>
                </div>
                <!-- Hero Content -->
                <div class="flex flex-col gap-y-6 justify-center mx-auto">
                    <p class="text-base font-[300] tracking-widest">
                        <span class="grayscale">👋</span> Hi there, I'm
                    </p>
                    <img
                        src="@/assets/image/dagim-shimelis.svg"
                        alt="name"
                        class="w-[550px]"
                        :draggable="false"
                    />
                    <p class="text-base font-[200] tracking-wider w-[500px]">
                        From eye-catching designs to seamless functionality,
                        I've got you covered. With expertise in web design,
                        frontend development, and backend development, I'll
                        bring your digital dreams to life. Let's build something
                        great together!
                    </p>
                    <div class="group relative">
                        <router-link
                            to="#contact"
                            class="btn-small mt-8"
                            >Let's Talk</router-link
                        >
                        <img
                            src="@/assets/image/graphic-lines/landing-2.png"
                            alt="graphic-lines-landing-2"
                            class="absolute -bottom-[150px] right-20 group-hover:-translate-x-4 group-hover:-translate-y-4 ease-in-out duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
