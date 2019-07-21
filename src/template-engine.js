import { bemhtml } from "bem-xjst";

export default function(bemjson) {
  const bem = bemhtml;

  const templates = bem.compile();
  const html = templates.apply(bemjson);

  return html;
}

