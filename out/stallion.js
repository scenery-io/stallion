const version = '1.4.0'
const valid = !cavalry.versionLessThan(version)
const server = new api.WebServer()

if (!valid) {
    console.error(`Stallion requires Cavalry ${version} or higher`)
} else {
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
}

function Callbacks() {
    this.onPost = () => {
        const post = server.getNextPost()
        const result = JSON.parse(post.result)
        const script = result.data
        console.log(`Stallion: Received ${script.length} chars`)
        const success = api.exec(randomID(), script)
        if (success) {
            console.log('Stallion: Script successfully executed')
        } else {
            console.error('Stallion: Script failed to execute')
        }
    }
}

// NOTE: Not yet needed but eventually enforced by Cavalry
function randomID() {
    return Math.random().toString(16).slice(2)
}
