(() => {
  const PHRASE = "pepperoni";
  const STORAGE_KEY = "brobq_admitted";
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

  const normalize = (value) => value.trim().toLowerCase().replace(/[.!'’"]/g, "");

  function showClubhouse(animate = true) {
    message.textContent = "I guess they’ll let anyone in here.";
    message.classList.add("success");
    if (animate) gate.classList.add("is-opening");
    window.setTimeout(() => {
      gate.hidden = true;
      clubhouse.hidden = false;
      window.scrollTo(0, 0);
    }, animate ? 1150 : 0);
  }

  if (localStorage.getItem(STORAGE_KEY) === "true") showClubhouse(false);

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (normalize(input.value) === PHRASE) {
      localStorage.setItem(STORAGE_KEY, "true");
      showClubhouse(true);
      return;
    }
    message.classList.remove("success");
    message.textContent = wrongMessages[Math.floor(Math.random() * wrongMessages.length)];
    input.focus();
    input.select();
  });

  resetButton.addEventListener("click", () => {
    localStorage.removeItem(STORAGE_KEY);
    clubhouse.hidden = true;
    gate.hidden = false;
    gate.classList.remove("is-opening");
    message.textContent = "";
    message.classList.remove("success");
    input.value = "";
    window.scrollTo(0, 0);
    input.focus();
  });
})();
