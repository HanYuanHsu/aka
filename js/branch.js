function BranchTemplate({
    startLoc,
    startWidth,
    endWidth,
    height,
    startTime,
    nFrames,
    wriggle,
    inverseSlope = 0,
    styleFunction = () => {
        let branchColor = color(125, 79, 9);
        branchColor.setAlpha(20);
	    fill(branchColor);
    },
    onEnd = (thisBranch) => {}, 
    startPhase = 0 
}) {
    this.startLoc = startLoc; // p5.Vector for starting location
    this.startWidth = startWidth; // Starting width of the branch
    this.endWidth = endWidth; // Ending width of the branch
    this.startPhase = startPhase; // ...
    this.height = height;
    this.startTime = startTime; // The global time when this branch starts to grow
    this.nFrames = nFrames; // Number of frames for this branch to grow
    this.inverseSlope = inverseSlope; // the inverse slope of the growing direction
    this.wriggle = wriggle;
    this.styleFunction = styleFunction; // for the color, alpha, ... of the branch
    this.onEnd = onEnd; // callback function when the branch has ended growing.
                        // it takes in endInfo, a dictionary containing the info
                        // about the end of the branch, such as 
                        // its end location, end width, etc.
	
	this.curHeight = []; // ...
	this._initCurHeight();
}

/**
 * change this ... 
 * initializes growArray so that
 * growArray[i] is the number of ellipses to draw at frame i
 */
BranchTemplate.prototype._initCurHeight = function() {
    this.curHeight.push(0);
    for (let i=0; i<this.nFrames; i++) {
        let goal = Math.floor((i+1) * this.height / this.nFrames);
		this.curHeight.push(goal);
	}
}

/*
 * t: global time
 */
BranchTemplate.prototype.grow = function(t) {
    let relTime = t - this.startTime; // relative time for this growing branch
    if (relTime < 0 || relTime >= this.nFrames) return;
	
	let x = this.startLoc.x;
	let y = this.startLoc.y;
    
    this.styleFunction();

    for (let i=this.curHeight[relTime]; i<this.curHeight[relTime + 1]; i++) {
        let curWidth = Math.floor(this.startWidth + i / this.height * (this.endWidth - this.startWidth));
        let wrig = this._getWriggle(i);
        ellipse(x + i * this.inverseSlope + wrig, 
                y - i, 
                curWidth, 20);
    }

    if (relTime == this.nFrames - 1) {
        this.onEnd(this);
    }
}

BranchTemplate.prototype._getWriggle = function(i) {
    return sin((i + this.startPhase) / 10 * this.wriggle) / this.wriggle / Math.sqrt(this.wriggle);
}

BranchTemplate.prototype.getEndLocation = function() {
    let x = this.startLoc.x;
	let y = this.startLoc.y;
    return createVector(x + this.height * this.inverseSlope + this._getWriggle(this.height),
                        y - this.height);
}

BranchTemplate.prototype.endGlobalTime = function() {
    return this.startTime + this.nFrames;
}

/*
BranchTemplate.prototype.getEnd = function() {
	return {
		endLoc: createVector(
			x + cos(this.nFrames/10*this.wriggle) / this.wriggle, 
			y - this.height),
		endWidth: this.endWidth,
		endGlobalTime: this.startTime + this.nFrames
	};
}*/

function Tree() {
    this.branches = [];

    let trunkStartWidth = 200;
    this.branches.push(new BranchTemplate({
        startLoc: createVector(windowWidth/2, windowHeight),
        inverseSlope: 0,
        startWidth: trunkStartWidth,
        endWidth: trunkStartWidth * 0.7,
        height: 300,
        startTime: 0,
        nFrames: 180,
        wriggle: 0.3,
        onEnd: (thisBranch) => this.divide(thisBranch)
    }));
}

Tree.prototype.grow = function(t) {
    this.branches.forEach(branch => {
        branch.grow(t);
    });
}

Tree.prototype.divide = function(branch) {
    let startWid = Math.floor(branch.endWidth / 2 + 1); // starting width of sub-branch
    let prevEndLoc = branch.getEndLocation();
    let startLoc1 = createVector(Math.floor(prevEndLoc.x - startWid/2),
                                 prevEndLoc.y);
    let startLoc2 = createVector(Math.floor(prevEndLoc.x + startWid/2),
                                 prevEndLoc.y);                     

    let b1 = new BranchTemplate({
        startLoc: startLoc1,
        inverseSlope: -1,
        startWidth: startWid,
        endWidth: startWid * 0.7,
        height: branch.height * 0.6,
        startTime: branch.endGlobalTime(),
        nFrames: branch.nFrames,
        wriggle: 0.3,
        onEnd: (thisBranch) => this.divide(thisBranch)
    });

    let b2 = new BranchTemplate({
        startLoc: startLoc2,
        inverseSlope: 1,
        startWidth: startWid,
        endWidth: startWid * 0.7,
        height: branch.height * 0.6,
        startTime: branch.endGlobalTime(),
        nFrames: branch.nFrames,
        wriggle: 0.3,
        onEnd: (thisBranch) => this.divide(thisBranch)
    });

    this.branches.push(b1);
    this.branches.push(b2);
}
