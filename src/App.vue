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
        <Transition
            enter-active-class="transition opacity 0.5s ease"
            leave-active-class="transition opacity 0.5s ease"
            enter-from-class="opacity-0"
            leave-to-class="opacity-0"
            mode="out-in"
            appear>
            <component :is="Component" />
        </Transition>
    </RouterView>
    <FooterVue />
</template>
