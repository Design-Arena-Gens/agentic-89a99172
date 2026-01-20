'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useEffect, useMemo, useRef, useState } from 'react';
import Lenis from '@studio-freight/lenis';
import { Vector3 } from 'three';

function HeroLights() {
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.2}
        color="#00f5ff"
        castShadow
      />
      <directionalLight position={[-4, 5, -3]} intensity={0.6} color="#4f89ff" />
      <pointLight position={[0, 2, 5]} intensity={0.9} color="#00f5ff" />
    </>
  );
}

function Kettlebell({ cursor }) {
  const group = useRef();
  const float = useRef(0);
  const target = useMemo(() => new Vector3(0, 0, 0), []);

  useFrame((_, delta) => {
    if (!group.current) return;

    float.current += delta;
    const hoverY = Math.sin(float.current * 1.4) * 0.18;

    target.set(cursor.current.x * 1.4, hoverY + 0.4, cursor.current.y * 1.4);
    group.current.position.lerp(target, 0.08);
    group.current.rotation.x = Math.sin(float.current * 0.9) * 0.12;
    group.current.rotation.y += 0.35 * delta;
  });

  return (
    <group ref={group} position={[0, 0.5, 0]}>
      <mesh castShadow receiveShadow>
        <sphereGeometry args={[0.72, 64, 64]} />
        <meshStandardMaterial
          color="#050b13"
          metalness={0.85}
          roughness={0.28}
          envMapIntensity={1.1}
        />
      </mesh>
      <mesh position={[0, 0.92, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[0.7, 0.11, 32, 128]} />
        <meshStandardMaterial
          color="#0c1b28"
          emissive="#00f5ff"
          emissiveIntensity={0.7}
          metalness={0.4}
          roughness={0.18}
        />
      </mesh>
      <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.12, 0.12, 1.05, 32]} />
        <meshStandardMaterial color="#0e131c" metalness={0.78} roughness={0.22} />
      </mesh>
      <mesh position={[0, -0.65, 0]}>
        <cylinderGeometry args={[0.48, 0.58, 0.7, 48]} />
        <meshStandardMaterial color="#04070d" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, -1.15, 0]}>
        <circleGeometry args={[1.4, 64]} />
        <meshStandardMaterial color="#020305" metalness={0.6} roughness={0.45} />
      </mesh>
    </group>
  );
}

export default function Page() {
  const cursor = useRef({ x: 0, y: 0 });
  const heroRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      smoothWheel: true,
      smoothTouch: false,
      lerp: 0.12,
      duration: 1.2,
    });

    let frameId;
    const raf = (time) => {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    };

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handlePointer = (event) => {
      if (!heroRef.current) return;
      const bounds = heroRef.current.getBoundingClientRect();
      const x = (event.clientX - (bounds.left + bounds.width / 2)) / (bounds.width / 2);
      const y = (event.clientY - (bounds.top + bounds.height / 2)) / (bounds.height / 2);
      cursor.current = {
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, -y)),
      };
    };

    const handleLeave = () => {
      cursor.current = { x: 0, y: 0 };
    };

    const node = heroRef.current;
    node?.addEventListener('pointermove', handlePointer);
    node?.addEventListener('pointerleave', handleLeave);

    return () => {
      node?.removeEventListener('pointermove', handlePointer);
      node?.removeEventListener('pointerleave', handleLeave);
    };
  }, []);

  const badgeItems = useMemo(
    () => [
      { label: 'Altitude Conditioning', detail: 'Hypoxic cycling vault with live VO₂ tracking' },
      { label: 'Strength Forge', detail: 'Contrast-loaded rigs + biometric force data' },
      { label: 'Neuro Sprint Lab', detail: 'LED sprint tunnels with reaction analytics' },
    ],
    []
  );

  const stapleMarkers = useMemo(
    () => [
      { title: 'Raw Steel Aesthetic', description: 'Blackened concrete, exposed beams, and laser-cut lighting rigs keep the energy fierce.' },
      { title: 'Neon Vital Signs', description: 'Subtle neon-blue glow pulses like a heartbeat, reinforcing high-output intent.' },
      { title: 'Precision Data', description: 'Every zone projects live performance metrics in polished industrial casings.' },
    ],
    []
  );

  return (
    <main className="relative overflow-hidden">
      {/* Hero: Dark industrial slab contrasted with neon aura for brutalist + cyber athletic vibe */}
      <section
        ref={heroRef}
        className="relative flex min-h-screen flex-col justify-between overflow-hidden lg:flex-row"
      >
        <div className="relative z-10 flex flex-1 flex-col gap-10 px-6 pb-24 pt-32 lg:px-24 lg:pt-48">
          <div className="flex items-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-neon/80 to-transparent" />
            <p className="uppercase tracking-[0.4em] text-sm text-neon/80">
              Club High-Performance Gym
            </p>
          </div>
          <div className="space-y-8">
            <h1 className="text-5xl font-semibold leading-[1.05] text-white md:text-6xl xl:text-7xl">
              Apex Urban
              <span className="block text-neon drop-shadow-[0_0_30px_rgba(0,245,255,0.55)]">
                Industrial Strength, Neon Precision.
              </span>
            </h1>
            <p className="max-w-xl text-lg text-white/70">
              Brutalist architecture collides with futuristic load-tracking tech. Train inside a
              kinetic environment built for athletes who refuse to coast.
            </p>
          </div>
          <div className="flex flex-wrap gap-6">
            <button className="rounded-full border border-neon/40 bg-white/5 px-8 py-4 font-medium uppercase tracking-[0.3em] text-neon shadow-neon transition-all duration-300 hover:bg-neon hover:text-night focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neon/60 animate-pulseGlow">
              Join Now
            </button>
            <button className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-white/70 transition hover:border-neon/80 hover:text-neon">
              <span className="text-sm uppercase tracking-[0.3em]">Tour the Lab</span>
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-neon/50 bg-neon/10 text-neon transition group-hover:translate-x-1">
                →
              </span>
            </button>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {badgeItems.map((item) => (
              <div
                key={item.label}
                className="rounded-xl border border-white/5 bg-white/[0.03] p-5 backdrop-blur">
                <p className="text-xs uppercase tracking-[0.35em] text-neon/90">{item.label}</p>
                <p className="mt-3 text-sm text-white/60">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative flex flex-1 items-center justify-center">
          <div className="pointer-events-none absolute inset-0 -translate-x-16 bg-[radial-gradient(circle_at_center,_rgba(0,245,255,0.3),_transparent_55%)] blur-3xl" />
          <div className="pointer-events-auto relative h-[70vh] w-full max-w-2xl">
            {mounted && (
              <Canvas
                dpr={[1, 2]}
                shadows
                camera={{ position: [0, 1.2, 4], fov: 45 }}
                className="rounded-[3rem] border border-white/10 bg-gradient-to-br from-steel to-night/80"
              >
                <color attach="background" args={['#05070b']} />
                <Suspense fallback={null}>
                  <HeroLights />
                  <Kettlebell cursor={cursor} />
                </Suspense>
                <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.1, 0]} receiveShadow>
                  <planeGeometry args={[12, 12]} />
                  <meshStandardMaterial color="#020408" roughness={1} />
                </mesh>
              </Canvas>
            )}
          </div>
        </div>
      </section>

      {/* Feature grid: Brutalist modular panels with neon seams highlighting performance zones */}
      <section className="relative border-t border-white/[0.06] bg-gradient-to-br from-night via-steel to-night px-6 py-32 lg:px-24">
        <div className="mx-auto max-w-6xl space-y-14">
          <header className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-neon/60">Facility DNA</p>
              <h2 className="mt-3 text-4xl font-semibold text-white">Engineered for Output</h2>
            </div>
            <p className="max-w-xl text-base text-white/60">
              Every square foot is tuned for velocity, recovery, and raw power. The space pulses with
              ambient metrics so the squad never loses sight of the mission.
            </p>
          </header>
          <div className="grid gap-8 md:grid-cols-3">
            {stapleMarkers.map((card) => (
              <article
                key={card.title}
                className="group relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-8 transition-all duration-500 hover:border-neon/50 hover:shadow-neon"
              >
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(0,245,255,0.15),_transparent_65%)]" />
                </div>
                <div className="relative space-y-5">
                  <span className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.3em] text-neon">
                    <span className="block h-px w-8 bg-neon/50" />
                    Atmosphere
                  </span>
                  <h3 className="text-2xl font-semibold text-white">{card.title}</h3>
                  <p className="text-sm text-white/60">{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Programs: Industrial timeline with neon accent to mirror high-output circuit planning */}
      <section className="relative border-t border-white/10 bg-night px-6 py-28 lg:px-24">
        <div className="mx-auto max-w-6xl space-y-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-neon/60">Programming</p>
              <h2 className="mt-3 text-4xl font-semibold text-white">Performance Rotations</h2>
            </div>
            <p className="max-w-xl text-base text-white/60">
              Tactical blocks fuse strength, conditioning, and neural training so members hardwire
              elite output.
            </p>
          </div>
          <div className="grid gap-10 md:grid-cols-3">
            {[
              {
                title: 'Urban Capacity Cycles',
                copy: 'Contrast sled pushes and prowler drags under UV load trackers keep intensity pinned.',
              },
              {
                title: 'Circuit Voltage',
                copy: 'Electro-plyo lanes sync with heart-rate pillars for responsive pacing cues.',
              },
              {
                title: 'Recovery Lab',
                copy: 'Infrared pods, hyperbaric resets, and guided breathwork recalibrate state fast.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="relative flex flex-col gap-4 rounded-2xl border border-white/5 bg-white/[0.02] p-8 shadow-[inset_0_0_30px_rgba(0,245,255,0.08)]"
              >
                <span className="text-sm uppercase tracking-[0.35em] text-neon/70">{item.title}</span>
                <p className="text-sm text-white/60">{item.copy}</p>
                <span className="mt-auto h-px w-full bg-gradient-to-r from-neon via-neon/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-action: Stark contrast slab with neon pulse to trigger final conversion */}
      <section className="relative border-t border-white/10 bg-gradient-to-br from-night via-steel/70 to-night px-6 py-28 lg:px-24">
        <div className="mx-auto flex max-w-5xl flex-col gap-12 rounded-[3rem] border border-white/10 bg-white/[0.02] p-12 text-center shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur">
          <span className="text-sm uppercase tracking-[0.35em] text-neon/70">Membership Pulse</span>
          <h2 className="text-4xl font-semibold text-white md:text-5xl">
            Lock in your slot on the floor. Apex squads cap at 12 per cycle.
          </h2>
          <p className="mx-auto max-w-2xl text-base text-white/60">
            High performers belong where the room fights back. Claim your access pass and sync with
            coaches who monitor every watt you produce.
          </p>
          <div className="mx-auto flex flex-wrap items-center justify-center gap-5">
            <button className="rounded-full border border-neon/50 bg-neon px-10 py-4 text-sm font-semibold uppercase tracking-[0.3em] text-night shadow-neon transition hover:shadow-[0_0_45px_rgba(0,245,255,0.75)]">
              Secure Membership
            </button>
            <span className="text-xs uppercase tracking-[0.35em] text-white/50">
              Limited drop · Next intake closes in 72 hours
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
