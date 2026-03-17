export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: process.env.MODE == "development" },
    app: {
        head: {
            title: "Dagim — Full Stack Engineer & UI/UX Designer",
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=5",
                },
                {
                    name: "description",
                    content: "Building thoughtful web experiences from idea to launch. Full stack engineer and UI/UX designer crafting high-quality digital products.",
                },
                { name: "robots", content: "index, follow" },
                {
                    name: "keywords",
                    content: "full stack engineer, UI/UX designer, web development, portfolio, Dagim Shimelis",
                },
                // Open Graph
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    property: "og:title",
                    content: "Dagim — Full Stack Engineer & UI/UX Designer",
                },
                {
                    property: "og:description",
                    content: "Building thoughtful web experiences from idea to launch. Full stack engineer and UI/UX designer crafting high-quality digital products.",
                },
                {
                    property: "og:image",
                    content: "/images/og-image.png",
                },
                {
                    property: "og:image:width",
                    content: "1200",
                },
                {
                    property: "og:image:height",
                    content: "630",
                },
                // Twitter
                {
                    name: "twitter:card",
                    content: "summary_large_image",
                },
                {
                    name: "twitter:title",
                    content: "Dagim — Full Stack Engineer & UI/UX Designer",
                },
                {
                    name: "twitter:description",
                    content: "Building thoughtful web experiences from idea to launch. Full stack engineer and UI/UX designer crafting high-quality digital products.",
                },
                {
                    name: "twitter:image",
                    content: "/images/og-image.png",
                },
            ],
        },
    },
    css: ["@/assets/css/main.css"],
    build: {
        transpile: ["primevue", "gsap"],
    },
    image: {
        inject: true,
    },
    // plugins: ["@/plugins/htmlLang.js"],
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "nuxt-icon",
        "nuxt-lenis",
        "@nuxt/image",
        "@vercel/analytics/nuxt",
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
