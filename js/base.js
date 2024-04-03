/*
const P5Object = {
    defaultCanvas: undefined,
}*/

function P5Object({ canvas = undefined }) {
    if (canvas !== undefined) {
        this.canvas = canvas;
    } else if (P5Object.prototype.defaultCanvas !== undefined) {
        this.canvas = P5Object.prototype.defaultCanvas;
    } else {
        console.error("Please do P5Object.setDefaultCanvas first!");
    }

    /*
    this.setDefaultCanvas = function (canvas) {
        defaultCanvas = canvas;
    }*/
}

/*
P5Object.setDefaultCanvas = function (canvas) {
    defaultCanvas = canvas;
}*/
P5Object.prototype.getCanvas = function () {
    return this.canvas;
}

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
