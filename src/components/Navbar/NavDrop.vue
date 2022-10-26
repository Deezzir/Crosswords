<script setup lang="ts">
import { defineComponent } from 'vue'
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
    <ul class="flex flex-col text-black dark:text-white">
        <li v-for="item in navs">
            <NavItem :nav="item" />
        </li>
    </ul>
</template>