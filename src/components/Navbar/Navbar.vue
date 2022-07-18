<script setup lang="ts">
import { defineComponent } from 'vue'
import ThemeMode from "./ThemeMode/ThemeMode.vue";

import {
    GitHubIcon
} from '@/components/icons';
import LightModeIcon from '@/components/icons/LightModeIcon.vue';
import DarkModeIcon from '@/components/icons/DarkModeIcon.vue';
import NavLogo from './NavLogo.vue';
import NavList from './NavList.vue';
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            isHidden: true,
        };
    },
});
</script>

<template>
    <div
        class="sticky top-0 z-40 w-full dark:bg-transparent backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-500/50 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60">
        <div class="mx-auto max-w-7xl">
            <div class="py-3 px-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 lg:mx-0">
                <div class="relative flex items-center">

                    <NavLogo />

                    <div class="relative flex items-center ml-auto">

                        <NavList />

                        <div class="flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-500/50">
                            <button type="button" @click="isHidden = !isHidden" @blur.native="isHidden = false">
                                <span class="dark:hidden">
                                    <LightModeIcon isActive />
                                </span>
                                <span class="hidden dark:inline">
                                    <DarkModeIcon isActive />
                                </span>
                                <ThemeMode :isHidden="isHidden" />
                            </button>


                            <a href="https://github.com/Deezzir"
                                class="ml-6 block text-slate-400 hover:text-slate-500 dark:hover:text-slate-300">
                                <GitHubIcon />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>