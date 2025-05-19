/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF6600",
        secondary: "#000000",
        success: "#28A745",
        warning: "#FFC107",
        error: "#DC3545",
      },
      animation: {
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        fadeIn: "fadeIn 0.2s ease-in-out",
        slideIn: "slideIn 0.3s ease-out",
        slideUp: "slideUp 0.3s ease-out",
        slideInLeft: "slideInLeft 0.3s ease-out",
        slideInRight: "slideInRight 0.3s ease-out",
      },
      keyframes: {
        pulse: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.5 },
        },
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        slideIn: {
          "0%": { transform: "translateX(-10px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideUp: {
          "0%": { transform: "translateY(10px)", opacity: 0 },
          "100%": { transform: "translateY(0)", opacity: 1 },
        },
        slideInLeft: {
          "0%": { transform: "translateX(-32px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        slideInRight: {
          "0%": { transform: "translateX(32px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
      },
    },
  },
<<<<<<< HEAD
  plugins: [require('@tailwindcss/typography')],
=======
 
>>>>>>> tvm
};
