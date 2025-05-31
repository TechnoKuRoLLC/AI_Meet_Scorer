import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class", "dark"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
}
// biome-ignore lint/style/noDefaultExport: <explanation>
export default config
