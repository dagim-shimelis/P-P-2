<script setup>
    const projects = ref([
        {
            name: "HahuJobs Primary",
            link: "/projects/hahujobs-primary",
            thumbnailImage: "/images/projects/1.png",
            cardDescription: "Job market provider for job seekers",
        },
        {
            name: "Kena",
            link: "/projects/hahujobs-primary",
            thumbnailImage: "/images/projects/2.png",
            cardDescription: "Youth support organization",
        },
        {
            name: "Awaqi Centers",
            link: "/projects/hahujobs-primary",
            thumbnailImage: "/images/projects/3.png",
            cardDescription: "Information site for Awaqi Centers",
        },
        {
            name: "Sheger Gebeta",
            link: "/projects/hahujobs-primary",
            thumbnailImage: "/images/projects/4.png",
            cardDescription: "Site for foodies and chefs",
        },
    ]);
</script>

<template>
    <div class="relative min-h-screen pt-24 !pb-[300px]">
        <div class="side-space">
            <div class="title-box w-fit !mx-auto">
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
            <p class="mt-10 text-center mx-auto w-[800px] font-[200] leading-8">
                As you explore the projects, you'll see the diverse range of
                work I've undertaken, from dynamic web apps to static landing
                pages. Each project tells a unique story of challenges met,
                problems solved, and innovation realized.
            </p>
            <div class="mt-20 grid grid-cols-2 gap-x-14 gap-y-28">
                <router-link
                    v-for="(project, i) in projects"
                    :key="i"
                    :to="project.link"
                    class="cursor-custom-pointer border border-transparent hover:border-white/5 h-full p-2 pb-6 rounded-[20px]"
                >
                    <img
                        :src="project.thumbnailImage"
                        alt="project screenshot"
                        :draggable="false"
                        class="object-fill !w-full rounded-xl overflow-clip aspect-video"
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
