/** @type {import('tailwindcss').Config} */
export const darkMode = 'class';
export const mode = 'jit';
export const content = ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'];
export const theme = {
    screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px'
    },
    extend: {}
};
export const plugins = [];
export const variants = ['responsive', 'group-hover', 'hover', 'focus', 'active', 'group-active'];
