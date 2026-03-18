export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: process.env.MODE == "development" },
    app: {
        head: {
            title: "Dagim — Full Stack Engineer & UI/UX Designer",
            style: [
                {
                    innerHTML: 'html,body{background-color:#1c1c1e;color:#f0fdf4;}',
                },
            ],
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
                    content: "https://dagim.codes/images/og-image.png",
                },
                {
                    property: "og:image:width",
                    content: "1200",
                },
                {
                    property: "og:image:height",
                    content: "630",
                },
                {
                    property: "og:url",
                    content: "https://dagim.codes",
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
                    content: "https://dagim.codes/images/og-image.png",
                },
            ],
            script: [
                {
                    src: `https://www.googletagmanager.com/gtag/js?id=${process.env.NUXT_PUBLIC_GA_ID}`,
                    async: true,
                },
                {
                    innerHTML: `window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', '${process.env.NUXT_PUBLIC_GA_ID}');`,
                },
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: 'Dagim Shimelis',
                        url: 'https://dagim.codes',
                        jobTitle: 'Full Stack Engineer & UI/UX Designer',
                        description: 'Building thoughtful web experiences from idea to launch. Full stack engineer and UI/UX designer crafting high-quality digital products.',
                        knowsAbout: ['Web Development', 'UI/UX Design', 'Frontend Development', 'Backend Development', 'Vue.js', 'Nuxt.js', 'TypeScript'],
                        worksFor: {
                            '@type': 'Organization',
                            name: 'Freelance',
                        },
                    }),
                },
            ],
            link: [
                { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@200;400;600;700&family=Chakra+Petch:wght@400;700&display=swap',
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
        quality: 80,
        format: ['webp'],
    },
    // plugins: ["@/plugins/htmlLang.js"],
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "nuxt-icon",
        "@nuxt/image",
    ],
    colorMode: {
        preference: "dark",
        fallback: "dark",
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
            clarityId: process.env.NUXT_PUBLIC_CLARITY_ID,
            gaId: process.env.NUXT_PUBLIC_GA_ID,
        },
    },
});
