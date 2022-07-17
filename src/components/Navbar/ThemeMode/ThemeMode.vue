<script setup lang="ts">
import { defineAsyncComponent, defineComponent, markRaw } from "vue"
import ThemeModeOption from "./ThemeModeOption.vue";
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            themes: [
                { name: 'Light', icon: markRaw(defineAsyncComponent(() => import('@/components/icons/LightModeIcon.vue') )) },
                { name: 'Dark', icon: markRaw(defineAsyncComponent(() => import('@/components/icons/DarkModeIcon.vue') )) },
                { name: 'System', icon: markRaw(defineAsyncComponent(() => import('@/components/icons/SystemModeIcon.vue') )) },
            ]
        }
    },
    methods: {
        setTheme(name: String) {
            localStorage.theme = name;
            if (name === "system")
                localStorage.removeItem('theme');

            if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                document.documentElement.classList.add('dark')
            } else {
                document.documentElement.classList.remove('dark')
            }
        },
    },
    props: {
        isHidden: Boolean
    }
});
</script>

<template>
    <ul :class="{ hidden: isHidden }"
        class="absolute z-50 top-full right-0 bg-white rounded-lg ring-1 ring-slate-900/10 shadow-lg overflow-hidden w-36 py-1 text-sm text-slate-700 font-semibold dark:bg-slate-800 dark:ring-0 dark:highlight-white/5 dark:text-slate-300 mt-8">
        <ThemeModeOption v-for="theme in themes" @click="setTheme(theme.name.toLowerCase())">
            <template #icon>
                <component class="mr-2" :is="theme.icon" />
            </template>
            {{ theme.name }}
        </ThemeModeOption>
    </ul>
</template>