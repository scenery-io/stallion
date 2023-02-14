import { ExtensionContext, commands } from 'vscode'
import postCommand from './commands/post.js'
import installCommand from './commands/install.js'
import insertCommand from './commands/insert.js'

// Your extension is activated the very first time the command is executed
function activate(context: ExtensionContext) {
	console.log('"stallion" is active')
	const post = commands.registerCommand('stallion.post', postCommand)
	const install = commands.registerCommand('stallion.install', installCommand)
	const insert = commands.registerCommand('stallion.insert', insertCommand)
	context.subscriptions.push(post, install, insert)
}

// This method is called when your extension is deactivated
function deactivate() {}

export { activate, deactivate }
