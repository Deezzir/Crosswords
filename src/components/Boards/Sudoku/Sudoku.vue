<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import SudokuCanvas from './SudokuCanvas.vue';
import SudokuPlay from './SudokuPlay.vue';
import Difficulty from '../Common/Difficulty.vue';
import SudokuStats from './SudokuStats.vue';
import { getSudokuBoard, solveSudokuBoard, convertSudokuBoard, SudokuBoard } from './sudoku';
import mitt from 'mitt';
</script>

<script lang="ts">
const emitter = mitt();
const gridSize = 9;

export default defineComponent({
    data() {
        return {
            difficulties: [
                { id: 1, name: 'Easy' },
                { id: 2, name: 'Medium' },
                { id: 3, name: 'Hard' }
            ],
            curDifficulty: 1,
            board: reactive(new SudokuBoard(gridSize)),
            loading: false,
            intervalId: null as ReturnType<typeof setInterval> | null
        };
    },
    mounted() {
        this.fetchSudokuBoard();
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        document.addEventListener('keydown', this.handleESC);

        this.intervalId = setInterval(this.incrementTimePassed, 1000);
        emitter.on('destroy', () => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        });
    },
    methods: {
        async fetchSudokuBoard() {
            this.loading = true;
            try {
                const difficultyItem = this.difficulties.find((diff) => diff.id === this.curDifficulty);
                if (!difficultyItem) {
                    throw new Error('Difficulty does not exist.');
                }
                const puzzle = await getSudokuBoard(difficultyItem.name);
                this.board.setBoard(convertSudokuBoard(puzzle));

                const solution = await solveSudokuBoard(puzzle);
                this.board.setSolution(convertSudokuBoard(solution) as number[][]);
            } catch (error) {
                console.error('Error fetching Sudoku board:', error);
                this.board.setBoard([]);
            } finally {
                this.loading = false;
            }
        },
        async handleDifficultyChange(difficulty: number) {
            this.curDifficulty = difficulty;
            this.resetGame();
        },
        resetGame() {
            this.fetchSudokuBoard();
            this.board.resetState();
        },
        handleESC(event: KeyboardEvent) {
            if (event && event.code === 'Escape') this.board.togglePaused();
        },
        handleVisibilityChange() {
            if (document.hidden || document.visibilityState === 'hidden') {
                this.board.setPaused(true);
            }
        },
        handlePauseChange(paused: boolean) {
            this.board.setPaused(paused);
        },
        incrementTimePassed() {
            if (!this.board.getPaused() && !this.loading) {
                this.board.incrementTimePassed();
            }
        }
    },
    beforeUnmount() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        document.removeEventListener('keydown', this.handleESC);
        emitter.emit('destroy');
        emitter.off('destroy');
    }
});
</script>

<template>
    <div class="grid grid-flow-row gap-2" style="grid-template-rows: auto 1fr">
        <div class="grid items-center gap-10 sm:grid-cols-2" style="grid-template-columns: auto 1fr">
            <Difficulty
                :difficulties="difficulties"
                :cur-difficulty="curDifficulty"
                @set-difficulty="handleDifficultyChange" />
            <SudokuStats :board="board" @set-paused="handlePauseChange" />
        </div>
        <div class="grid grid-cols-1 items-center justify-items-center gap-x-16 lg:grid-cols-2">
            <SudokuCanvas :board="board" @set-paused="handlePauseChange" :loading="loading" />
            <SudokuPlay @newgame-clicked="resetGame" />
        </div>
    </div>
</template>
