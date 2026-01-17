import { ExtensionContext, commands } from 'vscode'
import post from './commands/post.ts'
import postas from './commands/postas.ts'
import insert from './commands/insert.ts'
import install from './commands/install.ts'

// Your extension is activated the very first time the command is executed
async function activate(context: ExtensionContext) {
	console.log('Stallion activated')
	await install()
	context.subscriptions.push(
		commands.registerCommand('stallion.post', post),
		commands.registerCommand('stallion.postas', () => postas(context)),
		commands.registerCommand('stallion.insert', insert),
	)
}

// This method is called when your extension is deactivated
function deactivate() {}

export { activate, deactivate }
