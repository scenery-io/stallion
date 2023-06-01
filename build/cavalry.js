const { build } =  require('esbuild')
const { readFileSync } = require('fs')
const { version } = JSON.parse(readFileSync('./package.json'))

build({
    entryPoints: ['./src/cavalry/Stallion.js'],
    outdir: './out',
    banner: {
        js: `// VERSION ${version}`
    }
})
