const themeToggle = document.querySelector(".theme-toggle");
const colorPreference = window.matchMedia("(prefers-color-scheme: dark)");
const storageKey = "portfolio-theme";

let chosenTheme;
try {
  const savedTheme = localStorage.getItem(storageKey);
  if (savedTheme === "light" || savedTheme === "dark") {
    chosenTheme = savedTheme;
  }
} catch {
  // The toggle still works when browser storage is unavailable.
}

function syncTheme() {
  const isDark = chosenTheme ? chosenTheme === "dark" : colorPreference.matches;
  themeToggle.setAttribute("aria-pressed", String(isDark));

  if (chosenTheme) {
    document.documentElement.dataset.theme = chosenTheme;
  }
}

syncTheme();
themeToggle.hidden = false;

colorPreference.addEventListener("change", syncTheme);
themeToggle.addEventListener("click", () => {
  chosenTheme = themeToggle.getAttribute("aria-pressed") === "true" ? "light" : "dark";
  syncTheme();
  try {
    localStorage.setItem(storageKey, chosenTheme);
  } catch {
    // Storage may be disabled for local files or private sessions.
  }
});
