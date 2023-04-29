let currentPoint = 0;
let particles = [];
let startTime = 0;
let dur = 2000; // in milliseconds
let pg;

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
  createCanvas(windowWidth, windowHeight); 
  pg = createGraphics(width, height);
  //background('aqua');
  background(255);
}

function draw() {

  pg.background(255);
  
  pgRectangles();
  pg.stroke(0);
  pg.strokeWeight(1.5)
  let spacing = height / 6;
  let marg = height / 12;
  for (let i = 0; i < 6; i++) {
    pg.line(0, marg, width, marg);
    marg += spacing;
  }

  pgGraph();
//  for (i = 0; i < 5; i++) {
//    x = random(width);
//    y = random(height);
//    size = random(5,20);
//    pg.circle(x, y, size);
//  }
  
  //image(pg, 0, 0);
  lines();

  // Add new particles
  if (particles.length < 100) {
    for (let i = 0; i < 10; i++) {
      let p = new Particle();
      particles.push(p);
    }
  }
  
  // Update and display particles
  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    p.update();
    p.display();
    if (p.isFinished()) {
      particles.splice(i, 1);
    }
  }
}

function pgRectangles() {
  let hRect = pg.height/6;
  let marg = pg.height/12
  pg.push();
  pg.noStroke();
  pg.blendMode(MULTIPLY);
  pg.fill(50);
  
  if (points[0][0] == 0) {
    pg.rect(0, marg+hRect*4, pg.width, hRect);
    pg.rect(0, marg+hRect*3, pg.width/2, hRect);
    pg.rect(0, marg+hRect*2, pg.width/3, hRect);
  }
  if (points[1][0] == 0) {
    pg.rect(0, marg+hRect, pg.width/2, hRect);
    pg.rect(pg.width/1.5, marg+hRect*2, pg.width/3, hRect);
    pg.rect(pg.width/2, marg+hRect*3, pg.width/2, hRect);
  }
  if (points[2][0] == 0) {
    pg.rect(0, marg, pg.width, hRect);
    pg.rect(pg.width/2, marg+hRect, pg.width/2, hRect);
    pg.rect(pg.width/3, marg+hRect*2, pg.width/3, hRect);
  }
  pg.fill(100);
  if (points[3][0] == 0) {
    pg.rect(0, marg+hRect*4, pg.width, hRect);
    pg.rect(pg.width/2, marg+hRect*3, pg.width/2, hRect);
    pg.rect(pg.width/3, marg+hRect*2, pg.width/3, hRect);
  }
  if (points[4][0] == 0) {
    pg.rect(0, marg+hRect*3, pg.width/2, hRect);
    pg.rect(pg.width/1.5, marg+hRect*2, pg.width/3, hRect);
    pg.rect(pg.width/2, marg+hRect, pg.width/2, hRect);
  }
  if (points[5][0] == 0) {
    pg.rect(0, marg+hRect*2, pg.width/3, hRect);
    pg.rect(0, marg+hRect, pg.width/2, hRect);
    pg.rect(0, marg, pg.width, hRect);
  }
  pg.pop();
  
}

function pgGraph() {
  //pg.background(220);
  //pg.clear();
  //pg.stroke(0);
  //pg.line(width/2, 0, width/2, height);

  let xScale = width*0.9;
  let yScale = height/6;
  let xShift = width*0.05;
  let yShift = height/12;
  
  //tady byly bodíky

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

function lines() {
  // draw lines connecting the points
  let xScale = width*0.9;
  let yScale = height/6;
  let xShift = width*0.05;
  let yShift = height/12;
  stroke(0);
  strokeWeight(2);
  for (let i = 0; i < points.length - 1; i++) {
    let startX = points[i][0] * xScale + xShift;
    let startY = height - points[i][1] * yScale - yShift;
    let endX = points[i+1][0] * xScale + xShift;
    let endY = height - points[i+1][1] * yScale - yShift;
    line(startX, startY, endX, endY);
  }
}
class Particle {
  constructor() {
    // Check if initial position is in black area
    let isInBlack = false;
    while (!isInBlack) {
      this.pos = createVector(random(width), random(height));
      let c = pg.get(floor(this.pos.x), floor(this.pos.y));
      let r = red(c);
      let g = green(c);
      let b = blue(c);
      if (r === 0 && g === 0 && b === 0) {
        isInBlack = true;
      }
    }
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 2;
    this.yinSpeed = 0.7;
    //let colors = [0, 0, 255]
    this.color = color(0);
    this.lifeSpan = random(50, 200);
    this.size = random(0.5, 2);
    this.opacity = 255;
    this.isStopped = false;
  }

  update() {
    let c = pg.get(floor(this.pos.x), floor(this.pos.y));
    
    if (red(c) == 0 && green(c) == 0 && blue(c) == 0) {
      // Move randomly in black areas
      this.acc = p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * TWO_PI)
                        .mult(0.2);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      
    } else if (red(c) == 20 && green(c) == 20 && blue(c) == 20) {
      // Move slowly and chaoticly in dark areas
      this.acc = p5.Vector.fromAngle(random(this.pos.x * 0.05, this.pos.y * 0.05) * TWO_PI)
                        .mult(0.2);
      this.vel.add(this.acc);
      this.vel.limit(this.yinSpeed);
      this.pos.add(this.vel);
      
    } else if (red(c) == 50 && green(c) == 50 && blue(c) == 50) {
      // Flow upwards in gray areas
      this.acc = createVector(0, 0.1);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.isStopped = true;
      
    } else if (red(c) == 100 && green(c) == 100 && blue(c) == 100) {
      // Flow downwards in white areas
      this.acc = createVector(0, -0.1);
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      this.pos.add(this.vel);
      this.isStopped = true;
      
    } else {
      // Stop moving in white areas
      this.isStopped = true;
    }
    
    this.lifeSpan -= 1;
    this.opacity = map(this.lifeSpan, 0, 200, 0, 255);
  }

  display() {
    let c = pg.get(floor(this.pos.x), floor(this.pos.y));
    
    if (red(c) == 0 && green(c) == 0 && blue(c) == 0) {
      noStroke();
      this.color.setAlpha(this.opacity);
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.size);
      
    } else if (red(c) == 20 && green(c) == 20 && blue(c) == 20) {
      noStroke();
      this.color.setAlpha(this.opacity);
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.size);
      
    } else if (red(c) == 50 && green(c) == 50 && blue(c) == 50) {
      noStroke();
      this.color.setAlpha(this.opacity);
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.size);
      
    } else if (red(c) == 50 && green(c) == 100 && blue(c) == 100) {
      noStroke();
      this.color.setAlpha(this.opacity);
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.size);
      
    } else {
      noStroke();
      this.color.setAlpha(this.opacity);
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.size);
    }
  }

  isFinished() {
  return this.lifeSpan <= 0 || this.pos.x < 0 || this.pos.x > width ||     this.pos.y < 0 || this.pos.y > height;
  }
}

