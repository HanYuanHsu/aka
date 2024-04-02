function BranchTemplate({
    startLoc,
    startWidth,
    endWidth,
    height,
    startTime,
    nFrames,
    wriggle,
    styleFunction = () => {
        let branchColor = color(125, 79, 9);
        branchColor.setAlpha(20);
	    fill(branchColor);
    },
    onEnd = (endInfo) => {}, 
    startPhase = 0 
}) {
    this.startLoc = startLoc; // p5.Vector for starting location
    this.startWidth = startWidth; // Starting width of the branch
    this.endWidth = endWidth; // Ending width of the branch
    this.startPhase = startPhase; // ...
    this.height = height;
    this.startTime = startTime; // The global time when this branch starts to grow
    this.nFrames = nFrames; // Number of frames for this branch to grow
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
        ellipse(x + sin((i + this.startPhase) / 10 * this.wriggle) / this.wriggle / Math.sqrt(this.wriggle), 
                y - i, 
                curWidth, 20);
    }

    if (t == this.nFrames - 1) {
        let endInfo = {
            endLoc: createVector(
                x + cos(this.nFrames/10*this.wriggle) / this.wriggle, 
                y - this.height),
            endWidth: this.endWidth,
            endGlobalTime: this.startTime + this.nFrames - 1
        };
        this.onEnd(endInfo);
    }
}

BranchTemplate.prototype.getEnd = function() {
	return {
		endLoc: createVector(
			x + cos(this.nFrames/10*this.wriggle) / this.wriggle, 
			y - this.height),
		endWidth: this.endWidth,
		endGlobalTime: this.startTime + this.nFrames
	};
}

function Tree() {
    this.branches = [];
}

Tree.prototype.grow = function(t) {
    this.branches.forEach(branch => {
        branch.grow(t);
    })
}
