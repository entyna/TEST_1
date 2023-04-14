let texcoordShader;
let uniShader;
let pg0;
let pg1;

function preload(){
  texcoordShader = loadShader('shader.vert', 'shader.frag');
  uniShader = loadShader('uniform.vert', 'uniform.frag');
}

function setup() {
  frameRate(24);
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  pg0 = createGraphics(width, height, WEBGL);
  pg1 = createGraphics(width, height, WEBGL);
  pg0.pixelDensity(1);
  pg1.noStroke();
}

function draw() {  
  translate(-width / 2, -height / 2);
  drawPG0();
  image(pg0, 0, 0);
  drawPG1();
  blendMode(SUBTRACT);
  image(pg1, 0, 0);
  blendMode(BLEND);


}

function drawPG0(){
  pg0.shader(texcoordShader);
  texcoordShader.setUniform('u_resolution', [width, height]);
  texcoordShader.setUniform('u_time', millis() / 1000);
  pg0.rect(0,0,width, height);
}

function drawPG1(){
  pg1.shader(uniShader);
  uniShader.setUniform('my_time', frameCount);
  pg1.rect(0,0,width, height);
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}