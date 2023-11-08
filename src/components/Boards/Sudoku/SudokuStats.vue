<script setup lang="ts">
import PlayIcon from '@/components/Icons/PlayIcon.vue';
</script>

<template>
    <div class="flex flex-row items-center justify-end text-xl text-gray-700 dark:text-gray-500">
        <div class="pr-6">
            <p>Mistakes: <span class="font-bold">0/3</span></p>
        </div>
        <div class="pr-6">
            <p>Score: <span class="font-bold">0</span></p>
        </div>
        <div class="pr-6">
            <p>00:00</p>
        </div>
        <button>
            <PlayIcon />
        </button>
    </div>
</template>
