// Native local build for environments that disallow Vite/esbuild child processes.
import { parse, compileScript } from '@vue/compiler-sfc'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import http from 'node:http'

const root = process.cwd()
const out = path.join(root, '.local-preview')
await fs.mkdir(path.join(out, 'src/components'), { recursive: true })
await fs.mkdir(path.join(out, 'src/utils'), { recursive: true })
for (const [index, file] of ['src/App.vue', 'src/components/ColorPicker.vue', 'src/components/JacketPortrait.vue'].entries()) {
  const source = await fs.readFile(path.join(root, file), 'utf8')
  const { descriptor, errors } = parse(source, { filename: file })
  if (errors.length) throw errors[0]
  let { content } = compileScript(descriptor, { id: `local-${index}`, inlineTemplate: true })
  content = content.replace(/from (['"])([^'"]+)\.vue\1/g, 'from $1$2.js$1')
    .replace(/import portrait from ['"]([^'"]+\.webp)['"]/g, 'const portrait = "/src/jensen-portrait.webp"')
    .replace(/import fallbackPortrait from ['"]([^'"]+\.png)['"]/g, 'const fallbackPortrait = "/jensen-portrait.png"')
  await fs.writeFile(path.join(out, file.replace('.vue', '.js')), content)
}
for (const file of ['src/utils/colors.js', 'src/utils/jacket.js', 'src/style.css', 'src/jensen-portrait.webp', 'jensen-portrait.png']) {
  await fs.copyFile(path.join(root, file), path.join(out, file))
}
await fs.cp(path.join(root, 'public'), out, { recursive: true })
await fs.copyFile(path.join(root, 'node_modules/vue/dist/vue.esm-browser.prod.js'), path.join(out, 'vue.js'))
let main = await fs.readFile(path.join(root, 'src/main.js'), 'utf8')
main = main.replace("import './style.css'", '').replace('./App.vue', './App.js')
await fs.writeFile(path.join(out, 'src/main.js'), main)
const html = (await fs.readFile(path.join(root, 'index.html'), 'utf8')).replace('</head>', '<link rel="stylesheet" href="/src/style.css"><script type="importmap">{"imports":{"vue":"/vue.js"}}</script></head>')
await fs.writeFile(path.join(out, 'index.html'), html)
console.log('Local production Vue compilation completed.')
if (!process.argv.includes('--serve')) process.exit(0)
const types = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.xml': 'application/xml', '.txt': 'text/plain' }
http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://localhost')
    const file = path.resolve(out, '.' + decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname))
    if (!file.startsWith(out + path.sep)) { response.writeHead(403).end(); return }
    const data = await fs.readFile(file)
    response.writeHead(200, { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Cache-Control': 'no-store' })
    response.end(data)
  } catch { response.writeHead(404).end('Not found') }
}).listen(5180, '0.0.0.0', () => console.log('Local preview listening on 0.0.0.0:5180'))
