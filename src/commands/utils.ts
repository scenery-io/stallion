import { temporaryWrite } from 'tempy'
import { workspace, window, TextDocument } from 'vscode'
import { stripTypeScriptTypes } from 'module'

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
	return await temporaryWrite(script, { extension: 'js' })
}
