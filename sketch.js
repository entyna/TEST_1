let currentPoint = 0;
let particles = [];
let startTime = 0;
let dur = 2000; // in milliseconds
let pg;
let HH, HM, MH, MM, ME, EM, EE, EH, HE;
let dots = []; // Array to store the dots
let dotTimer = 0

let points = [
   [1, 0],
   [1, 1],
   [1, 2],
   [1, 3],
   [1, 4],
   [1, 5]
];

function updatePoints(yaoValues) {
  points[0][0] = yaoValues[0];
  points[1][0] = yaoValues[1];
  points[2][0] = yaoValues[2];
  points[3][0] = yaoValues[3];
  points[4][0] = yaoValues[4];
  points[5][0] = yaoValues[5];
  
  clearCanvas();
}

function clearCanvas() {
  clear();
  background(255);
}

function setup() {
  var canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('sketch-container');
  pg = createGraphics(width, height);
  //background(255);

  // Trigram Fields
  let hMarg = height / 12;
  let hField = height / 6;
  HH = new Field(pg, width * 0.7, width * 0.2, hMarg, hField, 5);
  MH = new Field(pg, width * 0.2, width * 0.2, hMarg + hField, hField, 5);
  HM = new Field(pg, width * 0.6, width * 0.2, hMarg + hField, hField, 5);
  EH = new Field(pg, width * 0.1, width * 0.2, hMarg + 2 * hField, hField, 5);
  HE = new Field(pg, width * 0.2, width * 0.2, hMarg + 2 * hField, hField, 5);
  MM = new Field(pg, width * 0.57, width * 0.2, hMarg + 2 * hField, hField, 5);
  EM = new Field(pg, width * 0.2, width * 0.2, hMarg + 3 * hField, hField, 5);
  ME = new Field(pg, width * 0.6, width * 0.2, hMarg + 3 * hField, hField, 5);
  EE = new Field(pg, width * 0.7, width * 0.2, hMarg + 4 * hField, hField, 5);
}

function draw() {

  // pg Offscreen Buffer:
  pg.background(255);
  pgFields();
  //image(pg, 0, 0);
  
  dotTimer++; // Increment the timer

  if (dotTimer >= 80) { // Check if 20 seconds have passed
    generateDots(); // Generate the dots
    dotTimer = 0; // Reset the timer
  }

  // Display and update the dots
  for (let i = 0; i < dots.length; i++) {
    let dot = dots[i];
    dot.display();
    dot.update();
  }


     // Horizontal lines in pg
  // pg.stroke(0);
  // pg.strokeWeight(1.5)
  // let spacing = height / 6;
  // let marg = height / 12;
  // for (let i = 0; i < 6; i++) {
  //   pg.line(0, marg, width, marg);
  //   marg += spacing;
  // }
     //pgGraph();

  //toggleLine();
  //push();
  //blendMode(DARKEST);
  
  //pop();

  // // Add new particles
  // if (particles.length < 100) {
  //   for (let i = 0; i < 10; i++) {
  //     let p = new Particle();
  //     particles.push(p);
  //   }
  // }
  
  // // Update and display particles
  // for (let i = particles.length - 1; i >= 0; i--) {
  //   let p = particles[i];
  //   p.update();
  //   p.display();
  //   if (p.isFinished()) {
  //     particles.splice(i, 1);
  //   }
  // }
}
function generateDots() {
  dots = []; // Clear the existing dots
  
  // Generate 100 dots within x < width/4
  let dotCount = 0;
  while (dotCount < 600) {
    let dotpos = createVector(random(width / 4), random(height));
    let c = pg.get(floor(dotpos.x), floor(dotpos.y)); // Use get() instead of pg.get()

    if (red(c) === 0 && green(c) === 0 && blue(c) === 0) {
      dots.push(new Dot(dotpos.x, dotpos.y)); // Add dot to the array
      dotCount++;
    }
  }
}

class Dot {
  constructor(x, y) {
    this.pos = createVector(x, y);
  }

  display() {
    fill('black');
    noStroke();
    circle(this.pos.x, this.pos.y, 2);
  }

  update() {
    // Add any desired animation or movement here
  }
}
function pgFields() {
  pg.stroke(0);
  pg.strokeWeight(2);
  pg.fill(points[2][0]*255, 0, points[5][0]*255);
  HH.show();
  pg.fill(points[1][0]*255, 0, points[5][0]*255);
  MH.show();
  pg.fill(points[2][0]*255, 0, points[4][0]*255);
  HM.show();
  pg.fill(points[0][0]*255, 0, points[5][0]*255);
  EH.show();
  pg.fill(points[2][0]*255, 0, points[3][0]*255);
  HE.show();
  pg.fill(points[1][0]*255, 0, points[4][0]*255);
  MM.show();
  pg.fill(points[0][0]*255, 0, points[4][0]*255);
  EM.show();
  pg.fill(points[1][0]*255, 0, points[3][0]*255);
  ME.show();
  pg.fill(points[0][0]*255, 0, points[3][0]*255);
  EE.show();
}
function pgGraph() {

  let xScale = width*0.9;
  let yScale = height/6;
  let xShift = width*0.05;
  let yShift = height/12;
  
  // tady byly bodíky

  // Moving Object
  let nextPoint = (currentPoint + 1) % points.length;
  let distance = dist(points[currentPoint][0], points[currentPoint][1], points[nextPoint][0], points[nextPoint][1]);

  let progress = (millis() - startTime) / dur;
  let objX = lerp(points[currentPoint][0] * xScale + xShift, points[nextPoint][0] * xScale + xShift, progress / distance);
  let objY = lerp(pg.height - points[currentPoint][1] * yScale - yShift, pg.height -
points[nextPoint][1] * yScale - yShift, progress / distance);
  
  if (progress >= distance) {
    currentPoint = nextPoint;
    startTime = millis();
  }

  if (currentPoint === points.length - 1 && objX > pg.width/2) {
    currentPoint = 0;
    startTime = millis();
  }
  
  pg.fill(0, 0, 0);
  pg.circle(objX, objY, 20);
}

function toggleLine() {
  // linky nahoře
  let xScale = width*0.9;
  let yScale = height/6;
  let xShift = width*0.05;
  let yShift = height/12;
  stroke(255);
  strokeWeight(2);
  for (let i = 0; i < points.length - 1; i++) {
    let startX = points[i][0] * xScale + xShift;
    let startY = height - points[i][1] * yScale - yShift;
    let endX = points[i+1][0] * xScale + xShift;
    let endY = height - points[i+1][1] * yScale - yShift;
    line(startX, startY, endX, endY);
  }
}


