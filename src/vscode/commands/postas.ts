import { join } from 'path'
import { window, Uri, ExtensionContext, QuickPickItemKind } from 'vscode'
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
				label: 'Layers',
				kind: QuickPickItemKind.Separator,
			},
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
					join(imagePath, 'javaScriptModifier@2x.png'),
				),
			},
			{
				label: 'JavaScript Deformer',
				type: 'javaScriptDeformer',
				iconPath: Uri.file(
					join(imagePath, 'javaScriptDeformer@2x.png'),
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
			{
				label: 'Renders',
				kind: QuickPickItemKind.Separator,
			},
			{
				label: 'Setup Script',
				type: 'renderSetupExpression',
				iconPath: Uri.file(join(imagePath, 'dynamicRendering@2x.png')),
			},
			{
				label: 'Pre-Render Script',
				type: 'preRenderExpression',
				iconPath: Uri.file(join(imagePath, 'dynamicRendering@2x.png')),
			},
			{
				label: 'Post-Render Script',
				type: 'postRenderExpression',
				iconPath: Uri.file(join(imagePath, 'dynamicRendering@2x.png')),
			},
		])
		if (!choice) {
			return
		}
		const type = choice.type.toLowerCase()
		if (
			doc.languageId !== 'javascript' &&
			doc.languageId !== 'typescript' &&
			(type.startsWith('javascript') || type.includes('render'))
		) {
			window.showWarningMessage(
				'Language is not JavaScript or TypeScript',
			)
		}
		const directives = /\/\/\/\s<reference.+\/>(\r?\n|$)/g
		const text = doc.getText().replace(directives, '').trim()
		const code = doc.languageId === 'typescript' ? stripTypes(text) : text
		await post({ type: choice.type, code })
	} catch (error) {
		console.error(error)
		window.showErrorMessage(error.message)
	}
}
