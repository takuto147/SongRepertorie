import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // SAO風カラーパレット
        sao: {
          blue: {
            50: "#e6f3ff",
            100: "#b3d9ff",
            200: "#80bfff",
            300: "#4da6ff",
            400: "#1a8cff",
            500: "#0073e6",
            600: "#005bb3",
            700: "#004280",
            800: "#002a4d",
            900: "#00111a",
          },
          cyan: {
            50: "#e6ffff",
            100: "#b3ffff",
            200: "#80ffff",
            300: "#4dffff",
            400: "#1affff",
            500: "#00e6e6",
            600: "#00b3b3",
            700: "#008080",
            800: "#004d4d",
            900: "#001a1a",
          },
          purple: {
            50: "#f3e6ff",
            100: "#d9b3ff",
            200: "#bf80ff",
            300: "#a64dff",
            400: "#8c1aff",
            500: "#7300e6",
            600: "#5b00b3",
            700: "#420080",
            800: "#2a004d",
            900: "#11001a",
          },
          dark: {
            50: "#1a1a2e",
            100: "#16213e",
            200: "#0f3460",
            300: "#533483",
            400: "#e94560",
            500: "#0f0f23",
            600: "#0a0a1a",
            700: "#050511",
            800: "#030308",
            900: "#010102",
          },
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // SAO風アニメーション
        "glow-pulse": {
          "0%, 100%": {
            boxShadow: "0 0 5px #00e6e6, 0 0 10px #00e6e6, 0 0 15px #00e6e6",
            opacity: "1",
          },
          "50%": {
            boxShadow: "0 0 10px #00e6e6, 0 0 20px #00e6e6, 0 0 30px #00e6e6",
            opacity: "0.8",
          },
        },
        "matrix-rain": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "slide-in-right": {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        "fade-in-up": {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "glow-pulse": "glow-pulse 2s ease-in-out infinite",
        "matrix-rain": "matrix-rain 3s linear infinite",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "scan-line": "scan-line 2s linear infinite",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "cyber-grid": `
          linear-gradient(rgba(0, 230, 230, 0.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(0, 230, 230, 0.1) 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        grid: "20px 20px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
