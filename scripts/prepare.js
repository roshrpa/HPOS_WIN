// Builds app/index.html from web/index.html (a copy of the POS from the HPOS_WEB repo).
// The desktop app is the same POS with only the counter tabs shown, so both always share one code base.
const fs = require('fs'), path = require('path');
const src = path.join(__dirname, '..', 'web', 'index.html');
const out = path.join(__dirname, '..', 'app');
let h = fs.readFileSync(src, 'utf8');
if (h.indexOf('<head>') < 0) throw new Error('index.html has no <head>');
h = h.replace('<head>', '<head>\n<script>window.HP_DESKTOP = true;</script>');
fs.mkdirSync(out, { recursive: true });
fs.writeFileSync(path.join(out, 'index.html'), h);
console.log('app/index.html written (' + h.length + ' bytes)');
