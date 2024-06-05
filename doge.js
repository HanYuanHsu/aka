/**
 * 
 * @param {} canvas the createGraphics object on which the doges are drawn
 * @param basePosition the position from which this doge will grow
 */
function Doge({
    dogeImage,
    basePosition,
    scaleVelocity,
    startScale = 0,
    endScale = 1,
    canvas = undefined
}) {
    P5Object.call(this, { canvas: canvas });

    this.img = dogeImage;
    this.baseP = basePosition;
    this.scaleV = scaleVelocity;
    this.startScale = startScale;
    this.endScale = endScale;
    this.scale = startScale;
}
Object.setPrototypeOf(Doge.prototype, P5Object.prototype);

Doge.prototype.grow = function () {
    if (this.scale < this.startScale && this.scale > this.endScale) {
        return;
    }
    this.scale += this.scaleV;
}

Doge.prototype.display = function () {
    let x = this.baseP.x - this.img.width / 2 * this.scale;
    let y = this.baseP.y - this.img.height * this.scale;
    if (this.getCanvas() !== undefined) {
        this.getCanvas().image(this.img, x, y);
    } else {
        image(this.img, x, y);
    }
}
