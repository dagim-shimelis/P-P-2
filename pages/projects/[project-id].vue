<script setup>
    const projectSections = ref([
        {
            image: "/images/projects/hahujobs-primary/filtered.png",
            description:
                "Advanced filters to help users accurately search for jobs that fit their needs.",
        },
        {
            image: "/images/projects/hahujobs-primary/tour-guide.png",
            description:
                "A tour guide to help new users navigate the site and use everything it has to offer",
        },
        {
            image: "/images/projects/hahujobs-primary/for-you.png",
            description:
                "A list of recommended jobs that match the users profile",
        },
    ]);
    const mobileProjectImages = ref([
        "/images/projects/hahujobs-primary/m-landing.png",
        "/images/projects/hahujobs-primary/m-profile.png",
        "/images/projects/hahujobs-primary/m-calendar.png",
    ]);
</script>

<template>
    <div class="relative min-h-screen pt-14 !pb-[300px]">
        <div class="side-space">
            <!-- navigator -->
            <div class="flex items-end justify-between">
                <!-- Prev -->
                <router-link
                    to="#"
                    class="space-y-2 cursor-custom-pointer w-[300px]"
                >
                    <div class="flex items-center text-white/30">
                        <Icon
                            name="uil-arrow-left"
                            class="tiny-icon"
                        />
                        <p class="font-[200] text-sm">Previews</p>
                    </div>
                    <p class="font-[200] text-lg">Sheger Gebeta</p>
                </router-link>
                <!-- Current -->
                <h1 class="text-2xl tracking-tight font-[600] dark:text-white">
                    HahuJobs Primary
                </h1>
                <!-- Next -->
                <router-link
                    to="#"
                    class="space-y-2 text-end cursor-custom-pointer w-[300px]"
                >
                    <div class="flex items-center text-white/30 w-fit ml-auto">
                        <p class="font-[200] text-sm !mix-blend-difference">
                            Next
                        </p>
                        <Icon
                            name="uil-arrow-right"
                            class="tiny-icon mix-blend-difference"
                        />
                    </div>
                    <p class="font-[200] text-lg">Kena</p>
                </router-link>
            </div>
            <!-- Main detail header -->
            <div class="!mt-4">
                <img
                    src="/images/projects/hahujobs-primary/landing.png"
                    alt="project screenshot"
                    :draggable="false"
                    class="object-fill !h-full !w-full rounded-xl aspect-video overflow-clip"
                />
            </div>
            <!-- Main detail info -->
            <div
                class="relative max-w-8xl pb-6 mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
            >
                <dl class="relative flex flex-wrap h-14 overflow-hidden">
                    <div>
                        <dt class="project-info-title">Technologies</dt>
                        <dd class="project-info-value">
                            Next/Vue, Apollo, Tailwind
                        </dd>
                    </div>
                    <div class="project-info-divider">
                        <dt class="project-info-title">Date</dt>
                        <dd class="project-info-value">
                            <time datetime="2023-01-31T00:00:00.000Z"
                                >January 31, 2023</time
                            >
                        </dd>
                    </div>
                    <div class="project-info-divider">
                        <dt class="project-info-title">URL</dt>
                        <dd class="project-info-value">
                            <a href="https://www.hahu.jobs/">hahu.jobs</a>
                        </dd>
                    </div>
                </dl>
                <a
                    aria-label="Visit Shopify"
                    class="btn-small lg:!px-8 !text-center !w-full xs:!w-fit mt-4 xl:mt-8"
                    href="https://www.hahu.jobs/"
                    >Go to website <span aria-hidden="true">→</span></a
                >
            </div>
            <div
                class="max-w-8xl mx-auto pt-10 sm:pt-14 md:pt-16 mb-20 md:mb-32 px-4 sm:px-6 lg:px-8"
            >
                <p class="text-sm leading-6 font-light text-white tracking"></p>
                <h2
                    class="mt-4 max-w-5xl text-3xl sm:text-6xl tracking-tight font-bold text-white"
                >
                    HahuJobs Primary
                </h2>
                <div class="mt-4 max-w-3xl font-[200]">
                    <p>
                        With over a thousand vacancies from 15 different sectors
                        hahujobs primary is the ideal place to find the perfect
                        job for job seekers. It offers customized profile that
                        is caters to land anyone a job in their felid of
                        expertise
                    </p>
                </div>
            </div>
            <!-- Mobile view section -->
            <div class="mb-32">
                <ul
                    class="h-full w-full mx-auto flex items-start justify-between"
                >
                    <li
                        v-for="(mobileProjectImage, i) in mobileProjectImages"
                        :key="i"
                        class="h-full"
                    >
                        <img
                            :src="mobileProjectImage"
                            alt="project screenshot"
                            :draggable="false"
                            class="project-mobile-image"
                        />
                    </li>
                </ul>
                <p class="project-section-description">
                    Every webpage is carefully made to be responsive for all
                    devices.
                </p>
            </div>
            <!-- Feature section -->
            <ul class="flex flex-col gap-y-32 justify-start">
                <li
                    v-for="(projectSection, i) in projectSections"
                    :key="i"
                >
                    <img
                        :src="projectSection.image"
                        alt="project screenshot"
                        :draggable="false"
                        class="project-section-image"
                    />
                    <p class="project-section-description">
                        {{ projectSection.description }}
                    </p>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
    .project-info-title {
        @apply font-[200] text-sm leading-6 text-white/50;
    }
    .project-info-value {
        @apply font-[200] text-sm leading-6 mt-2 text-white;
    }
    .project-info-divider {
        @apply border-l border-slate-500/10 dark:border-slate-400/10 ml-6 pl-6 lg:ml-8 lg:pl-8;
    }
    .project-section-image {
        @apply object-fill !h-full !w-full rounded-xl aspect-video overflow-clip;
    }
    .project-section-description {
        @apply text-sm font-[200] mt-4 w-[50%] border-l pl-4;
    }
    .project-mobile-image {
        @apply object-fill !h-[888px] !w-[444px] rounded-xl aspect-video overflow-clip;
    }
</style>
