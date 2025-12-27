import { existsSync } from 'fs'
import { copyFile, mkdir } from 'fs/promises'
import { homedir, platform } from 'os'
import { join } from 'path'
import { window } from 'vscode'
import { firstline } from './utils.js'
import { version } from '../../package.json'

export default async () => {
	try {
		const scriptName = 'Stallion.js'
		const source = join(__dirname, scriptName)
		console.log({ source })
		const isMac = platform() === 'darwin'
		const userPath = homedir()
		const basePath = isMac
			? join(userPath, 'Library', 'Application Support')
			: join(userPath, 'AppData', 'Roaming')
		const scriptsFolder = join(basePath, 'Cavalry', 'Scripts')
		const target = join(scriptsFolder, scriptName)
		if (!existsSync(scriptsFolder)) {
			await mkdir(scriptsFolder)
		}
		if (existsSync(target)) {
			const line = await firstline(target)
			const pkgVersion = version
			const scriptVersion = line
				.match(/VERSION \d+.\d+.\d+/)?.[0]
				.replace('VERSION ', '')
			if (scriptVersion === pkgVersion) {
				return
			}
		}
		await copyFile(source, target)
	} catch (error) {
		window.showErrorMessage(error.message)
	}
}
