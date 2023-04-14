precision lowp float;

uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st += vec2(u_time*0.1); // Add time-based animation here
    float n = random(st);

    gl_FragColor = vec4(vec3(n), 1.0); // Set red, green, and blue to n
}