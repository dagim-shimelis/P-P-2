<script setup>
    const socials = ref([
        {
            name: "LinkedIn",
            icon: "mdi:linkedin",
            link: "https://www.linkedin.com/in/dagim-shimelis/",
        },
        {
            name: "Github",
            icon: "mdi:github",
            link: "https://github.com/dagim-shimelis",
        },
        {
            name: "X",
            icon: "fa6-brands:x-twitter",
            link: "https://twitter.com/Dagim__Shimelis",
        },
        {
            name: "Medium",
            icon: "mingcute:medium-fill",
            link: "https://medium.com/@dagimshimelis1992",
        },
    ]);
</script>

<template>
    <footer class="md:absolute bottom-0 space-y-8 w-full flex justify-center">
        <div>
            <ul class="flex items-center gap-x-8 justify-center">
                <li
                    v-for="(social, i) in socials"
                    :key="i"
                    :title="social.name"
                    class="hover:scale-110 ease-in-out duration-150"
                >
                    <a
                        :href="social.link"
                        target="_blank"
                        aria-label="Visit site"
                        class="cursor-custom-pointer"
                    >
                        <Icon
                            :name="social.icon"
                            class="w-[23px] sm:w-[31px] h-[23px] sm:h-[31px]"
                        />
                    </a>
                </li>
            </ul>
            <p class="text-sm font-[200] text-center my-8 mb-4">
                © 2024 Dagim Shimelis
            </p>
        </div>
    </footer>
</template>

<style scoped></style>
