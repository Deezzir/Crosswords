<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    props: {
        isActive: Boolean
    }
});
</script>

<template>
    <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="w-12 h-12 sm:w-10 sm:h-10">
        <path
            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
            :class="!isActive ? 'stroke-slate-400 dark:stroke-slate-500' : 'fill-sky-400/20 stroke-sky-500'"></path>
        <path
            d="M12 4v1M17.66 6.344l-.828.828M20.005 12.004h-1M17.66 17.664l-.828-.828M12 20.01V19M6.34 17.664l.835-.836M3.995 12.004h1.01M6 6l.835.836"
            :class="!isActive ? 'stroke-slate-400 dark:stroke-slate-500' : 'stroke-sky-500'"></path>
    </svg>
</template>
