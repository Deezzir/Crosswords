<script setup lang="ts">
import { defineComponent } from 'vue';
import Theme from './Theme.vue';
import GitHubLink from './GitHubLink.vue';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        isDropdown: {
            type: Boolean,
            default: false
        }
    }
});
</script>

<template>
    <div
        v-if="!isDropdown"
        class="ml-6 hidden items-center border-0 pl-6 sm:inline-flex sm:border-l sm:border-slate-200 sm:dark:border-slate-500/50">
        <Theme />
        <GitHubLink />
    </div>
    <div v-else class="inline-flex grow items-center justify-center space-x-10">
        <GitHubLink />
        <Theme is-dropdown />
    </div>
</template>
