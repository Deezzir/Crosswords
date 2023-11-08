<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent } from 'vue';
import CrosswordCanvas from './CrosswordsCanvas.vue';
import CrosswordPlay from './CrosswordsPlay.vue';
import Difficulty from '../Common/Difficulty.vue';
import PlayIcon from '@/components/Icons/PlayIcon.vue';
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
            curDifficulty: 1
        };
    }
});
</script>

<template>
    <div class="grid grid-flow-row gap-2" style="grid-template-rows: auto 1fr">
        <div class="grid grid-cols-2 items-start">
            <Difficulty :difficulties="difficulties" :cur-difficulty="curDifficulty" />
            <button class="justify-self-end">
                <PlayIcon />
            </button>
        </div>
        <div class="grid grid-cols-1 items-center justify-items-center gap-10 lg:grid-cols-2">
            <CrosswordCanvas />
            <CrosswordPlay />
        </div>
    </div>
</template>
