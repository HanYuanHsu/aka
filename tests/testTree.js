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
    tree2.branches[0].styleFunction = (trunk) => {
        console.log(`is trunk canvas undefined: ${trunk.canvas === undefined}`)
        let branchColor = color(0, 0, 255, 20);
        //branchColor.setAlpha(20);
        if (trunk.canvas !== undefined) {
            trunk.canvas.fill(0, 0, 255, 20);
        } else {
            fill(0, 0, 255, 20);
        }
    }
    tree2.setCanvas(canvas2);
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

