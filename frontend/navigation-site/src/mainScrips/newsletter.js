const form = document.getElementById("newsletter-form");
const input = document.getElementById("textInput");
const msg = document.getElementById("response-msg");

form.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = input.value.trim();

    try {
      const response = await fetch("https://deine-backend-url.de/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const text = await response.text();
      msg.textContent = text;
      msg.style.color = response.ok ? "green" : "red";
    } catch (err) {
      msg.textContent = "Fehler beim Senden. Bitte später versuchen.";
      msg.style.color = "red";
    }
});
