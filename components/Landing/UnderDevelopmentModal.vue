<script setup>
    const showModal = ref(false);
    const accessPortfolio = useCookie("accessPortfolio", {
        default: () => "ask",
        watch: true,
    });

    const handleDecision = (decision) => {
        switch (decision) {
            case "ask":
                showModal.value = true;
                break;
            case "access":
                showModal.value = false;
                break;
        }
        accessPortfolio.value = decision;
    };

    if (accessPortfolio.value && accessPortfolio.value !== null) {
        handleDecision(accessPortfolio.value);
    }
</script>

<template>
    <div v-if="showModal">
        <div
            id="popup-modal"
            tabindex="-1"
            class="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-30 flex justify-center items-center w-screen h-screen md:inset-0 backdrop-filter backdrop-blur-md"
        >
            <div class="relative p-4 w-full max-w-xl max-h-full">
                <div
                    class="relative bg-black rounded-lg shadow border-[1px] border-white"
                >
                    <div class="p-4 md:p-5 text-center">
                        <svg
                            class="mx-auto mb-4 text-gray-400 w-12 h-12 dark:text-gray-200"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20"
                        >
                            <path
                                stroke="currentColor"
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 11V6m0 8h.01M19 10a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                        <h3
                            class="my-10 text-lg font-normal text-gray-500 dark:text-gray-400"
                        >
                            Hey there, Site is under construction, but feel free
                            to snoop around. just as long as you don't mind the
                            buttons that don't work yet.
                        </h3>
                        <div class="space-y-4">
                            <button
                                data-modal-hide="popup-modal"
                                type="button"
                                @click="handleDecision('access')"
                                class="btn-inverse w-full hover:!bg-white hover:!text-black hover:!font-bold"
                            >
                                I Don't mind
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
