const heroText = ref("");
const showHero = ref(true);

export function useHero() {
  function setHeroText(text: string) {
    heroText.value = text;
  }

  return {
    setHeroText,
    heroText,
    showHero,
  };
}
