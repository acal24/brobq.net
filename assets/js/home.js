(() => {
  const VALID_PHRASES = [
  "pepperoni",
  "rudy"
];
  const STORAGE_KEY = "brobq_admitted";
  const SUCCESS_HOLD_MS = 2000;
  const FADE_MS = 900;

  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const gate = document.getElementById("gate");
  const clubhouse = document.getElementById("clubhouse");
  const chapters = document.getElementById("chapters");
  const form = document.getElementById("phrase-form");
  const input = document.getElementById("phrase");
  const message = document.getElementById("gate-message");
  const resetButton = document.getElementById("reset-gate");
  const chaptersOpen = document.getElementById("chapters-open");
  const chaptersBack = document.getElementById("chapters-back");

  const wrongMessages = [
    "I knew Connecticut Broadleaf was your thing.",
    "That’s... not the phrase.",
    "Maybe spend a little more time in the lounge.",
    "Nice try."
  ];

  const normalize = (value) =>
    value.trim().toLowerCase().replace(/[.!'’"]/g, "");

  function forceTop() {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;

    requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    });

    window.setTimeout(() => {
      window.scrollTo(0, 0);
    }, 50);
  }

  function revealClubhouse() {
    gate.hidden = true;
    chapters.hidden = true;
    clubhouse.hidden = false;
    forceTop();
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
  } else {
    forceTop();
  }

  form.addEventListener("submit", (event) => {
    event.preventDefault();

if (VALID_PHRASES.includes(normalize(input.value))) {
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

  chaptersOpen.addEventListener("click", () => {
    clubhouse.hidden = true;
    chapters.hidden = false;
    forceTop();
  });

  chaptersBack.addEventListener("click", () => {
    chapters.hidden = true;
    clubhouse.hidden = false;
    forceTop();
  });

  resetButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    chapters.hidden = true;
    clubhouse.hidden = true;
    gate.hidden = false;
    gate.classList.remove("is-opening");
    form.style.pointerEvents = "";
    message.textContent = "";
    message.classList.remove("success");
    input.value = "";
    forceTop();
    input.focus();
  });
})();
