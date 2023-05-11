class Particle {
  constructor() {
    // Check if initial position is in black area
    let isInBlack = false;
    while (!isInBlack) {
      this.pos = createVector(random(width), random(height));
      this.history = [];
      let c = pg.get(floor(this.pos.x), floor(this.pos.y));
      let r = red(c);
      let g = green(c);
      let b = blue(c);
      if (r === 255 && g === 255 && b === 0) {
        isInBlack = true;
        
      }
    }
    
    this.vel = createVector();
    this.acc = createVector();
    this.maxSpeed = 2;
    this.color = color(0);
    this.lifeSpan = random(50, 200);
    this.size = random(0.5, 2);
    //this.opacity = 255;
    this.isStopped = false;
  }

  update() {
    let c = pg.get(floor(this.pos.x), floor(this.pos.y));
    
    this.acc = p5.Vector.fromAngle(noise(this.pos.x * 0.01, this.pos.y * 0.01) * -PI)
                          .mult(0.7);
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    
    for (var i = 0; i < this.history.length; i++) {
      this.history[i].x += random(-0.6, 0.6);
      //this.history[i].y += random(-2, 2);
    }
    
    let v = createVector(this.pos.x, this.pos.y); 
    this.history.push(v);
    if (this.history.length > 30) {
      this.history.splice(0, 1);
    }
    
    //this.lifeSpan -= 1;
    //this.opacity = map(this.lifeSpan, 0, 200, 0, 255);
  }

  display() {
    let c = pg.get(floor(this.pos.x), floor(this.pos.y));
    for (let i = 0; i < this.history.length; i++) {
      let hpos = this.history[i];
      fill(0, 0, 0);
      ellipse(hpos.x, hpos.y, width/8, 1);
    }
    noStroke();
    //this.color.setAlpha(this.opacity);
    fill(this.color);
    ellipse(this.pos.x, this.pos.y, this.size);
      
  }

  isFinished() {
  return this.lifeSpan <= 0 || this.pos.x < -width/2 || this.pos.x > width * 1.5||     this.pos.y < -height/2 || this.pos.y > height * 1.5;
  }
}