<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent } from 'vue';
import CrosswordCanvas from './CrosswordsCanvas.vue';
import CrosswordPlay from './CrosswordsPlay.vue';
import Difficulty from '../Common/Difficulty.vue';
import { CrosswordsBoard } from './crosswords';
</script>

<script lang="ts">
const gridSize = 18;

export default defineComponent({
    data() {
        return {
            difficulties: [
                { id: 1, name: 'Easy' },
                { id: 2, name: 'Medium' },
                { id: 3, name: 'Hard' }
            ],
            curDifficulty: 1,
            board: new CrosswordsBoard(gridSize)
        };
    },
    methods: {
        handleDifficultyChange(difficulty: number) {
            this.curDifficulty = difficulty;
            this.resetGame();
        },
        resetGame() {
            this.board.resetState();
        }
    }
});
</script>

<template>
    <div class="grid grid-flow-row gap-2" style="grid-template-rows: auto 1fr">
        <div class="grid grid-cols-2 items-start">
            <Difficulty
                :difficulties="difficulties"
                :cur-difficulty="curDifficulty"
                @set-difficulty="handleDifficultyChange" />
        </div>
        <div class="grid grid-cols-1 items-center justify-items-center gap-x-16 lg:grid-cols-2">
            <CrosswordCanvas :board="board" />
            <CrosswordPlay @newgame-clicked="resetGame" />
        </div>
    </div>
</template>
