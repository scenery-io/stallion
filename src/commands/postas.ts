import { join } from 'path'
import { window, Uri, ExtensionContext } from 'vscode'
import { post, stripTypes } from './utils'

export default async (context: ExtensionContext) => {
	try {
		const doc = window.activeTextEditor?.document
		if (!doc) {
			return window.showErrorMessage('No active document')
		}
		const imagePath = join(context.extensionPath, 'images')
		const choice = await window.showQuickPick([
			{
				label: 'JavaScript Shape',
				type: 'javaScriptShape',
				iconPath: Uri.file(join(imagePath, 'javaScriptShape@2x.png')),
			},
			{
				label: 'JavaScript Utility',
				type: 'javaScript',
				iconPath: Uri.file(join(imagePath, 'javaScript@2x.png')),
			},
			{
				label: 'JavaScript Modifier',
				type: 'javaScriptModifier',
				iconPath: Uri.file(
					join(imagePath, 'javaScriptModifier@2x.png')
				),
			},
			{
				label: 'JavaScript Deformer',
				type: 'javaScriptDeformer',
				iconPath: Uri.file(
					join(imagePath, 'javaScriptDeformer@2x.png')
				),
			},
			{
				label: 'JavaScript Emitter',
				type: 'javaScriptEmitter',
				iconPath: Uri.file(join(imagePath, 'javaScriptEmitter@2x.png')),
			},
			{
				label: 'SkSL Shader',
				type: 'skslShader',
				iconPath: Uri.file(join(imagePath, 'skslShader@2x.png')),
			},
			{
				label: 'SkSL Filter',
				type: 'skslFilter',
				iconPath: Uri.file(join(imagePath, 'skslFilter@2x.png')),
			},
		])
		if (!choice) {
			return
		}
		if (
			choice.type.toLowerCase().includes('script') &&
			doc.languageId !== 'javascript' &&
			doc.languageId !== 'typescript'
		) {
			window.showWarningMessage(
				'Language is not JavaScript or TypeScript'
			)
		}
		const directives = /\/\/\/\s<reference.+\/>(\r?\n|$)/g
		const text = doc.getText().replace(directives, '')
		const code = doc.languageId === 'typescript' ? stripTypes(text) : text
		await post({ type: choice.type, code })
	} catch (error) {
		console.error(error)
		window.showErrorMessage(error.message)
	}
}
