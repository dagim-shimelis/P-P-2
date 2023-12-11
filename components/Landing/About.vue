<script setup>
    const tools = ref([
        {
            name: "Vue",
            link: "#",
            image: "/icons/tools/vue.svg",
        },
        {
            name: "Nuxt",
            link: "#",
            image: "/icons/tools/nuxt.svg",
        },
        {
            name: "React",
            link: "#",
            image: "/icons/tools/react.svg",
        },
        {
            name: "NodeJS",
            link: "#",
            image: "/icons/tools/nodejs.svg",
        },
        {
            name: "MongoDB",
            link: "#",
            image: "/icons/tools/mongodb.svg",
        },
        {
            name: "Typescript",
            link: "#",
            image: "/icons/tools/typescript.svg",
        },
        {
            name: "GraphQL",
            link: "#",
            image: "/icons/tools/graph-ql.svg",
        },
        {
            name: "Tailwind",
            link: "#",
            image: "/icons/tools/tailwind.svg",
        },
    ]);
</script>

<template>
    <div class="relative min-h-screen">
        <div
            class="side-space !z-10  mt-20 md:mt-0 pt-20 xs:pt-40 relative lg:grid grid-rows-2 md:grid-cols-2 md:grid-rows-1"
        >
            <!-- About Image -->
            <div class=" h-fit">
                <img
                    src="@/assets/image/about-image.png"
                    alt="Me"
                    class="w-[80%] md:w-[60%] lg:w-fit mx-auto"
                    :draggable="false"
                />
            </div>
            <!-- About Content -->
            <div class="flex flex-col gap-y-16 justify-center lg:justify-start mx-auto mt-32 lg:mt-0 w-fit">
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
                <div
                    class="flex flex-col gap-y-6 text-base font-[200] leading-8"
                >
                    <p>
                        I'm a professional and talented Product
                        Designer with front end & back end development skills. I
                        am passionate about leveraging my diverse backgrounds to
                        decipher challenging problems and create delightful
                        experiences.
                    </p>
                    <p>
                        I develop websites with HTML, CSS and JavaScript. I have
                        top skills in using design softwares like Figma, Adobe
                        XD, and PhotoShop. I also have expirience developing
                        full stack projects with MEVN (MongoDB, Express, VueJs,
                        & NodeJs).
                    </p>
                    <p>
                        I honed my skills on web development, technical writing,
                        and product design at Addis Ababa Science and Technology
                        University. Being a diligent, hardworking and result
                        oriented person, I always work towards achieving best
                        result on each project I lay my hands on.
                    </p>
                </div>
                <!-- Tools -->
                <div class="!space-y-4 -mt-6 md:mt-0">
                    <p class=" text-base tracking-wider">
                        Some of my favorite tools that I use
                    </p>
                    <ul class="flex items-center gap-x-4 sm:gap-x-6">
                        <li
                            v-for="(tool, i) in tools"
                            :key="i"
                            :title="tool.name"
                        >
                            <a :href="tool.link">
                                <img
                                    :src="tool.image"
                                    :alt="tool.name"
                                    class="w-[20px] sm:w-full"
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

<style scoped></style>
