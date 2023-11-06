<script lang="ts">
import { defineComponent } from 'vue';
export default defineComponent({
    props: {
        isActive: Boolean
    }
});
</script>

<template>
    <li
        :class="isActive && 'bg-slate-200 dark:bg-slate-600/30'"
        class="flex cursor-pointer items-center py-1 px-2 hover:bg-slate-50 dark:hover:bg-slate-600/30">
        <slot name="icon"></slot>
        <p :class="isActive && 'text-blue-400'" class="text-xl"><slot></slot></p>
    </li>
</template>
