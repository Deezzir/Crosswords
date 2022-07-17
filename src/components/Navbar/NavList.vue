<template>
    <nav class="text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200">
        <ul class="flex space-x-8">
            <li>
                <RouterLink class="hover:text-sky-500 dark:hover:text-sky-400 text" to="/">
                    Play
                </RouterLink>
            </li>
            <li>
                <RouterLink class="hover:text-sky-500 dark:hover:text-sky-400" to="/about">
                    About
                </RouterLink>
            </li>
        </ul>
    </nav>
</template>