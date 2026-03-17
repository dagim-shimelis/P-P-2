<script setup>
const copied = ref(null);

const email = "dagimshimelis1992@gmail.com";

const links = [
  {
    name: "LinkedIn",
    icon: "mdi:linkedin",
    url: "https://www.linkedin.com/in/dagim-shimelis/",
    label: "linkedin.com/in/dagim-shimelis",
  },
  {
    name: "GitHub",
    icon: "mdi:github",
    url: "https://github.com/dagim-shimelis",
    label: "github.com/dagim-shimelis",
  },
  {
    name: "X",
    icon: "fa6-brands:x-twitter",
    url: "https://twitter.com/Dagim__Shimelis",
    label: "twitter.com/Dagim__Shimelis",
  },
  {
    name: "Medium",
    icon: "mingcute:medium-fill",
    url: "https://medium.com/@dagimshimelis1992",
    label: "medium.com/@dagimshimelis1992",
  },
];

const copyToClipboard = async (text, id) => {
  await navigator.clipboard.writeText(text);
  copied.value = id;
  setTimeout(() => {
    copied.value = null;
  }, 2000);
};
</script>

<template>
  <div class="relative min-h-screen py-32 flex flex-col items-center justify-center">
    <div class="side-space relative z-10 w-full">
      <!-- Title -->
      <div class="flex flex-col items-center mb-24">
        <p class="text-xs uppercase tracking-[0.5em] text-green-400 mb-4 font-[600]">Get in Touch</p>
        <h2 class="title-big">THE_LINK</h2>
      </div>

      <div class="max-w-4xl mx-auto flex flex-col gap-6">
        <!-- Email Row - 2 columns -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            class="relative group md:col-span-2 border border-green-400/20 bg-green-400/5 p-8 overflow-hidden hover:border-green-400/40 transition-all duration-500"
          >
            <!-- Background Icon -->
            <Icon
              name="mdi:email-outline"
              class="absolute -right-4 -bottom-4 text-[10rem] text-green-400/[0.04] pointer-events-none group-hover:text-green-400/[0.08] transition-all duration-500"
            />

            <div class="relative z-10 flex flex-col sm:flex-row sm:items-center gap-6">
              <div class="flex-1 min-w-0">
                <p class="text-xs uppercase tracking-[0.3em] text-green-400/60 mb-2 font-mono">Email</p>
                <p class="text-green-50 font-mono text-sm sm:text-base truncate">{{ email }}</p>
              </div>
              <div class="flex gap-3 shrink-0">
                <button
                  @click="copyToClipboard(email, 'email')"
                  class="btn !px-6 !py-2 !text-xs"
                >
                  <Icon
                    :name="copied === 'email' ? 'mdi:check' : 'mdi:content-copy'"
                    class="text-base"
                  />
                  {{ copied === "email" ? "Copied" : "Copy" }}
                </button>
                <a
                  :href="'mailto:' + email"
                  class="btn !px-6 !py-2 !text-xs"
                >
                  <Icon name="mdi:send" class="text-base" />
                  Send Mail
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Links Grid - 2x2 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div
            v-for="link in links"
            :key="link.name"
            class="relative group border border-green-400/20 bg-green-400/5 p-8 overflow-hidden hover:border-green-400/40 transition-all duration-500"
          >
            <!-- Background Icon -->
            <Icon
              :name="link.icon"
              class="absolute -right-4 -bottom-4 text-[10rem] text-green-400/[0.04] pointer-events-none group-hover:text-green-400/[0.08] transition-all duration-500"
            />

            <div class="relative z-10 flex flex-col gap-5">
              <div>
                <p class="text-xs uppercase tracking-[0.3em] text-green-400/60 mb-2 font-mono">{{ link.name }}</p>
                <p class="text-green-50 font-mono text-sm truncate">{{ link.label }}</p>
              </div>
              <div class="flex gap-3">
                <button
                  @click="copyToClipboard(link.url, link.name)"
                  class="btn !px-5 !py-2 !text-xs"
                >
                  <Icon
                    :name="copied === link.name ? 'mdi:check' : 'mdi:content-copy'"
                    class="text-base"
                  />
                  {{ copied === link.name ? "Copied" : "Copy" }}
                </button>
                <a
                  :href="link.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn !px-5 !py-2 !text-xs"
                >
                  <Icon name="mdi:open-in-new" class="text-base" />
                  Take me there
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
