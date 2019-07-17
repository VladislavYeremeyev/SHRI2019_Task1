import { bemhtml } from 'bem-xjst';

export default function (obj) {
  const template = bemhtml.compile();
  const html = template.apply(obj);

  return html;
}
