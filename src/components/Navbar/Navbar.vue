<script setup lang="ts">
import { defineComponent, ref } from "vue";
import { DisclosureButton, DisclosurePanel, Disclosure } from "@headlessui/vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

import { GitHubIcon } from "@/components/icons";

import NavLogo from "./NavLogo.vue";
import ThemeMode from "./ThemeMode/ThemeMode.vue";
import NavList from "./NavList.vue";
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
    methods: {
        overflow(open: boolean) {
            if (open) {
                document.documentElement.classList.add("overflow-hidden");
            } else {
                document.documentElement.classList.remove("overflow-hidden");
            }
        },
    },
    components: {
        NavList,
        NavLogo,
        ThemeMode,
        DisclosurePanel,
        DisclosureButton,
    },
});
</script>

<template>
    <Disclosure
        as="nav"
        v-slot="{ open }"
        class="sticky top-0 z-40 flex h-[80px] bg-slate-900/[.90] backdrop-blur transition-colors duration-500 dark:border-b dark:border-slate-50/[0.05] dark:bg-slate-800/80">
        <div
            class="m-auto flex w-full items-center justify-between py-3 px-[10vw]">
            <NavLogo />

            <div class="flex items-center">
                <DisclosureButton
                    @click="overflow(!open)"
                    class="rounded-md p-2 text-white sm:hidden">
                    <Bars3Icon v-if="!open" class="block h-10 w-10" />
                    <XMarkIcon v-else class="block h-10 w-10" />
                </DisclosureButton>

                <div class="hidden sm:block">
                    <NavList :navs="navigations" />
                </div>

                <div
                    class="ml-6 hidden items-center border-0 pl-6 sm:inline-flex sm:border-l sm:border-slate-200 sm:dark:border-slate-500/50">
                    <ThemeMode />

                    <a
                        href="https://github.com/Deezzir"
                        class="block text-slate-400 hover:text-slate-300 sm:ml-6">
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
                class="absolute top-[80px] w-full dark:border-b bg-slate-900/[.85] px-[10vw] py-[2vh] dark:border-slate-50/[0.05] dark:bg-slate-800/90 sm:hidden"
                v-slot="{ close }">
                <NavList is-dropdown :navs="navigations" @click="close();overflow(false)" />
                <div
                    class="mt-[2vh] flex border-t border-slate-500/50 pt-[1vh]">
                    <div
                        class="inline-flex grow items-center justify-center space-x-10">
                        <a
                            href="https://github.com/Deezzir"
                            class="block  text-slate-400 hover:text-slate-300 sm:ml-6">
                            <GitHubIcon />
                        </a>
                        <ThemeMode is-dropdown />
                    </div>
                </div>
            </DisclosurePanel>
        </Transition>
    </Disclosure>
</template>
