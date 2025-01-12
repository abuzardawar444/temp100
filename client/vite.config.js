import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    //this method forwards all the API requests to the target server, here server 5100/api. So, we change the origin and modify the path.
    proxy: {
      "/api": {
        target: "http://localhost:5100/api",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
