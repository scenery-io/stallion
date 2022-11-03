const { window, ExtensionContext, commands } = require('vscode')
const axios = require('axios')
// Your extension is activated the very first time the command is executed
/**
 * @param {ExtensionContext} context
 */
function activate(context) {
	// const socketPort = workspace
	// 	.getConfiguration('languageServerExample')
	// 	.get('port', 1234)
	
	console.log('"stallion" is active')

	const server = `http://127.0.0.1:8080/post`

	const disposable = commands.registerCommand('post', async () => {
		const doc = window.activeTextEditor?.document

		if (!doc) {
			window.showWarningMessage('No active document')
			return
		}

		if (doc.isUntitled) {
			const saved = await window.showSaveDialog()
			console.log(saved)
			if (saved == undefined) {
				return
			}
		}

		if (doc.uri.scheme !== 'file') {
			const msg = 'The document needs to be a saved file'
			window.showErrorMessage(msg)
			return
		}

		if (doc.languageId !== 'javascript') {
			const msg = 'The document\'s language needs to be JavaScript'
			window.showErrorMessage(msg)
			return
		}

		if (doc.isDirty) {
			const answer = await window.showWarningMessage(
				'Document has unsaved changes. Save changes?', 'Cancel', 'Save'
			)
			if (answer === 'Save') {
				doc.save()
			} else {
				return
			}
		}

		try {
			const filePath = doc.uri.fsPath
			console.log(filePath)
			const result = await axios.post(server, { data: filePath })
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
	})

	context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
