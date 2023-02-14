import { window, Position, extensions } from 'vscode'
import { publisher, name } from '../../package.json'

export default async () => {
	const editor = window.activeTextEditor
	const doc = editor?.document

	if (!doc) {
		return window.showWarningMessage('No active document')
	}

	if (doc.languageId !== 'javascript') {
		window.showWarningMessage('Language is not JavaScript')
	}

	try {
		const extensionId = [publisher, name].join('.')
		const stallion = extensions.getExtension(extensionId)
		if (!stallion) throw new Error(`Extension not found: ${extensionId}`)
		const path = stallion.extensionPath
		const pkgName = '@scenery/cavalry-types'
		const snippet = `/// <reference path="${path}/node_modules/${pkgName}/index.d.ts"/>\n\n`
		await editor.edit((e) => e.insert(new Position(0, 0), snippet))
	} catch (error) {
		console.log(error)
		window.showErrorMessage(error.message)
	}
}
