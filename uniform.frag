precision mediump float;

varying vec2 vTexCoord;
uniform float my_time;


void main() {

  vec2 uv = vTexCoord;
  float circle = length(uv*2.0 - 1.0);
  float speed = 0.005;
  float slowTime = my_time * speed;
  circle += slowTime;
  circle = fract(circle);

  vec4 color = vec4(circle, circle, circle, 1.0);

  gl_FragColor = color;
}