module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{html,js}",
    "./js/**/*.js",
    "./*.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#fff0e6',
          '100': '#ffe0cc',
          '200': '#ffc299',
          '300': '#ffa366',
          '400': '#ff8533',
          '500': '#ff6a00',
          '600': '#e65a00',
          '700': '#b34600',
          '800': '#803200',
          '900': '#4d1e00',
          DEFAULT: "#ff6a00",
        },
        secondary: {
          '50': '#f2f2f2',
          '100': '#e6e6e6',
          '200': '#cccccc',
          '300': '#b3b3b3',
          '400': '#999999',
          '500': '#808080',
          '600': '#666666',
          '700': '#4d4d4d',
          '800': '#333333',
          '900': '#1e1e1e',
          DEFAULT: "#1e1e1e",
        },
        accent: {
          '50': '#fff9e6',
          '100': '#fff3cc',
          '200': '#ffe699',
          '300': '#ffd966',
          '400': '#ffcc33',
          '500': '#ffd700',
          '600': '#e6b800',
          '700': '#b38f00',
          '800': '#806600',
          '900': '#4d3d00',
          DEFAULT: "#ffd700",
        },
        light: {
          background: "#f4f4f4",
          text: "#1e1e1e",
        },
        dark: {
          background: "#1e1e1e",
          text: "#ffffff",
        }
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        headline: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      fontWeight: {
        light: '300',
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
      },
      boxShadow: {
        'product-card': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'modal': '0 20px 40px rgba(0, 0, 0, 0.15)',
        'subtle': '0 1px 3px rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        'fast': '200ms',
        'medium': '300ms',
        'slow': '400ms',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 300ms ease-in-out',
        'slide-up': 'slideUp 400ms ease-out',
        'scale-in': 'scaleIn 200ms ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}