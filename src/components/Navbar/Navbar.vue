<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent, ref } from 'vue';
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue';
import { Bars3Icon, XMarkIcon } from '@heroicons/vue/24/outline';

import NavLogo from './NavLogo.vue';
import NavItem from './NavItem.vue';
import ThemeMode from './ThemeMode/ThemeMode.vue';
import NavList from './NavList.vue';

import type { Navigation } from './navbar';

const menuButton = ref<typeof MenuButton | null>(null);
const toggleMenu = () => {
    if (menuButton.value) {
        menuButton.value.$el.click();
    }
};
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            navigations: [
                {
                    id: 1,
                    name: 'Play',
                    href: '/',
                    current: true
                },
                {
                    id: 2,
                    name: 'About',
                    href: '/about',
                    current: false
                }
            ] as Navigation[]
        };
    },
    watch: {
        $route() {
            this.navigations.forEach((nav) => {
                nav.current = nav.href === this.$route.path;
            });
        }
    },
    methods: {
        overflow(open: boolean) {
            if (open) {
                document.documentElement.classList.add('overflow-hidden');
            } else {
                document.documentElement.classList.remove('overflow-hidden');
            }
        }
    }
});
</script>

<template>
    <Menu
        as="nav"
        v-slot="{ open }"
        class="sticky top-0 z-40 flex h-[80px] bg-slate-900/[.90] backdrop-blur transition-colors duration-500 border-0 dark:border-b dark:border-slate-50/[0.05] dark:bg-slate-800/80">
        <div class="m-auto flex w-full items-center justify-between py-3 px-[10vw]">
            <NavLogo />

            <div class="flex items-center">
                <MenuButton ref="menuButton" @click="overflow(!open)" class="rounded-md p-2 text-white sm:hidden">
                    <Bars3Icon v-if="!open" class="block h-10 w-10" />
                    <XMarkIcon v-else class="block h-10 w-10" />
                </MenuButton>

                <NavList :navs="navigations" />
                <ThemeMode />
            </div>
        </div>

        <Transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <MenuItems
                class="absolute top-[80px] flex w-full flex-col items-center space-y-5 bg-slate-900/[.85] px-[10vw] py-[2vh] text-2xl text-white dark:border-b dark:border-slate-50/[0.05] dark:bg-slate-800/90 sm:hidden">
                <MenuItem
                    v-for="nav in navigations"
                    :key="nav.id"
                    @click="toggleMenu(), overflow(false)"
                    class="inline-flex h-[45px] w-full items-center justify-center text-center">
                    <NavItem :nav="nav" is-dropdown />
                </MenuItem>

                <div class="mt-[2vh] flex border-t border-slate-500/50 pt-[1vh]">
                    <ThemeMode is-dropdown />
                </div>
            </MenuItems>
        </Transition>
    </Menu>
</template>
