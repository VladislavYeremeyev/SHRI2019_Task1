module.exports = function(bemjson) {
  const bem = require('bem-xjst');
  const bemhtml = bem.bemhtml;

  const templates = bemhtml.compile();
  const html = templates.apply(bemjson);

  return html;
}

