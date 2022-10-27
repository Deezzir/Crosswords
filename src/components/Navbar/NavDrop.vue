<script setup lang="ts">
import { defineComponent } from "vue";
import type { Navigation } from "./navbar";
import NavItem from "./NavItem.vue";
</script>

<script lang="ts">
export default defineComponent({
    props: {
        navs: {
            type: Array<Navigation>,
            required: true,
        },
    },
    components: { NavItem },
});
</script>

<template>
    <ul
        class="flex flex-col items-center text-2xl text-slate-800 dark:text-white">
        <li v-for="nav in navs" class="inline-flex h-[40px] w-full text-center">
            <NavItem
                :nav="nav"
                :class="[
                    nav.current
                        ? 'bg-slate-200 dark:bg-slate-900'
                        : ' hover:bg-slate-200 hover:opacity-70 dark:hover:bg-slate-700',
                    'grow rounded-md px-[0.8vw] py-[1.2vh]',
                ]" />
        </li>
    </ul>
</template>
