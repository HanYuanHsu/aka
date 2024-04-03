let t, b, c, d, e, bArray, myTree;
let fireflies;

function setup() {
    noStroke();
    createCanvas(windowWidth, windowHeight);
    background(240);
    t = 0;

    bArray = [];

    myTree = new Tree();

    /*
    b = BranchTemplate({
        startLoc: createVector(windowWidth/2, windowHeight - 20),
        startWidth: 120,
        endWidth: 60,
        height: 200,
        startTime: 0,
        nFrames: 180,
        wriggle: 0.3,
        onEnd: (endInfo) => {
            bArray.push(new BranchTemplate({
                startLoc: createVector(windowWidth/2, windowHeight - 20),
                startWidth: 120,
                endWidth: 60,
                height: 200,
                startTime: 0,
                nFrames: 180,
                wriggle: 0.3,
            }));
        },
    })

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
    myTree.grow(t);
    console.log(myTree.branches);
    image(treeCanvas, 0, 0);

    t += 1;
}

