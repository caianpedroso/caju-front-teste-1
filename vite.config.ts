import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import eslintPlugin from "@nabla/vite-plugin-eslint";
import vercel from "vite-plugin-vercel"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(, vercel()],
  server: {
    port: 3001,
  },
  resolve: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
  },
});
