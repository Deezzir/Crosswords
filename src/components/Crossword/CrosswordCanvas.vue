<script setup lang="ts">
import { defineComponent, onMounted, ref } from "vue";

var crossword = ref<HTMLCanvasElement | null>(null);
const gridSize = 18;

const drawGrid = (crossword: HTMLCanvasElement) => {
    let ctx = crossword.getContext("2d");
    let size = crossword.width;

    if (!ctx) return;

    let squareSize = Math.floor(size / (gridSize + 0.25));
    let paddingX = size - gridSize * squareSize;
    let paddingY = size - gridSize * squareSize;

    let paddingL = Math.ceil(paddingX / 2) - 0.5;
    let paddingT = Math.ceil(paddingY / 2) - 0.5;
    let paddingR = size - gridSize * squareSize - paddingL;
    let paddingB = size - gridSize * squareSize - paddingT;

    ctx.strokeStyle = "gray";
    ctx.lineWidth = 0.5;

    ctx.beginPath();
    for (var x = paddingL; x <= size - paddingR; x += squareSize) {
        ctx.moveTo(x, paddingT);
        ctx.lineTo(x, size - paddingB);
    }
    for (var y = paddingT; y <= size - paddingB; y += squareSize) {
        ctx.moveTo(paddingL, y);
        ctx.lineTo(size - paddingR, y);
    }
    ctx.stroke();
};

onMounted(() => {
    if (crossword.value) {
        crossword.value.height = crossword.value.width;
        console.log(crossword.value.width);
        drawGrid(crossword.value);
    }
});
</script>

<template>
    <div>
        <canvas
            ref="crossword"
            :width="800"
            :height="800"
            class="w-full border-8 border-[#174dbe] bg-slate-100 dark:bg-slate-300">
        </canvas>
    </div>
</template>
