let t, x, y, trunkWidth, b, bArray;

function BranchTemplate({
    startLoc,
    startWidth,
    endWidth,
    height,
    startTime,
    nFrames,
    wriggle,
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
	
		this.growArray = [];
	  _initGrowArray();
}

/**
 * initializes growArray so that
 * growArray[i] is the number of ellipses to draw at frame i
 */
BranchTemplate.prototype._initGrowArray = function() {
	let nGrow = Math.floor(this.height / this.nFrames);
	for (let i=0; i<this.nFrames; i++) {
		this.growArray.push(nGrow);
	}
	let remaining = this.height - this.nFrames * nGrow;
	for(let i=0; i<remaining; i++) {
		let idx = Math.floor(Math.random() * this.nFrames);
		this.growArray[idx]++;
	}
}

function Branches(branchArray) {
	this.branchArray = branchArray;
}

function setup() {
	noStroke();
	createCanvas(windowWidth, windowHeight);
	background(240);
	x = windowWidth/2;
	y = windowHeight - 50;
	trunkWidth = 70;
	t = 0;
	
	b = new BranchTemplate({
    startLoc: createVector(windowWidth/2, windowHeight - 20),
    startWidth: 100,
    endWidth: 50,
    height: 400,
    startTime: 0,
    nFrames: 240,
    wriggle: 0.3
	});
	
	c = new BranchTemplate({
    startLoc: createVector(windowWidth/2 + 100, windowHeight - 10),
    startWidth: 50,
    endWidth: 10,
    height: 400,
    startTime: 240,
    nFrames: 240,
    wriggle: 0.4
	});
	
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
	}
}

/*
 * t: global time
 */
BranchTemplate.prototype.grow = function(t) {
	if (t < this.startTime || t > this.startTime + this.nFrames) return;
	
	let x = this.startLoc.x;
	let y = this.startLoc.y;
	let relTime = t - this.startTime; // relative time for this growing branch
	let curWidth = (this.startWidth * (this.nFrames - relTime) + this.endWidth * relTime) / this.nFrames;
	fill('brown');
	for (let i=0; i<this.growArray[relTime]; i++) {
			ellipse(x + cos(relTime/10*this.wriggle) / this.wriggle, 
							y - this.height * relTime / this.nFrames, 
							curWidth, 20);
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

function draw() {
	b.grow(t);
	c.grow(t);
	t += 1;
	//stroke('brown');
	//strokeWeight(100);
	//line(windowWidth/2, windowHeight, windowWidth/3, 0);
}

