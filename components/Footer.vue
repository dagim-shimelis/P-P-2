<script setup>
    const socials = ref([
        {
            name: "Gmail",
            image: "/icons/socials/gmail.png",
            link: "#",
        },
        {
            name: "LinkedIn",
            image: "/icons/socials/linkedin.png",
            link: "#",
        },
        {
            name: "X",
            image: "/icons/socials/x.png",
            link: "#",
        },
        {
            name: "Github",
            image: "/icons/socials/github.png",
            link: "#",
        },
    ]);
</script>

<template>
    <footer class="space-y-8 mb-6">
        <ul class="flex items-center gap-x-8 justify-center">
            <li
                v-for="(social, i) in socials"
                :key="i"
                :title="social.name" class="hover:scale-110 ease-in-out duration-150"
            >
                <a
                    :href="social.link"
                    class="cursor-custom-pointer"
                >
                    <img
                        :src="social.image"
                        alt
                        class="w-fit"
                    />
                </a>
            </li>
        </ul>
        <p class="text-sm font-[200] text-center my-4">© 2023 Dagim Shimelis</p>
    </footer>
</template>

<style scoped></style>
