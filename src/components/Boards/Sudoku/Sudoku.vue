<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import SudokuCanvas from './SudokuCanvas.vue';
import SudokuPlay from './SudokuPlay.vue';
import Difficulty from '../Common/Difficulty.vue';
import SudokuStats from './SudokuStats.vue';
import { useGameStore } from '@/GamesStore';
import { type canvasSizes } from '../Common/boards';
import { getSudokuBoard, solveSudokuBoard, convertSudokuBoard, SudokuBoard, convertSudokuSolution } from './sudoku';
import NewGameAlert from '@/components/Boards/Common/Alert.vue';
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
            nextDifficulty: 1,
            board: reactive(new SudokuBoard(gridSize)),
            intervalId: null as ReturnType<typeof setInterval> | null,
            alert: false
        };
    },
    mounted() {
        this.fetchSudokuBoard();
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        document.addEventListener('keydown', this.handleKeyPress);

        this.intervalId = setInterval(this.incrementTimePassed, 1000);
        emitter.on('destroy', () => {
            if (this.intervalId) {
                clearInterval(this.intervalId);
            }
        });
    },
    computed: {
        progress() {
            const store = useGameStore();
            return store.getProgress;
        }
    },
    methods: {
        async fetchSudokuBoard() {
            this.board.setLoaded(false);
            try {
                const difficultyItem = this.difficulties.find((diff) => diff.id === this.curDifficulty);
                if (!difficultyItem) {
                    throw new Error('Difficulty does not exist.');
                }
                const puzzle = await getSudokuBoard(difficultyItem.name);
                const solution = await solveSudokuBoard(puzzle);
                this.board.setBoard(convertSudokuBoard(puzzle), convertSudokuSolution(solution));
            } catch (error) {
                console.error('Error fetching Sudoku board:', error);
                this.board.setBoard([], []);
            } finally {
                this.board.setLoaded(true);
            }
        },
        setProgress(progress: boolean) {
            const store = useGameStore();
            store.setProgress(progress);
        },
        async handleDifficultyChange(difficulty: number) {
            if (this.progress) {
                this.alert = true;
                this.nextDifficulty = difficulty;
            } else {
                this.curDifficulty = difficulty;
                this.resetGame();
            }
        },
        resetGame() {
            this.fetchSudokuBoard();
            this.board.resetState();
            this.board.resetCursor();
            this.setProgress(false);
        },
        handleKeyPress(event: KeyboardEvent) {
            if (event && event.code === 'Escape') this.board.togglePaused();
            if (event && event.code.startsWith('Digit') && event.key.length === 1) {
                const num = parseInt(event.key);
                if (num >= 1 && num <= 9) {
                    this.handleNumberChange(num);
                }
            }
        },
        handleNumberChange(num: number) {
            this.setProgress(this.board.setNumber(num));
        },
        handleVisibilityChange() {
            if (document.hidden || document.visibilityState === 'hidden') {
                this.board.setPaused(true);
            }
        },
        handleCursorChange(input: { cursorX: number; cursorY: number }, sizes: canvasSizes) {
            this.board.setCursor(input, sizes);
        },
        handlePauseChange(paused: boolean) {
            this.board.setPaused(paused);
        },
        handleEraserClick() {
            this.board.eraseNumber();
        },
        handleAlertClose() {
            this.alert = false;
        },
        handleAlertNewGame() {
            this.curDifficulty = this.nextDifficulty;
            this.resetGame();
            this.handleAlertClose();
        },
        incrementTimePassed() {
            if (!this.board.isPaused() && this.board.isLoaded()) {
                this.board.incrementTimePassed();
            }
        }
    },
    beforeUnmount() {
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        document.removeEventListener('keydown', this.handleKeyPress);
        emitter.emit('destroy');
        emitter.off('destroy');
    }
});
</script>

<template>
    <div class="flex justify-self-end lg:hidden">
        <button
            @click="resetGame"
            class="focus:shadow-outline transform rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 text-xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 focus:outline-none">
            New Game
        </button>
    </div>
    <div class="col-span-2 grid grid-flow-row gap-2" style="grid-template-rows: auto 1fr">
        <div class="grid items-center gap-10 sm:grid-cols-2" style="grid-template-columns: auto 1fr">
            <Difficulty
                :difficulties="difficulties"
                :cur-difficulty="curDifficulty"
                @set-difficulty="handleDifficultyChange" />
            <SudokuStats :board="board" @set-paused="handlePauseChange" />
        </div>
        <div class="grid grid-cols-1 items-center justify-items-center gap-x-16 lg:grid-cols-2">
            <SudokuCanvas :board="board" @set-paused="handlePauseChange" @set-cursor="handleCursorChange" />
            <div class="mt-16 grid h-full w-full grid-cols-1 content-between lg:mt-0">
                <SudokuPlay @num-clicked="handleNumberChange" @erase-clicked="handleEraserClick" />
                <div class="hidden lg:flex">
                    <button
                        @click="resetGame"
                        class="focus:shadow-outline grow transform rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-4xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 focus:outline-none">
                        New Game
                    </button>
                </div>
            </div>
        </div>
        <NewGameAlert :open="alert" :title="'Start new game'" @close="handleAlertClose" @yes="handleAlertNewGame">
        </NewGameAlert>
    </div>
</template>
