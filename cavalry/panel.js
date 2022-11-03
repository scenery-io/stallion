const port = 8080
const address = '127.0.0.1'
const server = new api.WebServer()
server.listen(address, port)
const cb = new Callbacks()
server.addCallbackObject(cb)

ui.setTitle('Stallion')
const label = new ui.Label(`Listening on ${address}:${port}`)
var layout = new ui.HLayout()
layout.addStretch()
layout.add(label)
layout.addStretch()
ui.add(layout);
ui.show()

function Callbacks() {
    this.onPost = () => {
        const post = server.getNextPost()
        const result = JSON.parse(post.result)
        console.log(`Stallion: Received "${result.data}"`)
        const path = result.data
        const success = api.load(path)
        console.log(
            success 
                ? 'Stallion: Script successfully executed'
                : 'Stallion: Script failed to execute'
        )
    }
}
