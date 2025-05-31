import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
// biome-ignore lint/style/noDefaultExport: <explanation>
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/AI_Meet_Scorer/', // あなたのGitHubリポジトリ名に合わせて設定
})
