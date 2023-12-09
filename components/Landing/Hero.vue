<script setup></script>

<template>
    <div class="relative">
        <div class="side-space mt-10 lg:mt-16 3xl:mt-8 4xl:mt-20 mb-32 xs:mb-0">
            <div
                class="hero xs:h-screen grid  lg:grid-cols-2 gap-x-10"
                id="hero"
            >
                <!-- Hero Image -->
                <div
                    class="hidden lg:inline row-span-1 row-start-2 row-end-2 md:row-start-auto md:row-end-auto 2xl:-mt-[18vh] !z-0"
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
                <div class="flex flex-col gap-y-8 xl:gap-y-12 justify-start mt-20 3xl:mt-28 lg:mx-auto">
                    <p class="text-base font-[300] tracking-widest">
                        <span class="grayscale">👋</span> Hi there, I'm
                    </p>
                    <img
                        src="@/assets/image/dagim-shimelis.svg"
                        alt="name"
                        class="w-full sm:w-[80%] lg:w-[400px] xl:w-[550px]"
                        :draggable="false"
                    />
                    <p class="text-base font-[200] tracking-wider w-full sm:w-[440px] xl:w-[500px]">
                        From eye-catching designs to seamless functionality,
                        I've got you covered. With expertise in web design,
                        frontend development, and backend development, I'll
                        bring your digital dreams to life. Let's build something
                        great together!
                    </p>
                    <div class="group relative">
                        <router-link
                            to="#contact"
                            class="btn-small !text-center !w-full xs:!w-fit mt-4 xl:mt-8"
                            >Let's Talk</router-link
                        >
                        <img
                            src="@/assets/image/graphic-lines/landing-2.png"
                            alt="graphic-lines-landing-2"
                            class="hidden lg:inline absolute -bottom-[150px] left-60 group-hover:-translate-x-4 group-hover:-translate-y-4 ease-in-out duration-300"
                        />
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
