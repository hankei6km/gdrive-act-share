import * as fs from 'node:fs/promises'
import * as path from 'node:path'
import { fileURLToPath } from 'node:url'
import * as esbuild from 'esbuild'
import { FilesToLicenses } from '@hankei6km/files-to-licenses'

const result = await esbuild.build({
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.mjs',
  //outdir: 'build',
  bundle: true,
  format: 'esm',
  sourcemap: false,
  platform: 'node',
  packages: 'bundle',
  external: [
    'os',
    'path',
    'fs',
    'util',
    'stream',
    'http',
    'https',
    'url',
    'zlib',
    'crypto'
  ],
  metafile: true,
  tsconfig: 'tsconfig.build.json',
  logLevel: 'info',
  banner: {
    // https://github.com/evanw/esbuild/issues/1921#issuecomment-3453406735
    js: "import { createRequire } from 'module'; const require = createRequire(import.meta.url);"
  }
})

const baseDir = path.dirname(fileURLToPath(import.meta.url))
const opensourceLicensesFilePath = path.join(baseDir, 'dist', 'licenses.txt')

async function* outoutFiles(outputs) {
  for (const [file, { bytes, inputs }] of Object.entries(outputs)) {
    for (const i in inputs) {
      yield path.join(baseDir, i)
    }
  }
}
const filesToLicenses = new FilesToLicenses(
  baseDir,
  outoutFiles(result.metafile.outputs)
)

const opensourceLicensesFile = await fs.open(opensourceLicensesFilePath, 'w')
await opensourceLicensesFile.write('---\n')

for await (const i of filesToLicenses.generate()) {
  await opensourceLicensesFile.write(i)
  await opensourceLicensesFile.write('\n---\n')
}

await opensourceLicensesFile.close()
