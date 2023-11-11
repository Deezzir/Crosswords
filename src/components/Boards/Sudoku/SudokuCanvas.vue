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
        },
        setCursorPosition(canvasRect: DOMRect, canvasSize: number, event: MouseEvent) {
            const scaleX = canvasSize / canvasRect.width;
            const scaleY = canvasSize / canvasRect.height;
            const cursorX = (event.clientX - canvasRect.left) * scaleX;
            const cursorY = (event.clientY - canvasRect.top) * scaleY;

            this.$emit('set-cursor', { cursorX: cursorX, cursorY: cursorY, canvasSize: canvasSize });
        }
    },
    data() {
        return {
            clickHandler: null as ((e: MouseEvent) => void) | null
        };
    },
    watch: {
        board: {
            deep: true,
            handler(newBoard) {
                const canvas = this.$refs.sudoku as HTMLCanvasElement;
                canvas.height = canvas.width;
                if (canvas) {
                    newBoard.drawGrid(canvas);
                    if (!newBoard.getPaused() && !this.loading) {
                        newBoard.drawBoard(canvas);
                        newBoard.drawCursor(canvas);
                    }
                }
            }
        }
    },
    mounted() {
        const canvas = this.$refs.sudoku as HTMLCanvasElement;
        canvas.height = canvas.width;

        this.clickHandler = (e) => {
            const canvasRect = canvas.getBoundingClientRect();
            this.setCursorPosition(canvasRect, canvas.height, e);
        };
        canvas.addEventListener('click', this.clickHandler);
        if (canvas) {
            this.board.drawGrid(canvas);
            if (this.board.isBoardValid()) this.board.drawBoard(canvas);
        }
    },
    beforeUnmount() {
        const canvas = this.$refs.sudoku as HTMLCanvasElement;
        if (canvas && this.clickHandler) canvas.removeEventListener('click', this.clickHandler);
    }
});
</script>

<template>
    <div class="relative">
        <canvas
            ref="sudoku"
            :width="900"
            :height="900"
            class="mb-6 w-full border-8 border-[#174dbe] bg-slate-100 dark:bg-slate-300 xl:mb-0"
            :class="{ 'blur-[3px]': board.getPaused() || loading }">
        </canvas>
        <button
            v-if="board.getPaused() && !loading"
            class="absolute left-[50%] top-[50%] -ml-10 -mt-10"
            @click="setPaused(!board.getPaused())">
            <PlayIcon class="text-blue-600" style="width: 5rem; height: 5rem" />
        </button>
        <div v-if="loading" class="absolute left-[50%] top-[50%]">
            <Loader />
        </div>
    </div>
</template>
