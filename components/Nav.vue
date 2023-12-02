<script setup>
    const links = ref([
        {
            name: "home",
            to: "#home",
        },
        {
            name: "about",
            to: "#about",
        },
        {
            name: "projects",
            to: "#projects",
        },
        {
            name: "articles",
            to: "#articles",
        },
        {
            name: "contact",
            to: "#contact",
        },
    ]);
</script>

<template>
    <div class="relative">
        <div class="side-space !h-20 !z-50 flex items-center">
            <!-- Logo -->
            <div class="absolute top-4">
                <img
                    src="/icons/logo.png"
                    alt="logo"
                />
            </div>
            <!-- Links -->
            <ul class="flex items-center gap-x-16 w-fit mx-auto">
                <li
                    v-for="(link, i) in links"
                    :key="i"
                    class="uppercase font-[400] tracking-widest hover:scale-110 ease-in-out duration-150"
                >
                    <router-link :to="link.to">{{ link.name }}</router-link>
                </li>
            </ul>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute top-0 right-1">
            <img
                src="@/assets/image/graphic-lines/landing-1.png"
                alt="graphic-lines-landing-1"
                :draggable="false"
            />
        </div>
    </div>
</template>

<style scoped></style>
