// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://eic.skku.edu",
  integrations: [sitemap({ filter: (page) => !page.endsWith("/game/") })],
});
