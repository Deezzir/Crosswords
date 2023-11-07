<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import CrosswordCanvas from './CrosswordsCanvas.vue';
import CrosswordPlay from './CrosswordsPlay.vue';
import Difficulty from '../Common/Difficulty.vue';
import BackIcon from '@/components/Icons/BackIcon.vue';
import { useGameStore } from '@/GamesStore';

const store = useGameStore();
</script>

<template>
    <div class="grid gap-4 grid-flow-row" style="grid-template-rows: auto 1fr">
        <div class="grid grid-cols-2 items-start">
            <Difficulty />
            <button class="justify-self-end" @click="store.setCurGame(null)">
                <BackIcon />
            </button>
        </div>
        <div class="grid grid-cols-1 lg:grid-cols-2 items-center justify-items-center gap-10">
            <CrosswordCanvas />
            <CrosswordPlay />
        </div>
    </div>
</template>
