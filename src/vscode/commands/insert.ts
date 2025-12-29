import { window, Position, extensions, languages } from 'vscode'
import { publisher, name } from '../../../package.json'

export default async () => {
	try {
		const editor = window.activeTextEditor
		const doc = editor?.document
		if (!doc) {
			return window.showWarningMessage('No active document')
		}
		if (
			doc.languageId !== 'javascript' &&
			doc.languageId !== 'typescript'
		) {
			languages.setTextDocumentLanguage(doc, 'javascript')
			window.showInformationMessage('Language set to JavaScript')
		}
		const extensionId = [publisher, name].join('.')
		const stallion = extensions.getExtension(extensionId)
		if (!stallion) {
			throw new Error(`Extension not found: ${extensionId}`)
		}
		const extPath = stallion.extensionPath.replaceAll('\\', '/')
		const pkgName = '@scenery/cavalry-types'
		const path = [extPath, 'node_modules', pkgName, 'index.d.ts'].join('/')
		const snippet = `/// <reference path="${path}"/>\n\n`
		await editor.edit((e) => e.insert(new Position(0, 0), snippet))
	} catch (error) {
		console.log(error)
		window.showErrorMessage(error.message)
	}
}
