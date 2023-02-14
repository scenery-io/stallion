const version = '1.4.1'
const server = new api.WebServer()
const invalid = cavalry.versionLessThan(version)

if (invalid) {
    throw new Error(`Stallion requires Cavalry ${version} or higher`)
}

class Callbacks {
    onPost = () => {
        const post = server.getNextPost()
        const result = JSON.parse(post.result)
        const script = result.data
        console.log(`Stallion: Received ${script.length} chars`)
        // NOTE: Unique `id` eventually enforced by Cavalry
        const id = Math.random().toString(16).slice(2)
        const iife = `(function(){${script}})()`
        const success = api.exec(id, iife)
        if (success) {
            console.log('Stallion: Script successfully executed')
        } else {
            console.error('Stallion: Script failed to execute')
        }
    }
}

const port = 8080
const address = '127.0.0.1'
server.listen(address, port)
const cb = new Callbacks()
server.addCallbackObject(cb)

const label = new ui.Label(`Listening on ${address}:${port}`)
const layout = new ui.HLayout()
layout.addStretch()
layout.add(label)
layout.addStretch()
ui.setTitle('Stallion')
ui.add(layout)
ui.show()
