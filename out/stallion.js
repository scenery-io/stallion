// VERSION 0.2.2 // TODO: Replace with `version` from `package.json`
const SUPPORTED_VERSION = '1.5.2'
const server = new api.WebServer()
const invalid = cavalry.versionLessThan(SUPPORTED_VERSION)

if (invalid) {
    throw new Error(`Stallion requires Cavalry ${SUPPORTED_VERSION} or higher`)
}

class Callbacks {
    onPost = () => {
        const post = server.getNextPost()
        const result = JSON.parse(post.result)
        const { path } = result
        console.log(`Stallion: Received script "${path}"`)
        const exists = api.filePathExists(path)
        if (!exists) {
            return console.error(`No script found ${path}`)
        }
        const success = ui.runFileScript(path)
        if (success) {
            console.log('Stallion: Script successfully executed')
        } else {
            console.error('Stallion: Script failed to execute')
        }
    }
}

const port = 8080
const address = '127.0.0.1'
const cb = new Callbacks()
server.listen(address, port)
server.addCallbackObject(cb)
server.setHighFrequency()

const label = new ui.Label(`Listening on ${address}:${port}`)
const layout = new ui.HLayout()
layout.addStretch()
layout.add(label)
layout.addStretch()
ui.setTitle('Stallion')
ui.add(layout)
ui.show()
