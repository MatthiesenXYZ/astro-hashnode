# Astro Hashnode

An Integration to bring your Hashnode Headless Blog content into Astro!

## Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add @matthiesenxyz/astro-hashnode
```

```bash
npm astro add @matthiesenxyz/astro-hashnode
```

```bash
yarn astro add @matthiesenxyz/astro-hashnode
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add @matthiesenxyz/astro-hashnode
```

```bash
npm install @matthiesenxyz/astro-hashnode
```

```bash
yarn add @matthiesenxyz/astro-hashnode
```

2. Add the integration to your astro config

```diff
+import astroHashnode from "@matthiesenxyz/astro-hashnode";

export default defineConfig({
  integrations: [
+   astroHashnode({
+      hashnodeURL: 'astroplayground.hashnode.dev'
    }),
  ],
});
```

## Full Configuration Options

```ts
astroHashnode({
  hashnodeURL: 'astroplayground.hashnode.dev', // Your hashnode URL
  landingPage: true, // Lets you disable the default landing page!
  disableViewTransitions: false, // Lets you disable the Default included ViewTransitions.
  layoutComponent: './src/layouts/YourLayout.astro' // Lets you change the default Layout.astro being used by the Integration Pages.
  verbose: false // Change to Verbose console output
})
```

Node: This Integration uses the new Tailwind v4  There is no config options in this version of tailwindCSS,  and applyBaseStyles is enabled!  So if you are building your own LayoutComponent feel free to use TailwindCSS!

## Licensing

[MIT Licensed](./LICENSE). Made with ❤️ by [Adam M.](https://github.com/AdamMatthiesen).

## Acknowledgements

- [`astro-integration-kit`](https://github.com/florian-lefebvre/astro-integration-kit) by Florian
- [`Hashnode - HeadlessCMS`](https://hashnode.com/headless) by the Hashnode
- [`TailwindCSS v4`](https://tailwindcss.com/blog/tailwindcss-v4-alpha) by the TailwindCSS team
- [`Astro-Font`](https://github.com/rishi-raj-jain/astro-font) by Rishi
- [`Astro-SEO`](https://github.com/jonasmerlin/astro-seo) by Jonas
- [`Astro-Remote`](https://github.com/natemoo-re/astro-remote) by Nate

