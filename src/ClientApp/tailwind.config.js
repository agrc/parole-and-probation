import rac from 'tailwindcss-react-aria-components';
import colors from 'tailwindcss/colors';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './node_modules/@ugrc/utah-design-system/src/components/*.{tsx,ts,jsx,js}',
    './index.html',
    './src/**/*.{tsx,jsx,js}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f1f0f3',
          100: '#e3e1e8',
          200: '#c7c4d1',
          300: '#aca8bb',
          400: '#918ca6',
          500: '#777290',
          600: '#5e587b',
          700: '#464067',
          800: '#2e2953',
          900: '#151440',
          950: '#110c23',
        },
        secondary: {
          50: '#FFF5F1',
          100: '#FFE8E3',
          200: '#FFD5CC',
          300: '#FFBEB2',
          400: '#FF7E5F',
          500: '#F95738',
          600: '#F2694A',
          700: '#D95536',
          800: '#D34317', // Your specified color at the 800 position
          900: '#A6310F',
          950: '#7A2008',
        },
        accent: {
          50: '#fdfae6',
          100: '#fbf4cc',
          200: '#f7ea99',
          300: '#f2df66',
          400: '#eed533',
          // generated from
          500: '#C5D8FE',
          600: '#bba200',
          700: '#8c7900',
          800: '#5e5100',
          900: '#2f2800',
        },
        warning: colors.rose,
      },
      fontFamily: {
        utah: ['"Source Sans 3"', '"Source Sans Pro"', 'Helvetica', 'Arial', 'sans-serif'],
      },
      animation: {
        'gradient-x': 'gradient-x 4s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [rac()],
};
