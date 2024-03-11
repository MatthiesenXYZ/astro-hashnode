# PACKAGE-NAME

DESCRIPTION

## Installation

Install the integration **automatically** using the Astro CLI:

```bash
pnpm astro add PACKAGE-NAME
```

```bash
npm astro add PACKAGE-NAME
```

```bash
yarn astro add PACKAGE-NAME
```

Or install it **manually**:

1. Install the required dependencies

```bash
pnpm add PACKAGE-NAME
```

```bash
npm install PACKAGE-NAME
```

```bash
yarn add PACKAGE-NAME
```

2. Add the integration to your astro config

```diff
+import PACKAGE-NAME from "PACKAGE-NAME";

export default defineConfig({
  integrations: [
+    PACKAGE-NAME(),
  ],
});
```

## Basic Usage



## Contributing

This package is structured as a monorepo:

- `playground` contains code for testing the package
- `package` contains the actual package

Install dependencies using pnpm: 

```bash
pnpm i --frozen-lockfile
```

Start the playground:

```bash
pnpm playground:dev
```

You can now edit files in `package`. Please note that making changes to those files may require restarting the playground dev server.

## Licensing

[MIT Licensed](./LICENSE). Made with ❤️ by [Adam M.](https://github.com/AdamMatthiesen).

## Acknowledgements

TODO:
