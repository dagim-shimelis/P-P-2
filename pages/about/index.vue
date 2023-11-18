<script setup>
import { useCounterStore } from "~/stores/counterStore.js";
import { storeToRefs } from "pinia";
const onCountStore = useCounterStore();

const { getCount } = storeToRefs(onCountStore);
const count = getCount;
// definePageMeta({
//   pageTransition: {
//     name: "rotate",
//   },
// });
// definePageMeta({
//   layout: "custom",
// });
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <div>
      <NuxtLink to="/">Home</NuxtLink>

      <p>count = {{ count }}</p>

      <Button @click="onCountStore.increment" label="Increment" />
    </div>
  </div>
</template>
