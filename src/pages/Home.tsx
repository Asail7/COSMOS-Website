import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { planets } from '../data/planets';
import { PlanetCard } from '../components/PlanetCard';
import { WebGLErrorBoundary } from '../components/WebGLErrorBoundary';

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.04;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.055;
  });

  return (
    <group>
      <ambientLight intensity={0.08} />
      <directionalLight position={[6, 2, 4]} intensity={2.5} color="#fff8f0" />
      <pointLight position={[-8, -4, -6]} intensity={0.3} color="#06b6d4" />

      {/* Earth core */}
      <Sphere ref={earthRef} args={[2, 128, 128]}>
        <meshPhongMaterial
          color="#1a6b8a"
          emissive="#0a1f40"
          emissiveIntensity={0.15}
          shininess={35}
          specular={new THREE.Color(0x4488cc)}
        />
      </Sphere>

      {/* Cloud layer */}
      <Sphere ref={cloudsRef} args={[2.025, 64, 64]}>
        <meshPhongMaterial
          color="#e8f4f8"
          transparent
          opacity={0.22}
          shininess={10}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmosphere inner glow */}
      <Sphere args={[2.08, 64, 64]}>
        <meshBasicMaterial
          color="#1a9fd4"
          transparent
          opacity={0.10}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>

      {/* Atmosphere outer rim */}
      <Sphere ref={glowRef} args={[2.22, 64, 64]}>
        <meshBasicMaterial
          color="#06b6d4"
          transparent
          opacity={0.055}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </Sphere>
    </group>
  );
}

function EarthFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-end pr-4 md:pr-20 pointer-events-none">
      <div className="relative w-72 h-72 md:w-[420px] md:h-[420px]">
        {/* Outer atmosphere glow */}
        <div className="absolute -inset-6 rounded-full opacity-30"
          style={{ background: 'radial-gradient(circle, rgba(6,182,212,0.4) 0%, transparent 70%)' }} />

        {/* Planet sphere */}
        <div className="absolute inset-0 rounded-full overflow-hidden"
          style={{
            background: `
              radial-gradient(circle at 62% 18%, rgba(255,255,255,0.55) 0%, transparent 14%),
              radial-gradient(circle at 28% 60%, rgba(255,255,255,0.35) 0%, transparent 10%),
              radial-gradient(circle at 75% 55%, rgba(255,255,255,0.25) 0%, transparent 8%),
              radial-gradient(circle at 42% 38%, #2d6a4f 0%, #1e7d5a 8%, #1a6b8a 22%, #1557a0 42%, #0d3d6b 65%, #071e3d 100%)
            `,
            boxShadow: `
              0 0 80px rgba(6,182,212,0.35),
              0 0 150px rgba(6,182,212,0.15),
              inset -40px -40px 80px rgba(0,0,0,0.65),
              inset 8px 8px 24px rgba(100,210,255,0.18)
            `
          }}
        >
          {/* Specular highlights */}
          <div className="absolute top-[8%] left-[12%] w-[30%] h-[22%] rounded-full bg-white/20 blur-lg" />
          <div className="absolute top-[6%] left-[16%] w-[12%] h-[10%] rounded-full bg-white/45 blur-sm" />
        </div>

        {/* Atmosphere rim */}
        <div className="absolute -inset-1 rounded-full"
          style={{
            background: 'transparent',
            boxShadow: '0 0 30px 8px rgba(6,182,212,0.2), inset 0 0 30px 8px rgba(6,182,212,0.1)',
            borderRadius: '50%',
          }} />

        {/* Orbit ring */}
        <div className="absolute -inset-8 rounded-full border border-cyan-500/10 animate-spin-slow" />
      </div>
    </div>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } }
};

export default function Home() {
  const { language, t } = useLanguage();

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <WebGLErrorBoundary fallback={<EarthFallback />}>
          <Suspense fallback={<EarthFallback />}>
            <div className="absolute inset-0 z-0">
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Earth />
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
              </Canvas>
            </div>
          </Suspense>
        </WebGLErrorBoundary>

        {/* Gradient overlay */}
        <div className="absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/70 to-transparent pointer-events-none" />

        <div className="container mx-auto px-6 md:px-12 relative z-10">
          <motion.div
            className="max-w-3xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants} className="mb-3">
              <span className="text-xs font-semibold tracking-[0.3em] uppercase text-accent/80">
                {language === 'ar' ? 'موقع الفضاء التعليمي' : 'Space Education Portal'}
              </span>
            </motion.div>

            <motion.h1 variants={itemVariants} className="text-5xl md:text-7xl font-black tracking-tight leading-tight mb-4">
              {language === 'ar' ? (
                <>
                  <span className="block text-white drop-shadow-2xl">استكشف</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-violet-400 drop-shadow-2xl">الكون</span>
                </>
              ) : (
                <>
                  <span className="block text-white drop-shadow-2xl">Explore The</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-violet-400 drop-shadow-2xl">Universe</span>
                </>
              )}
            </motion.h1>

            {language === 'ar' && (
              <motion.h2 variants={itemVariants} className="text-2xl md:text-3xl font-bold text-white/60 mb-4 tracking-wide">
                Explore The Universe
              </motion.h2>
            )}

            <motion.p variants={itemVariants} className="text-lg md:text-xl text-gray-300 mb-10 max-w-xl font-light leading-relaxed">
              {language === 'ar'
                ? 'اكتشف الكواكب والمجرات والثقوب السوداء والنجوم وأسرار الفضاء.'
                : 'Discover planets, galaxies, black holes, stars and the mysteries of space.'}
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/solar-system" className="inline-block px-8 py-4 bg-primary text-white rounded-full font-bold tracking-wider shadow-[0_0_25px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.6)] transition-shadow">
                  {t.hero.startLearning}
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link href="/galaxies" className="inline-block px-8 py-4 glass-card border border-white/20 text-white rounded-full font-bold tracking-wider hover:bg-white/10 transition-colors">
                  {t.hero.exploreUniverse}
                </Link>
              </motion.div>
            </motion.div>

            {/* Stats row */}
            <motion.div variants={itemVariants} className="mt-16 flex flex-wrap gap-8">
              {[
                { en: '8 Planets', ar: '8 كواكب', sub: language === 'ar' ? 'في النظام الشمسي' : 'in the Solar System' },
                { en: '200+ Billion', ar: '200+ مليار', sub: language === 'ar' ? 'نجم في مجرتنا' : 'stars in our galaxy' },
                { en: '13.8 Billion', ar: '13.8 مليار', sub: language === 'ar' ? 'سنة عمر الكون' : 'years old universe' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-xl font-black text-accent">{language === 'ar' ? stat.ar : stat.en}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{stat.sub}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <span className="text-xs tracking-widest uppercase">{language === 'ar' ? 'مرر للأسفل' : 'Scroll'}</span>
          <motion.div
            className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent"
            animate={{ scaleY: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* Featured Planets */}
      <motion.section
        className="py-24 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <p className="text-accent text-xs font-semibold tracking-[0.3em] uppercase mb-3">
              {language === 'ar' ? 'جارنا في الكون' : 'Our Cosmic Neighborhood'}
            </p>
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              {language === 'ar' ? 'النظام الشمسي' : 'The Solar System'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {planets.slice(2, 5).map((planet, idx) => (
              <PlanetCard key={planet.id} planet={planet} index={idx} />
            ))}
          </div>

          <div className="text-center mt-12">
            <motion.div whileHover={{ scale: 1.05 }} className="inline-block">
              <Link href="/solar-system" className="inline-block px-8 py-3 rounded-full border border-accent/50 text-accent font-medium hover:bg-accent hover:text-white transition-colors">
                {language === 'ar' ? 'عرض كل الكواكب' : 'View All Planets'}
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Sections grid */}
      <motion.section
        className="py-16 relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4">
              {language === 'ar' ? 'استكشف الكون' : 'Explore the Cosmos'}
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-violet-500 to-primary mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { href: '/galaxies', en: 'Galaxies', ar: 'المجرات', desc: { en: 'Journey through vast island universes spanning millions of light-years', ar: 'رحلة عبر مجرات شاسعة تمتد لملايين السنوات الضوئية' }, color: 'from-violet-500/20 to-purple-900/10', border: 'border-violet-500/20', glow: 'shadow-[0_0_30px_rgba(139,92,246,0.1)]' },
              { href: '/stars', en: 'Stars', ar: 'النجوم', desc: { en: 'Discover stellar life cycles from birth in nebulae to supernova death', ar: 'اكتشف دورة حياة النجوم من الولادة حتى الانفجار العظيم' }, color: 'from-yellow-500/20 to-orange-900/10', border: 'border-yellow-500/20', glow: 'shadow-[0_0_30px_rgba(234,179,8,0.1)]' },
              { href: '/black-holes', en: 'Black Holes', ar: 'الثقوب السوداء', desc: { en: 'Peer into the most extreme objects in the known universe', ar: 'انظر إلى أشد الأجسام تطرفًا في الكون المعروف' }, color: 'from-gray-700/20 to-gray-900/10', border: 'border-gray-600/20', glow: 'shadow-[0_0_30px_rgba(107,114,128,0.1)]' },
              { href: '/missions', en: 'Space Missions', ar: 'مهمات الفضاء', desc: { en: 'Follow humanity\'s greatest adventures beyond Earth\'s atmosphere', ar: 'تابع أعظم مغامرات البشرية خارج الغلاف الجوي للأرض' }, color: 'from-blue-500/20 to-cyan-900/10', border: 'border-blue-500/20', glow: 'shadow-[0_0_30px_rgba(59,130,246,0.1)]' },
              { href: '/universe-timeline', en: 'Universe Timeline', ar: 'الجدول الزمني للكون', desc: { en: 'Trace 13.8 billion years of cosmic history from the Big Bang to now', ar: 'تتبع 13.8 مليار سنة من تاريخ الكون من الانفجار العظيم حتى الآن' }, color: 'from-pink-500/20 to-rose-900/10', border: 'border-pink-500/20', glow: 'shadow-[0_0_30px_rgba(236,72,153,0.1)]' },
              { href: '/quiz', en: 'Space Quiz', ar: 'اختبار الفضاء', desc: { en: 'Test your cosmic knowledge with our interactive space quiz', ar: 'اختبر معرفتك الكونية مع اختبارنا التفاعلي للفضاء' }, color: 'from-emerald-500/20 to-teal-900/10', border: 'border-emerald-500/20', glow: 'shadow-[0_0_30px_rgba(16,185,129,0.1)]' },
            ].map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
              >
                <Link
                  href={item.href}
                  className={`block glass-card bg-gradient-to-br ${item.color} border ${item.border} ${item.glow} p-8 rounded-2xl transition-all duration-300 group h-full`}
                >
                  <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                    {language === 'ar' ? item.ar : item.en}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    {language === 'ar' ? item.desc.ar : item.desc.en}
                  </p>
                  <div className="mt-6 text-xs font-semibold tracking-wider text-accent/60 group-hover:text-accent transition-colors">
                    {language === 'ar' ? 'استكشف ←' : 'Explore →'}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>
    </div>
  );
}
