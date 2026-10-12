import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  root:"pages",
  base:"/chem-project-for-sunface/",
  plugins:[react()],
  build:{outDir:"../pages-dist",emptyOutDir:true},
});
