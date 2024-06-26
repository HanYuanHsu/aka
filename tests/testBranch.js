let t, x, y, trunkWidth, b, c, d, e, bArray;

function setup() {
    mainCanvas = createCanvas(windowWidth, windowHeight);
    P5Object.setDefaultCanvas(mainCanvas);
    mainCanvas.background(240);
    mainCanvas.noStroke();

    treeCanvas = createGraphics(windowWidth, windowHeight);
    treeCanvas.background(240);
    treeCanvas.noStroke();
    x = windowWidth / 2;
    y = windowHeight - 50;
    trunkWidth = 70;
    t = 0;

    b = new BranchTemplate({
        startLoc: createVector(windowWidth / 2 - 400, windowHeight - 20),
        startWidth: 100,
        endWidth: 50,
        height: 400,
        startTime: 0,
        nFrames: 240,
        wriggle: 0.3,
        inverseSlope: -1,
        styleFunction: (thisBranch) => {
            thisBranch.canvas.fill('green');
        }
    });
    b.setCanvas(treeCanvas);

    c = new BranchTemplate({
        startLoc: createVector(windowWidth / 2 - 300, windowHeight - 10),
        startWidth: 50,
        endWidth: 10,
        height: 400,
        startTime: 240,
        nFrames: 240,
        wriggle: 0.4
    });
    c.setCanvas(treeCanvas);

    d = new BranchTemplate({
        startLoc: createVector(windowWidth / 2 - 100, windowHeight - 10),
        startWidth: 100,
        endWidth: 10,
        height: 400,
        startTime: 0,
        nFrames: 2000,
        wriggle: 0.4
    });
    d.setCanvas(treeCanvas);

    e = new BranchTemplate({
        startLoc: createVector(windowWidth / 2 + 100, windowHeight - 10),
        inverseSlope: .3,
        startWidth: 100,
        endWidth: 10,
        height: 600,
        startTime: 0,
        nFrames: 30,
        wriggle: .1
    });
    e.setCanvas(treeCanvas);

    /*
    bArray = [];
    let prevEnd = {
        endLoc: createVector(windowWidth/2 + 100, windowHeight - 10),
        endWidth: 100
    };
    for (let i=0; i<7; i++) {
        let bt = new BranchTemplate({
            startLoc: prevEnd.endLoc,
            startWidth: prevEnd.endWidth,
            endWidth: 100 / 2 ** i,
            height: 400 / 2**i,
            startTime: 0,
            nFrames: 240,
            wriggle: 0.4
      });
        bArray.push(new BranchTemplate({
        	
        }));
    }*/
}

function draw() {
    b.grow(t);
    c.grow(t);
    d.grow(t);
    e.grow(t);
    image(treeCanvas, 0, 0);
    t += 1;
    //stroke('brown');
    //strokeWeight(100);
    //line(windowWidth/2, windowHeight, windowWidth/3, 0);
}

