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
    <footer class="py-12 border-t border-green-400/10 mt-32 relative z-10">
        <div class="side-space flex flex-col md:flex-row justify-between items-center gap-8">
            <div class="flex flex-col items-center md:items-start">
                <p class="text-[10px] font-mono text-green-400/50 uppercase tracking-[0.3em]">Build_Checksum</p>
                <p class="text-xs font-mono text-green-400/80">HASH_7A2B9C4D_2026</p>
            </div>
            
            <ul class="flex items-center gap-x-8 justify-center">
                <li
                    v-for="(social, i) in socials"
                    :key="i"
                    :title="social.name"
                    class="transition-all duration-300 hover:-translate-y-1"
                >
                    <a
                        :href="social.link"
                        target="_blank"
                        class="text-green-400/60 hover:text-green-400"
                    >
                        <Icon
                            :name="social.icon"
                            class="w-6 h-6"
                        />
                    </a>
                </li>
            </ul>

            <div class="flex flex-col items-center md:items-end">
                <p class="text-[10px] font-mono text-green-400/50 uppercase tracking-[0.3em]">Status</p>
                <p class="text-xs font-mono text-green-400/80">© 2026 DAGIM_SHIMELIS // ALL_SYSTEMS_GO</p>
            </div>
        </div>
    </footer>
</template>

<style scoped></style>
