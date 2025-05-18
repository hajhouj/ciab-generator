/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: '#0367A6',
        primaryDark: '#025E94',
        primaryLight: '#2A8CC5',
        secondary: '#40BFFF',
        secondaryDark: '#0695E4',
        accent: '#FF7542',
        error: '#F44336',
        success: '#3CC74C',
        warning: '#FFC107',
        info: '#0367A6',
        textPrimary: '#1A2D3D',
        textSecondary: '#566B7B',
        lightGray: '#F7FBFF',
        darkGray: '#566B7B',
        bgLight: '#F7FBFF',
      },
      boxShadow: {
        card: '0 4px 12px rgba(3, 103, 166, 0.1)',
        button: '0 2px 8px rgba(3, 103, 166, 0.2)',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
    },
  },
  plugins: [],
}; 