import type { Ref } from "vue";

/**
 * `await useSanityQuery(...)`, but safe on Nuxt 3.21+.
 *
 * In preview builds (SANITY_PREVIEW=true), @nuxtjs/sanity 1.13's visual-editing
 * `useSanityQuery` builds its result by spreading Nuxt's AsyncData object. Since
 * Nuxt 3.21 that object has its own `then`, so `await` resolves to the raw
 * AsyncData, and `data.value` comes back wrapped as `{ data, sourceMap }`
 * instead of the query result. Pages then crash, e.g. "blogs.value.slice is
 * not a function".
 *
 * We keep the handle, wait for it, and read `.data` from the handle itself.
 * The module keeps that ref unwrapped (and live-updated in the Studio's
 * Preview tab). In normal builds the handle is plain AsyncData, so this
 * behaves exactly like `await useSanityQuery(...)`.
 *
 * Remove once @nuxtjs/sanity is upgraded past this (2.x needs Nuxt 4).
 */
export async function useSanityData<T = unknown>(
  query: string,
  params?: Record<string, unknown>,
): Promise<{ data: Ref<T | null> }> {
  const handle = useSanityQuery<T>(query, params);
  await handle;
  return { data: handle.data as Ref<T | null> };
}
