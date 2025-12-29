import { Callbacks } from './modules/Callbacks.ts'

const SUPPORTED_VERSION = '2.4.0'
const invalid = cavalry.versionLessThan(SUPPORTED_VERSION)
if (invalid) {
	throw new Error(`Stallion requires Cavalry ${SUPPORTED_VERSION} or higher`)
}

const server = new api.WebServer()
const port = 8080
const address = '127.0.0.1'
const cb = new Callbacks(server)
server.listen(address, port)
server.addCallbackObject(cb)
server.setHighFrequency()

const Align = { CENTRE: 1 as 0 | 1 | 2 }
const label = new ui.Label(`Listening on ${address}:${port}`)
label.setAlignment(Align.CENTRE)
const readme = new ui.Label(
	'[Documentation](https://github.com/scenery-io/stallion#readme)',
)
readme.setAlignment(Align.CENTRE)

const layout = new ui.VLayout()
layout.addStretch()
layout.add(label, readme)
layout.addStretch()
ui.setTitle('Stallion')
ui.add(layout)
ui.show()
