export const useNewsletterStore = defineStore("newsletter", () => {
  const name = ref("");
  const email = ref("");

  /**
   * Signs up through our Netlify Function (netlify/functions/subscribe.mts),
   * which holds the MailerLite key. Throws a message string on failure.
   * (A string, not an Error: the signup component shows the thrown value
   * as is.)
   */
  async function subscribe() {
    let response: Response;
    try {
      response = await fetch("/.netlify/functions/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.value, email: email.value }),
      });
    } catch {
      throw "We couldn't reach the signup service. Please check your connection and try again.";
    }

    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw data.error || "We couldn't sign you up just now. Please try again later.";
    }
  }

  return {
    name,
    email,
    subscribe,
  };
});
