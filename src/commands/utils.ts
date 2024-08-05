import axios from 'axios'
import { temporaryWrite } from 'tempy'
import { workspace, window, TextDocument } from 'vscode'

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
		const result = await axios.post(server, data)
		if (result?.statusText === 'OK') {
			window.showInformationMessage('Successfully sent to Cavalry')
		} else {
			throw new Error('Failed to send to Cavalry')
		}
	} catch (error) {
		if (error.code === 'ECONNREFUSED') {
			return window.showErrorMessage(
				'Failed to send. Is Stallion open in Cavalry?'
			)
		}
		throw error
	}
}

export async function writeScript(doc: TextDocument) {
	const text = doc.getText()
	const script = `(function() { ${text} })()`
	const saved = !doc.isUntitled
	const showUI = text.includes('ui.show()')
	let path = await temporaryWrite(script, { extension: 'js' })
	if (saved && showUI) {
		path = doc.fileName
	}
	if (text.includes('ui.add(') && !showUI) {
		window.showWarningMessage('Script is missing `ui.show()`')
	}
	return path
}
