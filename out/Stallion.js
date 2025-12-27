// VERSION 0.5.0
const SUPPORTED_VERSION = "2.4.0";
const server = new api.WebServer();
const invalid = cavalry.versionLessThan(SUPPORTED_VERSION);
if (invalid) {
  throw new Error(`Stallion requires Cavalry ${SUPPORTED_VERSION} or higher`);
}
class Callbacks {
  onPost = () => {
    const post = server.getNextPost();
    let result;
    try {
      result = JSON.parse(post.result);
    } catch {
      return console.error("Failed to parse request as JSON");
    }
    console.log(`Stallion: Data received`);
    const { type, code, path } = result;
    if (!type && !path) {
      return console.error(
        "Stallion: Missing/empty `type` key in request"
      );
    }
    if (!code && !path) {
      return console.error(
        "Stallion: Missing/empty `code` or `path` key in request"
      );
    }
    if (type === "script" || path) {
      let success = false;
      if (code && path) {
        console.warn(
          "Stallion: `code` and `path` keys are both in the request, executing `path`"
        );
      }
      if (path) {
        const exists = api.filePathExists(path);
        if (!exists) {
          return console.error(`Stallion: No script found at ${path}`);
        }
        success = ui.runFileScript(path);
      }
      if (code && !path) {
        success = api.exec(
          "io.scenery.stallion",
          `(function() { ${code} 
})()`
        );
      }
      if (success) {
        return console.log("Stallion: Script successfully executed");
      } else {
        return console.error("Stallion: Script failed to execute");
      }
    }
    if (type.startsWith("javaScript") || type.startsWith("sksl")) {
      let selection = api.getSelection();
      if (!selection.length) {
        const layerId = api.create(type);
        selection = [layerId];
      }
      let attr = "expression";
      if (type === "javaScriptShape") {
        attr = "generator.expression";
      }
      if (type.startsWith("sksl")) {
        attr = "code";
      }
      for (const layerId of selection) {
        const layerType = api.getLayerType(layerId);
        if (layerType !== type) {
          const name = api.getNiceName(layerId);
          console.warn(
            `Stallion: Skipped layer '${name}' because it is not of type '${type}'`
          );
          continue;
        }
        api.set(layerId, { [attr]: code });
      }
      return console.log(`Stallion: Successfully applied expression`);
    }
    console.error(`Stallion: Unexpected type '${type}'`);
  };
}
const port = 8080;
const address = "127.0.0.1";
const cb = new Callbacks();
server.listen(address, port);
server.addCallbackObject(cb);
server.setHighFrequency();
const label = new ui.Label(`Listening on ${address}:${port}`);
label.setAlignment(1);
const readme = new ui.Label(
  "[Documentation](https://github.com/scenery-io/stallion#readme)"
);
readme.setAlignment(1);
const layout = new ui.VLayout();
layout.addStretch();
layout.add(label, readme);
layout.addStretch();
ui.setTitle("Stallion");
ui.add(layout);
ui.show();
