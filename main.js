//let worldWidth = windowWidth;
//let worldHeight = windowHeight;
let img;
let g;

function preload() {
    img = loadImage('assets/doge.png');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);
    g = createGraphics(windowWidth, windowHeight);
    g.clear(); // transparent background

    console.log('Canvas size:', windowWidth, windowHeight); // Log canvas size
}

function draw() {
    background(240);
    g.clear();


    if (img) {
        console.log('Image size:', img.width, img.height); // Log original image size
    }

    g.image(img, 0, 0, 100, 100);
    image(g, 0, 0);
}



function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
