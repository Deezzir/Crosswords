<script setup lang="ts">
import { PauseIcon, PlayIcon } from '@/components/Icons';
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
    methods: {
        setPaused(paused: boolean) {
            this.$emit('set-paused', paused);
        }
    },
    computed: {
        timePassedFormatted() {
            const timePassed = this.board.getTimePassed();
            const minutes = Math.floor(timePassed / 60);
            const seconds = timePassed % 60;
            return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }
    }
});
</script>

<template>
    <div class="flex flex-row items-center justify-end text-xl text-gray-700 dark:text-gray-500">
        <div class="pr-6">
            <p>
                Mistakes: <span class="font-bold">{{ board.getMistakes() }}/3</span>
            </p>
        </div>
        <div class="pr-6">
            <p>
                Score: <span class="font-bold">{{ board.getScore() }}</span>
            </p>
        </div>
        <div class="pr-6">
            <p>{{ timePassedFormatted }}</p>
        </div>
        <button
            @click="setPaused(!board.isPaused())"
            class="text-gray-600 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-400">
            <div v-if="board.isPaused()">
                <PlayIcon />
            </div>
            <div v-else>
                <PauseIcon />
            </div>
        </button>
    </div>
</template>
