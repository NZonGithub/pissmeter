let socket = io();

let pissMl = 0;
let pissT = 0;
let pissPersistence = 10000;

let g = null;

socket.on("piss", amt => {
    pissMl = amt;
    pissT = Date.now();
    console.log("Update");
});

socket.on('reconnect', function () {
    location.reload();
});

function setup() {
    createCanvas(windowWidth, windowHeight);
    g = createGraphics(windowWidth, windowHeight);
    g.textAlign(CENTER);
    g.textSize(windowWidth*0.2);
    g.strokeWeight(windowHeight*0.01);
    createCupCoords();
}

function draw() {
    clear();
    g.clear();


    g.push();

    g.translate(g.width*.5, g.height*.75);
    g.scale(g.height*.2);
    
    g.noStroke();
    g.fill(255, 191, 0);
    cupContent(g);

    g.strokeCap(PROJECT);
    g.strokeWeight(0.02);
    g.stroke(0);
    cup(g);

    g.pop();
    
    g.fill(255);
    g.stroke(0);
    g.text(pissMl.toFixed(2) + " L", width*.5, height*.75);

    let date = Date.now();
    
    let deltaPiss = Math.max(Math.min(1 - (date - pissT) / pissPersistence, 1), 0);
    console.log("DeltaPiss: " + deltaPiss);

    tint(255, deltaPiss*255);

    // Draw graphics on screen
    image(g, 0, 0, width, height);

}

let cTopLeft;
let cTopRight;
let cBottomLeft;
let cBottomRight;

let res = 99;

function createCupCoords() {
    cTopLeft = createVector(-.6, -1);
    cTopRight = createVector(.6, -1);
    cBottomLeft = createVector(-.4, 1);
    cBottomRight = createVector(.4, 1);
}

function cup(g) {
    g.beginShape();

    // Outer
    // g.vertex(cBottomLeft.x-.05, cBottomLeft.y+0.05);
    // g.vertex(cTopLeft.x-0.05, cTopLeft.y);

    // Inner
    g.vertex(cTopLeft.x, cTopLeft.y);
    g.vertex(cBottomLeft.x, cBottomLeft.y);
    g.vertex(cBottomRight.x, cBottomRight.y);
    g.vertex(cTopRight.x, cTopRight.y);

    // g.vertex(cTopRight.x+0.05, cTopRight.y);
    // g.vertex(cBottomRight.x+0.05, cBottomRight.y+0.05);

    // g.endShape(CLOSE);
    g.endShape();
}

function cupContent(g) {
    g.beginShape();
    g.vertex(cBottomLeft.x, cBottomLeft.y);
    // g.vertex(cTopLeft.x, cTopLeft.y);

    let bottom, top, loc;

    for (let inc = 1/res, i = 0; i <= 1; i+=inc) {
        bottom = p5.Vector.lerp(cBottomLeft, cBottomRight, i);
        top = p5.Vector.lerp(cTopLeft, cTopRight, i);

        let off = 1-Math.abs((i-.5)*2);

        loc = p5.Vector.lerp(bottom, top, 0.8 + Math.sin(i*6*Math.PI + Date.now()/250)*off*0.05);
        g.vertex(loc.x, loc.y);
    }

    // g.vertex(cTopRight.x, cTopRight.y);
    g.vertex(cBottomRight.x, cBottomRight.y);
    g.endShape(CLOSE);
}