<script setup>
const isLoading = ref(false);
const message = ref(false);
const item = ref({});

const handleSubmit = async (_) => {
  isLoading.value = true;

  const formSpree = await useFetch("/api/submit", {
    method: "post",
    body: {
      name: item.value.name,
      email: item.value.email,
      message: item.value.message,
    },
  });
  if (formSpree?.data?.value?.response?.ok) {
    setTimeout(() => {
      isLoading.value = false;
      showMessage(true);
      item.value = {};
    }, 1000);
  } else {
    setTimeout(() => {
      isLoading.value = false;
      showMessage(false);
    }, 1000);
  }
};

const showMessage = (success) => {
  message.value = success
    ? "Message sent Successfully!"
    : "Something went wrong! Please try again.";

  setTimeout(() => {
    message.value = null;
  }, 3000);
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

      <form
        @submit.prevent="handleSubmit"
        class="max-w-2xl mx-auto flex flex-col gap-12"
      >
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div class="relative group">
            <input
              v-model="item.name"
              name="name"
              type="text"
              placeholder="NAME"
              class="w-full bg-green-400/5 border border-green-400/20 px-6 py-4 font-mono text-sm focus:border-green-400 focus:outline-none transition-colors placeholder:text-green-400/30"
              required
            />
            <div class="absolute top-0 left-0 w-1 h-full bg-green-400 scale-y-0 group-focus-within:scale-y-100 transition-transform origin-top"></div>
          </div>
          <div class="relative group">
            <input
              v-model="item.email"
              name="email"
              type="email"
              placeholder="EMAIL_ADDRESS"
              class="w-full bg-green-400/5 border border-green-400/20 px-6 py-4 font-mono text-sm focus:border-green-400 focus:outline-none transition-colors placeholder:text-green-400/30"
              required
            />
            <div class="absolute top-0 left-0 w-1 h-full bg-green-400 scale-y-0 group-focus-within:scale-y-100 transition-transform origin-top"></div>
          </div>
        </div>
        <div class="relative group">
          <textarea
            v-model="item.message"
            name="message"
            placeholder="YOUR MESSAGE"
            class="w-full bg-green-400/5 border border-green-400/20 px-6 py-4 font-mono text-sm focus:border-green-400 focus:outline-none transition-colors h-48 placeholder:text-green-400/30"
            required
          ></textarea>
          <div class="absolute top-0 left-0 w-1 h-full bg-green-400 scale-y-0 group-focus-within:scale-y-100 transition-transform origin-top"></div>
        </div>

        <div class="flex flex-col items-center gap-6">
          <button type="submit" class="btn w-full md:w-auto min-w-[300px] flex items-center justify-center gap-4">
            <span v-if="isLoading">
              <Icon name="eos-icons:three-dots-loading" class="text-2xl" />
            </span>
            <span v-else class="flex items-center gap-4">
              Send Message <Icon name="material-symbols:send-outline" />
            </span>
          </button>
          <Transition
            enter-active-class="transition-all duration-500 ease-out"
            enter-from-class="opacity-0 -translate-y-4"
            leave-active-class="transition-all duration-500 ease-in"
            leave-to-class="opacity-0 translate-y-4"
          >
            <div v-if="message" class="text-xs font-mono text-green-400 uppercase tracking-widest border border-green-400/30 px-6 py-2 bg-green-400/5">
              {{ message }}
            </div>
          </Transition>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
