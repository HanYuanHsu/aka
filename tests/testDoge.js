//let worldWidth = windowWidth;
//let worldHeight = windowHeight;
let img;
let g;

/**
 * Draws a dog image on a specified createGraphics object.
 * 
 * @param {p5.Graphics} gfx - The createGraphics object where the image will be drawn.
 *                          - has 
 * @param {number} x - The x-coordinate where the image should be placed.
 * @param {number} y - The y-coordinate where the image should be placed.
 * @param {number} w - The width of the image.
 * @param {number} h - The height of the image.
 */
function drawDogImage(gfx, x, y, w, h) {
    gfx.image(dogImg, x, y, w, h);
}

function preload() {
    img = loadImage("https://lh3.googleusercontent.com/drive-viewer/AKGpihbVApBRA6ujGkmcApaoL_z5q4SyZfBNOPJHkNVeGxKYVCV2IB8WB5sSdd0DB4kXagbVGaHAAuXm6wo__IQTqSENw1V5lJlK-A=s1600-rw-v1");
    // if you use images on the local side, you need to set up a server to prevent CORS error
    // I tried http-server downloaded from npm, but it seems to break other functionality of p5.js
    // I also tried base64, and it had some weird issues as well.
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(240);
    g = createGraphics(100, 100);

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


/*
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}*/
