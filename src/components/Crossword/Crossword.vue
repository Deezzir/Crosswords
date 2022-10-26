<script setup lang="ts">
import CrosswordCanvas from './CrosswordCanvas.vue';
import CrosswordPlay from './CrosswordPlay.vue';
</script>

<template>
    <div class="grid grid-cols-1 gap-10 lg:grid-cols-2 items-center justify-items-center">
        <CrosswordCanvas />
        <CrosswordPlay />
    </div>
</template>