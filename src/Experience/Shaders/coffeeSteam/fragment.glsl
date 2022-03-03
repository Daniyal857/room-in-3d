
#pragma glslify: perlin2d = require('../partials/perlin2d.glsl')

varying vec2 vUv;

void main() {
  float perlin = perlin2d(vUv);
  gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0, perlin);
  

}
