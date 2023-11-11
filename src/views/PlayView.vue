<script setup lang="ts">
import { defineComponent } from 'vue';
import { useGameStore } from '@/GamesStore';
import Crosswords from '@/components/Boards/Crosswords/Crosswords.vue';
import Sudoku from '@/components/Boards/Sudoku/Sudoku.vue';
import Error from '@/components/Error/Error.vue';
import BackIcon from '@/components/Icons/BackIcon.vue';
import NewGameAlert from '@/components/Boards/Common/NewGameAlert.vue';
</script>

<script lang="ts">
export default defineComponent({
    data() {
        return {
            alert: false
        };
    },
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
        },
        setCurGame(game: string | null) {
            const store = useGameStore();
            store.setCurGame(game);
        },
        setProgress(progress: boolean) {
            const store = useGameStore();
            store.setProgress(progress);
        },
        handleAlertClose() {
            this.alert = false;
        },
        handleAlertExit() {
            this.setCurGame(null);
            this.setProgress(false);
            this.handleAlertClose();
        },
        handleGameClose() {
            if (this.progress) {
                this.alert = true;
            } else {
                this.setCurGame(null);
            }
        }
    },
    computed: {
        curGame() {
            const store = useGameStore();
            return store.getCurGame;
        },
        progress() {
            const store = useGameStore();
            return store.getProgress;
        },
        gameList() {
            const store = useGameStore();
            return store.gameList;
        }
    }
});
</script>

<template>
    <div class="mx-auto mt-2 h-full px-[5vw] sm:px-[10vw]">
        <Transition
            mode="out-in"
            enter-active-class="transition opacity 0.3s ease"
            leave-active-class="transition opacity 0.3s ease"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            appear>
            <div v-if="!curGame" class="mt-36 flex w-full grid-cols-1 flex-col items-center justify-center">
                <div class="mb-4">
                    <h1 class="text-5xl font-bold text-gray-700 dark:text-white sm:text-6xl">Choose a game to play</h1>
                </div>
                <div class="space-x-6">
                    <button
                        v-for="game in gameList"
                        :key="game.id"
                        class="min-w-[40vw] rounded-lg bg-blue-700 px-6 py-4 text-4xl font-bold text-white hover:bg-blue-500 sm:min-w-[20vw]"
                        @click="setCurGame(game.name)">
                        {{ game.name }}
                    </button>
                </div>
            </div>
            <div v-else>
                <button class="mb-4 justify-self-end" @click="handleGameClose"><BackIcon /></button>
                <component :is="currentGame(curGame)" />
            </div>
        </Transition>
        <NewGameAlert :open="alert" :title="'Exit Game'" @close="handleAlertClose" @exit="handleAlertExit" />
    </div>
</template>
