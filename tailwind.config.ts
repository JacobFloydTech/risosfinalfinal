import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
        'sm': '640px',
        // => @media (min-width: 640px) { ... }
            
        'md': '768px',
        // => @media (min-width: 768px) { ... }
            
        'lg': '1024px',
        // => @media (min-width: 1024px) { ... }
            
        'xl': '1280px',
        // => @media (min-width: 1280px) { ... }
            
        '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
        '3xl': '2048px',
      },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: { 
        "fade-out-down": { 
          from: { 
            opacity: "1",
            transform: "translateY(0)"
          },
          to : { 
            opacity: "0",
            transform: "translateY(100px)"
          }
        }
      },
      animation: { 
        "fade-out-down": "fade-out-down 1s ease-out",
      }
    },
  },
  plugins: [],
}
export default config
