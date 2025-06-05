// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  // ────────────────────────────────────────────────────────────────────────────
  // 🎯 Tell Vite that this site will be served from /hospohub2/ on GitHub Pages
  base: "/hospohub2/",
  // ────────────────────────────────────────────────────────────────────────────

  server: {
    host: "::",
    port: 8080,
  },

  plugins: [
    react(),
    mode === "development" && componentTagger(),
  ].filter(Boolean),

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
