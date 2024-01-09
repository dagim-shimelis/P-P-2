<script setup>
    import { Vue3Marquee } from "vue3-marquee";
    import companies from "@/data/companies.json";
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
