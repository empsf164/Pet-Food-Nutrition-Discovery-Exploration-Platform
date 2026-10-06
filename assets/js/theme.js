/**
 * PAWFORM - Theme Management (Light / Dark)
 */

(function() {
  const THEME_STORAGE_KEY = 'pawform_theme';
  const html = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_STORAGE_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_STORAGE_KEY, theme);

    // Update all theme toggle buttons and icons
    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = theme === 'dark' ? 'bi bi-sun-fill' : 'bi bi-moon-stars-fill';
      }
      btn.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`);
    });
  }

  // Initialize theme immediately to prevent flashing
  const currentTheme = getPreferredTheme();
  applyTheme(currentTheme);

  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(getPreferredTheme());

    document.querySelectorAll('.theme-toggle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const activeTheme = html.getAttribute('data-theme') || 'light';
        const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
        applyTheme(nextTheme);

        if (typeof showToast === 'function') {
          showToast('Theme Changed', `Switched to ${nextTheme} mode`, 'info');
        }
      });
    });

    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem(THEME_STORAGE_KEY)) {
        applyTheme(e.matches ? 'dark' : 'light');
      }
    });
  });

  window.PAWFORM_THEME = {
    get: () => html.getAttribute('data-theme') || 'light',
    set: applyTheme
  };
})();
