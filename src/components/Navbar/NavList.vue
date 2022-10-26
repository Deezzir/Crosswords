<script setup lang="ts">
import { defineComponent } from 'vue'
import type { Navigation } from './navbar';
import NavItem from './NavItem.vue';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        navs: {
            type: Array<Navigation>,
            required: true,
        },
    },
    components: { NavItem }
});
</script>

<template>
    <ul class="flex space-x-10 text-2xl leading-6 text-black dark:text-white">
        <li v-for="nav in navs" :class="[nav.current ? 'bg-slate-900' : ' dark:hover:bg-slate-700 hover:bg-slate-200 hover:opacity-70', 'px-[1.2vw] py-[15px] rounded-md']">
            <NavItem :nav="nav" />
        </li>
    </ul>
</template>