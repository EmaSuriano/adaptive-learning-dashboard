import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"

const GH_REPO_PATH = 'https://emasuriano.github.io/adaptive-learning-dashboard/'

const base = process.env.NODE_ENV === 'production' ? GH_REPO_PATH : ''

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
