<script setup>
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
            to: "/projects",
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
    <header class="relative">
        <div
            class="side-space !h-20 !z-50 flex items-center justify-between !pt-10"
        >
            <!-- Logo -->
            <div class="absolute top-2 sm:top-4">
                <img
                    src="/icons/logo.png"
                    alt="logo"
                    class="w-10 lg:w-fit"
                    draggable="false"
                />
            </div>
            <!-- /* ------------------------------- Desktop Nav ------------------------------ */ -->
            <ul class="hidden lg:flex items-center gap-x-16 w-fit mx-auto">
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
            <!-- /* ------------------------------- Mobile Nav ------------------------------- */ -->
            <div class="lg:hidden ml-auto">
                <button
                    @click="visibleSideNav = true"
                    class="menu-button absolute top-3 sm:top-5 right-4 sm:right-8 z-50"
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
                        class="absolute top-0 right-0 ml-auto w-full h-full bg-black p-6 flex flex-col justify-center gap-y-10"
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
                        <ul class="z-30 flex flex-col text-center gap-y-[59px]">
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
                        <!-- Graphic line -->
                        <!-- <img
                            src="/images/graphic-lines/crossed-line.png"
                            alt=""
                            class="absolute top-5 -left-5 z-20 -scale-y-100 -rotate-90"
                            draggable="false"
                        />
                        <img
                            src="/images/graphic-lines/ellipse-line.png"
                            alt=""
                            class="absolute bottom-0 left-0 z-20 scale-x-100"
                            draggable="false"
                        /> -->
                    </nav>
                </Sidebar>
            </div>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute top-0 right-0">
            <img
                src="@/assets/image/graphic-lines/landing-1.png"
                alt="graphic-lines-landing-1"
                :draggable="false"
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
