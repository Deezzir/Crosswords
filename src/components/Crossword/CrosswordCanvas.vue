<script setup lang="ts">
import { ref, onMounted } from "vue";

var crossword = ref<HTMLCanvasElement | null>(null);

onMounted(() => {
    var heightRatio = 4;
    if (crossword.value) {
        crossword.value.height = crossword.value.width * heightRatio;
    }
});
</script>

<template>
    <canvas
        ref="crossword"
        class="w-11/12 border-8 bg-slate-100 border-[#174dbe] dark:bg-slate-300">
    </canvas>
</template>
