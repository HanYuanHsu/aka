let tree1, tree2, fireflies;
let mainCanvas;
let treeCanvas; // trees will be drawn on this canvas
//let firefliesCanvas;
let img;
let t; // global time
const bgColor = 250;
//let gif; // for making gif

function preload() {
    // loads the doge image from my google drive
    img = loadImage("assets/doge_transparent.png");
}

function setup() {
    noStroke();
    mainCanvas = createCanvas(windowWidth, windowHeight);
    background(bgColor);

    treeCanvas = createGraphics(windowWidth, windowHeight);
    treeCanvas.noStroke();

    //firefliesCanvas = createGraphics(windowWidth, windowHeight);
    //firefliesCanvas.noStroke();

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
    //fireflies.setCanvas(firefliesCanvas);

    for (let i = 0; i < 30; i++) {
        fireflies.addCircle();
    }

    // gif
    //gif = new GIF();
    //gif.on('finished', function (blob) {
    //    window.open(URL.createObjectURL(blob));
    //});
    //saveGif('dogetree.gif', 9);
}

function draw() {
    background(bgColor);

    tree1.grow(t);
    tree2.grow(t);

    fireflies.animate();

    image(treeCanvas, 0, 0);

    //gif.addFrame(mainCanvas);

    t += 1;
}

