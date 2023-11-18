import PrimeVue from "primevue/config";

import Button from "primevue/button";
import Panel from "primevue/panel";
import Tailwind from "primevue/passthrough/tailwind";

export default defineNuxtPlugin((nuxtApp) => {
    const app = nuxtApp.vueApp;
    app.use(PrimeVue, {
        pt: {
            button: {
                root: { class: 'bg-teal-500 hover:bg-teal-700 cursor-pointer text-white p-3 border-round border-none flex gap-2' },
                label: 'text-white font-bold text-xl', // OR { class: 'text-white font-bold text-xl' }
                icon: 'text-white text-2xl'
            }
        }
    });

    // components
    app.component("Button", Button);
    app.component("Panel", Panel);
});