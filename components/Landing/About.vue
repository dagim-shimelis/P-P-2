<script setup>
    const tools = ref([
        {
            name: "Vue",
            icon: "mdi:vuejs",
            originalIcon: "vscode-icons:file-type-vue",
            link: "https://vuejs.org/",
        },
        {
            name: "Nuxt",
            icon: "simple-icons:nuxtdotjs",
            originalIcon: "logos:nuxt-icon",
            link: "https://nuxt.com/",
        },
        {
            name: "React",
            icon: "simple-icons:react",
            originalIcon: "logos:react",
            link: "https://legacy.reactjs.org/",
        },
        {
            name: "NodeJS",
            icon: "fontisto:nodejs",
            originalIcon: "logos:nodejs-icon",
            link: "https://nodejs.org/en",
        },
        {
            name: "MongoDB",
            icon: "devicon-plain:mongodb-wordmark",
            originalIcon: "devicon:mongodb-wordmark",
            link: "https://www.mongodb.com/",
        },
        {
            name: "Typescript",
            icon: "cib:typescript",
            originalIcon: "devicon:typescript",
            link: "https://www.typescriptlang.org/",
        },
        {
            name: "GraphQL",
            icon: "simple-icons:graphql",
            originalIcon: "logos:graphql",
            link: "https://graphql.org/",
        },
        {
            name: "Tailwind",
            icon: "file-icons:tailwind",
            originalIcon: "devicon:tailwindcss",
            link: "https://tailwindcss.com/",
        },
        {
            name: "GSAP",
            icon: "simple-icons:greensock",
            originalIcon: "logos:greensock-icon",
            link: "https://gsap.com/",
        },
    ]);
</script>

<template>
    <div class="relative min-h-screen pb-32 xl:pb-0">
        <div
            class="side-space !z-10 mt-20 md:mt-0 pt-20 xs:pt-40 relative lg:grid grid-rows-2 md:grid-cols-2 md:grid-rows-1"
        >
            <!-- About Image -->
            <div class="h-fit">
                <img
                    src="@/assets/image/about-image.png"
                    alt="Me"
                    class="w-[80%] md:w-[60%] lg:w-fit mx-auto"
                    :draggable="false"
                />
            </div>
            <!-- About Content -->
            <div
                class="flex flex-col gap-y-16 justify-center lg:justify-start mx-auto mt-32 lg:mt-0 w-fit"
            >
                <!-- Title -->
                <div class="title-box">
                    <p class="title-small">A few things</p>
                    <div>
                        <h1 class="title-big">about</h1>
                        <img
                            src="@/assets/image/graphic-lines/underline.svg"
                            alt="title-underline"
                            class="title-underline"
                        />
                    </div>
                    <p class="title-small">me</p>
                </div>
                <!-- About me text -->
                <div class="flex flex-col gap-y-6">
                    <p class="para-text">
                        With a passion for web development that spans over two
                        years, I specialize in both front-end and back-end work,
                        although my heart lies in crafting immersive and
                        visually captivating front-end experiences. I am
                        dedicated to merging aesthetics with functionality,
                        creating digital landscapes that not only look stunning
                        but also perform seamlessly.
                    </p>
                    <p class="para-text">
                        My approach to web development is driven by a meticulous
                        attention to detail, ensuring that every pixel and line
                        of code contributes meaningfully to the overall user
                        experience. I thrive on challenges and am task-oriented,
                        consistently striving for excellence in every project I
                        undertake.
                    </p>
                    <p class="para-text">
                        Throughout the past 2 years I've honed my skills to
                        blend creativity and technical expertise. Whether it's
                        designing sleek user interfaces or architecting robust
                        backend systems, I am committed to delivering solutions
                        that exceed expectations.
                    </p>
                </div>
                <!-- Tools -->
                <div class="!space-y-4 -mt-6 md:mt-0">
                    <p class="text-base tracking-wider">
                        Some of my favorite tools that I use
                    </p>
                    <ul class="flex items-center gap-x-4 sm:gap-x-6">
                        <li
                            v-for="(tool, i) in tools"
                            :key="i"
                            :title="tool.name"
                        >
                            <a
                                :href="tool.link"
                                target="_blank"
                                class="hover:cursor-custom-pointer group"
                            >
                                <Icon
                                    :name="tool.icon"
                                    class="group-hover:hidden tool-icons"
                                />
                                <Icon
                                    :name="tool.originalIcon"
                                    class="!hidden group-hover:!inline group-hover:scale-125 tool-icons"
                                />
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute top-[208px] w-full">
            <img
                src="@/assets/image/git-grid.png"
                alt="git-grid"
                :draggable="false"
            />
        </div>
        <div class="absolute top-0 lg:-top-20 left-0">
            <img
                src="@/assets/image/graphic-lines/landing-3.png"
                alt="graphic-lines-landing-3"
                :draggable="false"
                class="w-[200px] md:w-[400px] lg:w-full"
            />
        </div>
    </div>
</template>

<style scoped>
    .tool-icons {
        @apply w-[24px] sm:w-[25px] sm:h-[25px];
    }
</style>
