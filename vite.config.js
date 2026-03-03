import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

function normalizeBasePath(value) {
  if (!value || value === "/") {
    return "/";
  }

  let normalized = value.trim();
  if (!normalized.startsWith("/")) {
    normalized = `/${normalized}`;
  }
  if (!normalized.endsWith("/")) {
    normalized = `${normalized}/`;
  }

  return normalized;
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const base = normalizeBasePath(env.VITE_BASE_PATH || "/");

  return {
    plugins: [
      react({
        include: ["**/*.jsx", "**/*.js", "**/*.tsx", "**/*.ts"],
      }),
    ],
    base,
    test: {
      environment: "jsdom",
      setupFiles: ["./vitest.setup.js"],
      globals: true,
    },
    build: {
      outDir: "build",
      emptyOutDir: true,
    },
    server: {
      port: 3000,
      strictPort: true,
    },
  };
});
