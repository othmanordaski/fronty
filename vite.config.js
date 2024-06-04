import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@services": path.resolve(__dirname, './src/services'),
      "@contexts": path.resolve(__dirname, './src/contexts'),
      "@assets": path.resolve(__dirname, './src/assets'),
      "@routes": path.resolve(__dirname, './src/routes'),
      "@pages": path.resolve(__dirname, './src/pages'),
    },
  },
})
