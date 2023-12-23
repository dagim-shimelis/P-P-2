<script setup>
    const projects = ref([
        {
            name: "HaHuJobs Primary",
            link: "#",
            thumbnailImage: "/images/projects/1.png",
            cardDescription: "Job market provider for job seekers",
        },
        {
            name: "Kena",
            link: "#",
            thumbnailImage: "/images/projects/2.png",
            cardDescription: "Youth support organization",
        },
        {
            name: "Awaqi Centers",
            link: "#",
            thumbnailImage: "/images/projects/3.png",
            cardDescription: "Information site for Awaqi Centers",
        },
        {
            name: "Sheger Gebeta",
            link: "#",
            thumbnailImage: "/images/projects/4.png",
            cardDescription: "Site for foodies and chefs",
        },
        {
            name: "Abstract Technologies",
            link: "#",
            thumbnailImage: "/images/projects/5.png",
            cardDescription: "Not my site but I wish it was",
        },
    ]);
</script>

<template>
    <div class="relative min-h-screen pt-24 !pb-40">
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
            <p class="mt-10 text-center mx-auto w-[900px] font-[200]">
                Welcome to my web of wonders! Brace yourself for a digital
                journey through my coding chronicles - where pixels meet
                perfection and bugs fear to tread!
            </p>
            <div class="mt-20 grid grid-cols-2 gap-x-14 gap-y-28">
                <router-link
                    v-for="(project, i) in projects"
                    :key="i"
                    :to="project.link"
                    class="cursor-custom-pointer border border-transparent hover:border-white/5 h-full p-2 pb-6 rounded-2xl"
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
    </div>
</template>

<style scoped></style>
