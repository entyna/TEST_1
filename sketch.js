let texcoordShader;
let pg0;
let pg1;

function preload(){
  texcoordShader = loadShader('shader.vert', 'shader.frag');
}

function setup() {
  frameRate(24);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  pg0 = createGraphics(width, height, WEBGL);
  pg1 = createGraphics(width, height);
  pg0.pixelDensity(1);
  pg1.noStroke();
}

function draw() {  
  translate(-width / 2, -height / 2);
  drawPG0();
  image(pg0, 0, 0);
  drawPG1();
  blendMode(BLEND);
  image(pg1, 0, 0);
  blendMode(BLEND);

}

function drawPG0(){
  pg0.shader(texcoordShader);
  texcoordShader.setUniform('u_resolution', [width, height]);
  texcoordShader.setUniform('u_time', millis() / 500);
  pg0.rect(0,0,width, height);
}

function drawPG1(){
  //fill('red');
  let d = 200;
  let gradient = pg1.drawingContext.createRadialGradient(width/2, height/2+30, 0, width/2, height/2+30, d/2)
    gradient.addColorStop(0, 'white');
    gradient.addColorStop(0.5, 'rgb(86,85,85)');
    gradient.addColorStop(1, 'black');
  pg1.drawingContext.fillStyle = gradient;
  blendMode(ADD);
  pg1.circle(width/2, height/2+30, d);
  blendMode(BLEND);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}