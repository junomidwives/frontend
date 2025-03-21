const heroText = ref("");

export function useHero() {
  function setHeroText(text: string) {
    heroText.value = text;
  }

  return {
    setHeroText,
    heroText,
  };
}
