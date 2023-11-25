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
        }
    },
    methods: {
        setPaused(paused: boolean) {
            this.$emit('set-paused', paused);
        },
        setCursorPosition(canvasRect: DOMRect, canvas: HTMLCanvasElement, event: MouseEvent) {
            const sizes = this.board.calculateSizes(canvas);

            const scaleX = sizes.width / canvasRect.width;
            const scaleY = sizes.width / canvasRect.height;
            const cursorX = (event.clientX - canvasRect.left) * scaleX;
            const cursorY = (event.clientY - canvasRect.top) * scaleY;

            this.$emit('set-cursor', { cursorX: cursorX, cursorY: cursorY }, sizes);
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
                if (canvas) newBoard.draw(canvas);
            }
        }
    },
    mounted() {
        const canvas = this.$refs.sudoku as HTMLCanvasElement;
        canvas.height = canvas.width;

        this.clickHandler = (e) => {
            const canvasRect = canvas.getBoundingClientRect();
            this.setCursorPosition(canvasRect, canvas, e);
        };
        canvas.addEventListener('click', this.clickHandler);
        if (canvas) this.board.draw(canvas);
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
            :width="1000"
            :height="1000"
            class="w-full border-8 border-[#174dbe] bg-slate-100 dark:bg-slate-300 lg:mb-0"
            :class="{ 'blur-[3px]': board.isPaused() || !board.isLoaded() }">
        </canvas>
        <button
            v-if="board.isPaused() && board.isLoaded()"
            class="absolute left-[50%] top-[50%] -ml-10 -mt-10"
            @click="setPaused(!board.isPaused())">
            <PlayIcon class="text-blue-600" style="width: 5rem; height: 5rem" />
        </button>
        <div v-if="!board.isLoaded()" class="absolute left-[50%] top-[50%]">
            <Loader />
        </div>
    </div>
</template>
