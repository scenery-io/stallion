import { ExtensionContext, commands } from 'vscode'
import postCommand from './commands/post.js'
import insertCommand from './commands/insert.js'
import postAsCommand from './commands/postas.js'
import install from './commands/install.js'

// Your extension is activated the very first time the command is executed
async function activate(context: ExtensionContext) {
	console.log('Stallion activated')
	await install()
	const post = commands.registerCommand('stallion.post', postCommand)
	const javascript = commands.registerCommand('stallion.postas', () =>
		postAsCommand(context)
	)
	const insert = commands.registerCommand('stallion.insert', insertCommand)
	context.subscriptions.push(post, insert, javascript)
}

// This method is called when your extension is deactivated
function deactivate() {}

export { activate, deactivate }
