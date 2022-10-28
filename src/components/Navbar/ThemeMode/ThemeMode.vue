<script setup lang="ts">
import { defineAsyncComponent, defineComponent, markRaw, ref } from "vue";
import ThemeModeOption from "./ThemeModeOption.vue";
import {
    Listbox,
    ListboxButton,
    ListboxOptions,
    ListboxOption,
} from "@headlessui/vue";
import { LightModeIcon, DarkModeIcon } from "@/components/icons";
import { ChevronUpDownIcon } from "@heroicons/vue/20/solid";
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            themes: {
                light: {
                    name: "Light",
                    icon: markRaw(
                        defineAsyncComponent(
                            () => import("@/components/icons/LightModeIcon.vue")
                        )
                    ),
                },
                dark: {
                    name: "Dark",
                    icon: markRaw(
                        defineAsyncComponent(
                            () => import("@/components/icons/DarkModeIcon.vue")
                        )
                    ),
                },
                system: {
                    name: "System",
                    icon: markRaw(
                        defineAsyncComponent(
                            () =>
                                import("@/components/icons/SystemModeIcon.vue")
                        )
                    ),
                },
            },
            selectedTheme: ref(),
        };
    },
    props: {
        isDropdown: {
            type: Boolean,
            default: false,
        },
    },
    methods: {
        setTheme(name: String) {
            name = name.toLowerCase();
            localStorage.theme = name;
            if (name === "system") localStorage.removeItem("theme");
            if (
                localStorage.theme === "dark" ||
                (!("theme" in localStorage) &&
                    window.matchMedia("(prefers-color-scheme: dark)").matches)
            ) {
                document.documentElement.classList.add("dark");
            } else {
                document.documentElement.classList.remove("dark");
            }
        },
        getTheme() {
            if ("theme" in localStorage) {
                if (localStorage.theme === "dark") return ref(this.themes.dark);
                else return ref(this.themes.light);
            } else {
                return ref(this.themes.system);
            }
        },
    },
    mounted() {
        this.selectedTheme = this.getTheme();
    },
    components: { Listbox, ListboxButton, ListboxOptions },
});
</script>

<template>
    <div class="relative">
        <Listbox v-model="selectedTheme">
            <ListboxButton
                class="inline-flex items-center"
                :class="
                    isDropdown &&
                    'rounded-xl bg-white/[0.85] p-2 shadow-sm ring-1 ring-slate-900/30 dark:bg-slate-900/50 dark:text-white dark:ring-0'
                ">
                <span>
                    <LightModeIcon
                        :isActive="!isDropdown"
                        class="inline dark:hidden" />
                    <DarkModeIcon
                        :isActive="!isDropdown"
                        class="hidden dark:inline" />
                </span>
                <span
                    v-if="selectedTheme && isDropdown"
                    class="min-w-[6rem] pl-3 text-2xl">
                    {{ selectedTheme.name }}
                </span>
                <span v-show="isDropdown" class="pointer-events-none pl-4">
                    <ChevronUpDownIcon
                        class="h-7 w-7 text-black dark:text-gray-300"
                        aria-hidden="true" />
                </span>
            </ListboxButton>

            <Transition
                leave-active-class="transition duration-100 ease-in"
                leave-from-class="opacity-100"
                leave-to-class="opacity-0">
                <ListboxOptions
                    class="absolute top-[100%] z-50 overflow-hidden rounded-lg bg-slate-100 py-2 text-lg text-slate-700 shadow-lg ring-1 ring-slate-900/20 dark:bg-slate-700 dark:text-slate-300 dark:ring-0"
                    :class="
                        isDropdown
                            ? 'list-drop mt-2'
                            : 'left-[-8px] mt-7 w-[10rem]'
                    ">
                    <ListboxOption
                        v-for="theme in themes"
                        :value="theme"
                        v-slot="{ selected }">
                        <ThemeModeOption
                            @click="setTheme(theme.name)"
                            :isActive="selected">
                            <template #icon>
                                <component
                                    class="mr-2"
                                    :isActive="selected"
                                    :is="theme.icon" />
                            </template>
                            {{ theme.name }}
                        </ThemeModeOption>
                    </ListboxOption>
                </ListboxOptions>
            </Transition>
        </Listbox>
    </div>
</template>

<style>
.list-drop {
    width: 12.75rem;
}
</style>
