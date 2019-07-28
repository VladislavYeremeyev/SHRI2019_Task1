if (document.body) {
  document.body.addEventListener('click', function (e) {
    let { target } = e;

    while (target !== this) {
      if (target.classList.contains('e-accordion__short')) {
        const parent = target.closest('.e-accordion');

        if (!parent) {
          return;
        }
        const hiddenPart = parent.getElementsByClassName('e-accordion__more');
        if (hiddenPart.length === 0) {
          return;
        }
        hiddenPart[0].classList.toggle('e-accordion__more_displayed');

        return;
      }

      target = target.parentNode;
    }
  });
}
