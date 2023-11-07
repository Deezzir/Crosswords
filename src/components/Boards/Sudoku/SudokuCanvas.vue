<script setup lang="ts">
import { onMounted, ref } from 'vue';

const crossword = ref<HTMLCanvasElement | null>(null);
const gridSize = 9;

const drawGrid = (crossword: HTMLCanvasElement) => {
    const ctx = crossword.getContext('2d');
    const size = crossword.width;

    if (!ctx) return;

    const squareSize = Math.floor(size / (gridSize + 0.5));
    const padding = size - gridSize * squareSize;

    const paddingL = padding / 2;
    const paddingT = padding / 2;
    const paddingR = size - gridSize * squareSize - paddingL;
    const paddingB = size - gridSize * squareSize - paddingT;

    for (let i = 0; i < gridSize + 1; i++) {
        ctx.beginPath();
        console.log(i % 3 === 0);
        ctx.strokeStyle = i % 3 === 0 ? 'black' : 'gray';
        ctx.lineWidth = 1;

        const x = paddingL + i * squareSize;
        const y = paddingT + i * squareSize;

        // Draw vertical lines
        ctx.moveTo(x, paddingT);
        ctx.lineTo(x, size - paddingB);

        // Draw horizontal lines
        ctx.moveTo(paddingL, y);
        ctx.lineTo(size - paddingR, y);
        ctx.stroke();
    }
};

onMounted(() => {
    if (crossword.value) {
        crossword.value.height = crossword.value.width;
        drawGrid(crossword.value);
    }
});
</script>

<template>
    <div>
        <canvas
            ref="crossword"
            :width="740"
            :height="740"
            class="w-full border-8 border-[#174dbe] bg-slate-100 dark:bg-slate-300">
        </canvas>
    </div>
</template>
