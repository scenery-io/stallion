import { Callbacks } from './Callbacks.ts'

const server = new api.WebServer()
const cb = new Callbacks(server)
server.addCallbackObject(cb)
server.setHighFrequency()

export function createServer(port?: number) {
	if (port === undefined) {
		port = readConfig()
	} else {
		writeConfig(port)
	}
	const origin = '127.0.0.1'
	server.stop()
	server.listen(origin, port)
	console.debug(`Stallion is listening on ${origin}:${port}`)
	return { origin, port }
}

const configPath = api
	// @ts-expect-error
	.getPreferencesFolder()
	.replace('/Cavalry', '/Scenery/Stallion/config.json')

console.debug('Stallion config at', configPath)

function writeConfig(port: number) {
	const content = JSON.stringify({ port })
	const success = api.writeToFile(configPath, content, true)
	if (!success) {
		console.error('Failed to write config')
	}
}

function readConfig() {
	const defaultPort = 8080
	if (api.filePathExists(configPath)) {
		try {
			const content = api.readFromFile(configPath)
			const { port } = JSON.parse(content)
			return port
		} catch {
			console.error(`Failed to read config; using port ${defaultPort}`)
			return defaultPort
		}
	} else {
		writeConfig(defaultPort)
		return defaultPort
	}
}
