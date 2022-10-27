<script setup lang="ts">
import CrosswordCanvas from "./CrosswordCanvas.vue";
import CrosswordPlay from "./CrosswordPlay.vue";
</script>

<template>
    <div
        class="grid grid-cols-1 items-center justify-items-center gap-10 lg:grid-cols-2">
        <CrosswordCanvas />
        <CrosswordPlay />
    </div>
</template>
