import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import * as THREE from 'three';

interface KrevoraPreloaderProps {
  onComplete?: () => void;
}

export const KrevoraPreloader: React.FC<KrevoraPreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'initial' | 'reveal' | 'powerup' | 'brand' | 'exit' | 'done'>('initial');
  const [isMounted, setIsMounted] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const canvasContainerRef = useRef<HTMLDivElement>(null);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Sequence progression timer
  useEffect(() => {
    const startTime = performance.now();
    const duration = reducedMotion ? 1600 : 5300; // Target total active duration: ~2.3 seconds

    // Lock body scroll while preloader is active
    document.body.style.overflow = 'hidden';

    // Sequence markers
    const phase2Timer = setTimeout(() => setPhase('reveal'), 250);
    const phase3Timer = setTimeout(() => setPhase('powerup'), 800);
    const phase4Timer = setTimeout(() => setPhase('brand'), 1150);

    let animationFrameId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      if (elapsed < duration) {
        animationFrameId = requestAnimationFrame(tick);
      } else {
        setProgress(100);
        // Phase 6: Exit transition
        setPhase('exit');
        
        // Unlock scroll as exit begins
        document.body.style.overflow = '';

        // Complete unmount after cinematic exit finishes
        setTimeout(() => {
          setPhase('done');
          setIsMounted(false);
          if (onComplete) onComplete();
        }, 650);
      }
    };

    animationFrameId = requestAnimationFrame(tick);

    return () => {
      clearTimeout(phase2Timer);
      clearTimeout(phase3Timer);
      clearTimeout(phase4Timer);
      cancelAnimationFrame(animationFrameId);
      document.body.style.overflow = '';
    };
  }, [reducedMotion, onComplete]);

  // Three.js 3D K — Reuses the exact same mathematical geometry and materials as HeroThreeK
  useEffect(() => {
    if (reducedMotion || !canvasContainerRef.current) return;

    const container = canvasContainerRef.current;
    const width = 280;
    const height = 280;

    const scene = new THREE.Scene();
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
    // LIGHTING SYSTEM (Powers up dynamically)
    // ==========================================
    const ambientLight = new THREE.AmbientLight(0x0a192f, 0.6);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0x38bdf8, 1.0);
    keyLight.position.set(-5, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x818cf8, 0.8);
    fillLight.position.set(5, -4, 3);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x06b6d4, 1.2);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    const accentLight = new THREE.PointLight(0x22d3ee, 0.8, 8);
    accentLight.position.set(0, 0, 2);
    scene.add(accentLight);

    // ==========================================
    // 3D K GEOMETRY (Exact same 3 beveled bars)
    // ==========================================
    const kGroup = new THREE.Group();
    scene.add(kGroup);

    const extrudeSettings = {
      steps: 1,
      depth: 0.38,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelOffset: 0,
      bevelSegments: 3,
    };

    // Material 1: Vertical Stem
    const stemMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0284c7'),
      metalness: 0.82,
      roughness: 0.22,
      clearcoat: 0.75,
      clearcoatRoughness: 0.15,
      reflectivity: 0.9,
    });

    // Material 2: Upper diagonal arm
    const upperArmMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#00b4d8'),
      metalness: 0.85,
      roughness: 0.18,
      clearcoat: 0.85,
      clearcoatRoughness: 0.12,
      reflectivity: 0.95,
    });

    // Material 3: Lower diagonal arm
    const lowerArmMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#0369a1'),
      metalness: 0.84,
      roughness: 0.20,
      clearcoat: 0.8,
      clearcoatRoughness: 0.14,
      reflectivity: 0.9,
    });

    // 1. Vertical stem
    const stemShape = new THREE.Shape();
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

    // 2. Upper arm
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

    // 3. Lower arm
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

    kGroup.position.set(-0.15, 0, 0);

    // Initial state: angled presentation
    kGroup.rotation.y = -0.32; // -18 deg
    kGroup.rotation.x = 0.05;

    // Animation Loop
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Power-up lighting progression (0 -> 1.8s)
      const powerProgress = Math.min(1, elapsed / 1.8);
      ambientLight.intensity = 0.6 + powerProgress * 0.8;
      keyLight.intensity = 1.0 + powerProgress * 2.0;
      accentLight.intensity = 0.8 + powerProgress * 1.0;

      // Subtle rotation: smooth continuous turn from -0.32 rad towards 0.15 rad + gentle breathing
      const targetRotationY = -0.32 + Math.min(0.5, elapsed * 0.22);
      kGroup.rotation.y = targetRotationY;

      // Subtle scale breathing once powered up
      const breathingScale = 1.0 + Math.sin(elapsed * 2.8) * 0.018;
      kGroup.scale.set(breathingScale, breathingScale, breathingScale);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      stemGeometry.dispose();
      upperGeometry.dispose();
      lowerGeometry.dispose();
      stemMaterial.dispose();
      upperArmMaterial.dispose();
      lowerArmMaterial.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  if (!isMounted) return null;

  const isExiting = phase === 'exit';

  return (
    <AnimatePresence>
      <motion.div
        id="krevora-preloader"
        initial={{ opacity: 1 }}
        animate={{ opacity: isExiting ? 0 : 1 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#020612] select-none ${
          isExiting ? 'pointer-events-none' : ''
        }`}
      >
        {/* Background Atmosphere: Subtle dark navy gradient & soft blue bloom */}
        <div className="absolute inset-0 tech-grid-pattern opacity-30 pointer-events-none" />
        <div
          className="absolute w-[500px] sm:w-[700px] h-[350px] sm:h-[450px] pointer-events-none blur-[140px] opacity-35"
          style={{
            background:
              'radial-gradient(circle, rgba(6, 182, 212, 0.22) 0%, rgba(59, 130, 246, 0.12) 45%, rgba(124, 58, 237, 0.05) 75%, transparent 85%)',
          }}
        />

        {/* Ambient floating dust / technical particles */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
          <div className="absolute top-1/4 left-1/4 w-1 h-1 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_6px_#22d3ee]" />
          <div className="absolute top-3/4 left-1/3 w-1 h-1 rounded-full bg-blue-400 animate-pulse shadow-[0_0_6px_#60a5fa] delay-300" />
          <div className="absolute top-1/3 right-1/4 w-1 h-1 rounded-full bg-violet-400 animate-pulse shadow-[0_0_6px_#a78bfa] delay-700" />
          <div className="absolute bottom-1/4 right-1/3 w-1 h-1 rounded-full bg-cyan-300 animate-pulse shadow-[0_0_6px_#67e8f9] delay-500" />
        </div>

        {/* Central Brand Unit: 3D K + Brand Typography */}
        <motion.div
          className="relative z-10 flex flex-col items-center justify-center"
          animate={{
            scale: isExiting ? (reducedMotion ? 1 : 1.12) : 1,
            x: isExiting && !reducedMotion && typeof window !== 'undefined' && window.innerWidth >= 1024 ? 120 : 0,
            opacity: isExiting ? 0 : 1,
          }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* PHASE 2 & 3: The K Symbol (3D WebGL or Reduced Motion SVG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, filter: 'blur(12px)' }}
            animate={{
              opacity: phase === 'initial' ? 0 : 1,
              scale: phase === 'initial' ? 0.85 : 1,
              filter: phase === 'initial' ? 'blur(12px)' : 'blur(0px)',
            }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex items-center justify-center w-[220px] h-[220px] sm:w-[260px] sm:h-[260px]"
          >
            {/* Ambient specular glow behind K */}
            <div className="absolute inset-0 -z-10 rounded-full bg-cyan-500/15 blur-2xl pointer-events-none animate-pulse" />

            {reducedMotion ? (
              // Reduced motion: Pristine vector faceted K
              <div className="w-28 h-28 border border-cyan-400/40 bg-cyan-950/25 p-3 rounded-sm shadow-[0_0_25px_-3px_rgba(6,182,212,0.4)]">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <path d="M20 12 H42 V50 L20 62 Z" fill="#0284c7" />
                  <path d="M20 62 L42 50 V88 H20 Z" fill="#0369a1" />
                  <path d="M42 46 L76 12 H98 L56 50 Z" fill="#38bdf8" />
                  <path d="M74 12 L98 12 L84 25 Z" fill="#cffafe" opacity="0.8" />
                  <path d="M47 48 L98 88 H72 L36 57 Z" fill="#0ea5e9" />
                  <path d="M42 46 L56 50 L36 57 Z" fill="#a5f3fc" opacity="0.9" />
                </svg>
              </div>
            ) : (
              // 3D Canvas
              <div
                ref={canvasContainerRef}
                className="w-full h-full flex items-center justify-center pointer-events-none"
              />
            )}
          </motion.div>

          {/* PHASE 4: Brand Name & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(8px)' }}
            animate={{
              opacity: phase === 'brand' || phase === 'exit' ? 1 : 0,
              y: phase === 'brand' || phase === 'exit' ? 0 : 12,
              filter: phase === 'brand' || phase === 'exit' ? 'blur(0px)' : 'blur(8px)',
            }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center text-center mt-2"
          >
            {/* KREVORA wordmark with precision curved E and triangle-counter A */}
            <div className="font-extrabold uppercase select-none flex items-center text-white tracking-[0.38em] text-2xl sm:text-3xl pl-[0.38em]">
              <span>KR</span>
              <span className="inline-block relative px-0.5 text-zinc-100">
                <svg className="w-[0.9em] h-[0.9em] inline-block -mt-[0.08em]" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M26 6 H14 C9.5 6 6 9.5 6 14 V18 C6 22.5 9.5 26 14 26 H26 V22 H14 C11.8 22 10 20.2 10 18 V17 H22 V14 H10 V14 C10 11.8 11.8 10 14 10 H26 V6 Z" />
                </svg>
              </span>
              <span>VOR</span>
              <span className="relative inline-block">
                <span>A</span>
                <span className="absolute bottom-[0.18em] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[3px] border-l-transparent border-r-[3px] border-r-transparent border-b-[5px] border-b-cyan-400 drop-shadow-[0_0_4px_#38bdf8]" />
              </span>
            </div>

            {/* Tagline: CREATE. EVOLVE. GROW. */}
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{
                opacity: phase === 'brand' || phase === 'exit' ? 1 : 0,
                y: phase === 'brand' || phase === 'exit' ? 0 : 6,
              }}
              transition={{ duration: 0.5, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="mt-3 flex items-center gap-2.5"
            >
              <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-r from-transparent to-cyan-500/40" />
              <span className="text-[10px] sm:text-[11px] tracking-[0.28em] font-mono font-semibold bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 bg-clip-text text-transparent uppercase">
                CREATE. EVOLVE. GROW.
              </span>
              <div className="h-[1px] w-6 sm:w-8 bg-gradient-to-l from-transparent to-cyan-500/40" />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* PHASE 5: Minimal Loading Indicator near bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isExiting ? 0 : 1 }}
          transition={{ duration: 0.4 }}
          className="absolute bottom-10 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5 w-48 sm:w-56 pointer-events-none z-10"
        >
          {/* Label */}
          <div className="flex items-center justify-between w-full text-[9px] sm:text-[10px] font-mono tracking-[0.32em] text-zinc-500 uppercase">
            <span>LOADING</span>
            <span className="text-cyan-400/90 font-semibold">{progress}%</span>
          </div>

          {/* Thin Progress Line (cyan -> blue -> violet gradient) */}
          <div className="w-full h-[1.5px] bg-white/[0.08] rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-500 rounded-full transition-all duration-100 ease-out shadow-[0_0_8px_rgba(6,182,212,0.6)]"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
