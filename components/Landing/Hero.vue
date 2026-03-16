<script setup></script>

<template>
    <div class="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
        <Landing-Engine />

        <div class="relative z-10 flex flex-col items-center text-center w-full" id="hero">
            <div class="flex flex-col items-center gap-y-12 max-w-5xl px-4">

                <!-- Title — twice as big -->
                <div class="flex flex-col items-center">
                    <h1
                        class="[font-size:clamp(4rem,12vw,12rem)] font-bold tracking-[-0.04em] leading-[0.85] [text-shadow:0_0_80px_rgba(28,28,30,1),0_0_160px_rgba(28,28,30,0.8)] text-white uppercase"
                    >
                        Dagim<span class="text-green-400">.</span>
                    </h1>
                </div>

                <!-- Subtitle — runreal-sized (~32px on desktop) -->
                <p class="[font-size:clamp(2rem,3vw,3.5rem)] font-normal tracking-[-0.02em] [text-shadow:0_0_40px_rgba(28,28,30,1),0_0_80px_rgba(28,28,30,0.9)] text-white text-center leading-snug max-w-3xl">
                    Full-Stack Developer &amp; UI/UX Designer
                </p>

                <!-- Description — mono, muted -->
                <p class="font-mono font-normal uppercase text-center leading-relaxed tracking-[0.12em] text-white max-w-xl">
                    Architecting digital experiences with
                    precision and creativity
                </p>

                <!-- Dashed separator -->
                <div class="w-44 border-t border-dashed border-white/20"></div>

                <!-- CTA -->
                <!-- <div class="flex items-center gap-x-16">
                    <router-link
                        to="#projects"
                        class="[font-size:clamp(0.7rem,1vw,0.85rem)] [text-shadow:0_0_20px_rgba(28,28,30,1),0_0_40px_rgba(28,28,30,0.9)] font-mono uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors"
                    >
                        Explore Projects
                    </router-link>
                    <router-link
                        to="#contact"
                        class="[font-size:clamp(0.7rem,1vw,0.85rem)] [text-shadow:0_0_20px_rgba(28,28,30,1),0_0_40px_rgba(28,28,30,0.9)] font-mono uppercase tracking-[0.12em] text-white/70 hover:text-white transition-colors"
                    >
                        Contact
                    </router-link>
                </div> -->
            </div>
        </div>
    </div>
</template>
