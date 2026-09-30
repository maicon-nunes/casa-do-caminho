const fs = require('node:fs/promises');
const path = require('node:path');
const { minify } = require('terser');
const CleanCSS = require('clean-css');
const root = path.resolve(__dirname, '..');

async function build() {
  const css = await fs.readFile(path.join(root, 'css/estilos.css'), 'utf8');
  const result = new CleanCSS({ level: 1 }).minify(css);
  if (result.errors.length) throw new Error(result.errors.join('\n'));
  if (result.warnings.length) throw new Error(result.warnings.join('\n'));
  await fs.writeFile(path.join(root, 'css/estilos.min.css'), result.styles);
  let before = Buffer.byteLength(css);
  let after = Buffer.byteLength(result.styles);
  for (const name of (await fs.readdir(path.join(root, 'js'))).sort()) {
    if (!name.endsWith('.js') || name.endsWith('.min.js')) continue;
    const source = await fs.readFile(path.join(root, 'js', name), 'utf8');
    // Os scripts compartilham funções globais; mantenha seus nomes e a ordem no HTML.
    const output = await minify(source, { compress: true, mangle: false, toplevel: false });
    if (typeof output.code !== 'string') throw new Error(`Sem resultado para ${name}`);
    await fs.writeFile(path.join(root, 'js', name.replace(/\.js$/, '.min.js')), output.code);
    before += Buffer.byteLength(source);
    after += Buffer.byteLength(output.code);
  }
  for (const name of await fs.readdir(path.join(root, 'html'))) {
    if (!name.endsWith('.html')) continue;
    const file = path.join(root, 'html', name);
    const html = await fs.readFile(file, 'utf8');
    const updated = html.replace(/(\.\.\/css\/estilos)(?:\.min)?\.css/g, '$1.min.css')
      .replace(/(\.\.\/js\/[\w-]+?)(?:\.min)?\.js/g, '$1.min.js');
    await fs.writeFile(file, updated);
  }
  console.log(`CSS e JavaScript: ${before} → ${after} bytes (${((1-after/before)*100).toFixed(1)}% de redução).`);
}

build().catch(error => { console.error(error); process.exitCode = 1; });
