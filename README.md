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

## Branches and environments

```
feature/fix branch ──PR──▶ release/vX.Y.Z ──PR──▶ main ──▶ live site
                                 │
                                 └──(automatic)──▶ qa ──▶ QA site
```

- **`main`** is the live site. Only release PRs (`release/vX.Y.Z` → `main`) are merged into it; merging one tags the version, writes the release notes and emails them to the client (`.github/workflows/release.yml`).
- **`release/vX.Y.Z`** collects the feature and fix PRs for one release. Several can be open at once, e.g. a long-running redesign alongside small fix releases.
- **`qa`** is what the QA Netlify site deploys. Don't commit to it or open PRs against it: `.github/workflows/qa.yml` rebuilds it whenever `main` or a `release/*` branch changes, as `main` plus every release branch that hasn't shipped yet, merged in version order. So QA always shows the live site plus everything on its way. A deleted release branch drops out on the next rebuild. If two release branches conflict, the workflow fails and says which one; fix it on that release branch and re-run the workflow.

Urgent fixes can still go straight to `main` (the release workflow then cuts a patch version).

## Newsletter signup

The newsletter form posts to a Netlify Function, `netlify/functions/subscribe.mts` (served at `/.netlify/functions/subscribe`), which adds the subscriber in MailerLite. The MailerLite API key stays on the server. Before this, it was read in the browser as `VITE_MAILERLITE_TOKEN`, which built the key into the site's public JavaScript.

Set these in Netlify on **both** sites (Site configuration → Environment variables):

| Variable | Value |
| --- | --- |
| `MAILERLITE_TOKEN` | MailerLite API key (MailerLite → Integrations → API) |
| `MAILERLITE_GROUP` | ID of the group new subscribers join (optional) |

Don't give them a `VITE_` prefix: Vite would build them into the public JavaScript again.

The function only runs on Netlify, so the form can't subscribe anyone under `nuxt dev`.

## Draft preview (QA site)

The QA Netlify site doubles as the draft preview for Sanity Studio's **Preview** tab (Presentation tool). Setting `SANITY_PREVIEW=true` changes the build:

- Pages are rendered on request (`nuxt build`, Netlify Functions) instead of pre-built, so content is always current. Content changes don't need a rebuild.
- `@nuxtjs/sanity` visual editing is on. Studio opens the site through `/preview/enable`, which checks Sanity's one-time preview secret and sets the `__sanity_preview` cookie. With the cookie, queries use the `previewDrafts` perspective. Without it, visitors see published content only.
- Every response carries `X-Robots-Tag: noindex, nofollow`.

The live site doesn't set `SANITY_PREVIEW` and is built exactly as before.

QA site settings:

| Setting | Value |
| --- | --- |
| Production branch | `qa` (see [Branches and environments](#branches-and-environments)) |
| Build command | `npm run build` |
| `SANITY_PREVIEW` | `true` |
| `SANITY_PREVIEW_TOKEN` | Sanity API token with the **Viewer** role ("Preview (QA site)" in sanity.io/manage) |
| `SANITY_STUDIO_URL` | Optional, defaults to `https://juno-midwives.sanity.studio` |

On the Studio side, set `SANITY_STUDIO_PREVIEW_URL` to the QA site URL in the `cms` repo's `.env` before `npm run deploy`.
