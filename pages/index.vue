<script setup>
const LazyLandingAbout = defineAsyncComponent(() => import('~/components/Landing/About.vue'));
const LazyLandingProjects = defineAsyncComponent(() => import('~/components/Landing/Projects.vue'));
const LazyLandingTestimonials = defineAsyncComponent(() => import('~/components/Landing/Testimonials.vue'));
const LazyLandingArticles = defineAsyncComponent(() => import('~/components/Landing/Articles.vue'));
const LazyLandingContact = defineAsyncComponent(() => import('~/components/Landing/Contact.vue'));
</script>

<template>
    <Head>
        <Title>Dagim — Full Stack Engineer & UI/UX Designer</Title>
        <Meta
            data-n-head="ssr"
            data-hid="og:title"
            property="og:title"
            content="Dagim — Full Stack Engineer & UI/UX Designer"
        />
        <Meta
            data-n-head="ssr"
            data-hid="og:description"
            property="og:description"
            content="Building thoughtful web experiences from idea to launch. Full stack engineer and UI/UX designer crafting high-quality digital products."
        />
        <Meta
            data-n-head="ssr"
            data-hid="description"
            name="description"
            content="Building thoughtful web experiences from idea to launch. Full stack engineer and UI/UX designer crafting high-quality digital products."
        />
        <Meta
            data-n-head="ssr"
            data-hid="og:url"
            property="og:url"
            content="https://dagim.codes"
        />
        <Meta
            data-n-head="ssr"
            property="og:type"
            content="website"
        />
        <Meta
            data-n-head="ssr"
            property="og:image"
            content="https://dagim.codes/images/og-image.png"
        />
        <Meta
            data-n-head="ssr"
            name="twitter:card"
            content="summary_large_image"
        />
        <Meta
            data-n-head="ssr"
            name="twitter:image"
            content="https://dagim.codes/images/og-image.png"
        />
    </Head>

    <div class="h-full overflow-y-clip min-h-screen bg-[#1c1c1e] text-green-50">
        <Landing-Hero />
        <LazyLandingAbout id="about" />
        <LazyLandingProjects id="projects" />
        <LazyLandingTestimonials id="testimonials" />
        <LazyLandingArticles id="articles" />
        <LazyLandingContact id="contact" />
    </div>
</template>

<style scoped></style>
