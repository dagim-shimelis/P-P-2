/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [],
    theme: {
        screens: {
            "2xs": "360px",
            xs: "480px",
            sm: "640px",
            md: "768px",
            lg: "1024px",
            xl: "1080px",
            "2xl": "1281px",
            "3xl": "1536px",
            "4xl": "1649px",
            "4_2xl": "1880px",
            "5xl": "2048px",
        },
        extend: {
            fontFamily: {
                lexend: ["Lexend", "sans-serif"],
                poppins: ["Poppins", "sans-serif"],
                "lexend-deca": ["Lexend Deca", "sans-serif"],
            },
            colors: {
                black: "#151515",
                white: "#eeeeee",
            },
        },
    },
    plugins: [],
};
