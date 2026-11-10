import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Fecha de compilación: el pie la muestra como «última actualización» (se fija en cada despliegue)
  env: { BUILD_DATE: new Date().toISOString() },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
