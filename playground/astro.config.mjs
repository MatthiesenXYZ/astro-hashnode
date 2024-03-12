import { defineConfig } from "astro/config";
import astroHashnode from "@matthiesenxyz/astro-hashnode";
// import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
	// output: 'server',
	// adapter: node({
	// 	mode: 'standalone',
	// }),
	integrations: [
		astroHashnode({
			hashnodeURL: "astroplayground.hashnode.dev",
			verbose: true,
		})
	],
});
