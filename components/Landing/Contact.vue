<script setup></script>

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
                        class="w-full"
                    />
                </div>
                <p class="title-small">me</p>
            </div>
            <!--Contact Form -->

            <form
                class="flex max-w-[900px] mx-auto flex-col items-center justify-center !mt-24 gap-y-32"
            >
                <div class="flex gap-x-16 w-full">
                    <input
                        type="text"
                        placeholder="Name"
                        class="input"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        class="input"
                        required
                    />
                </div>
                <textarea
                    placeholder="Message"
                    class="input h-[200px]"
                    required
                ></textarea>
                <div class="relative group">
                    <button
                        type="submit"
                        class="btn"
                    >
                        Send
                    </button>
                    <div
                        class="absolute -bottom-20 -right-80 group-hover:-translate-x-8 ease-in-out duration-300"
                    >
                        <img
                            src="@/assets/image/graphic-lines/arrow-3.png"
                            alt="graphic-lines-arrow-3"
                            :draggable="false"
                        />
                    </div>
                </div>
            </form>
        </div>

        <!-- /* ------------------------------ Graphic lines ----------------------------- */ -->
        <div class="absolute bottom-0 left-0">
            <img
                src="@/assets/image/graphic-lines/landing-8.png"
                alt="graphic-lines-landing-0"
                :draggable="false"
            />
        </div>
    </div>
</template>

<style scoped></style>
