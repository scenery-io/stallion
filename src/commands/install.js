import { copyFile } from 'fs/promises'
import { homedir, platform } from 'os'
import { join } from 'path'
import { window } from 'vscode'

export default async () => {
    const scriptName = 'stallion.js'
    const source = join(__dirname, scriptName)
    console.log({source})
    const isMac = platform() === 'darwin'
    const userPath = homedir()
    const basePath = isMac 
        ? join(userPath, 'Library', 'Application Support')
        : join(userPath, 'AppData', 'Roaming')
    const scriptsFolder = join('Cavalry', 'Scripts')
    const target = join(basePath, scriptsFolder, scriptName)
    try {
        await copyFile(source, target)
        window.showInformationMessage('Open `Scripts > Stallion` in Cavalry')
    } catch(error) {
        window.showErrorMessage(error.message)
    }
}
