<script setup lang="ts">
import { defineComponent, type PropType } from "vue";
import type { Navigation } from "./navbar";
</script>

<script lang="ts">
export default defineComponent({
    props: {
        nav: {
            type: Object as PropType<Navigation>,
            required: true,
        },
    },
});
</script>

<template>
    <RouterLink :to="nav.href">
        {{ nav.name }}
    </RouterLink>
</template>