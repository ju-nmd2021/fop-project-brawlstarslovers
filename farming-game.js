let grass;

function preload() {
    grass = loadImage('assets/grass.png');
}
function setup() {
    let canvas = createCanvas(1280, 720);
    background('red');
    image(grass, 0, 0);
    canvas.parent('container');
}
