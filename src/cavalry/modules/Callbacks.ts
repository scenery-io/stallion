export class Callbacks {
	#server: api.WebServer

	constructor(server: api.WebServer) {
		this.#server = server
	}

	onPost = () => {
		const post = this.#server.getNextPost()
		let result
		try {
			// @ts-expect-error
			result = JSON.parse(post.result)
		} catch {
			return console.error('Failed to parse request as JSON')
		}
		console.log(`Stallion: Data received`)

		const { type, code, path } = result
		if (!type && !path) {
			return console.error(
				'Stallion: Missing/empty `type` key in request',
			)
		}
		if (!code && !path) {
			return console.error(
				'Stallion: Missing/empty `code` or `path` key in request',
			)
		}

		// NOTE: Supports `path` for backwards compatibility
		if (type === 'script' || path) {
			if (code && path) {
				console.warn(
					'Stallion: `code` and `path` keys are both in the request, executing `path`',
				)
			}
			if (path) {
				const exists = api.filePathExists(path)
				if (!exists) {
					return console.error(`Stallion: No script found at ${path}`)
				}
				const success = ui.runFileScript(path)
				if (success) {
					return console.log('Stallion: Script successfully executed')
				}
			}
			if (code && !path) {
				const success = api.exec(
					'io.scenery.stallion',
					`(function() { ${code} \n})()`,
				)
				if (success) {
					return console.log('Stallion: Script successfully executed')
				}
			}
			return console.error('Stallion: Script failed to execute')
		}

		if (type.startsWith('javaScript') || type.startsWith('sksl')) {
			let selection = api.getSelection()
			if (!selection.length) {
				const layerId = api.create(type)
				selection = [layerId]
			}
			let attribute = 'expression'
			if (type === 'javaScriptShape') {
				attribute = 'generator.expression'
			}
			if (type.startsWith('sksl')) {
				attribute = 'code'
			}
			for (const layerId of selection) {
				const layerType = api.getLayerType(layerId)
				if (layerType !== type) {
					const name = api.getNiceName(layerId)
					console.warn(
						`Stallion: Skipped layer '${name}' because it is not of type '${type}'`,
					)
					continue
				}
				api.set(layerId, { [attribute]: code })
			}
			return console.log(`Stallion: Successfully applied expression`)
		}

		if (type.toLowerCase().includes('render')) {
			const items = api.getRenderQueueItems()
			for (const layerId of items) {
				const selected = api.get(layerId, 'selected')
				if (selected) {
					api.set(layerId, { [type]: code })
				}
			}
			return console.log(
				`Stallion: Successfully applied render expression`,
			)
		}

		console.error(`Stallion: Unexpected type '${type}'`)
	}
}
