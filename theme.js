const themeButton = document.querySelector('.theme-toggle');

function updateThemeButton() {
  const themeColor = document.querySelector('meta[name="theme-color"]');
  if (themeColor) themeColor.content = document.documentElement.dataset.theme === 'light' ? '#f9f3e9' : '#0b1020';
  if (!themeButton) return;
  const isLight = document.documentElement.dataset.theme === 'light';
  const labels = {
    de: { light: 'Hell', dark: 'Dunkel', lightAction: 'Helles Farbschema wählen', darkAction: 'Dunkles Farbschema wählen' },
    en: { light: 'Light', dark: 'Dark', lightAction: 'Use light theme', darkAction: 'Use dark theme' },
    uk: { light: 'Світла', dark: 'Темна', lightAction: 'Увімкнути світлу тему', darkAction: 'Увімкнути темну тему' }
  };
  const label = labels[document.documentElement.lang] || labels.de;
  const icon = document.createElement('span');
  icon.setAttribute('aria-hidden', 'true');
  icon.textContent = isLight ? '☾' : '☀';
  const caption = document.createElement('span');
  caption.className = 'theme-text';
  caption.textContent = isLight ? label.dark : label.light;
  themeButton.replaceChildren(icon, caption);
  themeButton.setAttribute('aria-label', isLight ? label.darkAction : label.lightAction);
  themeButton.setAttribute('aria-pressed', String(isLight));
}

updateThemeButton();
themeButton?.addEventListener('click', () => {
  const nextTheme = document.documentElement.dataset.theme === 'light' ? 'dark' : 'light';
  document.documentElement.dataset.theme = nextTheme;
  try { localStorage.setItem('homlia-theme', nextTheme); } catch (error) { /* Speichern ist optional. */ }
  updateThemeButton();
});
