import {
    createResolver,
    defineIntegration,
} from "astro-integration-kit";
import { corePlugins } from "astro-integration-kit/plugins";
import { z } from "astro/zod";

export default defineIntegration({
    name: "PACKAGE-NAME",
    optionsSchema: z.object({
        /** A comment */
        foo: z.string().optional().default("bar"),
    }),
    plugins: [...corePlugins],
    setup({ options }) {
        const { resolve } = createResolver(import.meta.url);

        return {
            "astro:config:setup": ({ watchIntegration }) => {
                watchIntegration(resolve())
            }
        }
    }
})