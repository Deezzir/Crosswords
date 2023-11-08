<script setup lang="ts">
import { defineComponent } from 'vue';
</script>

<script lang="ts">
const gridSize = 9;

export default defineComponent({
    props: {
        board: {
            type: String,
            required: true
        }
    },
    methods: {
        drawGrid() {
            const canvas = this.$refs.sudoku as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            const size = canvas.width;

            if (!ctx) return;

            const squareSize = Math.floor(size / (gridSize + 0.5));
            const padding = size - gridSize * squareSize;

            const paddingL = padding / 2;
            const paddingT = padding / 2;
            const paddingR = size - gridSize * squareSize - paddingL;
            const paddingB = size - gridSize * squareSize - paddingT;

            for (let i = 0; i < gridSize + 1; i++) {
                ctx.beginPath();
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
        },
        drawBoard() {
            const canvas = this.$refs.sudoku as HTMLCanvasElement;
            const ctx = canvas.getContext('2d');
            const size = canvas.width;

            if (!ctx) return;

            const squareSize = Math.floor(size / (gridSize + 0.5));
            const padding = size - gridSize * squareSize;

            const paddingL = padding / 2;
            const paddingT = padding / 2;

            ctx.font = `${squareSize}px sans-serif`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            for (let row = 0; row < gridSize; row++) {
                for (let col = 0; col < gridSize; col++) {
                    const value = this.board[row * gridSize + col];
                    if (value === '.') continue;

                    const x = paddingL + col * squareSize + squareSize / 2;
                    const y = paddingT + row * squareSize + squareSize / 2;

                    ctx.fillText(value.toString(), x, y + 6);
                }
            }
        }
    },
    mounted() {
        this.$nextTick(() => {
            const canvas = this.$refs.sudoku as HTMLCanvasElement;
            if (canvas) {
                canvas.height = canvas.width;
                this.drawGrid();
                this.drawBoard();
            }
        });
    }
});
</script>

<template>
    <div>
        <canvas
            ref="sudoku"
            :width="740"
            :height="740"
            class="mb-8 w-full border-8 border-[#174dbe] bg-slate-100 dark:bg-slate-300 sm:mb-0">
        </canvas>
    </div>
</template>
