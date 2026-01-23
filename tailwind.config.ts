import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#2F80ED", // Blue
                success: "#22C55E", // Green
                light: "#EAF2FF",   // Light Blue BG
                page: "#F5F7FA",    // Page BG
                dark: "#1F2937",    // Text Dark
                muted: "#6B7280",   // Text Muted
            },
        },
    },
    plugins: [],
};
export default config;
