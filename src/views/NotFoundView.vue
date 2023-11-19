<template>
    <div class="mx-auto mt-14 h-full px-[5vw] sm:px-[10vw]">
        <div class="text-center">
            <p class="text-5xl font-semibold text-blue-600">404</p>
            <h1 class="mt-3 text-5xl font-bold tracking-tight text-gray-700 dark:text-white sm:text-5xl">
                Page not found
            </h1>
            <p class="mt-4 text-xl leading-7 text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
            <div class="mt-6 flex items-center justify-center">
                <RouterLink
                    :to="'/'"
                    class="rounded-md bg-blue-600 px-5 py-3 text-2xl font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600">
                    Go back home
                </RouterLink>
            </div>
        </div>
    </div>
</template>
