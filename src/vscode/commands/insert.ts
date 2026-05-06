import {
	window,
	Position,
	extensions,
	languages,
	Uri,
	ExtensionContext,
	QuickPickItemKind,
} from 'vscode'
import { publisher, name } from '../../../package.json'
import { join } from 'path'

export default async (context: ExtensionContext) => {
	try {
		const editor = window.activeTextEditor
		const doc = editor?.document
		if (!doc) {
			return window.showWarningMessage('No active document')
		}
		const imagePath = join(context.extensionPath, 'images')
		const choice = await window.showQuickPick([
			{
				label: 'Script',
				type: 'script',
			},
			{
				label: 'Plugin',
				type: 'plugin',
			},
			{
				label: '',
				kind: QuickPickItemKind.Separator,
				type: '',
			},
			{
				label: 'JavaScript Shape',
				type: 'shape',
				iconPath: Uri.file(join(imagePath, 'javaScriptShape@2x.png')),
			},
			{
				label: 'JavaScript Deformer',
				type: 'deformer',
				iconPath: Uri.file(
					join(imagePath, 'javaScriptDeformer@2x.png'),
				),
			},
			{
				label: 'JavaScript Utility',
				type: 'utility',
				iconPath: Uri.file(join(imagePath, 'javaScript@2x.png')),
			},
			{
				label: 'JavaScript Modifier',
				type: 'modifier',
				iconPath: Uri.file(
					join(imagePath, 'javaScriptModifier@2x.png'),
				),
			},
			{
				label: 'JavaScript Emitter',
				type: 'emitter',
				iconPath: Uri.file(join(imagePath, 'javaScriptEmitter@2x.png')),
			},
			{
				label: 'Render Script',
				type: 'render',
				iconPath: Uri.file(join(imagePath, 'dynamicRendering@2x.png')),
			},
		])
		if (!choice) {
			return
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
		const type = choice.type.toLowerCase()
		const path = [
			extPath,
			'node_modules',
			pkgName,
			'types',
			`${type}.d.ts`,
		].join('/')
		const snippet = `/// <reference path="${path}"/>\n\n`
		await editor.edit((e) => e.insert(new Position(0, 0), snippet))
	} catch (error) {
		console.log(error)
		window.showErrorMessage(error.message)
	}
}
