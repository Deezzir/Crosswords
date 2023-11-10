<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent } from 'vue';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue';
import { ChevronDownIcon } from '@heroicons/vue/20/solid';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        difficulties: {
            type: Array<{ id: number; name: string }>,
            required: true
        },
        curDifficulty: {
            type: Number,
            required: true
        }
    },
    methods: {
        isCurDifficulty(difficulty: number) {
            return difficulty === this.curDifficulty;
        },
        setDifficulty(difficulty: number) {
            this.$emit('set-difficulty', difficulty);
        },
        getCurDifficultyName() {
            return this.difficulties.find((difficulty) => difficulty.id === this.curDifficulty)?.name;
        }
    }
});
</script>

<template>
    <div class="flex flex-row items-center text-xl">
        <h2 class="hidden justify-self-start font-bold text-gray-600 dark:text-gray-500 sm:block">Difficulty:</h2>
        <div class="ml-6 hidden justify-items-center gap-6 sm:inline-flex">
            <button
                class="rounded px-4 py-1 text-gray-600 hover:bg-gray-200 dark:text-gray-500 dark:hover:bg-gray-700"
                v-for="difficulty in difficulties"
                :key="difficulty.id"
                @keydown.space.prevent
                :class="{ 'bg-gray-200 dark:bg-gray-700': isCurDifficulty(difficulty.id) }"
                @click="setDifficulty(difficulty.id)">
                {{ difficulty.name }}
            </button>
        </div>
        <Menu as="div" class="inline-flex sm:hidden">
            <MenuButton @keydown.space.prevent class="flex flex-row items-center justify-center gap-2 text-2xl">
                <span>{{ getCurDifficultyName() }}</span>
                <ChevronDownIcon class="h-6 w-6" />
            </MenuButton>
            <Transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems as="ul" class="absolute left-[4.8vw] z-10 mt-10 w-[9rem] rounded-lg bg-gray-600 shadow-lg">
                    <div>
                        <MenuItem
                            as="button"
                            v-for="difficulty in difficulties"
                            :key="difficulty.id"
                            @keydown.space.prevent
                            class="text-l w-full rounded-lg px-5 py-3 text-left text-gray-400"
                            @click="setDifficulty(difficulty.id)"
                            :class="{ 'bg-gray-700': isCurDifficulty(difficulty.id) }">
                            {{ difficulty.name }}
                        </MenuItem>
                    </div>
                </MenuItems>
            </Transition>
        </Menu>
    </div>
</template>
