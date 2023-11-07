<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterVue from './components/Footer/Footer.vue';
import Loader from './components/Loader/Loader.vue';
import Navbar from './components/Navbar/Navbar.vue';
</script>

<template>
    <Loader />
    <Navbar />
    <RouterView v-slot="{ Component }">
        <transition mode="out-in" appear>
            <component :is="Component" />
        </transition>
    </RouterView>
    <FooterVue />
</template>

<style>
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
