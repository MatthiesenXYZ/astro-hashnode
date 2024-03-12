declare module 'virtual:astro-hashnode/config' {
    const Config: import("./src/schemas/user-config").Options;
     export default config as Config;
}

declare module 'virtual:astro-hashnode/components' {
    export const Layout: typeof import("./src/layouts/Layout.astro").default
}