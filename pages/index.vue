<script setup></script>

<template>
    <Head>
        <Title>Dagim Shimelis</Title>
        <Meta
            data-n-head="ssr"
            data-hid="og:title"
            property="og:title"
            content="Dagim Shimelis"
        />
        <Meta
            data-n-head="ssr"
            data-hid="og:description"
            property="og:description"
            content="Full-stack developer"
        />
        <Meta
            data-n-head="ssr"
            data-hid="description"
            name="description"
            content="Full-stack developer"
        />
        <Meta
            data-n-head="ssr"
            data-hid="og:url"
            property="og:url"
            content="https://kena.eyea.et/"
        />
        <Meta
            data-n-head="ssr"
            property="og:type"
            content="website"
        />
        <Meta
            data-n-head="ssr"
            property="og:image"
            content="https://res.cloudinary.com/drhjbn19m/image/upload/v1701553194/Portfolio/gqxmceo3wtqmqzepxn8e.png"
        />
    </Head>

    <div class="h-full overflow-y-clip">
        <Landing-Hero />
        
        <Landing-About id="about" />
        <Landing-Projects id="projects" />
        <Landing-UnderDevelopmentModal />
        <Landing-Testimonials id="testimonials" />
        <Landing-Articles id="articles" />
        <Landing-Contact id="contact" />

        <!-- Under development modal -->
    </div>
</template>

<style scoped></style>
