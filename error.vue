<script setup>
const props = defineProps({
    error: Object,
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
    <div
        class="relative flex flex-col items-center justify-center min-h-screen bg-[#1c1c1e] text-white font-poppins overflow-hidden w-screen"
    >
        <!-- Dots Engine Background -->
        <Landing-Engine />

        <div class="relative z-10 flex flex-col items-center text-center gap-y-8 px-4">
            <!-- Error Code -->
            <h1
                class="font-['Chakra_Petch'] font-bold text-green-400 leading-none tracking-[-0.02em]"
                style="font-size: clamp(6rem, 15vw, 14rem);"
            >
                {{ error.statusCode }}<span class="text-green-400">.</span>
            </h1>

            <!-- Dashed separator -->
            <div class="w-32 border-t border-dashed border-white/20"></div>

            <!-- Description -->
            <p class="font-mono font-normal uppercase text-center leading-relaxed tracking-[0.12em] text-white/70 max-w-md text-sm">
                <template v-if="error?.statusCode === 404">
                    Oops! Looks like you've wandered into the unknown.
                </template>
                <template v-else>
                    Uh-oh! Looks like something went wrong.
                </template>
            </p>

            <!-- Go Home Button -->
            <button
                @click="handleError"
                class="mt-4 px-8 py-3 font-mono text-sm uppercase tracking-[0.15em] text-green-400 border border-green-400/30 hover:border-green-400 hover:bg-green-400/5 transition-all duration-300"
            >
                Go Home
            </button>
        </div>
    </div>
</template>
