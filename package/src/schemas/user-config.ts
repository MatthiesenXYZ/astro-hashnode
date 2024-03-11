import { z } from "astro/zod";
import { createResolver } from 'astro-integration-kit';

const { resolve } = createResolver(import.meta.url)

export function LayoutConfigSchema() {
	return z
		.string()
		.optional()
}
export const optionsSchema = z.object({
    hashnodeURL: z.string(),
	landingPage: z.boolean().default(true),
    layoutComponent: LayoutConfigSchema(),
	verbose: z.boolean().default(false),
});

export type Options = z.infer<typeof optionsSchema>;