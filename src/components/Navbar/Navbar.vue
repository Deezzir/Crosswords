<script setup lang="ts">
import { defineComponent } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

import { GitHubIcon } from "@/components/icons";

import NavLogo from "./NavLogo.vue";
import ThemeMode from "./ThemeMode/ThemeMode.vue";
import NavList from "./NavList.vue";
import NavDrop from "./NavDrop.vue";
import type { Navigation } from "./navbar";
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
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
    watch: {
        $route() {
            this.navigations.forEach((nav) => {
                nav.current = nav.href === this.$route.path;
            });
        },
    },
    components: { NavList, NavLogo, ThemeMode, NavDrop },
});
</script>

<template>
    <Disclosure
        as="nav"
        v-slot="{ open }"
        class="sticky top-0 z-40 flex h-[80px] border-b border-slate-500/50 bg-slate-200/50 backdrop-blur transition-colors duration-500 dark:border-slate-50/[0.05] dark:bg-slate-800/80">
        <div
            class="m-auto flex w-full items-center justify-between py-3 px-[10vw]">
            <NavLogo />

            <div class="flex items-center">
                <DisclosureButton
                    class="rounded-md p-2 text-black dark:text-white sm:hidden">
                    <Bars3Icon v-if="!open" class="block h-10 w-10" />
                    <XMarkIcon v-else class="block h-10 w-10" />
                </DisclosureButton>

                <div class="hidden sm:block">
                    <NavList :navs="navigations" />
                </div>

                <div
                    class="ml-6 inline-flex items-center border-l border-slate-200 pl-6 dark:border-slate-500/50">
                    <ThemeMode />

                    <a
                        href="https://github.com/Deezzir"
                        class="ml-6 block text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300">
                        <GitHubIcon />
                    </a>
                </div>
            </div>
        </div>

        <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <DisclosurePanel
                class="absolute top-[80px] w-full border-b border-slate-500/50 bg-slate-200/50 px-[10vw] py-[2vh] dark:border-slate-50/[0.05] dark:bg-slate-800/80 sm:hidden"
                v-slot="{ close }">
                <NavDrop :navs="navigations" @click="close()" />
            </DisclosurePanel>
        </Transition>
    </Disclosure>
</template>
