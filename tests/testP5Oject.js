let a = P5Object();
console.log("a:");
// should have error message
console.log(`\tdefault canvas: ${P5Object.getDefaultCanvas()}`);
console.log(`\tcanvas: ${a.getCanvas()}`);

P5Object.setDefaultCanvas(1);
let b = P5Object();
console.log("b:");
console.log(`\tdefault canvas: ${P5Object.getDefaultCanvas()}`);
console.log(`\tcanvas: ${b.getCanvas()}`);
console.log("setting b's canvas to 2...");
b.setCanvas(2);
console.log(`\tdefault canvas: ${P5Object.getDefaultCanvas()}`);
console.log(`\tcanvas: ${b.getCanvas()}`);


