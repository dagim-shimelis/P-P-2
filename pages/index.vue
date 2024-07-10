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
            content="From eye-catching designs to seamless functionality, I've got you covered. With expertise in web design, frontend development, and backend development, I'll bring your digital dreams to life. Let's build something great together!"
        />
        <Meta
            data-n-head="ssr"
            data-hid="description"
            name="description"
            content="From eye-catching designs to seamless functionality, I've got you covered. With expertise in web design, frontend development, and backend development, I'll bring your digital dreams to life. Let's build something great together!"
        />
        <Meta
            data-n-head="ssr"
            data-hid="og:url"
            property="og:url"
            content="https://dagim-shimelis.me/"
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

    <div class="h-full overflow-y-clip min-h-screen">
        <Landing-Hero />
        <Landing-About id="about" />
        <Landing-Projects id="projects" />
        <Landing-Testimonials id="testimonials" />
        <Landing-Articles id="articles" />
        <Landing-Contact id="contact" />
    </div>
</template>

<style scoped></style>
