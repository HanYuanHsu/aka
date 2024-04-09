let tree1, tree2, fireflies;
let treeCanvas; // trees will be drawn on this canvas
let firefliesCanvas;
let img;
let t; // global time

function preload() {
    // loads the doge image from my google drive
    img = loadImage("https://lh3.googleusercontent.com/drive-viewer/AKGpihbVApBRA6ujGkmcApaoL_z5q4SyZfBNOPJHkNVeGxKYVCV2IB8WB5sSdd0DB4kXagbVGaHAAuXm6wo__IQTqSENw1V5lJlK-A=s1600-rw-v1");
}

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    background(240);

    treeCanvas = createGraphics(windowWidth, windowHeight);
    treeCanvas.noStroke();

    firefliesCanvas = createGraphics(windowWidth, windowHeight);
    firefliesCanvas.noStroke();

    t = 0;

    tree1 = new Tree({
        startLocation: createVector(windowWidth / 3, windowHeight),
        dogeImg: img
    });
    tree1.setCanvas(treeCanvas);

    tree2 = new Tree({
        startLocation: createVector(windowWidth * 2 / 3, windowHeight),
        dogeImg: img
    });
    tree2.setCanvas(treeCanvas);

    // change the style of tree2's trunk
    tree2.branches[0].styleFunction = (trunk) => {
        //console.log(`is trunk canvas undefined: ${trunk.canvas === undefined}`)
        let branchColor = color(0, 0, 255, 20);
        branchColor.setAlpha(20);
        if (trunk.getCanvas() !== undefined) {
            trunk.getCanvas().fill(branchColor);
        } else {
            fill(branchColor);
        }
    }

    fireflies = new Fireflies({
        radius: 50,
        worldWidth: windowWidth,
        worldHeight: windowHeight
    });
    fireflies.setCanvas(firefliesCanvas);

    for (let i = 0; i < 30; i++) {
        fireflies.addCircle();
    }
}

function draw() {
    treeCanvas.clear(); // remember to do this!
    // Since image(canvas2, 0, 0) will be called every frame
    // if you don't do clear, multiple images of canvas2 will get stacked together
    firefliesCanvas.clear();

    tree1.grow(t);
    tree2.grow(t);

    fireflies.animate();

    // firefliesCanvas will be the background,
    // so it should be shown first
    image(firefliesCanvas, 0, 0);
    image(treeCanvas, 0, 0);

    t += 1;
}

