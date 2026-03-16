<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

const containerRef = ref(null);
let cleanup = null;

onMounted(async () => {
  const THREE = await import('three');

  const container = containerRef.value;
  if (!container) return;

  const w = container.offsetWidth;
  const h = container.offsetHeight;

  // Scene
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, w / h, 0.1, 100);
  // Angled view looking down at the plane — matching runreal's rotation-x ~PI/2.5, rotation-z ~PI/6
  camera.position.set(0, 6, 10);
  camera.lookAt(0, 0.5, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(w, h);
  renderer.setClearColor(0x1c1c1e, 1);
  container.appendChild(renderer.domElement);


  // Grid of points on a flat plane
  const COLS = 220;
  const ROWS = 120;
  const TOTAL = COLS * ROWS;
  const PLANE_W = 20;
  const PLANE_H = 12;

  const positions = new Float32Array(TOTAL * 3);
  const basePositions = new Float32Array(TOTAL * 3); // store original XZ
  const colors = new Float32Array(TOTAL * 3);
  const sizes = new Float32Array(TOTAL);

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      const i = row * COLS + col;
      const i3 = i * 3;
      const x = (col / (COLS - 1) - 0.5) * PLANE_W;
      const z = (row / (ROWS - 1) - 0.5) * PLANE_H;
      positions[i3] = x;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = z;
      basePositions[i3] = x;
      basePositions[i3 + 1] = 0;
      basePositions[i3 + 2] = z;
      sizes[i] = 1.0;
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geom.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.ShaderMaterial({
    vertexShader: `
      attribute float size;
      attribute vec3 color;
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        vColor = color;
        vec4 mvPos = modelViewMatrix * vec4(position, 1.0);
        // Size attenuation
        gl_PointSize = size * (180.0 / -mvPos.z);
        gl_PointSize = max(gl_PointSize, 0.5);
        gl_Position = projectionMatrix * mvPos;
        // Fade distant points
        float dist = length(position.xz);
        vAlpha = smoothstep(12.0, 5.0, dist);
      }
    `,
    fragmentShader: `
      varying vec3 vColor;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float alpha = step(d, 0.45) * vAlpha;
        gl_FragColor = vec4(vColor, alpha);
      }
    `,
    transparent: true,
    depthWrite: false,
  });

  const points = new THREE.Points(geom, mat);
  // Shift plane up so dots sit behind the title area, not the buttons
  // Tilt slightly on Z axis like runreal
  points.position.y = 1.2;
  points.rotation.z = Math.PI / 12; // ~15 degrees
  scene.add(points);

  // Perlin noise
  const perm = new Uint8Array(512);
  {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [p[i], p[j]] = [p[j], p[i]];
    }
    for (let i = 0; i < 512; i++) perm[i] = p[i & 255];
  }

  function fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
  function lrp(a, b, t) { return a + t * (b - a); }
  function grad(hash, x, y) {
    const h = hash & 3;
    return ((h & 1) ? -x : x) + ((h & 2) ? -y : y);
  }

  function noise2D(x, y) {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    const xf = x - Math.floor(x), yf = y - Math.floor(y);
    const u = fade(xf), v = fade(yf);
    return lrp(
      lrp(grad(perm[perm[X] + Y], xf, yf), grad(perm[perm[X + 1] + Y], xf - 1, yf), u),
      lrp(grad(perm[perm[X] + Y + 1], xf, yf - 1), grad(perm[perm[X + 1] + Y + 1], xf - 1, yf - 1), u),
      v
    );
  }

  // Fractal noise (octaves) — matching runreal's mx_fractal_noise
  function fbm(x, y, octaves, lacunarity, gain) {
    let value = 0, amp = 1, freq = 1, max = 0;
    for (let i = 0; i < octaves; i++) {
      value += noise2D(x * freq, y * freq) * amp;
      max += amp;
      amp *= gain;
      freq *= lacunarity;
    }
    return value / max;
  }

  // Mouse interaction
  const pointer = { x: 0, y: 0 };
  const raycaster = new THREE.Raycaster();
  const rayPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  const mouseWorld = new THREE.Vector3(999, 0, 999);
  const mouseTarget = new THREE.Vector3(999, 0, 999);
  let mouseDown = false;

  // Ripple system for click disturbance
  const ripples = [];

  function onPointerMove(e) {
    const rect = container.getBoundingClientRect();
    pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
  }

  function onPointerDown() {
    mouseDown = true;
    // Spawn a ripple at current mouse position
    ripples.push({ x: mouseWorld.x, z: mouseWorld.z, time: 0, strength: 1.5 });
  }

  function onPointerUp() {
    mouseDown = false;
  }

  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointerup', onPointerUp);

  // Animation
  const clock = new THREE.Clock();
  let animId;

  // Noise params — from the extracted runreal shader
  const noiseScale = 0.3;
  const amplitude = 1.8;
  const hSpeed = 0.14;
  const vSpeed = 0.06;
  const noise2Scale = 2.0;
  const noise2Amp = 0.2;

  // #28D466 — solid at center, fades to very dim at edges
  const baseColor = new THREE.Color(0x28D466);
  const dimColor = new THREE.Color(0x0a2e14);

  function animate() {
    animId = requestAnimationFrame(animate);
    const dt = Math.min(clock.getDelta(), 0.05);
    const elapsed = clock.getElapsedTime();

    // Update mouse world position
    const pointerVec = new THREE.Vector2(pointer.x, pointer.y);
    raycaster.setFromCamera(pointerVec, camera);
    const hit = new THREE.Vector3();
    if (raycaster.ray.intersectPlane(rayPlane, hit)) {
      mouseTarget.copy(hit);
    }
    mouseWorld.lerp(mouseTarget, 0.1);

    // Update ripples
    for (let r = ripples.length - 1; r >= 0; r--) {
      ripples[r].time += dt;
      if (ripples[r].time > 3) ripples.splice(r, 1);
    }

    // Update each point — matching the runreal vertex shader
    for (let row = 0; row < ROWS; row++) {
      for (let col = 0; col < COLS; col++) {
        const i = row * COLS + col;
        const i3 = i * 3;
        const bx = basePositions[i3];
        const bz = basePositions[i3 + 2];

        // Primary wave noise (ocean-like undulation)
        const n1 = fbm(
          bx * noiseScale - elapsed * hSpeed,
          bz * noiseScale + elapsed * vSpeed,
          3, 2.0, 0.5
        ) * amplitude;

        // Secondary detail noise
        const n2 = fbm(
          bx * noise2Scale - elapsed * hSpeed,
          bz * noise2Scale + elapsed * vSpeed,
          2, 2.0, 0.5
        ) * noise2Amp;

        let height = n1 - n2;

        // Clamp below zero like runreal: newPosition.z = min(0.0, newPosition.z)
        height = Math.min(0, height);

        // Mouse hover disturbance — push dots down near cursor
        const mdx = bx - mouseWorld.x;
        const mdz = bz - mouseWorld.z;
        const mouseDist = Math.sqrt(mdx * mdx + mdz * mdz);
        const mouseInfluence = Math.max(0, 1 - mouseDist / 2.5);
        if (mouseInfluence > 0) {
          height -= mouseInfluence * mouseInfluence * 1.2;
        }

        // Click ripples
        for (let r = 0; r < ripples.length; r++) {
          const rip = ripples[r];
          const rdx = bx - rip.x;
          const rdz = bz - rip.z;
          const rDist = Math.sqrt(rdx * rdx + rdz * rdz);
          const rippleRadius = rip.time * 4;
          const rippleWidth = 1.5;
          const rippleEffect = Math.exp(-((rDist - rippleRadius) ** 2) / rippleWidth);
          const rippleDecay = Math.exp(-rip.time * 1.5);
          height -= rippleEffect * rip.strength * rippleDecay * Math.sin(rDist * 3 - rip.time * 8);
        }

        // Continuous press disturbance
        if (mouseDown && mouseInfluence > 0) {
          height -= mouseInfluence * 0.8 * Math.sin(elapsed * 6 + mouseDist * 4);
        }

        positions[i3 + 1] = height;

        // All dots same size — half of previous
        sizes[i] = 0.28;

        // Edge fade for color only — bright center, dim edges
        const distFromCenter = Math.sqrt(bx * bx + bz * bz);
        const edgeFade = Math.pow(Math.max(0, 1 - distFromCenter / 10), 1.8);

        colors[i3] = lrp(dimColor.r, baseColor.r, edgeFade);
        colors[i3 + 1] = lrp(dimColor.g, baseColor.g, edgeFade);
        colors[i3 + 2] = lrp(dimColor.b, baseColor.b, edgeFade);
      }
    }

    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
    geom.attributes.size.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();

  function onResize() {
    const nw = container.offsetWidth;
    const nh = container.offsetHeight;
    camera.aspect = nw / nh;
    camera.updateProjectionMatrix();
    renderer.setSize(nw, nh);
  }
  window.addEventListener('resize', onResize);

  cleanup = () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('pointermove', onPointerMove);
    window.removeEventListener('pointerdown', onPointerDown);
    window.removeEventListener('pointerup', onPointerUp);
    renderer.dispose();
    if (container.contains(renderer.domElement)) {
      container.removeChild(renderer.domElement);
    }
  };
});

onUnmounted(() => {
  if (cleanup) cleanup();
});
</script>

<template>
  <div ref="containerRef" class="absolute inset-0 z-0" />
</template>

<style scoped></style>
