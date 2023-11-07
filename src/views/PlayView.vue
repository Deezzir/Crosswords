<script setup lang="ts">
import { defineComponent } from 'vue';
import { useGameStore } from '@/GamesStore';
import Crosswords from '@/components/Boards/Crosswords/Crosswords.vue';
import Sudoku from '@/components/Boards/Sudoku/Sudoku.vue';
import Error from '@/components/Error/Error.vue';
const store = useGameStore();
</script>

<script lang="ts">
export default defineComponent({
    methods: {
        currentGame(curGame: string | null) {
            switch (curGame) {
                case 'Crosswords':
                    return Crosswords;
                case 'Sudoku':
                    return Sudoku;
                default:
                    return Error;
            }
        }
    }
});
</script>

<template>
    <div class="mx-auto px-[10vw] mt-10 h-full">
        <Transition mode="out-in" appear>
            <div v-if="!store.getCurGame" class="flex flex-grow flex-col items-center w-full">
                <div class="mb-4"><h1 class="text-4xl text-white font-bold">Choouse a game to play:</h1></div>
                <div class="space-x-6">
                    <button
                        v-for="game in store.gameList"
                        :key="game.id"
                        class="bg-blue-700 hover:bg-blue-500 text-white text-2xl font-bold py-2 px-4 rounded min-w-[10vw]"
                        @click="store.setCurGame(game.name)">
                        {{ game.name }}
                    </button>
                </div>
            </div>
            <div v-else>
                <component :is="currentGame(store.getCurGame)" />
            </div>
        </Transition>
    </div>
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
