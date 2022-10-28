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
            isDropdown ? 'flex-col items-center space-y-5' : 'space-x-10 leading-6',
            'flex text-2xl text-white',
        ]">
        <li
            v-for="nav in navs"
            :class="isDropdown && 'inline-flex h-[45px] w-full text-center items-center'">
            <NavItem
                :nav="nav"
                class="rounded-md"
                :class="[
                    nav.current
                        ? 'bg-slate-100 dark:bg-slate-900 text-black dark:text-white'
                        : 'hover:bg-slate-800/80  hover:opacity-70 dark:hover:bg-slate-700',
                    isDropdown
                        ? 'grow px-[0.8vw] py-[1.2vh]'
                        : 'px-[1.2vw] py-[15px]',
                ]" />
        </li>
    </ul>
</template>
