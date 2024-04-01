import { addDts, addVirtualImports, addVitePlugin, createResolver, defineIntegration } from "astro-integration-kit";
import tailwindcss from "@tailwindcss/vite";
import { optionsSchema } from "./schemas/user-config";
import c from "picocolors";
import { AstroError } from "astro/errors";
import { squooshImageService } from "astro/config";
import { fileFactory } from "./utils/filefactory";

/**
 * Astro-Hashnode Integration
 */
export default defineIntegration({
    name: "astro-hashnode",
    optionsSchema,
    setup({ name, options }) {
        type outputType = "static" | "hybrid" | "server";

        return {
            "astro:config:setup": ( params ) => {

                const { config, logger, injectScript, updateConfig, injectRoute } = params;

                logger.info("Initializing...")
                // Create Resolvers
                const { resolve } = createResolver(import.meta.url);
                const { resolve: rootResolve} = createResolver(config.root.pathname)
                

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

                // Check if output is static or hybrid
                const checkIfStatic = (output: outputType) => {
                    if (output === "static") { return true }
                    if (output === "hybrid") { return true }
                    return false
                }

                hashLogNoVerbose("Setting up Astro-Hashnode Integration")

                // Check for Hashnode URL
                if (!options.hashnodeURL) {
                    hashError("You must provide a hashnodeURL in your astro.config.mjs file.  Use the hashnodeURL from your hashnode blog.  It should look something like this: 'yourblog.hashnode.dev'")
                }

                hashLog(`Using Hashnode URL: ${options.hashnodeURL}`)

                hashLog("Setting up Virtual Imports and Layout Component")
                // Setup Layout Component
                let layoutComponentPath: string;

                if (options.layoutComponent) {
                    layoutComponentPath = rootResolve(options.layoutComponent)
                    hashLog('Using user defined layout component')
                } else {
                    layoutComponentPath = resolve('./layouts/Layout.astro')
                }

                addVirtualImports(params, {name, imports: {
                    'virtual:astro-hashnode/config': `export default ${JSON.stringify(options) }`,
                    'virtual:astro-hashnode/components': `export { default as Layout } from "${layoutComponentPath}";`,
                }})

                const hashnodeDTS = fileFactory()

                hashnodeDTS.addLines(`
                    declare module 'virtual:astro-hashnode/config' {
                        const Config: import("${resolve("./schemas/user-config")}").Options;
                        export default Config;
                    }
                    declare module 'virtual:astro-hashnode/components' {
                        export const Layout: typeof import("${layoutComponentPath}").default
                    }
                `)

                addDts(params, {
                    name,
                    content: hashnodeDTS.text(),
                })

                // Add & Setup Tailwind CSS
                hashLog("Setting up 'Tailwind CSS v4' Integration")
                addVitePlugin(params, { plugin: tailwindcss() });

                // Inject CSS
                injectScript(
                    "page-ssr", 
                    `import "${resolve("./styles/tailwind.css")}";`
                );

                // Update Astro Config
                updateConfig({
                    image: {
                        service: squooshImageService(),
                    },
                    vite: {
                        css: { transformer: "lightningcss" },
                    }
                })

                // Add Page Routes
                hashLog("Setting up Page Routes")
                if (options.landingPage) {
                    injectRoute({
                        pattern: config.base,
                        entrypoint: resolve("./pages/index.astro"),
                        prerender: true,
                    });
                }
                injectRoute({
                    pattern: `${config.base}blog`,
                    entrypoint: resolve("./pages/blog/index.astro"),
                })
                injectRoute({
                    pattern: `${config.base}blog/about`,
                    entrypoint: resolve("./pages/blog/about.astro"),
                })
                injectRoute({
                    pattern: `${config.base}blog/tags/[tag]`,
                    entrypoint: resolve("./pages/blog/tags/[tag].astro"),
                    prerender: true,
                })

                // Add Blog Post Routes based on output type
                if ( checkIfStatic(config.output) ) {
                    // Static & Hybrid Routes
                    injectRoute({
                        pattern: `${config.base}blog/[slug]`,
                        entrypoint: resolve("./pages/blog/[slug].astro"),
                        prerender: true,
                    })
                } else {
                    // Server Routes
                    injectRoute({
                        pattern: `${config.base}blog/[slug]`,
                        entrypoint: resolve("./pages/ssr-pages/[slug].astro"),
                    })
                }


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