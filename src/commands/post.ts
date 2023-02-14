import { workspace, window } from 'vscode'
import axios from 'axios'

export default async () => {
	const address = workspace
		.getConfiguration('stallion')
		.get('address', '127.0.0.1')
	const port = workspace.getConfiguration('stallion').get('port', 8080)

	const server = `http://${address}:${port}/post`
	console.log(server)

	const doc = window.activeTextEditor?.document

	if (!doc) {
		return window.showErrorMessage('No active document')
	}

	if (doc.languageId !== 'javascript') {
		window.showWarningMessage('Language is not JavaScript')
	}

	try {
		const filePath = doc.uri.fsPath
		console.log(filePath)
		const script = doc.getText()
		const result = await axios.post(server, { data: script })
		console.log(result)
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
