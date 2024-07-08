import { fileURLToPath, URL } from "node:url"

import { defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import eslint from "vite-plugin-eslint"

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ""))

  return {
    server: {
      port: process.env.PORT,
      open: true,
      hmr: {
        overlay: false
      }
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 2000
    },
    plugins: [vue(), eslint()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url))
      }
    }
  }
})
