const siteTitle = "Dagim Shimelis — Independent Developer and Designer";
const siteDescription = "I’m Dagim, a frontend developer and UI designer turning ideas into websites and digital products. Good design, thoughtful code, and care in the details.";

export default defineNuxtConfig({
    ssr: true,
    devtools: { enabled: process.env.MODE == "development" },
    app: {
        head: {
            htmlAttrs: { lang: "en" },
            title: siteTitle,
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
                    content: siteDescription,
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
                    content: siteTitle,
                },
                {
                    property: "og:description",
                    content: siteDescription,
                },
                {
                    property: "og:image",
                    content: "https://dagim.codes/images/og-portfolio.png",
                },
                {
                    property: "og:image:alt",
                    content: "Dagim Shimelis — Good design. Thoughtful code. Orange ASCII artwork on charcoal.",
                },
                {
                    property: "og:image:width",
                    content: "1731",
                },
                {
                    property: "og:image:height",
                    content: "909",
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
                    content: siteTitle,
                },
                {
                    name: "twitter:description",
                    content: siteDescription,
                },
                {
                    name: "twitter:image",
                    content: "https://dagim.codes/images/og-portfolio.png",
                },
                {
                    name: "twitter:image:alt",
                    content: "Dagim Shimelis — Good design. Thoughtful code. Orange ASCII artwork on charcoal.",
                },
            ],
            script: [
                {
                    type: 'application/ld+json',
                    innerHTML: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'Person',
                        name: 'Dagim Shimelis',
                        url: 'https://dagim.codes',
                        jobTitle: 'Frontend Developer & UI Designer',
                        description: siteDescription,
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
                { rel: 'preload', href: '/fonts/geist-mono/regular.woff2', as: 'font', type: 'font/woff2', crossorigin: '' },
            ],
        },
    },
    css: ["@/assets/css/main.css"],
    image: {
        inject: true,
        quality: 80,
        format: ['webp'],
    },
    modules: [
        "@nuxtjs/tailwindcss",
        "@nuxtjs/color-mode",
        "nuxt-icon",
        "@nuxt/image",
        ...(process.env.NUXT_PUBLIC_POSTHOG_KEY ? ["@posthog/nuxt"] : []),
    ],
    posthogConfig: {
        publicKey: process.env.NUXT_PUBLIC_POSTHOG_KEY,
        // The module shares this host with its CLI; keep SDK traffic on the ingestion host below.
        host: process.env.POSTHOG_CLI_HOST || process.env.NUXT_PUBLIC_POSTHOG_HOST,
        clientConfig: {
            api_host: process.env.NUXT_PUBLIC_POSTHOG_HOST,
            defaults: '2026-05-30',
            capture_pageview: 'history_change',
            autocapture: true,
            person_profiles: 'identified_only',
            disable_session_recording: true,
            disable_surveys: true,
            capture_exceptions: true,
        },
        serverConfig: {
            host: process.env.NUXT_PUBLIC_POSTHOG_HOST,
        },
        sourcemaps: {
            enabled: Boolean(process.env.POSTHOG_CLI_API_KEY && process.env.POSTHOG_CLI_PROJECT_ID && process.env.POSTHOG_CLI_HOST),
            projectId: process.env.POSTHOG_CLI_PROJECT_ID,
            personalApiKey: process.env.POSTHOG_CLI_API_KEY,
        },
    },
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
            vercelAnalytics: process.env.VERCEL === '1',
        },
    },
});
