import { defineConfig, squooshImageService } from "astro/config";
import astroHashnode from "@matthiesenxyz/astro-hashnode";

// https://astro.build/config
export default defineConfig({
	integrations: [
		astroHashnode({
			hashnodeURL: "astroplayground.hashnode.dev",
			verbose: true,
		})
	],
	image: {
		service: squooshImageService(),
	}
});
