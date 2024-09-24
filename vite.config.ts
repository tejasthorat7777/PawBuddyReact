/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dotenv from "dotenv";

dotenv.config();
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/setupTest/setup.ts",
  },
  server: {
    proxy: {
      "^/api/": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
