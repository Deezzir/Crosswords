<script setup lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { Navigation } from './navbar';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        nav: {
            type: Object as PropType<Navigation>,
            required: true
        },
        isDropdown: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<template>
    <RouterLink
        class="rounded-md"
        :class="[
            nav.current
                ? 'bg-slate-100 text-black dark:bg-slate-900 dark:text-white'
                : 'hover:bg-slate-700/80  hover:opacity-70 dark:hover:bg-slate-700',
            isDropdown ? 'grow px-[0.8vw] py-[1.2vh]' : 'px-[1.2vw] py-[15px]'
        ]"
        :to="nav.href">
        {{ nav.name }}
    </RouterLink>
</template>
