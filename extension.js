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
	let disposable = commands.registerCommand('stallion.runScript', async function () {
		window.showInformationMessage('Script executed in Cavalry')
		// TODO: Temp save files that are not saved
		// https://github.com/microsoft/vscode-extension-samples/tree/main/fsprovider-sample
		// TODO: Check if a text editor exists and is not empty
		// TODO: Make sure it's Javascript
		const filePath = window.activeTextEditor.document.uri.fsPath
		console.log(filePath)
		const result = await axios.post(
			`http://127.0.0.1:8080/post`,
			{ data: filePath }
		).catch(console.error)
		console.log(`Post ${result.data}`)
	})
	context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
