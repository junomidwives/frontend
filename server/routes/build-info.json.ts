// When this build started (before any content was fetched). Pre-rendered into
// the live site as /build-info.json. The Studio's "Waiting to go live" panel
// uses it to list documents published since the last deploy.
export default defineEventHandler(() => ({
  builtAt: useRuntimeConfig().buildTime,
}));
