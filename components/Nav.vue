<script setup>
    const route = useRoute();
    const navigation = ref([
        {
            name: "home",
            to: "/#home",
        },
        {
            name: "about",
            to: "/#about",
        },
        {
            name: "projects",
            to: "/projects/list",
        },
        {
            name: "articles",
            to: "/#articles",
        },
        {
            name: "contact",
            to: "/#contact",
        },
    ]);

    const visibleSideNav = ref(false);
</script>

<template>
    <header
        id="home"
        class="relative !h-20"
    >
        <div
            class="fixed w-full !h-20 !z-40 from-black via-black/90 via-30% to-transparent to-90% bg-gradient-to-b"
        >
            <div
                class="side-space !h-20 flex items-center justify-between !pt-2"
            >
                <!-- Logo -->
                <router-link
                    to="/"
                    class="absolute top-2 sm:top-4"
                >
                    <img
                        src="/icons/logo.png"
                        alt="logo"
                        class="w-10 lg:w-[60px]"
                        draggable="false"
                    />
                </router-link>
                <!-- /* ------------------------------- Desktop Nav ------------------------------ */ -->
                <ul
                    class="hidden lg:flex items-center gap-x-16 w-fit mx-auto !z-50"
                >
                    <li
                        v-for="(navigator, i) in navigation"
                        :key="i"
                        class="nav-link"
                    >
                        <router-link
                            :to="navigator.to"
                            class="cursor-custom-pointer"
                            >{{ navigator.name }}</router-link
                        >
                    </li>
                </ul>
                <!-- <button class="cursor-custom-pointer z-30">
                    <Icon
                        name="solar:file-download-outline"
                        class="hidden lg:block w-6 h-6"
                    />
                </button> -->
                <div></div>
                <!-- /* ------------------------------- Mobile Nav ------------------------------- */ -->
                <div class="lg:hidden ml-auto">
                    <button
                        @click="visibleSideNav = true"
                        class="menu-button absolute top-3 sm:top-5 right-4 sm:right-8 z-10"
                    >
                        <Icon
                            name="uil:bars"
                            class="text-2xl"
                        />
                    </button>
                    <Sidebar
                        v-model:visible="visibleSideNav"
                        position="right"
                        class="relative w-full"
                    >
                        <template #header>
                            <button
                                @click="visibleSideNav = false"
                                class="menu-button absolute top-3 sm:top-5 right-4 sm:right-8 z-10"
                            >
                                <Icon
                                    name="uil:multiply"
                                    class="text-2xl"
                                />
                            </button>
                        </template>
                        <nav
                            class="absolute top-0 right-0 ml-auto w-full h-screen bg-black p-6 md:pt-28 flex flex-col justify-center gap-y-10 overflow-y-scroll"
                        >
                            <NuxtLink
                                @click="visibleSideNav = false"
                                to="/"
                                class="w-fit h-fit mx-auto z-30 mt-20"
                            >
                                <img
                                    src="/icons/logo.png"
                                    alt="logo"
                                    draggable="false"
                                />
                            </NuxtLink>
                            <ul
                                class="z-30 flex flex-col text-center gap-y-[59px]"
                            >
                                <li
                                    v-for="(navigator, i) in navigation"
                                    :key="i"
                                >
                                    <NuxtLink
                                        @click="visibleSideNav = false"
                                        :to="navigator.to"
                                        class="nav-link"
                                    >
                                        <p>{{ navigator.name }}</p></NuxtLink
                                    >
                                </li>
                            </ul>
                            <div class="!text-white mt-auto">
                                <Footer></Footer>
                            </div>
                            <!-- Graphic line -->
                            <div class="absolute top-0 left-0 z-40">
                                <img
                                    src="@/assets/image/graphic-lines/landing-4.png"
                                    alt="graphic-lines-landing-4"
                                    :draggable="false"
                                    class="w-[100px] md:w-[200px] -scale-x-100"
                                />
                            </div>
                        </nav>
                    </Sidebar>
                </div>
            </div>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute top-0 right-0 z-30">
            <img
                src="@/assets/image/graphic-lines/landing-1.png"
                alt="graphic-lines-landing-1"
                :draggable="false"
                class="w-[400px]"
                :class="route.params?.projectid && '!w-[200px]'"
            />
        </div>
    </header>
</template>

<style scoped>
    .nav-link {
        @apply z-10 text-white uppercase font-[400] tracking-widest hover:scale-110 ease-in-out duration-150;
        mix-blend-mode: difference;
    }
    .menu-button {
        @apply p-2 aspect-square rounded-lg  text-white;
    }
</style>
