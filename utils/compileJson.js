const bem = require('bem-xjst');
const path = require('path');
const bemhtml = bem.bemhtml;
const fs = require('fs');
const pretty = require('pretty');

const templates = bemhtml.compile();
const bemjson = fs.readFileSync(path.join(__dirname, '../', process.argv[2]));
const html = templates.apply(JSON.parse(bemjson));

const layout = fs.readFileSync(path.join(__dirname, 'htmlTemplate.html'));
const newHtml = layout.toString().replace('{{content}}', html);

fs.writeFileSync(path.join(__dirname, '../htmlPages/', `${path.basename(process.argv[2], '.json')}.html`), pretty(newHtml));

console.log('Done')
