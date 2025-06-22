import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: '/panamount/', // Must match your repo name
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  plugins: [react()],
});

