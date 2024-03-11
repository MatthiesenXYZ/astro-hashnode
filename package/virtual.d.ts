declare module 'virtual:astro-hashnode/config' {
    const userConfig: import("./src/schemas/user-config").Options;
     export default config as userConfig;
}

declare module 'virtual:astro-hashnode/components' {
    export const Layout: typeof import("./src/layouts/Layout.astro").default
}