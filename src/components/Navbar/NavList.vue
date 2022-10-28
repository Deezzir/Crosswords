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
        isDropdown: {
            type: Boolean,
            default: false,
        },
    },
    components: { NavItem },
});
</script>

<template>
    <ul
        :class="[
            isDropdown ? 'flex-col items-center' : 'space-x-10 leading-6',
            'flex text-2xl text-slate-800 dark:text-white',
        ]">
        <li
            v-for="nav in navs"
            :class="isDropdown && 'inline-flex h-[40px] w-full text-center'">
            <NavItem
                :nav="nav"
                class="rounded-md"
                :class="[
                    nav.current
                        ? 'bg-slate-200 dark:bg-slate-900'
                        : 'hover:bg-slate-200 hover:opacity-70 dark:hover:bg-slate-700',
                    isDropdown
                        ? 'grow px-[0.8vw] py-[1.2vh]'
                        : 'px-[1.2vw] py-[15px]',
                ]" />
        </li>
    </ul>
</template>
