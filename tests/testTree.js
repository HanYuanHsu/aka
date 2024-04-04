let tree1, tree2;
let canvas2;

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    background(240);

    canvas2 = createGraphics(windowWidth, windowHeight);
    canvas2.clear(); // transparent background
    canvas2.noStroke();

    t = 0;

    tree1 = new Tree({
        startLocation: createVector(windowWidth / 3, windowHeight)
    });

    tree2 = new Tree({
        startLocation: createVector(windowWidth * 2 / 3, windowHeight)
    });

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
    tree2.setCanvas(canvas2);

    // check if canvases of trees are set up correctly
    if (tree1.getCanvas() !== undefined) throw new Error("canvas mismatch");
    for (let branch of tree1.branches) {
        if (branch.getCanvas() !== undefined) throw new Error("canvas mismatch");
    }

    if (tree2.getCanvas() !== canvas2) throw new Error("canvas mismatch");
    for (let branch of tree2.branches) {
        if (branch.getCanvas() !== canvas2) throw new Error("canvas mismatch");
    }
}

function draw() {
    canvas2.clear(); // remember to do this!
    // Since image(canvas2, 0, 0) will be called every frame
    // if you don't do clear, multiple images of canvas2 will get stacked together

    tree1.grow(t);
    tree2.grow(t);

    image(canvas2, 0, 0);
    t += 1;
}

