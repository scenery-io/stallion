/**
 * This module gives access to the Path class, functions for creating noise and
 * random numbers along with a number of utilities to make working with color
 * easier, and, a whole host of maths functions such as clamp, norm, map and
 * dist. The following methods are available to the JavaScript Utility, and the
 * JavaScript Editor. Everything in this module is in the cavalry namespace and
 * so methods need prefixing with `cavalry.` e.g `var distance = cavalry.dist(0,0,100,200);`
 */
declare namespace cavalry {
	/**
	 * The Cavalry module contains a Path class which can be used to construct paths which
	 * can then be drawn on screen. Path itself contains several methods.
	 */
	declare class Path {
		/**
		 * Start a new contour
		 *
		 * @param x
		 * @param y
		 */
		moveTo(x: double, y: double): void

		/**
		 * Draw a line to x, y
		 *
		 * @param x The `x` coordinate
		 * @param y The `y` coordinate
		 */
		lineTo(x: double, y: double): void

		/**
		 * Draw a cubic bezier with two control points, and an end point.
		 *
		 * @param cp1X
		 * @param cp1Y
		 * @param cp2X
		 * @param cp2Y
		 * @param endX
		 * @param endY
		 */
		cubicTo(
			cp1X: double,
			cp1Y: double,
			cp2X: double,
			cp2Y: double,
			endX: double,
			endY: double
		): void

		/**
		 * Close the path
		 */
		close(): void

		/**
		 * Add text to the path and position it. You could add the text to a
		 * separate path and then `.append()` it into this one if needed. The
		 * position arguments may be removed as a result of this.
		 *
		 * @param text
		 * @param fontSize
		 * @param positionX
		 * @param positionY
		 */
		addText(
			text: string,
			fontSize: int,
			positionX: double,
			positionY: double
		): void

		/**
		 * Convenience method for drawing a rectangle.
		 *
		 * @param fromX
		 * @param fromY
		 * @param toX
		 * @param toY
		 */
		addRect(fromX: double, fromY: double, toX: double, toY: double): void

		/**
		 * Convenience method for drawing an ellipse.
		 *
		 * @param centreX
		 * @param centreY
		 * @param radiusX
		 * @param radiusY
		 */
		addEllipse(
			centreX: double,
			centreY: double,
			radiusX: double,
			radiusY: double
		): void

		/**
		 * Empty the path
		 */
		clear(): void

		/**
		 * Returns a boolean signifying if the path is closed.
		 */
		isClosed(): bool

		/**
		 * Returns the length of the path
		 */
		length(): double

		/**
		 * Move the path by x and y.
		 *
		 * @param x
		 * @param y
		 */
		translate(x: double, y: double): void

		/**
		 * Rotate the path.
		 *
		 * @param degrees
		 */
		rotate(degrees: double): void

		/**
		 * Scale the path.
		 *
		 * @param x
		 * @param y
		 */
		scale(x: double, y: double): void

		/**
		 * Add one path to another
		 *
		 * @param pathToAdd
		 */
		append(pathToAdd: path): void

		/**
		 * Perform a Boolean intersection.
		 *
		 * @param intersectPath
		 */
		intersect(intersectPath: path): void

		/**
		 * Perform a Boolean unite.
		 *
		 * @param unitePath
		 */
		unite(unitePath: path): void

		/**
		 * Perform a Boolean difference.
		 *
		 * @param differencePath
		 */
		difference(differencePath: path): void

		// The below example can be set on the JavaScript Shape.
		// ```js
		// function boolTest() {
		//     var mainPath = new cavalry.Path();
		//     mainPath.addRect(-100,100,100,-100);
		//     var boolTest = new cavalry.Path();
		//     boolTest.addEllipse(0,0,200,40);
		//     mainPath.difference(boolTest);
		//     return mainPath;
		// }

		// boolTest();
		// ```

		/**
		 * Resample lines as curves (the algorithm used by our Pencil Tool).
		 */
		convertToCurves(): void

		/**
		 * Convert (vectorise) any curves into a series of lines.
		 *
		 * @param linesPerCurve
		 */
		convertToLines(linesPerCurve: int): void

		/**
		 * Converts the Path to an object that can be saved and read at a later time
		 */
		toObject(): object

		// ```js
		// var path = new cavalry.Path();
		// path.moveTo(0.,0.);
		// path.lineTo(0.,-100.);
		// path.lineTo(300.,-100.);
		// // Convert to an Object
		// var js = path.toObject();
		// // Convert from a saved object
		// path.fromObject(js);
		// console.log(path.length);
		// ```

		/**
		 * Sets the path data from an object
		 *
		 * @param objectToRead
		 */
		fromObject(objectToRead: object): void

		// ```js
		// var path = new cavalry.Path();
		// path.moveTo(0.,0.);
		// path.lineTo(0.,-100.);
		// path.lineTo(300.,-100.);
		// // Convert to an Object
		// var js = path.toObject();
		// // Convert from a saved object
		// path.fromObject(js);
		// console.log(path.length);
		// ```
	}

	// Math Helper Functions
	/**
	 * Returns a random number
	 *
	 * @param min
	 * @param max
	 * @param seed
	 */
	function random(min: double, max: double, seed: int): double
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.random(0, 10, i));
	// }

	/**
	 * Returns random numbers with a uniform distribution
	 *
	 * @param min
	 * @param max
	 * @param seed
	 */
	function uniform(min: double, max: double, seed: int): double
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.uniform(0, 10, i));
	// }

	/**
	 * Returns 1d Improved Perlin noise
	 *
	 * @param x
	 * @param seed
	 * @param frequency
	 */
	function noise1d(x: double, seed: int, frequency: double)
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.noise1d(i, 0, 1));
	// }

	/**
	 * Returns 2d Improved Perlin noise
	 *
	 * @param x
	 * @param y
	 * @param seed
	 * @param frequency
	 */
	function noise2d(x: double, y: double, seed: int, frequency: double)
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.noise2d(i, api.getFrame(), 0, 1));
	// }

	/**
	 * Returns 3d Improved Perlin noise
	 *
	 * @param x
	 * @param y
	 * @param z
	 * @param seed
	 * @param frequency
	 */
	function noise3d(
		x: double,
		y: double,
		z: double,
		seed: int,
		frequency: double
	)
	// for (var i = 1; i < 10; i +=1){
	//     console.log(cavalry.noise3d(i, i+100, api.getFrame(), 0, 0.1));
	// }

	/**
	 * Get the distance between two points
	 *
	 * @param x1
	 * @param y1
	 * @param x2
	 * @param y2
	 */
	function dist(x1: double, y1: double, x2: double, y2: double)
	// var d = cavalry.dist(0,0,100,100)
	// console.log(d);

	/**
	 * Remap a value into a new range
	 *
	 * @param value
	 * @param inMin
	 * @param inMax
	 * @param outMin
	 * @param outMax
	 */
	function map(
		value: double,
		inMin: double,
		inMax: double,
		outMin: double,
		outMax: double
	)
	// remap 30 from the range 0..60 to the range 100..300. Prints 200.
	// console.log(cavalry.map(30,0,60,100,300));

	/**
	 * Normalise a value between 0..1
	 *
	 * @param value
	 * @param min
	 * @param max
	 */
	function norm(value: double, min: double, max: double)
	// Prints 0.55;
	// console.log(cavalry.norm(55,0,100));

	/**
	 * Clamp a value min and max.
	 *
	 * @param value
	 * @param min
	 * @param max
	 */
	function clamp(value: double, min: double, max: double)
	// Prints 100;
	// console.log(cavalry.clamp(150,0,100));

	/**
	 * Interpolate between a minimum and maximum value. The value returned is the value at `t` (between 0 and 1).
	 *
	 * @param min
	 * @param max
	 * @param t
	 */
	function lerp(min: double, max: double, t: double)

	/**
	 * Convert an angle (radians) into a vector (x, y) with values between 0..1
	 *
	 * @param angle
	 */
	function angleToVector(angle: double): json
	// var ang = cavalry.angleFromVector(1,0);
	// console.log(ang);
	// var vec = cavalry.vectorFromAngle(ang);
	// console.log(vec["x"]+" "+vec["y"]);

	/**
	 * Convert a vector into an angle (radians)
	 *
	 * @param x
	 * @param y
	 */
	function vectorToAngle(x: double, y: double): double
	// var ang = cavalry.angleFromVector(1,0);
	// console.log(ang);
	// var vec = cavalry.vectorFromAngle(ang);
	// console.log(vec["x"]+" "+vec["y"]);

	// Color Helper Functions
	/**
	 * Convert an RGB color to HSV. RGB values should be in the range 0..1
	 *
	 * @param h
	 * @param s
	 * @param v
	 */
	function rgbToHsv(h: double, s: double, v: double): json
	// var result = cavalry.rgbToHsv(0.5,1,0.5);
	// console.log(JSON.stringify(result));

	/**
	 * Convert an RGB color to a Hex string. RGB values should be in the range 0..1
	 *
	 * @param r
	 * @param g
	 * @param b
	 */
	function rgbToHex(r: double, g: double, b: double): string
	// var result = cavalry.rgbToHex(1,1,1);
	// console.log(result);

	/**
	 * Convert an HSV color to RGB.
	 *
	 * @param h
	 * @param s
	 * @param v
	 */
	function hsvToRgb(h: double, s: double, v: double): json
	// var result = cavalry.hsvToRgb(180,1,0.5);
	// console.log(JSON.stringify(result));

	/**
	 * Convert an HSV color to a Hex string.
	 *
	 * @param h
	 * @param s
	 * @param v
	 */
	function hsvToHex(h: double, s: double, v: double): json
	// var result = cavalry.rgbToHsv(0.5,1,0.5);
	// console.log(result);

	/**
	 * Convert an Hex value (e.g #ffffff) color to RGB.
	 *
	 * @param hexValue
	 */
	function hexToRgb(hexValue: string): json
	// var result = cavalry.hexToRgb("#fc5900");
	// console.log(JSON.stringify(result));

	/**
	 * Convert an Hex value (e.g #ffffff) color to HSV.
	 *
	 * @param hexValue
	 */
	function hexToHsv(hexValue: string): json
	// var result = cavalry.hexToHsv("#ff9801");
	// console.log(JSON.stringify(result));

	// Utilities
	/**
	 * This will return if the specified version is less than the currently open app version. This is useful to add support for features in scripts depending on the version of Cavalry currently running.
	 *
	 * @param version
	 */
	function versionLessThan(version: string): bool
	/// this will return true in Cavalry 1.3, and false in Cavalry 2.0
	// console.log(cavalry.versionLessThan("1.5.1"));
}

/**
 * The following methods are only available to the JavaScript Utility.
 * Everything in this module is in the `ctx` namespace and so methods need
 * prefixing with `ctx.` e.g `var index = ctx.index;`
 */
declare namespace ctx {
	/**
	 * The current point index. Available when using a Duplicator (or
	 * other Layer that generates indices, such as the Connect Shape or
	 * Trails).
	 */
	let index: int

	/**
	 * The number of points in total. Available when using a Duplicator (or
	 * other Layer that generates indices, such as the Connect Shape or
	 * Trails).
	 */
	let count: int

	/**
	 * The X position of the current point. Available when using a
	 * Duplicator (or other Layer that generates indices, such as the
	 * Connect Shape or Trails).
	 */
	let positionX: double

	/**
	 * The Y position of the current point. Available when using a
	 * Duplicator (or other Layer that generates indices, such as the
	 * Connect Shape or Trails).
	 */
	let positionY: double

	/**
	 * Saved an object for use later. The normal use case for this feature
	 * is when creating solvers, i.e a script that needs to know a previous
	 * value. The value to be saved needs to be an object. If writing a
	 * Path for use later, please use the `path.toObject()` or
	 * `path.fromObject(obj)` methods when saving/loading them.
	 *
	 * @param name
	 * @param objectLiteralToSave
	 */
	function saveObject(name: string, objectLiteralToSave: object)
	// ```js
	// // Simple example
	// ctx.saveObject("test", {"someKey": 10});
	// // A path example
	// // Create a path
	// var path = new cavalry.Path();
	// path.moveTo(0.,0.);
	// path.lineTo(0.,-100.);
	// path.lineTo(300.,-100.);
	// // Save it
	// ctx.saveObject("path", path.toObject());
	// // Safety check that there is a saved value
	// if (ctx.hasObject("path")
	//     // Load the object
	//     let previous = ctx.loadObject("path");
	//     // set the path from the object
	//     path.fromObject(previous);
	// }
	// ```

	function loadObject(name: string): object
	// ```js
	// ctx.saveObject("test", {"someKey": 10});
	// var textObj = ctx.loadObject("test");
	// console.log(textObj["someKey"])
	// ```

	/**
	 * Returns `true` is an object of name has been saved and can be loaded.
	 *
	 * @param name
	 */
	function hasObject(name: string): bool
	// ```js
	// ctx.saveObject("test", {"someKey": 10});
	// if (ctx.hasObject("test")) {
	//     /// do something
	// }
	// ```
}

/**
 * Cavalry provides a way to interact with API endpoints on the web by creating
 * a WebClient object and interacting with its methods to `get`, `post` or `put`.
 * These API calls are blocking meaning they must successfully complete before
 * progressing to the next part of a script.
 *
 * Further to the WebClient, Cavalry also provides a simple WebServer. You can
 * call `/get` to retrieve whatever response you have set on the server, or,
 * for those of an adventurous persuasion, you can use `/post`. To aid when using
 * `/post` the WebServer can poll for new data and will fire a callback
 * function when a data drop has been detected.
 */
declare namespace api {
	// Simple get request.
	// // Make a new WebClient
	// var client = new api.WebClient("https://www.boredapi.com");
	// // Send the Get Request (this returns a random activity to do if you're bored).
	// client.get("/api/activity");
	// // Check it succceded
	// if (client.status() == 200) {
	//     let obj = JSON.parse(client.body());
	//     // Safety check, and print the activity
	//     if ('activity' in obj) {
	//         console.log("Random activity: "+obj.activity);
	//     }
	// }

	// Getting and saving an SVG file.

	// var client = new api.WebClient("https://cavalry.scenegroup.co");
	// client.get("/images/logo_cavalry-landscape-outline_001.svg");
	// if (client.status() == 200) {
	//     api.writeToFile("/Some/Path/Here/cavLogo.svg", client.body());
	// }

	declare class WebClient {
		/**
		 * Sets basic authentication for any subsequent requests.
		 *
		 * @param username
		 * @param password
		 */
		setBasicAuthentication(username: string, password: string)

		/**
		 * Sets digest authentication for any subsequent requests.
		 *
		 * @param username
		 * @param password
		 */
		setDigestAuthentication(username: string, password: string)

		/**
		 * Sets token based authentication for any subsequent requests.
		 *
		 * @param token
		 */
		setTokenAuthentication(token: string)

		/**
		 * Adds a header for any following requests. API keys, app keys, content types and so forth can be added in this way.
		 *
		 * @param key
		 * @param value
		 */
		addHeader(key: string, value: string)

		getHeaders(): object
		// var client = new api.WebClient("https://www.boredapi.com");
		// client.get("/api/activity");
		// if (client.status() == 200) {
		//     let headers = client.getHeaders();
		//     for (const [key, value] of Object.entries(headers)) {
		//       console.log(`${key}: ${value}`);
		//     }
		// }

		/**
		 * Returns the status of the request. For example 200 means OK.
		 */
		status(): int

		/**
		 * The returned body. This is often in the form of JSON but you can check the Content-Type header with getHeaders() if you're unsure.
		 */
		body(): string

		/**
		 * Peforms a get request. Once done, status() and if successful, body() should be available.
		 */
		get(path: string)

		/**
		 * Peforms a post request. Once done, status() and if successful, body() should be available.
		 */
		post(path: string, content: string, contentType: string)

		/**
		 * Peforms a put request. Once done, status() and if successful, body() should be available.
		 */
		put(path: string, content: string, contentType: string)

		/**
		 * A helper method for posting a file directly. This method is needed especially when uploading binary files (like images or movies). Peforms a post request. Once done, status() and if successful, body() should be available.
		 */
		postFromFile(path: string, filePath: string, contentType: string)

		/**
		 * A helper method for posting a file directly. This method is needed especially when uploading binary files (like images or movies). Peforms a put request. Once done, status() and if successful, body() should be available.
		 */
		putFromFile(path: string, filePath: string, contentType: string)

		/**
		 * If get has been used to retrieve binary data (i.e an image or a movie), this cannot be passed to the usual api.writeToFile() call. You must instead use this function to write the body data to file (which you can then pull into Cavalry as an Asset for example).
		 */
		writeBodyToBinaryFile(path: string)
	}

	/**
	 * A complete example of a UI script which implements a Cavalry Server. Please save this into the Cavalry Scripts folder Help > Scripts and then load it via the Window > Scripts menu.
	 */
	declare class WebServer {
		// var server = new api.WebServer();
		// var button = new ui.Button("Start Server");
		// button.onClick = function () {
		//     if (!server.isRunning()) {
		//         server.listen("localhost", 1234);
		//         button.setText("Stop Server");
		//     } else {
		//         server.stop();
		//         button.setText("Start Server");
		//     }
		// }

		// function Callbacks() {
		//     this.onPost = function () {
		//         console.log("Queue length: "+server.postCount());
		//         processButton.setEnabled(true);
		//     }
		// }

		// var processButton = new ui.Button("Process Posts");
		// processButton.setEnabled(false);

		// processButton.onClick = function () {
		//     while(server.postCount()) {
		//         let obj = server.getNextPost();
		//         console.log("Process: "+obj.result);
		//     }
		//     processButton.setEnabled(false);
		// }

		// var callbackObj = new Callbacks();
		// server.addCallbackObject(callbackObj);

		// ui.add(button);
		// ui.add(processButton);
		// ui.show();

		// Once this script is running, run this in the JavaScript Editor, the /post text should print to the console.

		// var client = new api.WebClient("http://localhost:1234");
		// client.post("/post", "The Cavalry Needs You!", "text/plain");
		// client.post("/post", "Join the Cavalry!", "text/plain");

		/**
		 * Start the server listening on the host address (e.g localhost) on the
		 * specified port number.
		 *
		 * @param host
		 * @param port
		 */
		listen(host: string, port: int)

		/**
		 * Stop the server, any polling will also stop.
		 */
		stop()

		/**
		 * Set the result for /get requests, only text/plain is currently supported.
		 *
		 * @param resultText
		 */
		setResultForGet(resultText: string)

		/**
		 * As many `/post` events may happen before you have a chance to react,
		 * Cavalry will queue them for you. This function will get the next (the
		 * oldest) post and will pop the post from the queue meaning once you get
		 * it, you can no longer access it from the server. The object will contain
		 * a result string, and an headers array, each header is an object with a
		 * name and value. Please note only non binary data is supported for `/post`
		 * events.
		 */
		getNextPost(): object

		/**
		 * This is just like the above method, only instead of getting the oldest
		 * unprocessed /post, it will skip to the newest and pop that from the queue.
		 */
		getNewestPost(): object

		/**
		 * Returns the number of unprocessed /post events. Process posts using the
		 * `getNextPost()` or `getNewestPost()` functions.
		 */
		postCount(): int

		/**
		 * Clear all unprocessed `/post` events. Process posts using the
		 * `getNextPost()` or `getNewestPost()` functions.
		 */
		clearPosts()

		/**
		 * Set a Callback object (much like the UI callback object). This is a
		 * JavaScript object with an onPost function implemented. Setting a
		 * Callback object will start the server polling for new information, by
		 * default we poll the server once every 3 seconds.
		 *
		 * @param callbackObj
		 */
		addCallbackObject(callbackObj: object)
		// var server = new api.WebServer();
		// function Callbacks() {
		//     this.onPost = function () {
		//         console.log("Check result: "+server.getResult());
		//     }
		// }
		// var callbackObj = new Callbacks();
		// server.addCallbackObject(callbackObj);

		/**
		 * Calling this after setting a Callback object will change the polling
		 * frequency to once per second.
		 */
		setHighFrequency()

		/**
		 * Calling this after setting a Callback object will change the polling
		 * frequency to 60 times a second. This is useful for realtime
		 * communication with things like midi-controllers.
		 */
		setRealtime()
	}
}
