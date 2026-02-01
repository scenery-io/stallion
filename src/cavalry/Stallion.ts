import { createServer } from './modules/server.ts'
import { debounce } from '@scenery/script-utils'

const SUPPORTED_VERSION = '2.5.0'
const invalid = cavalry.versionLessThan(SUPPORTED_VERSION)
if (invalid) {
	throw new Error(`Stallion requires Cavalry ${SUPPORTED_VERSION} or higher`)
}

const { origin, port } = createServer()

const layout = new ui.HLayout()
layout.addStretch()
// NOTE: Workaround to avoid line-breaks
const label = `Listening on ${origin}:`.split(' ')
for (const word of label) {
	layout.add(new ui.Label(word))
}
const input = new ui.NumericField(port)
input.setMin(1)
input.setMax(65535)
// @ts-expect-error
input.setMaximumWidth(48)
// TODO: Test debouncing
input.onValueChanged = debounce(() => {
	createServer(input.getValue())
}, 250)
layout.add(input)
layout.addStretch()

const readme = new ui.Label(
	'[Documentation](https://github.com/scenery-io/stallion#readme)',
)
readme.setAlignment(1)

ui.addStretch()
ui.add(layout, readme)
ui.addStretch()
ui.setTitle('Stallion')
ui.show()
