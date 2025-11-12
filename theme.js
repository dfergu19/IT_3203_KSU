// Simple dark/light toggle using localStorage. Default is dark because I got tired of staring at a bright screen (should have done this sooner).
(function () {
  const STORAGE_KEY = "site-theme";
  const root = document.documentElement;
  const btn = document.getElementById("themeToggle");

  // Read saved theme or default to dark
  const saved = localStorage.getItem(STORAGE_KEY);
  const theme = saved === "light" || saved === "dark" ? saved : "dark";
  applyTheme(theme);

  // Update button text/state to reflect current theme
  updateButton(theme);

  // Toggle on click
  if (btn) {
    btn.addEventListener("click", () => {
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
      updateButton(next);
    });
  }

  function applyTheme(value) {
    root.dataset.theme = value; // sets <html data-theme="dark|light">
  }

  function updateButton(value) {
    if (!btn) return;
    const to = value === "dark" ? "light" : "dark";
    btn.textContent = (to === "light" ? "Light" : "Dark");
    btn.setAttribute("aria-pressed", value === "light"); // pressed = light mode ON
  }
})();
