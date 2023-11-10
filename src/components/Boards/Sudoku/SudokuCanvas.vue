<script setup lang="ts">
import { PlayIcon } from '@/components/Icons';
import { defineComponent } from 'vue';
import Loader from '@/components/Boards/Common/Loader.vue';
import { SudokuBoard } from './sudoku';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        board: {
            type: SudokuBoard,
            required: true
        },
        loading: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        setPaused(paused: boolean) {
            this.$emit('set-paused', paused);
        }
    },
    watch: {
        board: {
            deep: true,
            handler(newBoard) {
                const canvas = this.$refs.sudoku as HTMLCanvasElement;
                canvas.height = canvas.width;
                if (canvas) {
                    newBoard.drawGrid(canvas);
                    if (!newBoard.getPaused()) newBoard.drawBoard(canvas);
                }
            }
        }
    },
    mounted() {
        const canvas = this.$refs.sudoku as HTMLCanvasElement;
        canvas.height = canvas.width;
        if (canvas) {
            this.board.drawGrid(canvas);
            if (this.board.isBoardValid()) this.board.drawBoard(canvas);
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
            :class="{ 'blur-[3px]': board.getPaused() || loading }">
        </canvas>
        <button
            v-if="board.getPaused() && !loading"
            class="absolute left-[50%] top-[50%] -translate-x-10 -translate-y-10"
            @click="setPaused(!board.getPaused())">
            <PlayIcon class="text-blue-600" style="width: 5rem; height: 5rem" />
        </button>
        <div v-if="loading" class="absolute left-[50%] top-[50%]">
            <Loader />
        </div>
    </div>
</template>
