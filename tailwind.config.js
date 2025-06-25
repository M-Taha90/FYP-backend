/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      roboto:['Roboto', 'sans-serif'],
      oswald:['Oswald', 'sans-serif'],
      montserrat:['Montserrat', 'sans-serif'],
      nunito:['Nunito', 'sans-serif'],
      // 'sans': ['Helvetica', 'Oswald', 'system-ui'],
      // 'serif': ['ui-serif', 'Georgia'],
      // 'mono': ['ui-monospace', 'SFMono-Regular'],
      // 'display': ['Oswald'],
      // 'body': ['"Open Sans"'],
    },
    extend: {
      transitionProperty: {
        'transform': 'transform',
      },
      keyframes: {
        slideUp: {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "100%": { transform: "translateY(100%)", opacity: "0" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        fadeOut: {
          from: { opacity: "1" },
          to: { opacity: "0" },
        },
        wobble: {
          '0%': { transform: 'rotate(0deg)' },
          '20%': { transform: 'rotate(2.5deg)' },
          '50%': { transform: 'rotate(-2deg)' },
          '65%': { transform: 'rotate(1deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        slideUp: "slideUp 0.3s ease-out forwards",
        slideDown: "slideDown 0.3s ease-out forwards",
        fadeIn: "fadeIn 0.5s ease-in-out",
        fadeOut: "fadeOut 0.5s ease-in-out",
        wobble: 'wobble 0.5s ease-in-out',
      },
      backgroundImage: {
        'about-header': "url('src/assets/images/about_heading.jpeg')",
        'donate-cta': "url('src/assets/images/CTA_Trees.png')",
        'about-motive1': "url('src/assets/images/Identity.jpg')",
        'about-motive2': "url('src/assets/images/Vision.png')",
        'about-process1': "url('src/assets/images/Process1.jpeg')",
        'about-process2': "url('src/assets/images/Process2.jpeg')",
        'about-process3': "url('src/assets/images/Process3.jpeg')",
        'about-count-trees': "url('src/assets/images/Trees_Count.png')",
        'about-count-volunteers': "url('src/assets/images/Volunteers_Count.png')",
        'about-count-projects': "url('src/assets/images/Projects_Count.png')",
      },
      colors: {
        serpentine: '#283106',  
        sky: '#85afd5',
        khaki: '#C7C2AB',
        ivy: '#777e5c',
        spring: '#7fd363',
      },
    },
  },
  plugins: [
    require('daisyui'),
  ],
}

