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
        undoBtnClicked() {
            this.$emit('undo-clicked');
        },
        eraseBtnClicked() {
            this.$emit('erase-clicked');
        },
        penBtnClicked() {
            this.$emit('pen-clicked');
        },
        hintBtnClicked() {
            this.$emit('hint-clicked');
        },
        numBtnClicked(num: number) {
            this.$emit('num-clicked', num);
        },
        handleControlsBtnClick(button: string) {
            switch (button) {
                case 'Undo':
                    this.undoBtnClicked();
                    break;
                case 'Erase':
                    this.eraseBtnClicked();
                    break;
                case 'Pen':
                    this.penBtnClicked();
                    break;
                case 'Hint':
                    this.hintBtnClicked();
                    break;
                default:
                    break;
            }
        }
    }
});
</script>

<template>
    <div class="grid grid-cols-1 gap-8">
        <div class="grid grid-cols-4 justify-evenly gap-8">
            <button
                v-for="button in components"
                :key="button.name"
                @click="handleControlsBtnClick(button.name)"
                class="ransition-colors inline-flex items-center justify-center rounded-full bg-slate-200 p-3 text-xl text-blue-500 duration-200 hover:bg-gray-300 dark:bg-slate-300 dark:text-blue-600 dark:hover:bg-gray-400">
                <component :is="button.obj" />
                <span class="ml-2 hidden md:block">{{ button.name }}</span>
            </button>
        </div>
        <div class="grid grid-cols-9 rounded-lg bg-slate-300 lg:grid-cols-3 lg:gap-3 lg:rounded-none lg:bg-transparent">
            <button
                v-for="n in 9"
                :key="n"
                @click="numBtnClicked(n)"
                class="rounded-md p-6 text-4xl text-blue-500 transition-colors duration-300 hover:bg-gray-300 dark:text-blue-600 dark:hover:bg-gray-400 lg:bg-slate-200 lg:text-5xl lg:dark:bg-slate-300">
                {{ n }}
            </button>
        </div>
    </div>
</template>
