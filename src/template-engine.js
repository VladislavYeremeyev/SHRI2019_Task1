const bem = require('bem-xjst');

module.exports = function(bemjson) {
  const bemhtml = bem.bemhtml;

  const templates = bemhtml.compile();
  const html = templates.apply(bemjson);

  return html;
}

