<script setup>
    import { Vue3Marquee } from "vue3-marquee";

    const companies = ref([
        {
            image: "/images/companies/hahujobs.png",
            name: "HahuJobs",
        },
        {
            image: "/images/companies/snv.png",
            name: "SNV",
        },
        {
            image: "/images/companies/first_consult.png",
            name: "First Consult",
        },
        {
            image: "/images/companies/eyea.png",
            name: "EYEA",
        },
        {
            image: "/images/companies/minab.png",
            name: "Minab IT Solutions",
        },
        {
            image: "/images/companies/kena.png",
            name: "Kena",
        },
        {
            image: "/images/companies/mesmer.png",
            name: "Mesmer",
        },
        {
            image: "/images/companies/shabaka.png",
            name: "Shabaka",
        },
        {
            image: "/images/companies/plan_international.png",
            name: "Plan International",
        },
    ]);
</script>

<template>
    <Vue3Marquee
        duration="100"
        :clone="true"
        :pauseOnHover="true"
        :pauseOnClick="true"
        :gradient="true"
        :gradientColor="[21, 21, 21]"
        gradientWidth="200px"
    >
        <ul class="flex items-center gap-x-24 pr-24">
            <li
                v-for="(company, i) in companies"
                :key="i"
                :title="company.name"
            >
                <img
                    :src="company.image"
                    :alt="company.name"
                    :draggable="false"
                    class="h-[28px]"
                />
            </li>
        </ul>
    </Vue3Marquee>
</template>

<style scoped></style>
