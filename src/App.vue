<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
    <div
        class="sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent">
        <div class="max-w-8xl mx-auto">
            <div class="py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0">
                <div class="relative flex items-center">
                    <a class="mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto" href="/">
                        <svg viewBox="0 0 248 31" class="text-slate-900 dark:text-white w-auto h-5">
                            <image xlink:href="your.svg" src="yourfallback.png" width="90" height="90" />
                        </svg>
                        <span>Crosswords</span>
                    </a>
                    <nav>
                        <RouterLink to="/">Play</RouterLink>
                        <RouterLink to="/about">About</RouterLink>
                    </nav>
                </div>
            </div>
        </div>
    </div>

    <RouterView />
</template>
