
// Tasks:
// Resize background

import {Garden} from './garden.js';
let sketch = new p5();
let grass;

function preload() {
    grass = loadImage('assets/grass.png');
}

window.preload = preload;

function setup() {
    let canvas = sketch.createCanvas(1280, 720);
    background('red');
    image(grass, 0, 0);
    canvas.parent('container');
}

window.setup = setup;

function draw() {
let tiles = new Garden();
tiles.drawTiles(14, 9, 60);
}

window.draw = draw;


