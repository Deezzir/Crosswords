<script setup lang="ts">
import { defineComponent } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline'

import { GitHubIcon, LightModeIcon, DarkModeIcon } from '@/components/icons';

import NavLogo from './NavLogo.vue';
import ThemeMode from "./ThemeMode/ThemeMode.vue";
import NavList from './NavList.vue';
import NavDrop from './NavDrop.vue';

</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            isHidden: true,
            navigations: [
                {
                    name: "Play",
                    href: "/",
                    current: true,
                },
                {
                    name: "About",
                    href: "/about",
                    current: false,
                },
            ] as Navigation[],
        };
    },
    components: { NavList, NavLogo, ThemeMode, NavDrop },
});
</script>

<template>
    <Disclosure as="nav" v-slot="{ open }"
        class="sticky top-0 z-40 h-[80px] flex nav-pane">
        <div class="w-full m-auto py-3 px-[10vw] flex items-center justify-between">
            <NavLogo />

            <div class="flex items-center">
                <DisclosureButton class="rounded-md p-2 text-white sm:hidden">
                    <Bars3Icon v-if="!open" class="block h-10 w-10" />
                    <XMarkIcon v-else class="block h-10 w-10" />
                </DisclosureButton>

                <div class="hidden sm:block">
                    <NavList :navs="navigations" />
                </div>

                <div class="inline-flex items-center border-l border-slate-200 ml-6 pl-6 dark:border-slate-500/50">
                    <button type="button" @click="isHidden = !isHidden" @blur.native="isHidden = true">
                        <span class="dark:hidden">
                            <LightModeIcon isActive />
                        </span>
                        <span class="hidden dark:inline">
                            <DarkModeIcon isActive />
                        </span>
                        <ThemeMode :isHidden="isHidden" />
                    </button>

                    <a href="https://github.com/Deezzir"
                        class="ml-6 block text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                        <GitHubIcon />
                    </a>
                </div>
            </div>
        </div>

        <DisclosurePanel class="sm:hidden absolute top-[80px] px-[10vw] py-[2vh] w-full nav-pane">
            <NavDrop :navs="navigations"/>
        </DisclosurePanel>
    </Disclosure>
</template>

<style scoped>
    .nav-pane {
        @apply dark:bg-transparent backdrop-blur transition-colors duration-500 border-b border-slate-500/50 dark:border-slate-50/[0.05] bg-slate-100/50;
        @apply supports-[backdrop-blur]:bg-white/60;
    }
</style>
