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
    mounted: function () {
        this.selectedTheme = this.getTheme();
    },
    components: { Listbox, ListboxButton, ListboxOptions },
});
</script>

<template>
    <Listbox v-model="selectedTheme">
        <ListboxButton>
            <span class="dark:hidden">
                <LightModeIcon isActive />
            </span>
            <span class="hidden dark:inline">
                <DarkModeIcon isActive />
            </span>
        </ListboxButton>

        <Transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0">
            <ListboxOptions
                class="text-md dark:highlight-white/5 absolute top-[70%] right-[10vw] z-50 mt-8 w-36 overflow-hidden rounded-lg bg-slate-100 py-2 text-slate-700 shadow-lg ring-1 ring-slate-900/10 dark:bg-slate-700 dark:text-slate-300 dark:ring-0">
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
</template>
