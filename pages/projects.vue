<script setup>
    const route = useRoute();
    const router = useRouter();
    onMounted(() => {
        if (route.path == "/projects") router.push("/projects/list");
    });
</script>

<template>
    <div>
        <router-view />
    </div>
</template>

<style scoped></style>
