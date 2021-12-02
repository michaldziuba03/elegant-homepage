const fs = require('fs');
const path = require('path');

function transform(html) {
    const replaces = ['/assets', '/bundle', '/polyfills', '/manifest', '/favicon'];
    

    for (const r of replaces) {
        const regexp = new RegExp(r, 'g');
        html = html.replace(regexp, `.${r}`);
    }

    const moduleRegexp = new RegExp('type="module"', 'g');
    const crossoriginRegexp = new RegExp('crossorigin="anonymous"', 'g');

    html = html
        .replace(moduleRegexp, '')
        .replace(crossoriginRegexp, '');

    return html;
}

const htmlPath = path.join(process.cwd(), '/build/index.html');
const file = fs.readFileSync(htmlPath, 'utf-8');
const html = transform(file);

fs.writeFileSync(htmlPath, html);
