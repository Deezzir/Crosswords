<script setup lang="ts">
import { PenIcon, EraseIcon, UndoIcon, BulbIcon } from '@/components/Icons';
import { defineComponent } from 'vue';

// define button list
const components = [
    { name: 'Undo', obj: UndoIcon },
    { name: 'Erase', obj: EraseIcon },
    { name: 'Pen', obj: PenIcon },
    { name: 'Hint', obj: BulbIcon }
];
</script>

<script lang="ts">
export default defineComponent({
    methods: {
        newGameBtnClicked() {
            this.$emit('newgame-clicked');
        }
    }
});
</script>

<template>
    <div class="mt-14 grid h-full w-full grid-cols-1 content-between gap-4 sm:mt-0">
        <div class="grid grid-cols-4 justify-evenly gap-8">
            <button
                v-for="button in components"
                :key="button.name"
                class="ransition-colors inline-flex items-center justify-center rounded-full bg-slate-200 p-3 text-xl text-blue-500 duration-200 hover:bg-gray-300 dark:bg-slate-300 dark:text-blue-600 dark:hover:bg-gray-400">
                <component :is="button.obj" />
                <span class="ml-2 hidden sm:block">{{ button.name }}</span>
            </button>
        </div>
        <div class="grid grid-cols-9 rounded-lg bg-slate-300 sm:grid-cols-3 sm:gap-3 sm:rounded-none sm:bg-transparent">
            <button
                v-for="n in 9"
                :key="n"
                class="rounded-md p-6 text-4xl text-blue-500 transition-colors duration-300 hover:bg-gray-300 dark:text-blue-600 dark:hover:bg-gray-400 sm:bg-slate-200 sm:dark:bg-slate-300">
                {{ n }}
            </button>
        </div>
        <div class="flex">
            <button
                @click="newGameBtnClicked"
                class="focus:shadow-outline grow transform rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-4 text-3xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 focus:outline-none">
                New Game
            </button>
        </div>
    </div>
</template>
