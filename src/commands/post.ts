import { window } from 'vscode'
import { post, writeScript } from './utils'

export default async () => {
	try {
		const doc = window.activeTextEditor?.document
		if (!doc) {
			return window.showErrorMessage('No active document')
		}
		if (doc.languageId !== 'javascript') {
			window.showWarningMessage('Language is not JavaScript')
		}
		const path = await writeScript(doc)
		await post({ type: 'script', path })
	} catch (error) {
		console.error(error)
		window.showErrorMessage(error.message)
	}
}
