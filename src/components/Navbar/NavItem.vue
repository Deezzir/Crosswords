<script setup lang="ts">
import { defineComponent } from 'vue'
</script>

<script lang="ts">
export default defineComponent({
    props: {
        nav: {
            type: Object as () => Navigation,
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