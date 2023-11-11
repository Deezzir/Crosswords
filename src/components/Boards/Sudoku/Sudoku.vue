<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent, reactive } from 'vue';
import SudokuCanvas from './SudokuCanvas.vue';
import SudokuPlay from './SudokuPlay.vue';
import Difficulty from '../Common/Difficulty.vue';
import SudokuStats from './SudokuStats.vue';
import { useGameStore } from '@/GamesStore';
import { getSudokuBoard, solveSudokuBoard, convertSudokuBoard, SudokuBoard, convertSudokuSolution } from './sudoku';
import NewGameAlert from '@/components/Boards/Common/NewGameAlert.vue';
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
            loading: false,
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
            this.loading = true;
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
                this.loading = false;
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
                    this.setProgress(this.board.setNumber(num));
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
        handleCursorChange(input: { cursorX: number; cursorY: number; canvasSize: number }) {
            this.board.setCursor(input);
        },
        handlePauseChange(paused: boolean) {
            this.board.setPaused(paused);
        },
        incrementTimePassed() {
            if (!this.board.getPaused() && !this.loading) {
                this.board.incrementTimePassed();
            }
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
    <div class="grid grid-flow-row gap-2" style="grid-template-rows: auto 1fr">
        <div class="grid items-center gap-10 sm:grid-cols-2" style="grid-template-columns: auto 1fr">
            <Difficulty
                :difficulties="difficulties"
                :cur-difficulty="curDifficulty"
                @set-difficulty="handleDifficultyChange" />
            <SudokuStats :board="board" @set-paused="handlePauseChange" />
        </div>
        <div class="grid grid-cols-1 items-center justify-items-center gap-x-16 xl:grid-cols-2">
            <SudokuCanvas
                :board="board"
                @set-paused="handlePauseChange"
                @set-cursor="handleCursorChange"
                :loading="loading" />
            <SudokuPlay
                @newgame-clicked="resetGame"
                @num-clicked="handleNumberChange"
                @erase-clicked="handleEraserClick" />
        </div>
        <NewGameAlert :open="alert" :title="'Start New Game'" @close="handleAlertClose" @exit="handleAlertNewGame" />
    </div>
</template>
