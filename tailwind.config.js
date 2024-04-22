/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {

      borderradius : {
        '8': '2rem',

      },
      
      spacing: {
        '1/10' : '10%',
        '1/5' : '20%',
        '1/8' : '12.5%',
        '1/9' : '11.1%',
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
    colors: {
      'input-gray': '#d1d1d1',
      'custom-green2': '#B5C0D0',
      'custom-green': '#abcd99',
      'custom-green3': '#87A922',
      'dark-green': '729560',
      'rejection-red': '#E72929',
    },
    keyframes: {
      fadeIn: {
        '0%': { opacity: '0' },
        '100%': { opacity: '1' },
      },
    },
    animation: {
      fadeIn: 'fadeIn 1.5s ease-in-out',
    },
    
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'focus'],
    }
  },
  plugins: [],
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '1/2': '50%', // Add this line
      },
    },
  },
}
};
