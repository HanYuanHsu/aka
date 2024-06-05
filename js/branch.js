/*
 * Reference:
 * https://openprocessing.org/sketch/627398
 * https://openprocessing.org/sketch/2198756
 */


/*
 * recap of javascript's `new`:
 * If we write let b = new BranchTemplate(...)
 * a blank plain object will be created called b
 * and its prototype will point to the constructor function's prototype,
 * namely BranchTemplate.prototype
 */
function BranchTemplate({
    startLoc,
    startWidth,
    endWidth,
    height,
    startTime,
    nFrames,
    wriggle,
    iteration,
    inverseSlope = 0,
    styleFunction = (thisBranch) => {
        let branchColor = color(125, 79, 9);
        branchColor.setAlpha(20);
        if (thisBranch.getCanvas() !== undefined) {
            thisBranch.getCanvas().fill(branchColor);
        } else {
            fill(branchColor);
        }
    },
    onEnd = (thisBranch) => { },
    startPhase = 0
}) {
    P5Object.call(this);

    this.startLoc = startLoc; // p5.Vector for starting location
    this.startWidth = startWidth; // Starting width of the branch
    this.endWidth = endWidth; // Ending width of the branch
    this.startPhase = startPhase; // ...
    this.height = height;
    this.startTime = startTime; // The global time when this branch starts to grow
    this.nFrames = nFrames; // Number of frames for this branch to grow
    this.inverseSlope = inverseSlope; // the inverse slope of the growing direction
    this.wriggle = wriggle; // controls how wriggly the branch is
    this.iteration = iteration; // what iteration this branch is created at
    this.styleFunction = styleFunction; // for the color, alpha, ... of the branch
    this.onEnd = onEnd; // callback function when the branch has ended growing.
    // it takes in endInfo, a dictionary containing the info
    // about the end of the branch, such as 
    // its end location, end width, etc.

    this.ellipseHeight = 20; // height of ellipse that builds branch

    this.curHeight = []; // ...
    this._initCurHeight();
}
Object.setPrototypeOf(BranchTemplate.prototype, P5Object.prototype);

/**
 * change this ... 
 * initializes growArray so that
 * growArray[i] is the number of ellipses to draw at frame i
 */
BranchTemplate.prototype._initCurHeight = function () {
    this.curHeight.push(0);
    for (let i = 0; i < this.nFrames; i++) {
        let goal = Math.floor((i + 1) * this.height / this.nFrames);
        this.curHeight.push(goal);
    }
}

/*
 * t: global time
 */
BranchTemplate.prototype.grow = function (t) {
    let relTime = t - this.startTime; // relative time for this growing branch
    if (relTime < 0 || relTime >= this.nFrames) return;

    let x = this.startLoc.x;
    let y = this.startLoc.y;

    this.styleFunction(this);

    for (let i = this.curHeight[relTime]; i < this.curHeight[relTime + 1]; i++) {
        let curWidth = Math.floor(this.startWidth + i / this.height * (this.endWidth - this.startWidth));
        let wrig = this._getWriggle(i);

        if (this.getCanvas() !== undefined) {
            this.getCanvas().ellipse(
                x + i * this.inverseSlope + wrig,
                y - i,
                curWidth, this.ellipseHeight);
        } else {
            ellipse(
                x + i * this.inverseSlope + wrig,
                y - i,
                curWidth, this.ellipseHeight);
        }
    }

    // call onEnd when the branch has stopped growing
    if (relTime == this.nFrames - 1) {
        this.onEnd(this);
    }
}

BranchTemplate.prototype._getWriggle = function (i) {
    return sin((i + this.startPhase) / 10 * this.wriggle) / this.wriggle / Math.sqrt(this.wriggle);
}

BranchTemplate.prototype.getEndLocation = function () {
    let x = this.startLoc.x;
    let y = this.startLoc.y;
    return createVector(
        x + this.height * this.inverseSlope + this._getWriggle(this.height),
        y - this.height);
}

BranchTemplate.prototype.endGlobalTime = function () {
    return this.startTime + this.nFrames;
}

/**
 * 
 * @param {p5.Vector} startLocation starting location for the tree to grow
 * @param {Array} divideProbs divideProbs[iter] means the probability that
 *                            the branch at iteration iter will divide into subbraches
 */
function Tree({
    startLocation,
    divideProbs = [1, 0.7, 0.5],
    dogeImg = null
}) {
    P5Object.call(this);

    this.branches = [];
    this.divideProbs = divideProbs;
    this.dogeImg = dogeImg;

    let trunkStartWidth = 200;

    // make tree trunk
    let trunk = this._makeNewBranch({
        startLoc: startLocation,
        inverseSlope: 0,
        startWidth: trunkStartWidth,
        endWidth: trunkStartWidth * 0.7,
        height: 300,
        startTime: 0,
        nFrames: 180,
        wriggle: 0.3,
        iteration: 0,
        onEnd: (thisBranch) => this.divide(thisBranch)
    });

    this.branches.push(trunk);
}
Object.setPrototypeOf(Tree.prototype, P5Object.prototype);

/**
 * Use this to make new branches in this tree to ensure their canvas is set up properly.
 * 
 * @param {*} props the same thing you will pass into BranchTemplate to initiate a branch.
 * @returns a branch subordinate to this tree 
 *          so that its canvas always refers to this tree's canvas.
 */
Tree.prototype._makeNewBranch = function (props) {
    let br = new BranchTemplate(props);
    const thisTree = this;

    br.getCanvas = function () {
        return thisTree.getCanvas();
    }

    br.setCanvas = function (canvas) {
        throw new Error("I have suppressed setCanvas");
    }

    return br;
}

Tree.prototype._makeNewDoge = function (props) {
    let doge = new Doge(props);
    const thisTree = this;

    doge.getCanvas = function () {
        return thisTree.getCanvas();
    }

    doge.setCanvas = function (canvas) {
        throw new Error("I have suppressed setCanvas");
    }

    return doge;
}

Tree.prototype.grow = function (t) {
    this.branches.forEach(branch => {
        branch.grow(t);
    });
}

Tree.prototype.divide = function (branch) {
    // check whether to divide
    if (branch.iteration >= this.divideProbs.length ||
        Math.random() >= this.divideProbs[branch.iteration]) {
        // do not divide
        if (this.dogeImg) {
            growDoge(branch, this.dogeImg);
        }
        return;
    }

    let startWid = Math.floor(branch.endWidth / 2); // starting width of sub-branch
    let prevEndLoc = branch.getEndLocation();
    let startLoc1 = createVector(Math.floor(prevEndLoc.x - startWid / 2),
        prevEndLoc.y);
    let startLoc2 = createVector(Math.floor(prevEndLoc.x + startWid / 2),
        prevEndLoc.y);

    let angle1 = getRandom(Math.PI / 6, Math.PI / 3); // 30 ~ 60 degrees
    let angle2 = getRandom(Math.PI / 6, Math.PI / 3);
    let slope1 = -Math.tan(angle1);
    let slope2 = Math.tan(angle2);

    let height1 = branch.height * (branch.iteration + 1) / (branch.iteration + 2) * getRandom(0.7, 1);
    let height2 = branch.height * (branch.iteration + 1) / (branch.iteration + 2) * getRandom(0.7, 1);

    let b1 = this._makeNewBranch({
        startLoc: startLoc1,
        inverseSlope: 1 / slope1,
        startWidth: startWid,
        endWidth: startWid * 0.7,
        height: height1,
        startTime: branch.endGlobalTime(),
        nFrames: branch.nFrames,
        wriggle: 0.3,
        iteration: branch.iteration + 1, // next iteration
        styleFunction: branch.styleFunction,
        onEnd: (thisBranch) => this.divide(thisBranch)
    });

    let b2 = this._makeNewBranch({
        startLoc: startLoc2,
        inverseSlope: 1 / slope2,
        startWidth: startWid,
        endWidth: startWid * 0.7,
        height: height2,
        startTime: branch.endGlobalTime(),
        nFrames: branch.nFrames,
        wriggle: 0.3,
        iteration: branch.iteration + 1, // next iteration
        styleFunction: branch.styleFunction,
        onEnd: (thisBranch) => this.divide(thisBranch)
    });

    this.branches.push(b1);
    this.branches.push(b2);
}

function growDoge(branchTemplate, img) {
    let endLoc = branchTemplate.getEndLocation();
    let imageWidth = 100;
    let hwRatio = 1; // (img height) / (img width)

    if (branchTemplate.getCanvas() !== undefined) {
        branchTemplate.getCanvas()
            .image(img,
                endLoc.x - imageWidth / 2,
                endLoc.y - imageWidth * hwRatio + branchTemplate.ellipseHeight / 2,
                100, 100);
    } else {
        image(img,
            endLoc.x - imageWidth / 2,
            endLoc.y - imageWidth * hwRatio + branchTemplate.ellipseHeight / 2,
            100, 100);
    }
}
