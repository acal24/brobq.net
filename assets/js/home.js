(() => {
  const PHRASE = "pepperoni";
  const STORAGE_KEY = "brobq_admitted";
  const SUCCESS_HOLD_MS = 2000;
  const FADE_MS = 900;

  const gate = document.getElementById("gate");
  const clubhouse = document.getElementById("clubhouse");
  const form = document.getElementById("phrase-form");
  const input = document.getElementById("phrase");
  const message = document.getElementById("gate-message");
  const resetButton = document.getElementById("reset-gate");

  const wrongMessages = [
    "I knew Connecticut Broadleaf was your thing.",
    "That’s... not the phrase.",
    "Maybe spend a little more time in the lounge.",
    "Nice try."
  ];

  const normalize = (value) =>
    value.trim().toLowerCase().replace(/[.!'’"]/g, "");

  function revealClubhouse() {
    gate.hidden = true;
    clubhouse.hidden = false;
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }

  function showClubhouse({ animate = true } = {}) {
    if (!animate) {
      revealClubhouse();
      return;
    }

    message.textContent = "I guess they’ll let anyone in here.";
    message.classList.add("success");
    form.style.pointerEvents = "none";

    window.setTimeout(() => {
      gate.classList.add("is-opening");

      window.setTimeout(() => {
        revealClubhouse();
      }, FADE_MS);
    }, SUCCESS_HOLD_MS);
  }

  if (localStorage.getItem(STORAGE_KEY) === "true") {
    showClubhouse({ animate: false });
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    if (normalize(input.value) === PHRASE) {
      localStorage.setItem(STORAGE_KEY, "true");
      showClubhouse({ animate: true });
      return;
    }

    message.classList.remove("success");
    message.textContent =
      wrongMessages[Math.floor(Math.random() * wrongMessages.length)];

    input.focus();
    input.select();
  });

  resetButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    clubhouse.hidden = true;
    gate.hidden = false;
    gate.classList.remove("is-opening");
    form.style.pointerEvents = "";
    message.textContent = "";
    message.classList.remove("success");
    input.value = "";
    window.scrollTo(0, 0);
    input.focus();
  });
})();
