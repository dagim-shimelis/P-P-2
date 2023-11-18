// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["@/assets/css/main.css"],
  build: {
    transpile: ["primevue"],
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/apollo",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "nuxt-icon",
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
  routeRules: {
    // "/": { ssr: false },
  },

  app: {
    // pageTransition: {
    //   name: "page", // default
    //   mode: "out-in",
    // },
    // layoutTransition: {
    //   name: "layout",
    //   mode: "out-in", // default
    // },
  },
});
