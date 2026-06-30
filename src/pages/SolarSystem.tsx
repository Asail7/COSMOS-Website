import React, { useState, Suspense, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'wouter';
import { planets } from '../data/planets';
import { useLanguage } from '../hooks/useLanguage';
import { WebGLErrorBoundary } from '../components/WebGLErrorBoundary';

const PLANET_CONFIG: Record<string, { emissive: string; emissiveIntensity: number; shininess: number; specular: string; atmosphereColor?: string; atmosphereOpacity?: number }> = {
  sun:     { emissive: '#FDB813', emissiveIntensity: 1.0, shininess: 0,  specular: '#000000' },
  mercury: { emissive: '#2a2826', emissiveIntensity: 0.05, shininess: 8,  specular: '#888888' },
  venus:   { emissive: '#4a2e00', emissiveIntensity: 0.08, shininess: 25, specular: '#d4a84b', atmosphereColor: '#d4a060', atmosphereOpacity: 0.12 },
  earth:   { emissive: '#051830', emissiveIntensity: 0.08, shininess: 40, specular: '#2266aa', atmosphereColor: '#06b6d4', atmosphereOpacity: 0.10 },
  mars:    { emissive: '#3a0c02', emissiveIntensity: 0.06, shininess: 6,  specular: '#882200' },
  jupiter: { emissive: '#1a0800', emissiveIntensity: 0.04, shininess: 12, specular: '#c88b3a' },
  saturn:  { emissive: '#1a1000', emissiveIntensity: 0.04, shininess: 10, specular: '#d4bc7a' },
  uranus:  { emissive: '#001a1a', emissiveIntensity: 0.06, shininess: 20, specular: '#7de8e8', atmosphereColor: '#7de8e8', atmosphereOpacity: 0.08 },
  neptune: { emissive: '#010820', emissiveIntensity: 0.08, shininess: 18, specular: '#3f54ba', atmosphereColor: '#3060d0', atmosphereOpacity: 0.10 },
  pluto:   { emissive: '#0a0806', emissiveIntensity: 0.03, shininess: 4,  specular: '#776655' },
};

function OrbitingPlanet({ planet, onSelect }: { planet: any; onSelect: (p: any) => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Group>(null);

  const displayRadius = planet.id === 'sun' ? 0 : Math.max(3, Math.log(planet.orbitRadius) * 4);
  const displaySize   = planet.id === 'sun' ? 2.5 : Math.max(0.15, Math.log(planet.size + 1) * 0.38);
  const cfg = PLANET_CONFIG[planet.id] ?? PLANET_CONFIG['mercury'];

  useFrame((_, delta) => {
    if (orbitRef.current && planet.id !== 'sun') {
      orbitRef.current.rotation.y += delta * planet.orbitSpeed * 0.08;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * (planet.id === 'sun' ? 0.08 : 0.45);
    }
  });

  return (
    <group ref={orbitRef}>
      {/* Orbit path */}
      {planet.id !== 'sun' && (
        <mesh rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[displayRadius, displayRadius + 0.035, 128]} />
          <meshBasicMaterial color="#ffffff" opacity={0.07} transparent side={THREE.DoubleSide} />
        </mesh>
      )}

      <group position={[displayRadius, 0, 0]}>
        {/* Main planet sphere */}
        <mesh
          ref={meshRef}
          onClick={(e) => { e.stopPropagation(); onSelect(planet); }}
          onPointerOver={() => { document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { document.body.style.cursor = 'auto'; }}
        >
          <sphereGeometry args={[displaySize, 48, 48]} />
          {planet.id === 'sun' ? (
            <meshBasicMaterial color="#FDB813" />
          ) : (
            <meshPhongMaterial
              color={planet.color}
              emissive={new THREE.Color(cfg.emissive)}
              emissiveIntensity={cfg.emissiveIntensity}
              shininess={cfg.shininess}
              specular={new THREE.Color(cfg.specular)}
            />
          )}
        </mesh>

        {/* Sun halo */}
        {planet.id === 'sun' && (
          <>
            <mesh>
              <sphereGeometry args={[displaySize * 1.08, 32, 32]} />
              <meshBasicMaterial color="#FF8C00" transparent opacity={0.12} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
            <mesh>
              <sphereGeometry args={[displaySize * 1.25, 32, 32]} />
              <meshBasicMaterial color="#FF6000" transparent opacity={0.05} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
            </mesh>
          </>
        )}

        {/* Atmosphere for planets that have one */}
        {cfg.atmosphereColor && (
          <mesh>
            <sphereGeometry args={[displaySize * 1.07, 32, 32]} />
            <meshBasicMaterial
              color={cfg.atmosphereColor}
              transparent
              opacity={cfg.atmosphereOpacity}
              side={THREE.BackSide}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>
        )}

        {/* Saturn rings */}
        {planet.id === 'saturn' && (
          <>
            <mesh rotation={[Math.PI / 2.8, 0, 0]}>
              <ringGeometry args={[displaySize * 1.35, displaySize * 1.75, 64]} />
              <meshBasicMaterial color="#c8a850" side={THREE.DoubleSide} transparent opacity={0.55} depthWrite={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2.8, 0, 0]}>
              <ringGeometry args={[displaySize * 1.75, displaySize * 2.4, 64]} />
              <meshBasicMaterial color="#e8d5a3" side={THREE.DoubleSide} transparent opacity={0.35} depthWrite={false} />
            </mesh>
            <mesh rotation={[Math.PI / 2.8, 0, 0]}>
              <ringGeometry args={[displaySize * 2.4, displaySize * 2.7, 64]} />
              <meshBasicMaterial color="#b89040" side={THREE.DoubleSide} transparent opacity={0.18} depthWrite={false} />
            </mesh>
          </>
        )}

        {/* Uranus tilted rings */}
        {planet.id === 'uranus' && (
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <ringGeometry args={[displaySize * 1.4, displaySize * 1.9, 64]} />
            <meshBasicMaterial color="#7de8e8" side={THREE.DoubleSide} transparent opacity={0.2} depthWrite={false} />
          </mesh>
        )}
      </group>
    </group>
  );
}

function SolarSystemFallback({ onSelect, language }: { onSelect: (p: any) => void; language: string }) {
  const systemObjects = [
    { id: 'sun', name: 'Sun', arabicName: 'الشمس', color: '#FDB813', orbitRadius: 0 },
    ...planets
  ];

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        {systemObjects.map((p, i) => {
          if (p.id === 'sun') {
            return (
              <motion.button
                key="sun"
                className="absolute w-16 h-16 rounded-full cursor-pointer z-10"
                style={{ background: 'radial-gradient(circle, #FDB813, #FF6B00)', boxShadow: '0 0 60px rgba(253,184,19,0.8)' }}
                whileHover={{ scale: 1.1 }}
                onClick={() => onSelect(p)}
              />
            );
          }
          const angle = (i / (systemObjects.length - 1)) * 2 * Math.PI;
          const radius = 60 + i * 45;
          return (
            <div
              key={p.id}
              className="absolute rounded-full border border-white/10"
              style={{ width: radius * 2, height: radius * 2, borderRadius: '50%' }}
            >
              <motion.button
                className="absolute w-4 h-4 rounded-full cursor-pointer"
                style={{
                  background: p.color,
                  top: '50%',
                  left: '50%',
                  transform: `translate(-50%, -50%) rotate(${angle}rad) translateX(${radius}px)`,
                  boxShadow: `0 0 10px ${p.color}80`
                }}
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20 + i * 8, repeat: Infinity, ease: 'linear' }}
                onClick={() => onSelect(p)}
                title={language === 'ar' ? p.arabicName : p.name}
              />
            </div>
          );
        })}
      </div>
      <p className="absolute bottom-4 text-center text-xs text-white/30">
        {language === 'ar' ? 'انقر على كوكب لعرض التفاصيل' : 'Click a planet for details'}
      </p>
    </div>
  );
}

export default function SolarSystem() {
  const { language, t, dir } = useLanguage();
  const [selectedPlanet, setSelectedPlanet] = useState<any>(null);

  const systemObjects = [
    { id: 'sun', name: 'Sun', arabicName: 'الشمس', color: '#FDB813', size: 20, orbitRadius: 0, orbitSpeed: 0, description: 'The star at the center of our Solar System, containing 99.86% of total mass.', arabicDescription: 'النجم في مركز نظامنا الشمسي، يحتوي على 99.86% من الكتلة الإجمالية.' },
    ...planets
  ];

  return (
    <div className="h-screen w-full relative">
      <div className="absolute inset-0 z-0">
        <WebGLErrorBoundary fallback={<SolarSystemFallback onSelect={setSelectedPlanet} language={language} />}>
          <Suspense fallback={
            <div className="flex items-center justify-center h-full w-full">
              <div className="text-center">
                <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/40 text-sm">{language === 'ar' ? 'جارٍ تحميل النظام الشمسي...' : 'Loading solar system...'}</p>
              </div>
            </div>
          }>
            <Canvas camera={{ position: [0, 20, 35], fov: 50 }}>
              <ambientLight intensity={0.03} />
              <pointLight position={[0, 0, 0]} intensity={5} color="#FFF8E7" distance={200} decay={1.2} />
              <pointLight position={[0, 0, 0]} intensity={2} color="#FDB813" distance={80} decay={1.5} />
              <OrbitControls enablePan enableZoom maxDistance={120} minDistance={5} />
              {systemObjects.map((p) => (
                <OrbitingPlanet key={p.id} planet={p} onSelect={setSelectedPlanet} />
              ))}
            </Canvas>
          </Suspense>
        </WebGLErrorBoundary>
      </div>

      {/* Controls hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 glass-card px-6 py-3 text-xs text-muted-foreground pointer-events-none text-center z-10">
        {language === 'ar'
          ? 'اسحب للتدوير • استخدم عجلة الماوس للتكبير • انقر على كوكب للتفاصيل'
          : 'Drag to rotate • Scroll to zoom • Click a planet for details'}
      </div>

      {/* Planet info panel */}
      <AnimatePresence>
        {selectedPlanet && (
          <motion.div
            key={selectedPlanet.id}
            initial={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir === 'rtl' ? -30 : 30 }}
            transition={{ duration: 0.3 }}
            className={`absolute top-24 ${dir === 'rtl' ? 'left-8' : 'right-8'} z-10 w-80 max-w-[calc(100vw-2rem)]`}
          >
            <div className="glass-card p-6 relative border border-white/10 rounded-2xl">
              <button
                className="absolute top-4 right-4 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-gray-400 hover:text-white transition-colors text-sm"
                onClick={() => setSelectedPlanet(null)}
              >
                X
              </button>
              <div
                className="w-12 h-12 rounded-full mb-4"
                style={{
                  background: `radial-gradient(circle at 35% 35%, ${selectedPlanet.color}, ${selectedPlanet.color}40)`,
                  boxShadow: `0 0 25px ${selectedPlanet.color}60`
                }}
              />
              <h2 className="text-2xl font-bold mb-1" style={{ color: selectedPlanet.color }}>
                {language === 'ar' ? selectedPlanet.arabicName : selectedPlanet.name}
              </h2>
              <p className="text-sm text-muted-foreground mb-5 leading-relaxed">
                {language === 'ar' ? selectedPlanet.arabicDescription : selectedPlanet.description}
              </p>

              {selectedPlanet.id !== 'sun' && (
                <div className="space-y-2.5 text-sm">
                  {[
                    { label: t.common.distance, value: selectedPlanet.distanceFromSun },
                    { label: t.common.temperature, value: selectedPlanet.temperature },
                    { label: t.common.gravity, value: selectedPlanet.gravity },
                    { label: t.common.moons, value: selectedPlanet.moons },
                    { label: language === 'ar' ? 'الغلاف الجوي' : 'Atmosphere', value: selectedPlanet.atmosphere },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex justify-between gap-2 border-b border-white/5 pb-2">
                      <span className="text-muted-foreground shrink-0">{label}</span>
                      <span className="font-medium text-right text-white/90">{value}</span>
                    </div>
                  ))}
                </div>
              )}

              {selectedPlanet.id !== 'sun' && (
                <div className="mt-5">
                  <Link
                    href={`/planets/${selectedPlanet.id}`}
                    className="block w-full py-2.5 text-center bg-primary/20 hover:bg-primary/40 border border-primary/30 transition-colors rounded-xl font-medium text-sm"
                  >
                    {language === 'ar' ? 'عرض التفاصيل الكاملة' : 'View Full Details'}
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
