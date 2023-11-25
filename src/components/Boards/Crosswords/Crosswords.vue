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
    <div class="flex justify-self-end lg:hidden">
        <button
            @click="resetGame"
            class="focus:shadow-outline transform rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-3 text-xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 focus:outline-none">
            WIP
        </button>
    </div>
    <div class="col-span-2 grid grid-flow-row gap-2" style="grid-template-rows: auto 1fr">
        <div class="grid items-center gap-10 sm:grid-cols-2">
            <Difficulty
                :difficulties="difficulties"
                :cur-difficulty="curDifficulty"
                @set-difficulty="handleDifficultyChange" />
        </div>
        <div class="grid grid-cols-1 items-center justify-items-center gap-x-16 lg:grid-cols-2">
            <CrosswordCanvas :board="board" />
            <div class="mt-16 grid h-full w-full grid-cols-1 content-between lg:mt-0">
                <CrosswordPlay />
                <div class="hidden lg:flex">
                    <button
                        @click="resetGame"
                        class="focus:shadow-outline grow transform rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-4xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 focus:outline-none">
                        WIP
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
