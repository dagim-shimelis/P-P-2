export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: process.env.MODE == "development" },
    app: {
        head: {
            htmlAttrs: { lang: "en" },
            title: "Dagim — Frontend Developer & UI Designer",
            style: [
                {
                    innerHTML: 'html,body{background-color:#141314;color:#eeeeee;}',
                },
            ],
            meta: [
                {
                    name: "viewport",
                    content: "width=device-width, initial-scale=1, minimum-scale=0.5, maximum-scale=5",
                },
                {
                    name: "description",
                    content: "Frontend developer and UI designer crafting responsive websites, thoughtful interfaces, and fluid interactions with Vue, Nuxt, and TypeScript.",
                },
                { name: "robots", content: "index, follow" },
                {
                    name: "keywords",
                    content: "frontend developer, UI designer, responsive web design, Vue, Nuxt, TypeScript, portfolio, Dagim Shimelis",
                },
                // Open Graph
                {
                    property: "og:type",
                    content: "website",
                },
                {
                    property: "og:title",
                    content: "Dagim — Frontend Developer & UI Designer",
                },
                {
                    property: "og:description",
                    content: "Frontend developer and UI designer crafting responsive websites, thoughtful interfaces, and fluid interactions with Vue, Nuxt, and TypeScript.",
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
                    content: "Dagim — Frontend Developer & UI Designer",
                },
                {
                    name: "twitter:description",
                    content: "Frontend developer and UI designer crafting responsive websites, thoughtful interfaces, and fluid interactions with Vue, Nuxt, and TypeScript.",
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
                        jobTitle: 'Frontend Developer & UI Designer',
                        description: 'Frontend developer and UI designer crafting responsive websites, thoughtful interfaces, and fluid interactions with Vue, Nuxt, and TypeScript.',
                        knowsAbout: ['Web Development', 'UI/UX Design', 'Frontend Development', 'Responsive Web Design', 'Vue.js', 'Nuxt.js', 'TypeScript'],
                        worksFor: {
                            '@type': 'Organization',
                            name: 'Freelance',
                        },
                    }),
                },
            ],
            link: [
                { rel: 'icon', type: 'image/svg+xml', href: '/icons/rebrand.svg' },
                { rel: 'preload', href: '/fonts/geist-mono/regular.ttf', as: 'font', type: 'font/ttf', crossorigin: '' },
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
