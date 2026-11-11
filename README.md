# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Draft preview (QA site)

The QA Netlify site doubles as the draft preview for Sanity Studio's **Preview** tab (Presentation tool). Setting `SANITY_PREVIEW=true` changes the build:

- Pages are rendered on request (`nuxt build`, Netlify Functions) instead of pre-built, so content is always current. Content changes don't need a rebuild.
- `@nuxtjs/sanity` visual editing is on. Studio opens the site through `/preview/enable`, which checks Sanity's one-time preview secret and sets the `__sanity_preview` cookie. With the cookie, queries use the `previewDrafts` perspective. Without it, visitors see published content only.
- Every response carries `X-Robots-Tag: noindex, nofollow`.

The live site doesn't set `SANITY_PREVIEW` and is built exactly as before.

QA site settings:

| Setting | Value |
| --- | --- |
| Build command | `npm run build` |
| `SANITY_PREVIEW` | `true` |
| `SANITY_PREVIEW_TOKEN` | Sanity API token with the **Viewer** role ("Preview (QA site)" in sanity.io/manage) |
| `SANITY_STUDIO_URL` | Optional, defaults to `https://juno-midwives.sanity.studio` |

On the Studio side, set `SANITY_STUDIO_PREVIEW_URL` to the QA site URL in the `cms` repo's `.env` before `npm run deploy`.
