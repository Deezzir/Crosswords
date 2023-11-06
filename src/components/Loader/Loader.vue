<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { ref, onMounted } from 'vue';

const loader = ref<HTMLDivElement | null>(null);

onMounted(() => {
    if (loader.value) {
        setTimeout(() => {
            loader.value?.classList.add('loaded');
        }, 300);
    }
});
</script>

<template>
    <div id="loader-wrapper" ref="loader">
        <svg
            id="loader"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            height="100"
            viewBox="0 0 100 100"
            overflow="visible"
            fill="#1a2639">
            <defs>
                <rect id="inline" x="15" y="40" width="10" height="20" rx="2" ry="2"></rect>
            </defs>
            <use xlink:href="#inline" x="0">
                <animate attributeName="opacity" values="0;1;0" dur="1s" begin="0s" repeatCount="indefinite"></animate>
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    additive="sum"
                    dur="1s"
                    begin="0s"
                    repeatCount="indefinite"
                    from="0 0"
                    to="10"></animateTransform>
            </use>
            <use xlink:href="#inline" x="20">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1s"
                    begin="0.25s"
                    repeatCount="indefinite"></animate>
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    additive="sum"
                    dur="1s"
                    begin="0.25s"
                    repeatCount="indefinite"
                    from="0 0"
                    to="10"></animateTransform>
            </use>
            <use xlink:href="#inline" x="40">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1s"
                    begin="0.5s"
                    repeatCount="indefinite"></animate>
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    additive="sum"
                    dur="1s"
                    begin="0.5s"
                    repeatCount="indefinite"
                    from="0 0"
                    to="10"></animateTransform>
            </use>
            <use xlink:href="#inline" x="60">
                <animate
                    attributeName="opacity"
                    values="0;1;0"
                    dur="1s"
                    begin="0.75s"
                    repeatCount="indefinite"></animate>
                <animateTransform
                    attributeName="transform"
                    type="translate"
                    additive="sum"
                    dur="1s"
                    begin="0.75s"
                    repeatCount="indefinite"
                    from="0 0"
                    to="10"></animateTransform>
            </use>
        </svg>
        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>
    </div>
</template>

<style scoped>
#loader-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
}

#loader {
    display: block;
    position: relative;
    left: 50%;
    top: 50%;
    width: 200px;
    margin: -100px 0 0 -100px;
    height: 200px;
    z-index: 1001;
}

#loader-wrapper .loader-section {
    position: fixed;
    top: 0;
    width: 51%;
    height: 100%;
    background: #3e4a61;
    z-index: 1000;
}

#loader-wrapper .loader-section.section-left {
    left: 0;
}

#loader-wrapper .loader-section.section-right {
    right: 0;
}

/* Loaded */
#loader-wrapper.loaded .loader-section.section-left {
    -webkit-transform: translateX(-100%);
    /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: translateX(-100%);
    /* IE 9 */
    transform: translateX(-100%);
    /* Firefox 16+, IE 10+, Opera */

    left: 0;
}

#loader-wrapper.loaded .loader-section.section-right {
    -webkit-transform: translateX(100%);
    /* Chrome, Opera 15+, Safari 3.1+ */
    -ms-transform: translateX(100%);
    /* IE 9 */
    transform: translateX(100%);
    /* Firefox 16+, IE 10+, Opera */

    right: 0;
}

#loader-wrapper.loaded .loader-section.section-left,
#loader-wrapper.loaded .loader-section.section-right {
    -webkit-transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transition: all 0.7s 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
}

#loader-wrapper.loaded #loader {
    opacity: 0;
    -webkit-transition: all 0.3s ease-out;
    transition: all 0.3s ease-out;
}

#loader-wrapper.loaded {
    visibility: hidden;

    -webkit-transform: translateY(-100%);
    -ms-transform: translateY(-100%);
    transform: translateY(-100%);

    -webkit-transition: all 0.3s 1s ease-out;
    transition: all 0.3s 1s ease-out;
}
</style>
