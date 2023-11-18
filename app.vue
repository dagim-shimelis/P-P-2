<script setup></script>

<template>
  <div class="dark:bg-gray-800 centerContent">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
.centerContent {
  margin: 0 auto !important;
}
/* .page-enter-active,
.page-leave-active {
  transition: all 0.2s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
} */
/* filter: blur(1rem); */

/* .layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: blur(1rem);
} */
</style>
