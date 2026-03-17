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
    <header id="home" class="fixed w-full z-50 transition-all duration-300">
        <div class="backdrop-blur-md bg-black/20 border-b border-green-400/10">
            <div class="side-space h-20 flex items-center justify-between">
                <!-- Logo -->
                <router-link to="/" class="text-lg font-bold tracking-tight text-white uppercase hover:opacity-80 transition-opacity">
                    Dagim<span class="text-green-400">.</span>
                </router-link>

                <!-- Desktop Nav -->
                <nav class="hidden lg:block">
                    <ul class="flex items-center gap-x-12">
                        <li v-for="(navigator, i) in navigation" :key="i">
                            <router-link
                                :to="navigator.to"
                                class="nav-link text-xs tracking-[0.4em] uppercase font-[600] text-green-400/60 hover:text-green-400 transition-colors relative group"
                            >
                                {{ navigator.name }}
                                <span class="absolute -bottom-1 left-0 w-0 h-[1px] bg-green-400 transition-all duration-300 group-hover:w-full"></span>
                            </router-link>
                        </li>
                    </ul>
                </nav>

                <!-- Resume Download -->
                <a
                    href="/file/DagimShimelisResume.pdf"
                    download="DagimShimelisResume.pdf"
                    class="hidden sm:flex items-center gap-3 font-mono text-[10px] tracking-[0.3em] uppercase bg-green-400 text-black hover:bg-green-300 px-4 py-2 transition-all duration-300"
                >
                    <Icon name="uil:download-alt" class="text-sm" />
                    Resume
                </a>

                <!-- Mobile Menu Button -->
                <button @click="visibleSideNav = true" class="lg:hidden text-green-400">
                    <Icon name="uil:bars" class="text-2xl" />
                </button>
            </div>
        </div>

        <!-- Mobile Nav Sidebar (Simplified for brevity) -->
        <div v-if="visibleSideNav" class="fixed inset-0 bg-black z-[100] flex flex-col items-center justify-center gap-12">
            <button @click="visibleSideNav = false" class="absolute top-6 right-6 text-green-400">
                <Icon name="uil:multiply" class="text-3xl" />
            </button>
            <ul class="flex flex-col items-center gap-8">
                <li v-for="(navigator, i) in navigation" :key="i">
                    <router-link
                        @click="visibleSideNav = false"
                        :to="navigator.to"
                        class="text-2xl tracking-[0.5em] uppercase text-green-400"
                    >
                        {{ navigator.name }}
                    </router-link>
                </li>
            </ul>
            <a
                href="/file/DagimShimelisResume.pdf"
                download="DagimShimelisResume.pdf"
                class="flex items-center gap-3 font-mono text-sm tracking-[0.3em] uppercase bg-green-400 text-black hover:bg-green-300 px-6 py-3 transition-all duration-300"
            >
                <Icon name="uil:download-alt" class="text-lg" />
                Resume
            </a>
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
