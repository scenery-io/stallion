import { workspace, window, TextDocument } from 'vscode'
import { stripTypeScriptTypes } from 'module'
import { createReadStream } from 'fs'
import { realpath, writeFile } from 'fs/promises'
import { tmpdir } from 'os'
import { join } from 'path'
import { randomUUID } from 'crypto'

export type Data = {
	type: string
	code?: string
	path?: string
}

export async function post(data: Data) {
	try {
		const address = workspace
			.getConfiguration('stallion')
			.get('address', '127.0.0.1')
		const port = workspace.getConfiguration('stallion').get('port', 8080)
		const server = `http://${address}:${port}/post`
		const result = await fetch(server, {
			method: 'POST',
			body: JSON.stringify(data),
		})
		if (!result.ok) {
			throw new Error('Failed to send to Cavalry')
		}
		window.showInformationMessage('Successfully sent to Cavalry')
	} catch (error) {
		if (error.cause?.code === 'ECONNREFUSED') {
			return window.showErrorMessage(
				'Failed to send. Is Stallion open in Cavalry?'
			)
		}
		throw error
	}
}

export function stripTypes(text: string) {
	if (stripTypeScriptTypes) {
		return stripTypeScriptTypes(text)
	}
	window.showWarningMessage(
		'Type stripping is not supported. Expect errors in Cavalry.'
	)
	return text
}

export async function writeTemp(content: string) {
	const tempdir = await realpath(tmpdir())
	const filename = join(tempdir, `${randomUUID()}.js`)
	await writeFile(filename, content)
	return filename
}

export async function writeScript(doc: TextDocument) {
	const text = doc.getText()
	const code = doc.languageId === 'typescript' ? stripTypes(text) : text
	const script = `(function() { ${code} \n})()`
	const saved = !doc.isUntitled
	const show = code.includes('ui.show()')
	if (code.includes('ui.add(') && !show) {
		window.showWarningMessage('Script is missing `ui.show()`')
	}
	if (saved && show) {
		return doc.fileName
	}
	return await writeTemp(script)
}

type Options = {
	encoding?: string
	lineEnding?: string
}

// NOTE: Copied from https://github.com/pensierinmusica/firstline
export function firstline(path: string, options: Options = {}) {
	return new Promise<string>((resolve, reject) => {
		const stream = createReadStream(
			path,
			(options.encoding || 'utf-8') as BufferEncoding
		)
		let acc = ''
		let pos = 0
		let index
		stream
			.on('data', (chunk) => {
				index = chunk.indexOf(options.lineEnding || '\n')
				acc += chunk
				if (index === -1) {
					pos += chunk.length
				} else {
					pos += index
					stream.close()
				}
			})
			.on('close', () =>
				resolve(acc.slice(acc.charCodeAt(0) === 0xfeff ? 1 : 0, pos))
			)
			.on('error', (err) => reject(err))
	})
}
