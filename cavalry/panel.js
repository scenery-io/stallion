const port = 8080
const address = '127.0.0.1'
const server = new api.WebServer()
server.listen(address, port)
const cb = new Callbacks()
server.addCallbackObject(cb)

ui.setTitle('Stallion')
const label = new ui.Label(`Listening on ${address}:${port}`)
ui.add(label)
ui.show()

function Callbacks() {
    this.onPost = () => {
        console.log(`Post received, queue length: ${server.postCount()}`)
        const post = server.getNextPost()
        console.log(Object.keys(post))
        const result = JSON.parse(post.result)
        const path = result.data
        console.log(path)
        api.load(path)
    }
}
