<script setup>
    import projects from "@/data/projects-list.json";
</script>

<template>
    <div class="relative min-h-screen pt-24 !pb-[300px]">
        <div class="side-space">
            <div class="title-box w-fit lg:!mx-auto">
                <p class="font-[200]">Some of the</p>
                <div>
                    <h1 class="title-big">projects</h1>
                    <img
                        src="@/assets/image/graphic-lines/underline.svg"
                        alt="title-underline"
                        class="title-underline mx-auto"
                    />
                </div>
                <p class="font-[200]">I've worked on</p>
            </div>
            <p
                class="mt-10 text-left lg:text-center mx-auto lg:w-[800px] font-[200] leading-8"
            >
                As you explore the projects, you'll see the diverse range of
                work I've undertaken, from dynamic web apps to static landing
                pages. Each project tells a unique story of challenges met,
                problems solved, and innovation realized.
            </p>
            <div class="mt-20 grid md:grid-cols-2 gap-14 md:gap-y-28">
                <router-link
                    v-for="(project, i) in projects"
                    :key="i"
                    :to="project.link"
                    class="cursor-custom-pointer border border-white/5 md:border-transparent hover:border-white/5 h-full p-2 pb-6 rounded-[20px]"
                >
                    <img
                        :src="project.thumbnailImage"
                        alt="project screenshot"
                        :draggable="false"
                        class="object-fill !w-full rounded-xl overflow-clip aspect-video bg-white/5"
                    />
                    <p class="ml-4 text-2xl mt-6 font-[200]">
                        {{ project.name }}
                    </p>
                    <p class="ml-4 font-[200] opacity-60">
                        {{ project.cardDescription }}
                    </p>
                </router-link>
            </div>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute bottom-0 left-0 z-10">
            <img
                src="@/assets/image/graphic-lines/landing-8.png"
                alt="graphic-lines-landing-8"
                :draggable="false"
                class="w-[100px] xl:w-[200px]"
            />
        </div>
    </div>
</template>

<style scoped></style>
