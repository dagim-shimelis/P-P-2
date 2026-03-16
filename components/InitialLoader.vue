<template>
    <div class="splash-screen flex flex-col items-center justify-center gap-8 bg-[#1c1c1e]">
        <div class="relative w-24 h-24">
            <div class="absolute inset-0 border-2 border-green-400/20 rounded-full animate-[ping_2s_infinite]"></div>
            <div class="absolute inset-0 border-2 border-green-400 rounded-full animate-[spin_3s_linear_infinite]"></div>
            <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-8 h-8 bg-green-400 animate-[pulse_1.5s_infinite]"></div>
            </div>
        </div>
        <div class="font-mono text-xs tracking-[0.5em] text-green-400 uppercase animate-pulse">
            Booting_System_v4
        </div>
    </div>
</template>

<style scoped>
    .splash-screen {
        width: 100vw;
        height: 100vh;
        position: fixed;
        z-index: 50;
    }
</style>
