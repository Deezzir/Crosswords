<script setup lang="ts">
import { PlayIcon } from '@/components/Icons';
import { defineComponent } from 'vue';
import { SudokuBoard } from './sudoku';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        board: {
            type: SudokuBoard,
            required: true
        }
    },
    data() {
        return {
            canvas: null as HTMLCanvasElement | null
        };
    },
    methods: {
        setPaused(paused: boolean) {
            this.$emit('set-paused', paused);
        }
    },
    watch: {
        board: {
            immediate: true,
            deep: true,
            handler(newBoard, oldBoard) {
                if (newBoard !== oldBoard) {
                    if (this.canvas) {
                        newBoard.drawGrid(this.canvas);
                        if (!newBoard.getPaused()) newBoard.drawBoard(this.canvas);
                    }
                }
            }
        }
    },
    mounted() {
        this.canvas = this.$refs.sudoku as HTMLCanvasElement;
        this.canvas.height = this.canvas.width;
        if (this.canvas) {
            this.board.drawGrid(this.canvas);
            if (this.board.isBoardValid()) this.board.drawBoard(this.canvas);
        }
    }
});
</script>

<template>
    <div class="relative">
        <canvas
            ref="sudoku"
            :width="740"
            :height="740"
            class="mb-8 w-full border-8 border-[#174dbe] bg-slate-100 dark:bg-slate-300 sm:mb-0"
            :class="{ 'blur-[2px]': board.getPaused() }">
        </canvas>
        <button
            v-if="board.getPaused()"
            class="absolute left-[50%] top-[50%] -translate-x-10 -translate-y-10"
            @click="setPaused(!board.getPaused())">
            <PlayIcon class="text-blue-600" style="width: 5rem; height: 5rem" />
        </button>
    </div>
</template>
