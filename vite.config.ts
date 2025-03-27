import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const isProduction = mode === 'production';
  const outDir = path.resolve(process.cwd(), 'dist');

  return {
    server: {
      host: true, // This allows connections from all network interfaces
      port: Number(process.env.PORT) || 3000,
    },
    preview: {
      port: Number(process.env.PORT) || 3000,
      host: true,
    },
    build: {
      outDir,
      assetsDir: 'assets',
      emptyOutDir: true,
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
      sourcemap: false,
      // Ensure we generate all necessary files
      manifest: true,
      copyPublicDir: true,
      write: true,
    },
    plugins: [
      react(),
      mode === 'development' &&
      componentTagger(),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
