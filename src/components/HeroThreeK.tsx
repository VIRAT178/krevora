import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface HeroThreeKProps {
  className?: string;
}

export const HeroThreeK: React.FC<HeroThreeKProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInteractiveHover, setIsInteractiveHover] = useState(false);
  const [debugActive, setDebugActive] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    
    // Controlled camera perspective
    const width = container.clientWidth || 500;
    const height = container.clientHeight || 500;
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 8.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // ==========================================
    // ATMOSPHERIC BACKGROUND (Particles & soft glow)
    // Kept in a separate scene group that DOES NOT ROTATE with the K
    // ==========================================
    const atmosphereGroup = new THREE.Group();
    scene.add(atmosphereGroup);

    // Subtle background particles
    const particleCount = 280;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 12;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 10;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 6 - 2.5; // Behind the K
      particleScales[i] = Math.random() * 0.8 + 0.2;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(particleScales, 1));

    const particleMaterial = new THREE.PointsMaterial({
      color: new THREE.Color('#38bdf8'),
      size: 0.045,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    atmosphereGroup.add(particles);

    // ==========================================
    // LIGHTING SYSTEM
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0a192f, 1.2);
    scene.add(ambientLight);

    // Key Light - High-intensity cool cyan from top-left
    const keyLight = new THREE.DirectionalLight(0x38bdf8, 2.8);
    keyLight.position.set(-5, 6, 5);
    scene.add(keyLight);

    // Fill Light - Soft violet-blue from bottom-right
    const fillLight = new THREE.DirectionalLight(0x818cf8, 1.8);
    fillLight.position.set(5, -4, 3);
    scene.add(fillLight);

    // Rim / Backlight - Sharp electric glow creating edge sheen
    const rimLight = new THREE.DirectionalLight(0x06b6d4, 3.2);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // Specular Accent point light centered near the K junction
    const accentLight = new THREE.PointLight(0x22d3ee, 1.5, 8);
    accentLight.position.set(0, 0, 2);
    scene.add(accentLight);

    // ==========================================
    // THE 3D K SYMBOL
    // Clean geometry made of THREE distinct geometric bars
    // Parent group rotated continuously around Y-axis
    // NO support lines, NO rings, NO wireframe, NO rods
    // ==========================================
    const kGroup = new THREE.Group();
    scene.add(kGroup);

    // Extrusion settings for clean beveled sculptural bars
    const extrudeSettings = {
      steps: 1,
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 3,
    };

    // Material 1: Vertical Stem (Deep metallic cyan/slate sheen)
    const stemMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0284c7'),
      metalness: 0.82,
      roughness: 0.22,
      clearcoat: 0.75,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    // Material 2: Upper diagonal arm (Brighter cyan highlight sheen)
    const upperArmMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#00b4d8'),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });

    // Material 3: Lower diagonal arm (Sleek deep electric blue)
    const lowerArmMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0369a1'),
      metalness: 0.84,
      roughness: 0.20,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14,
      reflectivity: 0.9,
    });

    // 1. VERTICAL STEM BAR (Clean geometric column)
    const stemShape = new THREE.Shape();
    // Centered around x = -1.05
    stemShape.moveTo(-1.45, -2.1);
    stemShape.lineTo(-0.7, -2.1);
    stemShape.lineTo(-0.7, 2.1);
    stemShape.lineTo(-1.45, 2.1);
    stemShape.closePath();

    const stemGeometry = new THREE.ExtrudeGeometry(stemShape, extrudeSettings);
    stemGeometry.center();
    const stemMesh = new THREE.Mesh(stemGeometry, stemMaterial);
    stemMesh.position.set(-0.88, 0, 0);
    kGroup.add(stemMesh);

    // 2. UPPER DIAGONAL ARM (Angled faceted bar reaching top-right)
    const upperShape = new THREE.Shape();
    upperShape.moveTo(-0.45, 0.1);
    upperShape.lineTo(0.2, 0.1);
    upperShape.lineTo(1.5, 2.1);
    upperShape.lineTo(0.7, 2.1);
    upperShape.closePath();

    const upperGeometry = new THREE.ExtrudeGeometry(upperShape, extrudeSettings);
    upperGeometry.center();
    const upperMesh = new THREE.Mesh(upperGeometry, upperArmMaterial);
    upperMesh.position.set(0.68, 1.05, 0.05);
    kGroup.add(upperMesh);

    // 3. LOWER DIAGONAL ARM (Angled faceted bar reaching bottom-right)
    const lowerShape = new THREE.Shape();
    lowerShape.moveTo(-0.35, -0.05);
    lowerShape.lineTo(0.35, -0.05);
    lowerShape.lineTo(1.6, -2.1);
    lowerShape.lineTo(0.75, -2.1);
    lowerShape.closePath();

    const lowerGeometry = new THREE.ExtrudeGeometry(lowerShape, extrudeSettings);
    lowerGeometry.center();
    const lowerMesh = new THREE.Mesh(lowerGeometry, lowerArmMaterial);
    lowerMesh.position.set(0.72, -1.05, -0.02);
    kGroup.add(lowerMesh);

    // Center the entire K group so its visual center is aligned
    kGroup.position.set(-0.15, 0, 0);

    // ==========================================
    // INTERACTION STATE & CONTINUOUS ROTATION
    // 1 complete 360 rotation every ~20 seconds
    // baseRotation + hoverOffset
    // ==========================================
    let baseRotationY = 0;
    let hoverTiltX = 0;
    let hoverTiltY = 0;
    let targetTiltX = 0;
    let targetTiltY = 0;
    let currentScale = 1.0;
    let targetScale = 1.0;
    let isHovered = false;

    // Normal speed: 2*PI radians in 20 seconds
    const NORMAL_SPEED = (2 * Math.PI) / 20.0; // ~0.314 rad/s
    const HOVER_SPEED = NORMAL_SPEED * 1.35;    // slightly faster on hover

    // Maximum movement: X rotation ±5° (0.087 rad), Y rotation ±7° (0.122 rad)
    const MAX_TILT_X = (5 * Math.PI) / 180;
    const MAX_TILT_Y = (7 * Math.PI) / 180;

    // Cursor tracking
    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1; // -1 to 1
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1); // -1 to 1

      targetTiltX = -y * MAX_TILT_X;
      targetTiltY = x * MAX_TILT_Y;
    };

    const handlePointerEnter = () => {
      isHovered = true;
      targetScale = 1.035; // slightly increase scale ~1.02-1.04
      setIsInteractiveHover(true);
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetTiltX = 0;
      targetTiltY = 0;
      targetScale = 1.0;
      setIsInteractiveHover(false);
    };

    container.addEventListener('pointermove', handlePointerMove);
    container.addEventListener('pointerenter', handlePointerEnter);
    container.addEventListener('pointerleave', handlePointerLeave);

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newW, height: newH } = entry.contentRect;
        if (newW > 0 && newH > 0) {
          camera.aspect = newW / newH;
          camera.updateProjectionMatrix();
          renderer.setSize(newW, newH);
        }
      }
    });
    resizeObserver.observe(container);

    // ==========================================
    // RENDER LOOP WITH DELTA TIME
    // ==========================================
    let animationFrameId: number;
    let lastTime = performance.now();

    const animate = (now: number) => {
      animationFrameId = requestAnimationFrame(animate);

      const dt = Math.min((now - lastTime) / 1000, 0.1); // capped at 100ms
      lastTime = now;

      if (!prefersReducedMotion) {
        // Continuous automatic rotation around Y-axis
        const currentSpeed = isHovered ? HOVER_SPEED : NORMAL_SPEED;
        baseRotationY += currentSpeed * dt;

        // Smooth damping/interpolation for hover tilt & scale
        const damping = 1 - Math.exp(-7 * dt);
        hoverTiltX += (targetTiltX - hoverTiltX) * damping;
        hoverTiltY += (targetTiltY - hoverTiltY) * damping;
        currentScale += (targetScale - currentScale) * damping;

        // Apply to the ACTUAL Three.js parent group
        kGroup.rotation.x = hoverTiltX;
        kGroup.rotation.y = baseRotationY + hoverTiltY;
        kGroup.scale.set(currentScale, currentScale, currentScale);

        // Gentle subtle drift for background particles
        const posAttr = particleGeometry.attributes.position as THREE.BufferAttribute;
        const positions = posAttr.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          positions[i * 3 + 1] += 0.04 * dt;
          if (positions[i * 3 + 1] > 5) {
            positions[i * 3 + 1] = -5;
          }
        }
        posAttr.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(animate);

    // CLEANUP
    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerenter', handlePointerEnter);
      container.removeEventListener('pointerleave', handlePointerLeave);

      // Dispose geometries & materials
      stemGeometry.dispose();
      upperGeometry.dispose();
      lowerGeometry.dispose();
      stemMaterial.dispose();
      upperArmMaterial.dispose();
      lowerArmMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full min-h-[380px] sm:min-h-[460px] md:min-h-[520px] lg:min-h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing select-none ${className}`}
      style={{ touchAction: 'none' }}
    >
      {/* Subtle radial ambient blue glow behind the canvas */}
      <div 
        className="absolute inset-0 -z-10 pointer-events-none transition-opacity duration-700"
        style={{
          background: isInteractiveHover
            ? 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.16) 0%, rgba(59, 130, 246, 0.08) 40%, transparent 70%)'
            : 'radial-gradient(circle at 50% 50%, rgba(6, 182, 212, 0.10) 0%, rgba(59, 130, 246, 0.05) 45%, transparent 70%)',
        }}
      />

      {/* Subtle interaction indicator */}
      <div className="absolute bottom-3 right-4 pointer-events-none text-[10px] tracking-[0.2em] uppercase font-mono text-zinc-500/60 flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${isInteractiveHover ? 'bg-cyan-400 animate-pulse' : 'bg-zinc-600'}`} />
        <span>{isInteractiveHover ? '3D MATRIX / ENGAGED' : 'INTERACTIVE 3D K'}</span>
      </div>
    </div>
  );
};
