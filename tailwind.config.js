import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.tsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Arial', 'sans-serif'],
            },
            colors: {
                "dark-purple": "#0e0b1d",
                'white': "#ffffff",
                "dark-blue": "#00002b",
                "deep-blue": "#02022f",
                "darker-blue": "#030233",
                "blue-gray": "#0d1920",
                "almost-black": "#01002e",
                "dark-gray": "#11111f",
                "bright-blue": "#161cbb",
                "night-blue": "#08043c",
                "deeper-night-blue": "#0a053f",
                'red': "#ff0000",
                'green': "#00ff00",
                'violet': "#8884d8",
                'vert': "#82ca9d",
                'brand-blue': '#007ace',
                'brand-red': '#ff4136',
            },
        },

    },

    plugins: [forms],

};
