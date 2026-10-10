(() => {
  const canvas = document.querySelector('#starfield');
  if (!canvas) return;

  if (new URLSearchParams(window.location.search).has('no-webgl')) {
    document.documentElement.dataset.webgl = 'disabled';
    return;
  }

  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: false,
    depth: false,
    powerPreference: 'low-power',
  });

  const state = {
    ready: false,
    frameCount: 0,
    reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  };
  window.__starfield = state;

  if (!gl) {
    document.documentElement.dataset.webgl = 'unavailable';
    return;
  }

  const vertexSource = `
    attribute vec2 position;
    void main() {
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragmentSource = `
    precision highp float;

    uniform vec2 resolution;
    uniform vec2 pointer;
    uniform float time;

    float hash21(vec2 point) {
      point = fract(point * vec2(123.34, 456.21));
      point += dot(point, point + 45.32);
      return fract(point.x * point.y);
    }

    vec3 starLayer(vec2 uv, float scale, float drift, float seed, float radius) {
      vec2 shifted = uv * scale;
      shifted += vec2(time * drift, time * drift * -0.37);
      shifted += pointer * drift * 2.4;

      vec2 cell = floor(shifted);
      vec2 local = fract(shifted) - 0.5;
      float random = hash21(cell + seed);
      vec2 offset = vec2(
        hash21(cell + seed + 11.7),
        hash21(cell + seed + 37.1)
      ) - 0.5;
      offset *= 0.58;

      float distanceToStar = length(local - offset);
      float exists = step(0.91, random);
      float core = smoothstep(radius, 0.0, distanceToStar) * exists;
      float glow = smoothstep(radius * 3.8, 0.0, distanceToStar) * exists * 0.22;
      float twinkle = 0.72 + 0.28 * sin(time * (1.1 + random * 2.3) + random * 40.0);

      float tint = hash21(cell + seed + 83.2);
      vec3 cyan = vec3(0.18, 0.95, 1.0);
      vec3 pink = vec3(1.0, 0.27, 0.76);
      vec3 warm = vec3(1.0, 0.96, 0.64);
      vec3 color = mix(cyan, pink, smoothstep(0.48, 0.82, tint));
      color = mix(color, warm, smoothstep(0.86, 1.0, tint));

      return color * (core * twinkle + glow);
    }

    void main() {
      vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
      float vignette = 1.0 - smoothstep(0.34, 0.95, length(uv * vec2(0.74, 1.0)));

      vec3 color = vec3(0.005, 0.008, 0.20);
      color += vec3(0.05, 0.0, 0.16) * max(0.0, 0.8 - length(uv - vec2(0.35, 0.15)));
      color += starLayer(uv, 15.0, 0.012, 2.0, 0.035);
      color += starLayer(uv, 25.0, 0.021, 19.0, 0.027);
      color += starLayer(uv, 39.0, 0.036, 47.0, 0.021);
      color += starLayer(uv, 58.0, 0.055, 91.0, 0.016);
      color *= 0.68 + vignette * 0.44;

      gl_FragColor = vec4(color, 1.0);
    }
  `;

  const compileShader = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      throw new Error(gl.getShaderInfoLog(shader) || 'Shader compilation failed');
    }
    return shader;
  };

  try {
    const program = gl.createProgram();
    gl.attachShader(program, compileShader(gl.VERTEX_SHADER, vertexSource));
    gl.attachShader(program, compileShader(gl.FRAGMENT_SHADER, fragmentSource));
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'Shader linking failed');
    }

    const vertices = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertices);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );

    const position = gl.getAttribLocation(program, 'position');
    const resolution = gl.getUniformLocation(program, 'resolution');
    const pointer = gl.getUniformLocation(program, 'pointer');
    const time = gl.getUniformLocation(program, 'time');

    gl.useProgram(program);
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const pointerTarget = {x: 0, y: 0};
    const pointerCurrent = {x: 0, y: 0};
    let animationFrame = 0;
    let startTime = performance.now();

    const resize = () => {
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(window.innerWidth * pixelRatio));
      const height = Math.max(1, Math.floor(window.innerHeight * pixelRatio));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;
        gl.viewport(0, 0, width, height);
      }
    };

    const draw = now => {
      resize();
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.035;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.035;

      const elapsed = state.reducedMotion ? 12.0 : (now - startTime) / 1000;
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointer, pointerCurrent.x, pointerCurrent.y);
      gl.uniform1f(time, elapsed);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      state.frameCount += 1;

      if (!state.reducedMotion && !document.hidden) {
        animationFrame = requestAnimationFrame(draw);
      }
    };

    const restart = () => {
      cancelAnimationFrame(animationFrame);
      if (!document.hidden && !state.reducedMotion) {
        startTime = performance.now() - state.frameCount * 16;
        animationFrame = requestAnimationFrame(draw);
      }
    };

    window.addEventListener('pointermove', event => {
      pointerTarget.x = event.clientX / window.innerWidth - 0.5;
      pointerTarget.y = 0.5 - event.clientY / window.innerHeight;
    }, {passive: true});
    window.addEventListener('resize', () => {
      resize();
      if (state.reducedMotion) draw(0);
    }, {passive: true});
    document.addEventListener('visibilitychange', restart);

    state.ready = true;
    document.documentElement.dataset.webgl = 'ready';
    draw(performance.now());
  } catch (error) {
    console.error('WebGL starfield unavailable:', error);
    document.documentElement.dataset.webgl = 'unavailable';
  }
})();
