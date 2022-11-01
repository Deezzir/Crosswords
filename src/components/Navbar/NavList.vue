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
    components: {
        NavItem,
    },
});
</script>

<template>
    <div class="hidden sm:block">
        <ul class="flex space-x-10 text-2xl leading-6 text-white">
            <li v-for="nav in navs">
                <NavItem :nav="nav" />
            </li>
        </ul>
    </div>
</template>
