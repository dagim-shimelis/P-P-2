<script setup>
    const showInitialLoader = ref(true);

    onBeforeMount(() => {
        showInitialLoader.value = true;
    });
    onMounted(() => {
        showInitialLoader.value = false;
    });
</script>

<template>
    <div>
        <InitialLoader v-if="showInitialLoader" />
        <div class="relative">
            <Nav></Nav>
            <slot></slot>
            <Footer></Footer>
        </div>
    </div>
</template>
