/**
 * All the objects to be displayed on a P5 canvas should inherit P5Object
 * because we need to decide which canvas an object should be displayed on.
 * If this.canvas is undefined, this P5Object instance will be drawn on the main canvas
 * specified by createCanvas(...)
 * 
 * FOR NOW, WE WILL NOT USE defaultCanvas FUNCTIONALITY
 */
function P5Object(options) {
    // if options is not provided, this.canvas will be undefined.
    this.canvas = options?.canvas;

    /*
    if (this.canvas === undefined) {
        this.canvas = P5Object.prototype.defaultCanvas;
    }
    */
}

// gets a P5Object instance's canvas
// if your object inherits P5Object,
// you can override this method
P5Object.prototype.getCanvas = function () {
    return this.canvas;
}

// sets a P5Object instance's canvas
// if your object inherits P5Object,
// you can override this method
P5Object.prototype.setCanvas = function (canvas) {
    this.canvas = canvas;
}

// P5Object's static method to get default canvas
P5Object.getDefaultCanvas = function () {
    return P5Object.prototype.defaultCanvas;
}

// P5Object's static method to set default canvas
P5Object.setDefaultCanvas = function (canvas) {
    P5Object.prototype.defaultCanvas = canvas;
}





/* Utils */

/**
 * Generates a random float number in the interval [a, b], where a <= b
 * @param {*} a 
 * @param {*} b 
 */
function getRandom(a, b) {
    return a + Math.random() * (b - a);
}
