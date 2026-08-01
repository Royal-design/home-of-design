import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      animation: {
        scroll:
          "scroll var(--animation-duration, 40s) var(--animation-direction, forwards) linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee 36s linear infinite",
        "marquee-reverse": "marquee-reverse 36s linear infinite",
        "spin-slow": "spin 14s linear infinite",
        "pulse-line": "pulse-line 2.4s ease-in-out infinite",
        "fade-up": "fade-up 0.9s cubic-bezier(0.16, 1, 0.3, 1) both"
      },
      keyframes: {
        scroll: {
          to: { transform: "translate(calc(-50% - 0.5rem))" }
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" }
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" }
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" }
        },
        "marquee-reverse": {
          from: { transform: "translateX(-50%)" },
          to: { transform: "translateX(0)" }
        },
        "pulse-line": {
          "0%, 100%": { transform: "scaleX(0.4)", opacity: "0.6" },
          "50%": { transform: "scaleX(1)", opacity: "1" }
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      fontFamily: {
        sans: ["Manrope Variable", "Manrope", "system-ui", "sans-serif"],
        display: ["Instrument Serif", "Georgia", "serif"],
        mono: ["IBM Plex Mono", "ui-monospace", "SFMono-Regular", "monospace"]
      },
      letterSpacing: {
        eyebrow: "0.22em",
        tightest: "-0.045em"
      },
      maxWidth: {
        shell: "92rem"
      },
      transitionTimingFunction: {
        "expo-out": "cubic-bezier(0.16, 1, 0.3, 1)",
        "expo-in-out": "cubic-bezier(0.87, 0, 0.13, 1)"
      },
      screens: {
        "max-sm": { max: "700px" },
        "max-md": { min: "701px", max: "900px" },
        "max-lg": { min: "901px", max: "1100px" },
        "max-xl": { min: "1101px", max: "1535px" },
        "2xl": "1536px"
      },
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        "ink-2": "var(--ink-2)",
        "ink-3": "var(--ink-3)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        bronze: "var(--bronze)",
        "bronze-2": "var(--bronze-2)",
        forest: "var(--forest)",
        "on-dark": "var(--on-dark)",

        button: "var(--button)",
        background: "var(--background)",
        foreground: "hsl(var(--foreground))",
        "light-color": "var(--light-color)",
        "lighter-color": "var(--lighter-color)",
        "border-line": "var(--border-line)",
        "banner-overlay": "var(--banner-overlay)",
        "button-hover": "var(--button-hover)",
        category: "var(--category)",
        banner: "var(--banner)",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))"
        }
      }
    }
  },
  plugins: [tailwindcssAnimate]
};
