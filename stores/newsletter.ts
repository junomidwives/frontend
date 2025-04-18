export const useNewsletterStore = defineStore("newsletter", () => {
  const name = ref("");
  const email = ref("");

  async function subscribe() {
    try {
      await fetch("https://connect.mailerlite.com/api/subscribers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + import.meta.env.VITE_MAILERLITE_TOKEN,
        },
        body: JSON.stringify({
          email: email.value,
          fields: {
            name: name.value,
          },
          groups: [import.meta.env.VITE_MAILERLITE_GROUP],
        }),
      });
    } catch (e: any) {
      throw e;
    }
  }

  return {
    name,
    email,
    subscribe,
  };
});
