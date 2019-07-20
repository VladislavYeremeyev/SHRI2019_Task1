if (document.body) {
  document.body.addEventListener("click", function(e) {
    let { target } = e;
    let theme = document.body.getElementsByClassName('theme')[0];
    while (target !== this) {
      if (target.classList.contains("onoffswitch")) {

        let btn = target.getElementsByClassName("onoffswitch__button");
        if (btn.length === 0) {
          return;
        }
        if (theme) {
          target.classList.toggle("onoffswitch_checked");
          theme.classList.toggle("theme_color_project-default");
          theme.classList.toggle("theme_color_project-inverse");
        }

        return;
      }

      target = target.parentNode;
    }
  });
}
