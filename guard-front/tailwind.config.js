/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,jsx,js}",
  ],
  theme: {
  extend: {
    fontFamily: {
      sans: ['"Schibsted Grotesk"', "system-ui", "sans-serif"],
    },
    colors: {
      background: {
        primary: "#111111",
        secondary: "#1B1B1B",
        tertiary: "#303030",
      },
      border: {
        primary: "#111111",
        inverse: "#FFFFFF",
      },
      content: {
        primary: "#FFFFFF",
        body: "#F2E2E2",
        heading: "#C4C6C4",
        muted: "#5E5E5E",
        placeholder: "#777777",
        inverse: "#111111",
      },
      accent: {
        brand: "#C4F120",
        red: "#F61E32",
      },
    },
    fontSize: {
      heading: ["24px", { lineHeight: "32px", fontWeight: "400" }],
      "text-lg": ["16px", { lineHeight: "24px", fontWeight: "400" }],
      "text-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      "text-sm": ["12px", { lineHeight: "20px", fontWeight: "400" }],
      "text-xs": ["10px", { lineHeight: "14px", fontWeight: "400" }],
      "label-md": ["14px", { lineHeight: "20px", fontWeight: "400" }],
      "label-sm": ["12px", { lineHeight: "20px", fontWeight: "400" }],
    },
  },
},
  plugins: [],
}

