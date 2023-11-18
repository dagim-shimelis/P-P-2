<script setup>
const colorMode = useColorMode();
console.log(colorMode.preference);
const query = gql`
  query getShips($limit: Int!) {
    ships(limit: $limit) {
      id
      name
    }
  }
`;

const variables = { limit: 5 };

const { data } = await useAsyncQuery(query, variables);

if (data.value?.ships) {
  // log response
  console.log(data.value.ships);
}

const handleClick = (mode) => {
  console.log("mode", mode);
  colorMode.preference = mode;
  console.log("dkdkdk", colorMode.preference);
};

+(
  /**
+ * Enables the custom layout for the page.
+ *
+ * @param {type} layoutName - name of the layout
+ */
  function enableCustomLayout() {
    setPageLayout("custom");
  }
);
// you can also use `definePageMeta` to set the layout

// definePageMeta({
//   layout: "custom",
// });
</script>

<template>
  <div>
    <div
      class="w-screen mx-auto justify-center h-screen flex flex-col items-center"
    >
      <Button
        class="px-2 py-3 border rounded-md text-sm text-white font-medium bg-blue-500 hover:bg-blue-700"
        @click="
          handleClick(colorMode.preference === 'light' ? 'dark' : 'light')
        "
        label="Click"
      />
      <div class="max-w-2xl w-full">
        <Panel
          header="Header"
          :pt="{
            header: { class: 'bg-green-500 px-2 py-2 dark:bg-yellow-400' },
          }"
          toggleable
        >
          <p class="m-0 font-poppins">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis au te irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </Panel>
      </div>
      <div>
        <NuxtLink to="/about" class="">About</NuxtLink>
      </div>
      <Icon name="uil:github" color="black" />
      <Icon name="🚀" color="black" />

      <div class="flex flex-col h-screen justify-around items-center">
        <h1 class="text-4xl font-poppins text-primary-600">Poppins</h1>
        <h1 class="text-4xl font-fractul text-slate-900 uppercase">
          Bridging the Missing Link
        </h1>
      </div>
    </div>
  </div>
</template>
