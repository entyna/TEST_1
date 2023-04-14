#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float rand(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898,78.233))) * 43758.5453);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);

  float a = rand(i);
  float b = rand(i + vec2(1.0, 0.0));
  float c = rand(i + vec2(0.0, 1.0));
  float d = rand(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  return mix(a, b, u.x) +
         (c - a)* u.y * (1.0 - u.x) +
         (d - b) * u.x * u.y;
}

void main() {
  vec2 st = gl_FragCoord.xy/u_resolution.xy;
  st.y = 1.0 - st.y; // Invert the y-coordinate
  st *= 5.0; // Scale the coordinates
  st += vec2(u_time*0.1); // Add time-based animation here
  float n = 0.0;
  float f = 1.0;
  for (int i = 0; i < 8; i++) {
    n += f * noise(st);
    st *= 2.0;
    f *= 0.5;
  }

  gl_FragColor = vec4(vec3(n), 1.0); // Set red, green, and blue to n, and set alpha to 1.0
}
