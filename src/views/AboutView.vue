<script setup lang="ts">
import { useGameStore } from '@/GamesStore';

const gamesStore = useGameStore();
</script>

<template>
    <div class="mx-auto mb-16 mt-10 px-[6vw] text-gray-700 dark:text-white sm:px-[10vw]">
        <h1 class="text-4xl font-bold">The Joy of Classic Board Games Reimagined</h1>
        <p class="mt-5 text-2xl sm:text-xl">
            In the digital hustle, take a breather and indulge in the timeless world of NoxuBoards. It is a one-stop
            online destination offering your beloved board games, all crafted with care for the modern web. Currently,
            there are the following game available to play:
        </p>
        <ul class="list-inside list-disc pt-2 text-2xl sm:text-xl">
            <li v-for="game in gamesStore.gameList" :key="game.id" class="py-1">
                <span class="font-bold">{{ game.name }}:</span> {{ game.desc }}
            </li>
        </ul>
        <h2 class="mt-6 text-3xl font-bold sm:text-2xl">What is NoxuBoards?</h2>
        <p class="mt-4 text-2xl sm:text-xl">
            I believe in the simple pleasure of puzzle-solving and strategic thinking. NoxuBoards is committed to
            delivering that experience with an easy-to-use interface, seamless on any device.
        </p>
        <h2 class="mt-6 text-3xl font-bold sm:text-2xl">Why NoxuBoards?</h2>
        <p class="mt-4 text-2xl sm:text-xl">
            NoxuBoards is a passion project that I have been working on for a while. I have always been a fan of classic
            board games, and I wanted to create a platform that would allow me to share my love for them with the world.
            I hope you enjoy playing them as much as I enjoyed making them.
        </p>
        <ul class="list-inside list-disc pt-2 text-2xl sm:text-xl">
            <li class="py-1">
                <span class="font-bold">Diverse Games:</span> A curated selection, from brain teasers to word puzzles.
            </li>
            <li class="py-1"><span class="font-bold">User-Friendly:</span> Clean design and intuitive gameplay.</li>
            <li class="py-1"><span class="font-bold">No Commitments:</span> Free to play, no sign-ups required.</li>
        </ul>
        <h2 class="mt-6 text-3xl font-bold sm:text-2xl">The Creator</h2>
        <p class="mt-4 text-2xl sm:text-xl">
            Hi, I'm
            <a href="https://www.linkedin.com/in/deezzir/" class="text-blue-600 dark:text-blue-500">Iurii Kondrakov</a>,
            a passionate developer and board game enthusiast. With a love for coding and design, I aim to bring the joy
            of casual gaming to screens everywhere. My email is
            <a href="mailto:deezzir@gmail.com" class="text-blue-600 dark:text-blue-500">deezzir@gmail.com</a>.
        </p>
    </div>
</template>
