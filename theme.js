const themeButton = document.querySelector('.theme-toggle');

function updateThemeButton() {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = document.documentElement.dataset.theme === 'light' ? '#f9f3e9' : '#0b1020';
  if (!themeButton) return;
  const isLight = document.documentElement.dataset.theme === 'light';
  themeButton.textContent = isLight ? '☾ Dunkel' : '☀ Hell';
  themeButton.setAttribute('aria-label', isLight ? 'Dunkles Farbschema wählen' : 'Helles Farbschema wählen');
  themeButton.setAttribute('aria-pressed', String(isLight));
}

updateThemeButton();
themeButton?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem('homlia-theme', nextTheme); } catch (error) { /* Speichern ist optional. */ }
  updateThemeButton();
});
