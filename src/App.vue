<script setup lang="ts">
import { RouterView } from 'vue-router';
import FooterVue from './components/Footer/Footer.vue';
import Loader from './components/Loader/Loader.vue';
import Navbar from './components/Navbar/Navbar.vue';
</script>

<template>
    <Loader />
    <Navbar />
    <RouterView />
    <FooterVue />
</template>
