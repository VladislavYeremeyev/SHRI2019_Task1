document.body.addEventListener("click", function(e) {
  let { target } = e;

  while (target !== this) {
    if (target.classList.contains("e-accordion__short")) {
      let parent = target.closest(".e-accordion");
      let hiddenPart = parent.getElementsByClassName("e-accordion__more");
      if (hiddenPart.length === 0) {
        return;
      }
      hiddenPart[0].classList.toggle("e-accordion__more_displayed");

      return;
    }

    target = target.parentNode;
  }
});
