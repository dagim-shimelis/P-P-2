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
  <div class="relative min-h-screen">
    <div class="side-space pt-10">
      <!-- Contact Content -->

      <!-- Title -->
      <div class="title-box">
        <div>
          <h1 class="title-big">contact</h1>
          <img
            src="@/assets/image/graphic-lines/underline.svg"
            alt="title-underline"
            class="title-underline"
          />
        </div>
        <p class="title-small">me</p>
      </div>
      <!--Contact Form -->

      <form
        @submit.prevent="handleSubmit"
        class="pb-36 lg:pb-60 4_2xl:pb-40 flex max-w-[900px] mx-auto flex-col items-center justify-center !mt-24 gap-y-16 md:gap-y-32"
      >
        <div class="flex flex-col md:flex-row gap-16 w-full">
          <input
            v-model="item.name"
            name="name"
            type="text"
            placeholder="Name"
            class="input"
            required
          />
          <input
            v-model="item.email"
            name="email"
            type="email"
            placeholder="Email"
            class="input"
            required
          />
        </div>
        <textarea
          v-model="item.message"
          name="message"
          placeholder="Message"
          class="input h-[200px]"
          required
        ></textarea>
        <div class="relative group w-full md:w-fit">
          <button type="submit" class="btn !w-full">
            <span v-if="isLoading"
              ><Icon name="eos-icons:three-dots-loading"
            /></span>
            <span v-else>Send</span>
          </button>
          <div v-if="message" class="font-light mt-4">{{ message }}</div>
          <div
            class="hidden md:inline absolute -bottom-4 xl:-bottom-16 right-20 md:-right-40 xl:-right-80 group-hover:-translate-x-8 ease-in-out duration-300"
          >
            <img
              src="@/assets/image/graphic-lines/arrow-3.png"
              alt="graphic-lines-arrow-3"
              :draggable="false"
              class="w-[100px] xl:w-[200px]"
            />
          </div>
        </div>
      </form>
    </div>

    <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
    <div class="absolute bottom-0 left-0 z-10">
      <img
        src="@/assets/image/graphic-lines/landing-8.png"
        alt="graphic-lines-landing-8"
        :draggable="false"
        class="w-[100px] xl:w-[200px] 3xl:w-full"
      />
    </div>
  </div>
</template>

<style scoped></style>
