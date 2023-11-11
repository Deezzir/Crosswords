<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div
        class="loader -ml-10 -mt-10 h-20 w-20 rounded-full border-[6px] border-solid border-blue-600 border-t-gray-500"></div>
</template>

<style>
.loader {
    animation: rotation 1s linear infinite;
}
@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
</style>
