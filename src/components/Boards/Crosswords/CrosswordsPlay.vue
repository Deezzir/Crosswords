<script setup lang="ts">
import { defineComponent } from 'vue';
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
    <div class="mt-14 grid h-full w-full grid-cols-1 content-center gap-4 sm:mt-0">
        <div class="flex">
            <button
                @click="newGameBtnClicked"
                @keydown.space.prevent
                class="focus:shadow-outline grow transform rounded-lg bg-gradient-to-r from-blue-600 to-blue-800 px-4 py-4 text-3xl font-bold text-white transition duration-300 ease-in-out hover:scale-105 focus:outline-none">
                WIP
            </button>
        </div>
    </div>
</template>
