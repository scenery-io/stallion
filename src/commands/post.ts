import { workspace, window } from 'vscode'
import { temporaryWrite } from 'tempy'
import axios from 'axios'

export default async () => {
	const address = workspace
		.getConfiguration('stallion')
		.get('address', '127.0.0.1')
	const port = workspace.getConfiguration('stallion').get('port', 8080)
	const server = `http://${address}:${port}/post`
	const doc = window.activeTextEditor?.document
	console.log(server)

	if (!doc) {
		return window.showErrorMessage('No active document')
	}

	if (doc.languageId !== 'javascript') {
		window.showWarningMessage('Language is not JavaScript')
	}

	try {
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
		const result = await axios.post(server, { path })
		if (result?.statusText === 'OK') {
			window.showInformationMessage('Successfully sent to Cavalry')
		} else {
			throw new Error('Failed sending to Cavalry')
		}
	} catch (error) {
		console.log(error)
		window.showErrorMessage(error.message)
	}
}
