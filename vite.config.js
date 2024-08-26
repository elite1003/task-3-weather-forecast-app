import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  base: "/task-3-weather-forecast-app/",
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname),
    },
  },
});
