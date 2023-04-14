let xoff = 0;

function setup() {
  createCanvas(400, 400);
  pixelDensity(1);
}

function draw() {
  background(255);
  loadPixels();

  // loop through every pixel in the canvas
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {

      // calculate a noise value for this pixel using Perlin noise
      let noiseVal = noise(xoff + x * 0.01, y * 0.01);

      // set the pixel color based on the noise value
      let pixelIndex = (x + y * width) * 4;
      if (noiseVal < 0.5) {
        pixels[pixelIndex] = 0; // red
        pixels[pixelIndex + 1] = 0; // green
        pixels[pixelIndex + 2] = 0; // blue
        pixels[pixelIndex + 3] = 255; // alpha
      } else {
        pixels[pixelIndex] = 255; // red
        pixels[pixelIndex + 1] = 255; // green
        pixels[pixelIndex + 2] = 255; // blue
        pixels[pixelIndex + 3] = 255; // alpha
      }
    }
  }

  updatePixels();

  // move the noise pattern to the right
  xoff += 0.01;
}
