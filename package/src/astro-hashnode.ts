import { createResolver, defineIntegration } from "astro-integration-kit";
import { addDtsPlugin, corePlugins } from "astro-integration-kit/plugins";
import tailwindcss from "@tailwindcss/vite";
import { optionsSchema } from "./schemas/user-config";
import c from "picocolors";
import { AstroError } from "astro/errors";
import { readFileSync } from "node:fs";

/**
 * Astro-Hashnode Integration
 */
export default defineIntegration({
    name: "@matthiesenxyz/astro-hashnode",
    optionsSchema,
    plugins: [ ...corePlugins, addDtsPlugin ],
    setup({ options }) {

        return {
            "astro:config:setup": ({ 
                watchIntegration, 
                addVitePlugin,
                addVirtualImports,
                addDts,
                injectScript,
                injectRoute, 
                updateConfig,
                config,
                logger,
            }) => {
                logger.info("Initializing...")
                // Create Resolvers
                const { resolve } = createResolver(import.meta.url);
                const { resolve: rootResolve} = createResolver(config.root.pathname)
                
                // Watch Integration for changes in DEV
                watchIntegration(resolve())

                const HashLogger = logger.fork(c.bold(c.blue("Astro-Hashnode")));
                const hashLogNoVerbose = (message:string) => {
                    HashLogger.info(c.magenta(message))
                }
                const hashLog = (message:string) => {
                    if (options.verbose) {
                        HashLogger.info(c.magenta(message))
                    }
                }
                const hashError = (message:string) => {
                    HashLogger.error(c.magenta(message))
                    throw new AstroError(message)
                }

                hashLogNoVerbose("Setting up Astro-Hashnode Integration")

                // Check for Hashnode URL
                if (!options.hashnodeURL) {
                    hashError("You must provide a hashnodeURL in your astro.config.mjs file.  Use the hashnodeURL from your hashnode blog.  It should look something like this: 'yourblog.hashnode.dev'")
                }

                hashLog(`Using Hashnode URL: ${options.hashnodeURL}`)

                hashLog("Setting up Virtual Imports and Layout Component")
                // Setup Layout Component
                // biome-ignore lint/suspicious/noImplicitAnyLet: This is a false positive
                let  layoutComponentPath

                if (options.layoutComponent) {
                    layoutComponentPath = rootResolve(options.layoutComponent)
                    hashLog('Using user defined layout component')
                } else {
                    layoutComponentPath = resolve('./layouts/Layout.astro')
                }

                addVirtualImports({
                    'virtual:astro-hashnode/config': `export default ${JSON.stringify(options) }`,
                    'virtual:astro-hashnode/components': `export { default as Layout } from "${layoutComponentPath}";`,
                })

                addDts({
                    name: 'astro-hashnode',
                    content: readFileSync(resolve("./definitions/astro-hashnode.d.ts"), "utf-8"),
                })

                hashLog("Setting up 'Tailwind CSS v4' Integration")
                // Add & Setup Tailwind CSS
                const twplugin = tailwindcss();
                for (const twp of twplugin) {
                    addVitePlugin(twp);
                }
                injectScript(
                    "page-ssr", 
                    `import "${resolve("./styles/tailwind.css")}";`
                );
                updateConfig({
                    vite: {
                        css: { transformer: "lightningcss" },
                    }
                })

                hashLog("Setting up Page Routes")
                // Add Page Routes
                if (options.landingPage) {
                    injectRoute({
                        pattern: config.base,
                        entrypoint: resolve("./pages/index.astro"),
                    });
                }
                injectRoute({
                    pattern: `${config.base}blog`,
                    entrypoint: resolve("./pages/blog/index.astro"),
                })
                injectRoute({
                    pattern: `${config.base}blog/[slug]`,
                    entrypoint: resolve("./pages/blog/[slug].astro"),
                })
                injectRoute({
                    pattern: `${config.base}blog/about`,
                    entrypoint: resolve("./pages/blog/about.astro"),
                })
                injectRoute({
                    pattern: `${config.base}blog/tags/[tag]`,
                    entrypoint: resolve("./pages/blog/tags/[tag].astro"),
                })
            },
            "astro:config:done":  ({ logger }) => {
                const HashLogger = logger.fork(c.bold(c.blue("Astro-Hashnode")));
                const hashLog = (message:string) => {
                    HashLogger.info(c.green(message))
                }
                hashLog("Astro-Hashnode Integration Setup Complete")
            
            }
        }
    }
})

export { type AstroHashnodeLayoutProps } from "./proptypes/layouttypes"