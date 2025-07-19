```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',   // Very light green
          100: '#dcfce7',  // Light green
          200: '#bbf7d0',  // Soft green
          300: '#86efac',  // Medium light green
          400: '#4ade80',  // Medium green
          500: '#22c55e',  // Main brand color (green)
          600: '#16a34a',  // Darker green
          700: '#15803d',  // Dark green
          800: '#166534',  // Very dark green
          900: '#14532d',  // Darkest green
        },
        secondary: {
          50: '#f7fee7',   // Very light yellow-green
          100: '#ecfccb',  // Light yellow-green
          200: '#d9f99d',  // Soft yellow-green
          300: '#bef264',  // Medium yellow-green
          400: '#a3e635',  // Bright yellow-green
          500: '#84cc16',  // Main secondary color
          600: '#65a30d',  // Darker yellow-green
          700: '#4d7c0f',  // Dark yellow-green
          800: '#365314',  // Very dark yellow-green
          900: '#1a2e05',  // Darkest yellow-green
        },
        accent: {
          50: '#ecfdf5',   // Very light mint
          100: '#d1fae5',  // Light mint
          200: '#a7f3d0',  // Soft mint
          300: '#6ee7b7',  // Medium mint
          400: '#34d399',  // Bright mint
          500: '#10b981',  // Main accent color
          600: '#059669',  // Darker mint
          700: '#047857',  // Dark mint
          800: '#065f46',  // Very dark mint
          900: '#064e3b',  // Darkest mint
        }
      },
      fontSize: {
        'logo': '2.5rem',
      },
    },
  },
  plugins: [],
}
```