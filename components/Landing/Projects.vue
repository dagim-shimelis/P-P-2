<script setup></script>

<template>
    <div class="relative h-screen">
        <div class="px-44 overflow-x-auto pt-24 relative flex gap-x-28 z-10">
            <!-- Projects Content -->
            <div
                class="w-[1200px] flex flex-col gap-y-16 justify-start mx-auto"
            >
                <!-- Title -->
                <div class="title-box">
                    <p class="title-small">Some of the</p>
                    <div>
                        <h1 class="title-big">projects</h1>
                        <img
                            src="@/assets/image/graphic-lines/underline.svg"
                            alt="title-underline"
                            class="w-full"
                        />
                    </div>
                    <p class="title-small">I've worked on</p>
                </div>
                <!-- About me text -->
                <div
                    class="flex flex-col gap-y-6 text-base font-[200] leading-8"
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
            <div class="flex items-center gap-x-8 mt-32">
                <div
                    v-for="i in 4"
                    :key="i"
                    class="!h-[494px] !w-[900px] rounded-xl overflow-clip"
                >
                    <img
                        src="/images/project-1.jpg"
                        alt="project screenshot"
                        :draggable="false"
                        class="object-fill w-full"
                    />
                </div>
            </div>
        </div>
        <!-- Swipe direction -->
        <div class="flex items-end mt-8 mr-8 w-fit ml-auto">
            <p class="text-lg font-[200] tracking-wider">Swipe this way</p>
            <img
                src="@/assets/image/graphic-lines/landing-5.png"
                alt="graphic-lines-landing-5"
            />
        </div>
        <!-- Companies list -->
        <div class="side-space !space-y-4 mt-10 !pl-20">
            <p class="text-base tracking-wider">Made projects with</p>
            <img
                src="@/assets/image/product-companies.png"
                alt=""
            />
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute -top-40 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-4.png"
                alt="graphic-lines-landing-4"
                :draggable="false"
            />
        </div>
        <div class="absolute -bottom-16 left-0">
            <img
                src="@/assets/image/graphic-lines/landing-6.png"
                alt="graphic-lines-landing-6"
                :draggable="false"
            />
        </div>
    </div>
</template>

<style scoped></style>
