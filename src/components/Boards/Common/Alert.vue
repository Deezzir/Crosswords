<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { defineComponent } from 'vue';
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue';
</script>

<script lang="ts">
export default defineComponent({
    props: {
        open: {
            type: Boolean,
            required: true
        },
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        close() {
            this.$emit('close');
        },
        exit() {
            this.$emit('exit');
        }
    }
});
</script>

<template>
    <TransitionRoot as="div" :show="open">
        <Dialog as="div" class="relative z-10" @close="close">
            <TransitionChild
                as="div"
                enter="ease-out duration-300"
                enter-from="opacity-0"
                enter-to="opacity-100"
                leave="ease-in duration-200"
                leave-from="opacity-100"
                leave-to="opacity-0">
                <div class="fixed inset-0 bg-gray-800 bg-opacity-75 transition-opacity" />
            </TransitionChild>

            <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div class="flex min-h-full items-center justify-center text-center">
                    <TransitionChild
                        as="div"
                        enter="ease-out duration-300"
                        enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enter-to="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leave-from="opacity-100 translate-y-0 sm:scale-100"
                        leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
                        <DialogPanel
                            class="relative transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
                            <div class="bg-white px-10 py-5 xl:px-8 xl:py-3">
                                <div class="sm:flex sm:items-start">
                                    <div class="mt-3 text-center">
                                        <DialogTitle as="h3" class="text-3xl font-semibold leading-6 text-gray-900">
                                            {{ title }}
                                        </DialogTitle>
                                        <div class="mt-3">
                                            <p class="text-xl text-gray-500">Current game progress will be lost.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="grid grid-cols-1 px-8 pb-5 sm:grid-cols-2 sm:gap-4">
                                <button
                                    type="button"
                                    class="inline-flex w-full justify-center rounded-md bg-blue-600 p-3 text-xl font-semibold text-white shadow-sm hover:bg-blue-500 sm:w-auto"
                                    @click="exit">
                                    Ok
                                </button>
                                <button
                                    type="button"
                                    class="mt-3 inline-flex w-full justify-center rounded-md bg-white p-3 text-xl font-semibold text-black shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-100 sm:mt-0 sm:w-auto"
                                    @click="close">
                                    Cancel
                                </button>
                            </div>
                        </DialogPanel>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
