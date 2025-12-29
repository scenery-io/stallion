import { build, context, type BuildOptions } from 'esbuild'
import pkg from '../package.json' with { type: 'json' }
import { resolve } from 'path'
import { rimraf } from 'rimraf'

const production = process.env.NODE_ENV === 'production'

const options: BuildOptions = {
    bundle: true,
    outdir: './dist',
    logLevel: 'info',
    minify: production,
}

const cavalryOptions: BuildOptions = {
    ...options,
	entryPoints: ['./src/cavalry/Stallion.ts'],
	banner: {
		js: [
			`// VERSION ${pkg.version}`,
			'// This is the compiled version',
			`// Read the source at ${pkg.repository.url}`,
		].join('\n'),
	},
}

const vscodeOptions: BuildOptions = {
	...options,
	entryPoints: ['./src/vscode/extension.ts'],
	sourcemap: !production,
	external: ['vscode'],
	platform: 'node',
	format: 'cjs',
}

const cavalry = await context(cavalryOptions)
const vscode = await context(vscodeOptions)

if (production) {
    rimraf(resolve(options.outdir))
	await Promise.all([build(cavalryOptions), build(vscodeOptions)])
	await Promise.all([cavalry.dispose(), vscode.dispose()])
} else {
	await Promise.all([cavalry.watch(), vscode.watch()])
}

