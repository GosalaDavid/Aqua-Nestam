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
                primary: "#FF6B4A", // Coral/Orange
                secondary: "#FFF0EB", // Light Peach/Orange
                success: "#22C55E", // Success Green
                error: "#EF4444",   // Error Red
                light: "#FDFDFD",   // Background
                page: "#F9FAFB",    // Page BG (Cool Gray)
                dark: "#1A1A1A",    // Text Dark
                muted: "#888888",   // Text Muted
            },
        },
    },
    plugins: [],
};
export default config;
