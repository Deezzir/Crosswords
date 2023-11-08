<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent } from 'vue';
import SudokuCanvas from './SudokuCanvas.vue';
import SudokuPlay from './SudokuPlay.vue';
import Difficulty from '../Common/Difficulty.vue';
import SudokuStats from './SudokuStats.vue';
import handler from './sudoku';
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            difficulties: [
                { id: 1, name: 'Easy' },
                { id: 2, name: 'Medium' },
                { id: 3, name: 'Hard' }
            ],
            curDifficulty: 1,
            board: ''
        };
    },
    mounted() {
        this.fetchSudokuBoard();
    },
    methods: {
        async fetchSudokuBoard() {
            try {
                const difficultyItem = this.difficulties.find((diff) => diff.id === this.curDifficulty);
                if (!difficultyItem) {
                    throw new Error('Difficulty not found.');
                }
                const puzzle = await handler.getSudokuBoard(difficultyItem.name);
                this.board = puzzle;
            } catch (error) {
                console.error('Error fetching Sudoku board:', error);
                this.board = '';
            }
        },
        async handleDifficultyChange(difficulty: number) {
            this.curDifficulty = difficulty;
            await this.fetchSudokuBoard();
        }
    }
});
</script>

<template>
    <div class="grid grid-flow-row gap-2" style="grid-template-rows: auto 1fr">
        <div class="grid items-center gap-10 sm:grid-cols-2" style="grid-template-columns: auto 1fr">
            <Difficulty
                :difficulties="difficulties"
                :cur-difficulty="curDifficulty"
                @difficulty-set="handleDifficultyChange" />
            <SudokuStats />
        </div>
        <div class="grid grid-cols-1 items-center justify-items-center gap-x-16 lg:grid-cols-2">
            <SudokuCanvas :board="board" />
            <SudokuPlay />
        </div>
    </div>
</template>
