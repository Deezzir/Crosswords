<script setup lang="ts">
import { defineComponent } from 'vue';
import { CrosswordsBoard } from './crosswords';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        board: {
            type: CrosswordsBoard,
            required: true
        }
    },
    data() {
        return {
            canvas: null as HTMLCanvasElement | null
        };
    },
    mounted() {
        this.canvas = this.$refs.crossword as HTMLCanvasElement;
        this.canvas.height = this.canvas.width;
        if (this.canvas) {
            this.board.drawGrid(this.canvas);
        }
    }
});
</script>

<template>
    <div>
        <canvas
            ref="crossword"
            :width="740"
            :height="740"
            class="mb-8 w-full border-8 border-[#174dbe] bg-slate-100 dark:bg-slate-300 sm:mb-0">
        </canvas>
    </div>
</template>
