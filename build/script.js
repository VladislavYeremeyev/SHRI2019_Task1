(function () {
  const themeList = [
    'theme_color_project-default',
    'theme_color_project-brand',
    'theme_color_project-inverse',
    'theme_color_project-warning',
    'theme_color_megafon-brand'
  ];

  document.body.addEventListener('click', function (e) {
    if (e.target.classList.contains('onoswitch')) {
      let theme = document.quetySelector('.theme');
      let currentTheme = theme.dataset.theme;
      let index = themeList.indexOf(currentTheme);

      index = index === themeList.length - 1 ? 0 : index
      theme.classList.remove(currentTheme);
      currentTheme = themeList[index]
      theme.classList.add(currentTheme);
      theme.dataset.theme = currentTheme;
    }
  })
})();

(function () {
  document.body.addEventListener('click', function (e) {
    let { target } = e;

    while (target !== this) {
    if (target.classList.contains('e-accordeon__short')) {
      let parent = target.closest('.e-accordeon');
      let hidden = parent.querySelectorAll('.e-accordeon__hidden');

      for (let i = 0; i < hidden.length; i++) {
        hidden[i].classList.remove('e-accordeon__hidden');
      }

      break;
    }

    target = target.parentNode;
  }
  })
})();
