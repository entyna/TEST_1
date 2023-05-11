class Field {
  constructor(pg, xpos, xoff, ypos, yoff, grain) {
    this.pg = pg;
    this.xpos = xpos;
    this.xoff = xoff;
    this.ypos = ypos;
    this.yoff = yoff;
    this.grain = grain;
  }
  
  show() {
    this.pg.beginShape();
    this.pg.vertex(this.xpos, this.ypos);
    
    for (let y = this.ypos; y <= this.ypos + this.yoff; y += this.grain) {
      let x = map(noise(y * 0.02, frameCount * 0.001), 0, 1, this.xpos - this.xoff, this.xpos + this.xoff);
      this.pg.vertex(x, y);
    }
    
    this.pg.vertex(this.xpos, this.ypos + this.yoff);
    this.pg.vertex(width - this.xpos, this.ypos + this.yoff);
    
    for (let y = this.ypos + this.yoff; y >= this.ypos; y -= this.grain) {
      let x = map(noise(y * 0.02, frameCount * 0.001), 0, 1, (width - this.xpos) - this.xoff, (width - this.xpos) + this.xoff);
      this.pg.vertex(x, y);
    }
    
    this.pg.vertex(width - this.xpos, this.ypos);
    this.pg.endShape(CLOSE);
  }
}