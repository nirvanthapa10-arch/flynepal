window.selectedTheme = null;

function selectTheme(t) {
  selectedTheme = t;
  showAd(() => {
    startActualGame();
  });
}

window.selectTheme = selectTheme;
