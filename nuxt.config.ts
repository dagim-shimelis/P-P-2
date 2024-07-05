export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: process.env.MODE == "development" },
    app: {
        head: {
            title: "Dagim Shimelis",
            // htmlAttrs: {
            //     lang: "en",
            // },
            meta: [
                {
                    name: "viewport",
                    content: " width=device-width, initial-scale=1",
                },
                {
                    hid: "Dagim Shimelis",
                    name: "description",
                    content: "From eye-catching designs to seamless functionality, I've got you covered. With expertise in web design, frontend development, and backend development, I'll bring your digital dreams to life. Let's build something great together!",
                },
                { name: "robots", content: "index, follow" },
                {
                    name: "keywords",
                    content:
                        "web development, fullstack developer, portfolio, Dagim Shimelis, Ethiopian developer",
                },

                {
                    "data-n-head": "ssr",
                    name: "viewport",
                    content:
                        "width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=5",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "description",
                    name: "description",
                    content:
                        "From eye-catching designs to seamless functionality, I've got you covered. With expertise in web design, frontend development, and backend development, I'll bring your digital dreams to life. Let's build something great together!",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "og:url",
                    property: "og:url",
                    content:
                        "https://res.cloudinary.com/drhjbn19m/image/upload/v1701553194/Portfolio/gqxmceo3wtqmqzepxn8e.png",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "og:type",
                    property: "og:type",
                    content: "website",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "og:title",
                    property: "og:title",
                    content: "Dagim Shimelis",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "og:description",
                    property: "og:description",
                    content:
                        "From eye-catching designs to seamless functionality, I've got you covered. With expertise in web design, frontend development, and backend development, I'll bring your digital dreams to life. Let's build something great together!",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "og:image",
                    property: "og:image",
                    content:
                        "https://res.cloudinary.com/drhjbn19m/image/upload/v1701553194/Portfolio/gqxmceo3wtqmqzepxn8e.png",
                },
                // twitter
                {
                    "data-n-head": "ssr",
                    "data-hid": "twitter:card",
                    property: "twitter:card",
                    content: "summary_large_image",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "twitter:domain",
                    property: "twitter:domain",
                    content:
                        "https://res.cloudinary.com/drhjbn19m/image/upload/v1701553194/Portfolio/gqxmceo3wtqmqzepxn8e.png",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "twitter:url",
                    property: "twitter:url",
                    content:
                        "https://res.cloudinary.com/drhjbn19m/image/upload/v1701553194/Portfolio/gqxmceo3wtqmqzepxn8e.png",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "twitter:title",
                    property: "twitter:title",
                    content: "Dagim Shimelis",
                },
                {
                    "data-n-head": "ssr",
                    "data-hid": "twitter:description",
                    property: "twitter:description",
                    content:
                        "From eye-catching designs to seamless functionality, I've got you covered. With expertise in web design, frontend development, and backend development, I'll bring your digital dreams to life. Let's build something great together!",
                },
                {
                    "data-hid": "twitter:image",
                    content:
                        "https://res.cloudinary.com/drhjbn19m/image/upload/v1701553194/Portfolio/gqxmceo3wtqmqzepxn8e.png",
                },
                {
                    "data-hid": "twitter:image",
                    "data-n-head": "ssr",
                    property: "twitter:image",
                    content:
                        "https://res.cloudinary.com/drhjbn19m/image/upload/v1701553194/Portfolio/gqxmceo3wtqmqzepxn8e.png",
                },
            ],
        },
    },
    css: ["@/assets/css/main.css"],
    build: {
        transpile: ["primevue"],
    },
    image: {
        inject: true,
    },
    // plugins: ["@/plugins/htmlLang.js"],
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/apollo",
        "@nuxtjs/color-mode",
        "@pinia/nuxt",
        "nuxt-icon",
        "nuxt-lenis",
        "@nuxt/image",
    ],
    colorMode: {
        preference: "system", // default value of $colorMode.preference
        fallback: "light", // fallback value if not system preference found
        hid: "nuxt-color-mode-script",
        globalName: "__NUXT_COLOR_MODE__",
        componentName: "ColorScheme",
        classPrefix: "",
        classSuffix: "",
        storageKey: "nuxt-color-mode",
    },
    apollo: {
        autoImports: true,
        authType: "Bearer",
        clients: {
            default: {
                httpEndpoint: "https://api.spacex.land/graphql",
            },
        },
    },

    // here we are setting the route rules for the SPA and SSR routes
    router: {
        options: {
            scrollBehaviorType: "smooth",
        },
    },
    runtimeConfig: {
        public: {
            mode: process.env.MODE,
        },
    },
});
