import { z } from "astro/zod";

export function LayoutConfigSchema() {
	return z
		.string()
		.optional()
}
export const optionsSchema = z.object({
	/**
	 * The URL of the Hashnode blog
	 */
    hashnodeURL: z.string(),
	/**
	 * Allows the user to disable the default landing page and use their own Astro site instead of a landing page.
	 * @default true
	 */
	landingPage: z.boolean().default(true),
	/**
	 * Allows the user to enable/disable the Astro ViewTransitions component.
	 * @default true
	 * @see https://docs.astro.build/en/guides/view-transitions/ for more information about ViewTransitions
	 */
	useViewTransitions: z.boolean().default(true),
	/**
	 * Allows the user to change the layout component used for Astro-Hashnode pages.
	 */
    layoutComponent: LayoutConfigSchema(),
	/**
	 * Allows the user to enable verbose logging
	 * @default false
	 */
	verbose: z.boolean().default(false),
});

export type Options = z.infer<typeof optionsSchema>;