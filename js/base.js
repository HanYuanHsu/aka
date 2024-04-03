function P5Object({
    canvas = undefined
}) {
    this.canvas = canvas;
}

P5Object.prototype.getCanvas = function () {
    return this.canvas;
}

P5Object.prototype.setCanvas = function (canvas) {
    this.canvas = canvas;
}
