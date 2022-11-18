import { ExtensionContext, commands } from 'vscode'
import postCommand from './commands/post.js'
import installCommand from './commands/install.js'

// Your extension is activated the very first time the command is executed
/**
 * @param {ExtensionContext} context
 */
function activate(context) {
	console.log('"stallion" is active')
	const post = commands.registerCommand('post', postCommand)
	const install = commands.registerCommand('install', installCommand)
	context.subscriptions.push(post)
	context.subscriptions.push(install)
}

// This method is called when your extension is deactivated
function deactivate() { }

export {
	activate,
	deactivate
}
