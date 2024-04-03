function FireFly({ x: x, y: y }) {
    P5Object.call(this);
    this.pos = createVector(x, y);

}
Object.setPrototypeOf(FireFly.prototype, P5Object.prototype);

class fireFly {
    constructor(x, y) {
        this.pos = createVector(x, y)
        this.color = random(colors)
        this.vel = createVector(0, 0)
        this.acc = p5.Vector.random2D();
        this.acc.setMag(0.01)
        this.lit = 0
        this.newColor = NaN
        this.angle = this.vel.heading()
    }

    update() {
        this.acc.setMag(0.015)
        this.vel.add(this.acc)
        this.vel.limit(1)
        this.pos.add(this.vel)
        this.angle = this.vel.heading()

        //edges
        if (this.pos.x < -10) {
            this.pos.x = + 10
        }
        if (this.pos.x > width + 10) {
            this.pos.x = -10
        }
        if (this.pos.y < -10) {
            this.pos.y = height + 10
        }
        if (this.pos.y > height + 10) {
            this.pos.y = -10
        }
    }
};
