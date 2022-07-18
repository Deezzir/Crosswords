<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
    props: {
        isActive: Boolean
    }
});
</script>

<template>
    <li class="active py-1 px-2 flex items-center cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-600/30">
        <slot name="icon"></slot>
        <p><slot></slot></p>
    </li>
</template>

<style>
    li.active p {
        @apply text-blue-500
    }

    li.active {
        @apply dark:bg-slate-600/30 bg-slate-50
    }
</style>