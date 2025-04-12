/** @type {import('tailwindcss').Config} */
export default {
    content: ["./src/**/*.{html,tsx,tss}"],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#bfdbfe',
                    DEFAULT: '#2563eb',
                    dark: '#3b82f6',
                },
                secondary: {
                    light: '#FCEADE',
                    DEFAULT: '#F46036',
                    dark: '#CB2D3E',
                },
                neutral: {
                    light: '#F6F6F6',
                    DEFAULT: '#A8A8A8',
                    dark: '#3B3B3B',
                },
                background: {
                    light: '#F6F6F6',
                    DEFAULT: '#FFFFFF',
                    dark: '#3B3B3B',
                },
                foreground: {
                    light: '#F6F6F6',
                    DEFAULT: '#2563eb',
                    dark: '#3B3B3B',
                },
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'translateY(-10px)' },
                    '100%': { opacity: '1', transform: 'translateY(0)' },
                }
            },
            animation: {
                fadeIn: 'fadeIn 0.3s ease-in-out forwards',
            },
        },
    },
    plugins: [],
}

