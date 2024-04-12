/**
 * 
 * @param {p5.Vector} position 
 */
function MovingCircle({
    position,
    radius,
    worldWidth,
    worldHeight
}) {
    P5Object.call(this);

    this.pos = position;
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0); // acceleration
    this.r = radius; // circle radius

    this.worldWidth = worldWidth;
    this.worldHeight = worldHeight;
}
Object.setPrototypeOf(MovingCircle.prototype, P5Object.prototype);

// update this circle's position
MovingCircle.prototype.update = function () {
    // bounce 
    if (this.pos.x < this.r || this.pos.x > this.worldWidth - this.r) this.vel.x *= -1;
    if (this.pos.y < this.r || this.pos.y > this.worldHeight - this.r) this.vel.y *= -1;

    this.acc = p5.Vector.random2D().setMag(0.015);
    this.vel.add(this.acc);
    this.vel.limit(5); // Limit the velocity to prevent it from becoming too fast
    this.pos.add(this.vel); // Update the position based on velocity
};

MovingCircle.prototype.display = function () {
    let c1 = color("yellow");
    c1.setAlpha(130);
    let c2 = color("yellow");
    c2.setAlpha(0);

    let drawCxt;
    if (this.getCanvas() !== undefined) {
        drawCxt = this.getCanvas().drawingContext;
    } else {
        drawCxt = drawingContext;
    }

    let coloring = drawCxt.createRadialGradient(this.pos.x, this.pos.y, this.r * 0.1, this.pos.x, this.pos.y, this.r);
    coloring.addColorStop(0, c1);
    coloring.addColorStop(1, c2);
    drawCxt.fillStyle = coloring;

    if (this.getCanvas() !== undefined) {
        this.getCanvas().circle(this.pos.x, this.pos.y, 2 * this.r);
    } else {
        circle(this.pos.x, this.pos.y, 2 * this.r);
    }
};


/**
 * 
 * @param {*} commonOptions the options (traits) that all the fireflies in this FireFlies instance
 *                          have in common.
 */
function Fireflies(commonOptions) { // finish commonOptions
    P5Object.call(this);

    this.circles = [];
    this.commonOptions = commonOptions;
}
Object.setPrototypeOf(Fireflies.prototype, P5Object.prototype);

/**
 * Use this to make new circles to ensure their canvas is set up properly.
 * 
 * @param {*} circleOptions the same thing you will pass into MovingCircles to initiate a circle/firefly.
 * @returns a circle subordinate to this FireFlies instance 
 *          so that its canvas always refers to this FireFlies instance's canvas.
 */
Fireflies.prototype.makeNewCircle = function (circleOptions) {
    let newCircle = new MovingCircle(circleOptions);
    const theseFireFlies = this;

    newCircle.getCanvas = function () {
        return theseFireFlies.getCanvas();
    }

    // Suppress setCanvas to prevent changes to the individual circle's canvas
    newCircle.setCanvas = function (canvas) {
        throw new Error("Changing the canvas of a MovingCircle within Fireflies is not allowed.");
    };

    return newCircle;
};

/**
 * adds a moving circle at a random location
 */
Fireflies.prototype.addCircle = function () {
    let x = random(0, this.commonOptions.worldWidth);
    let y = random(0, this.commonOptions.worldHeight);
    let circleOptions = { ...this.commonOptions }; // shallow copy
    circleOptions.position = createVector(x, y);
    this.circles.push(this.makeNewCircle(circleOptions));
}

// call this for each frame
Fireflies.prototype.animate = function () {
    this.circles.forEach(circle => {
        circle.update();
        circle.display();
    });
};

