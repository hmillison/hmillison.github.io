// Available stylesheets for the website
const THEMES = {
  main: './styles/main.css',
  geocities: './styles/geocities.css',
};

function getStylesheet() {
  return document.querySelector('#stylesheet');
}

/**
 * Use this function to switch the theme back from fun to serious
 * For the sake of simplicity, exposing this in the global scope for now
 */
function toggleTheme() {
  const theme = getStylesheet();
  const isDefaultThemeVisible = theme
    .getAttribute('href')
    .includes(THEMES.main);

  if (isDefaultThemeVisible) {
    theme.setAttribute('href', THEMES.geocities);
  } else {
    theme.setAttribute('href', THEMES.main);
  }
}
