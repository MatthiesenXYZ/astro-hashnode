import { defineConfig } from "astro/config";
import packagename from "@adammatthiesen/astro-commercejs";

// https://astro.build/config
export default defineConfig({
	integrations: [packagename()],
});
