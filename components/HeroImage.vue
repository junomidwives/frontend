<template>
  <section
    class="hero"
    :class="{
      'hero--home': isHome,
      'hero--solid': variant !== 'photo',
      'hero--light': isIdea,
      [`hero--${variant}`]: isIdea,
    }"
    :data-texture="variant === 'texture' ? texture : undefined"
    :style="{
      '--hero-photo-opacity': variant === 'tint' ? photoOpacity : undefined,
      '--hero-scale': heightScale,
    }"
  >
    <!-- WebP sized to the screen (15KB on phones, 55KB at full size; the
         JPEG fallback is 112KB). This is the page's largest image. -->
    <picture v-if="variant === 'photo' || variant === 'tint'">
      <source
        type="image/webp"
        srcset="/img/splash-800.webp 800w, /img/splash-1200.webp 1200w, /img/splash-1880.webp 1880w"
        sizes="100vw"
      />
      <img
        src="/img/splash.jpg"
        alt=""
        class="hero__image"
        width="1880"
        height="1253"
        fetchpriority="high"
      />
    </picture>
    <!-- EXPLORATION: illustrated ideas, drawn in the Juno palette. -->
    <template v-if="variant === 'horizon'">
      <span class="hero__sun" aria-hidden="true"></span>
      <svg
        class="hero__art hero__art--waves"
        viewBox="0 0 1440 145"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 30 C 180 0, 360 0, 540 25 S 900 55, 1080 27 S 1320 0, 1440 20 V145 H0 Z" fill="#c1e3d3" />
        <path d="M0 67 C 200 45, 400 45, 600 65 S 1000 90, 1200 65 S 1380 50, 1440 60 V145 H0 Z" fill="#356273" />
        <path d="M0 105 C 240 87, 480 87, 720 103 S 1200 123, 1440 97 V145 H0 Z" fill="#22495a" />
      </svg>
    </template>
    <svg
      v-if="variant === 'mark'"
      class="hero__art hero__art--mark"
      viewBox="77.68 81.33 152.52 152.52"
      aria-hidden="true"
    >
      <circle cx="153.94" cy="157.59" r="76.24" fill="#356273" />
      <path fill="#fff" d="M135.79,127.43h0c6.43,0,11.64,5.22,11.64,11.64v18.1c0,12.85-10.44,23.29-23.29,23.29h0v-41.39c0-6.43,5.22-11.64,11.64-11.64Z" />
      <rect fill="#fff" x="152.41" y="127.43" width="23.29" height="53.04" rx="11.64" ry="11.64" transform="translate(328.12 307.89) rotate(-180)" />
      <rect fill="#fff" x="180.69" y="127.43" width="23.29" height="53.04" rx="11.64" ry="11.64" transform="translate(384.66 307.89) rotate(-180)" />
      <circle cx="108.28" cy="169.83" r="12" fill="#eba5a5" />
    </svg>
    <svg
      v-if="variant === 'pebbles'"
      class="hero__art hero__art--pebbles"
      viewBox="0 0 600 400"
      preserveAspectRatio="xMaxYMid meet"
      aria-hidden="true"
    >
      <path d="M330 60 C 430 20, 560 70, 570 180 C 580 290, 470 360, 360 340 C 250 320, 210 230, 240 150 C 260 100, 290 75, 330 60 Z" fill="#c1e3d3" />
      <path d="M470 230 C 530 210, 590 250, 585 310 C 580 370, 520 395, 470 375 C 420 355, 410 250, 470 230 Z" fill="#eba5a5" opacity="0.85" />
      <path d="M250 250 C 300 225, 360 250, 365 300 C 370 350, 320 380, 270 365 C 220 350, 200 275, 250 250 Z" fill="#356273" />
      <circle cx="430" cy="105" r="18" fill="#22495a" />
    </svg>
    <div class="hero__inner">
      <template v-if="isHome">
        <p class="hero__title">Natasha &amp; Sophie</p>
        <p class="hero__subtitle">Independent Midwives in Kent</p>
      </template>
      <p v-else class="hero__title">{{ text }}</p>
    </div>
    <!-- EXPLORATION: style switcher, local dev server only. -->
    <ClientOnly v-if="explore"><HeroSwitcher /></ClientOnly>
  </section>
</template>

<script setup lang="ts">
// Each page renders its own hero, so the text is right in the
// server-rendered HTML even when it comes from Sanity.
const props = defineProps<{
  /** The page title. Leave it out on the homepage to show the names. */
  text?: string;
}>();

const isHome = computed(() => !props.text);

// EXPLORATION: hero styles to compare, on QA and the dev server only (the
// live site always shows the photo and ignores these switches).
//   (default)      the current sea photo
//   ?hero=solid    plain deep teal
//   ?hero=tint     the sea photo over deep teal; ?opacity=15–70 (percent)
//   ?hero=horizon  illustrated Kent coast at dawn (light)
//   ?hero=mark     the Juno logo mark, oversized (light)
//   ?hero=pebbles  soft organic shapes (light)
//   ?hero=texture  deep teal with a palette-only texture, chosen with
//                  ?texture=waves (default), ripples, glow or grain,
//                  or a gradient: diagonal, depth, spotlight or mesh
//   ?height=80|65  the hero at that percentage of its usual height
const explore = import.meta.dev || Boolean(useRuntimeConfig().public.heroExplore);
const route = useRoute();
const IDEAS = ["horizon", "mark", "pebbles"];
const variant = computed(() =>
  explore && ["solid", "tint", "texture", ...IDEAS].includes(route.query.hero as string)
    ? (route.query.hero as string)
    : "photo",
);
const isIdea = computed(() => IDEAS.includes(variant.value));
// ?height=80 or 65: the hero at that percentage of its usual height.
const heightScale = computed(() => {
  if (!explore) return undefined;
  const pct = Number(route.query.height);
  return Number.isFinite(pct) && pct >= 40 && pct <= 100 ? pct / 100 : undefined;
});
const photoOpacity = computed(() => {
  const pct = Number(route.query.opacity);
  return Number.isFinite(pct) && pct > 0 && pct <= 100 ? pct / 100 : 0.25;
});
const TEXTURES = ["waves", "ripples", "glow", "grain", "diagonal", "depth", "spotlight", "mesh"];
const texture = computed(() =>
  TEXTURES.includes(route.query.texture as string) ? (route.query.texture as string) : "waves",
);
</script>

<style>
.hero {
  position: relative;
  display: flex;
  align-items: center;
  min-height: calc(320px * var(--hero-scale, 1));
  overflow: hidden;
  background: rgb(var(--v-theme-deep));
  color: #fff;
}

.hero--home {
  min-height: calc(400px * var(--hero-scale, 1));
}

.hero__image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 40%;
  filter: brightness(0.95);
}

/* Shade only behind the text, so the right of the photo stays bright. */
.hero::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    90deg,
    rgba(23, 49, 61, 0.72) 0%,
    rgba(23, 49, 61, 0.45) 38%,
    rgba(23, 49, 61, 0) 68%
  );
}

.hero__inner {
  position: relative;
  z-index: 1;
  width: 100%;
  /* 1104px of text, like the page blocks below, so left edges line up. */
  max-width: 1152px;
  margin: 0 auto;
  padding: calc(64px * var(--hero-scale, 1)) 24px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.hero--home .hero__inner {
  padding-block: calc(64px * var(--hero-scale, 1));
}

/* Textures: drawn in CSS from the Juno palette only (deep teal, logo
   teal, mint, pink), behind the text. */
.hero[data-texture]::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  /* Vuetify's reset sets no-repeat on everything; patterns need to tile. */
  background-repeat: repeat;
}

/* Waves: fine wavy lines in faint mint, like a calm sea surface. */
.hero[data-texture="waves"]::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='32' viewBox='0 0 160 32'%3E%3Cpath d='M0 16 C 27 6, 53 6, 80 16 S 133 26, 160 16' fill='none' stroke='rgba(193,227,211,0.22)' stroke-width='1.5'/%3E%3C/svg%3E");
  background-size: 160px 32px;
}

/* Ripples: rings spreading from the right, echoing the round logo. */
.hero[data-texture="ripples"]::before {
  background: repeating-radial-gradient(
    circle at 88% 55%,
    rgba(193, 227, 211, 0.09) 0 1.5px,
    transparent 1.5px 34px
  );
  -webkit-mask-image: radial-gradient(circle at 88% 55%, #000 0, #000 30%, transparent 70%);
  mask-image: radial-gradient(circle at 88% 55%, #000 0, #000 30%, transparent 70%);
}

/* Glow: soft light in logo teal, with a faint blush of pink. */
.hero[data-texture="glow"]::before {
  background:
    radial-gradient(ellipse 60% 90% at 85% 15%, rgba(53, 98, 115, 0.95), transparent 70%),
    radial-gradient(ellipse 45% 70% at 70% 115%, rgba(235, 165, 165, 0.16), transparent 70%);
}

/* Grain: a very fine paper-like grain in mint. */
.hero[data-texture="grain"]::before {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.76  0 0 0 0 0.89  0 0 0 0 0.83  0 0 0 0.55 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)'/%3E%3C/svg%3E");
  opacity: 0.18;
}

/* Gradients: palette colours only. */
/* Diagonal: deep teal at the text, easing to logo teal top right. */
.hero[data-texture="diagonal"]::before {
  background: linear-gradient(115deg, #22495a 0%, #22495a 35%, #356273 100%);
}

/* Depth: lighter logo teal at the top, settling into deep teal and a touch
   of ink at the bottom, like looking down into water. */
.hero[data-texture="depth"]::before {
  background: linear-gradient(180deg, #356273 0%, #22495a 60%, #1f3d4b 100%);
}

/* Spotlight: a soft pool of logo teal on the right, deep teal elsewhere. */
.hero[data-texture="spotlight"]::before {
  background: radial-gradient(ellipse 70% 120% at 85% 50%, #3c6d7f 0%, #356273 25%, #22495a 75%);
}

/* Mesh: several soft colour pools (logo teal, mint, a hint of pink) over
   deep teal, for a gentle painted feel. */
.hero[data-texture="mesh"]::before {
  background:
    radial-gradient(ellipse 50% 80% at 90% 10%, rgba(53, 98, 115, 0.95), transparent 70%),
    radial-gradient(ellipse 40% 60% at 65% 95%, rgba(193, 227, 211, 0.14), transparent 70%),
    radial-gradient(ellipse 35% 50% at 100% 90%, rgba(235, 165, 165, 0.14), transparent 70%),
    #22495a;
}

/* Ideas: a light hero with ink text and a drawing in the palette. */
.hero--light {
  background: rgb(var(--v-theme-tint));
  color: rgb(var(--v-theme-ink));
}

.hero--light .hero__subtitle {
  color: rgb(var(--v-theme-body));
}

.hero__art {
  position: absolute;
  pointer-events: none;
}

/* Horizon: a dawn sky, a pink sun (the logo's dot) and layered waves along
   the bottom. The waves and sun scale with the hero's height. */
.hero--horizon {
  --wave-h: calc(145px * var(--hero-scale, 1));
  background: linear-gradient(180deg, #eef4f3 0%, #f8e6e4 75%);
}

.hero__art--waves {
  left: 0;
  bottom: 0;
  width: 100%;
  height: var(--wave-h);
}

.hero__sun {
  position: absolute;
  left: 75.7%;
  bottom: calc(var(--wave-h) * 0.814);
  width: calc(var(--wave-h) * 0.91);
  aspect-ratio: 1;
  border-radius: 50%;
  background: rgb(var(--v-theme-pink));
  transform: translate(-50%, 50%);
}

.hero--horizon .hero__inner {
  padding-bottom: calc(var(--wave-h) * 0.85);
}

/* Logo mark: large, cropped off the right-hand edge. */
.hero__art--mark {
  top: 50%;
  right: -6%;
  height: 150%;
  width: auto;
  transform: translateY(-50%);
}

/* Pebbles: a cluster on the right. */
.hero__art--pebbles {
  top: 0;
  right: 0;
  height: 100%;
  width: 60%;
}

@media (max-width: 960px) {
  .hero--horizon {
    --wave-h: calc(115px * var(--hero-scale, 1));
  }
  .hero__art--mark {
    right: -28%;
    height: 120%;
  }
  .hero__art--pebbles {
    width: 75%;
    opacity: 0.6;
  }
}

@media (max-width: 700px) {
  .hero--horizon {
    --wave-h: calc(80px * var(--hero-scale, 1));
  }
  .hero__art--mark {
    right: -30%;
    height: 110%;
    opacity: 0.3;
  }
  /* Sun tucked to the right; a little more room between text and waves. */
  .hero__sun {
    left: 84%;
    width: calc(var(--wave-h) * 0.85);
  }
  .hero--horizon .hero__inner {
    padding-bottom: calc(var(--wave-h) * 1.05);
  }
  .hero__art--pebbles {
    width: 100%;
    opacity: 0.35;
  }
}

/* Photo on teal: the sea photo over deep teal at the chosen opacity. */
.hero--solid .hero__image {
  opacity: var(--hero-photo-opacity, 0.25);
}

/* Solid teal, like the quote band: no photo, no shading. */
.hero--solid::after {
  content: none;
}

.hero--solid .hero__title,
.hero--solid .hero__subtitle {
  text-shadow: none;
}

.hero__title,
.hero__subtitle {
  margin: 0;
  text-shadow: 0 1px 12px rgba(0, 0, 0, 0.18);
}

.hero__title {
  font-size: var(--type-display);
  line-height: 1.05;
  font-weight: 700;
  letter-spacing: -0.01em;
}

.hero__subtitle {
  font-size: var(--type-display-sub);
  line-height: 1.15;
  font-weight: 300;
  color: rgb(var(--v-theme-tint));
}

/* Tablets */
@media (max-width: 960px) {
  .hero {
    min-height: calc(240px * var(--hero-scale, 1));
  }
  .hero--home {
    min-height: calc(340px * var(--hero-scale, 1));
  }
  .hero__inner,
  .hero--home .hero__inner {
    padding-block: calc(56px * var(--hero-scale, 1));
  }
}

/* Phones */
@media (max-width: 700px) {
  .hero {
    min-height: calc(180px * var(--hero-scale, 1));
  }
  .hero--home {
    min-height: calc(240px * var(--hero-scale, 1));
  }
  .hero__inner,
  .hero--home .hero__inner {
    padding-block: calc(40px * var(--hero-scale, 1));
    gap: 4px;
  }
}
</style>
