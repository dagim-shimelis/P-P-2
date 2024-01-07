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
                        class="title-underline"
                    />
                </div>
                <p class="title-small">me</p>
            </div>
            <!--Contact Form -->

            <form
                accept-charset="utf-8"
                action="https://formspree.io/f/xgejjbzg"
                method="post"
                class="pb-36 lg:pb-60 4xl:pb-0 flex max-w-[900px] mx-auto flex-col items-center justify-center !mt-24 gap-y-16 md:gap-y-32"
            >
                <div class="flex flex-col md:flex-row gap-16 w-full">
                    <input
                        name="name"
                        type="text"
                        placeholder="Name"
                        class="input"
                        required
                    />
                    <input
                        name="email"
                        type="email"
                        placeholder="Email"
                        class="input"
                        required
                    />
                </div>
                <textarea
                    name="message"
                    placeholder="Message"
                    class="input h-[200px]"
                    required
                ></textarea>
                <div class="relative group w-full md:w-fit">
                    <button
                        type="submit"
                        class="btn !w-full"
                    >
                        Send
                    </button>
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
