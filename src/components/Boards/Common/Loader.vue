<!-- eslint-disable vue/multi-word-component-names -->
<template>
    <div
        class="loader -ml-7 -mt-7 h-14 w-14 rounded-full border-[6px] border-solid border-gray-500 border-t-blue-600"></div>
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
