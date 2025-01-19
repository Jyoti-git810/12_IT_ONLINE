import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "35a4b9": "#35a4b9",
        D0D0D0: "#D0D0D0",
        ffa103: "#ffa103",
      },
      width: {
        "17%": "17%",
        "95": "95%",
        "69": "69%",
        "55": "55%",
        "60": "60%",
        "75": "75%",
      },
      borderWidth: {
        1: "1px",
      },
      padding: {
        "1.6": "1.6rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
