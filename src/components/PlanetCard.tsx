import { Link } from 'wouter';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface PlanetCardProps {
  planet: any;
  index: number;
}

function getPlanetStyle(id: string): { background: string; boxShadow: string; extra?: React.CSSProperties } {
  switch (id) {
    case 'mercury':
      return {
        background: `
          radial-gradient(circle at 30% 30%, #d4d0cc 0%, #b5b2ae 20%, #8a8784 45%, #6b6866 70%, #3d3b39 100%)
        `,
        boxShadow: `0 0 18px rgba(181,178,174,0.3), inset -14px -14px 28px rgba(0,0,0,0.7), inset 4px 4px 12px rgba(255,255,255,0.15)`
      };
    case 'venus':
      return {
        background: `
          radial-gradient(circle at 35% 25%, #f5e6b0 0%, #e8cda0 15%, #d4a84b 35%, #c49020 55%, #8a5a0a 80%, #4a2e05 100%)
        `,
        boxShadow: `0 0 22px rgba(232,205,160,0.4), inset -14px -14px 28px rgba(0,0,0,0.65), inset 3px 3px 10px rgba(255,240,180,0.25)`
      };
    case 'earth':
      return {
        background: `
          radial-gradient(circle at 65% 20%, rgba(255,255,255,0.6) 0%, transparent 15%),
          radial-gradient(circle at 30% 65%, rgba(255,255,255,0.4) 0%, transparent 12%),
          radial-gradient(circle at 55% 55%, #2d6a4f 0%, #1a6b8a 30%, #1557a0 55%, #0d3d6b 75%, #071e3d 100%)
        `,
        boxShadow: `0 0 28px rgba(6,182,212,0.4), inset -14px -14px 28px rgba(0,0,0,0.55), inset 3px 3px 10px rgba(100,200,255,0.2)`
      };
    case 'mars':
      return {
        background: `
          radial-gradient(ellipse at 50% 15%, rgba(220,200,190,0.5) 0%, transparent 20%),
          radial-gradient(circle at 32% 30%, #d4603a 0%, #c1440e 25%, #a33008 50%, #7a1e04 75%, #4a0e02 100%)
        `,
        boxShadow: `0 0 20px rgba(193,68,14,0.35), inset -14px -14px 28px rgba(0,0,0,0.65), inset 3px 3px 10px rgba(255,140,100,0.2)`
      };
    case 'jupiter':
      return {
        background: `
          radial-gradient(circle at 30% 28%, #e8d5b0 0%, transparent 15%),
          repeating-linear-gradient(
            180deg,
            #c88b3a 0px, #d4a055 8px,
            #b87030 8px, #8a5020 16px,
            #d8c090 16px, #e0c878 22px,
            #c07828 22px, #a06020 30px,
            #d4a050 30px, #c89040 38px,
            #8a5018 38px, #703010 46px,
            #c8a050 46px, #c88b3a 54px
          )
        `,
        boxShadow: `0 0 26px rgba(200,139,58,0.35), inset -14px -14px 28px rgba(0,0,0,0.6), inset 3px 3px 10px rgba(255,220,150,0.15)`
      };
    case 'saturn':
      return {
        background: `
          radial-gradient(circle at 32% 28%, #f0e5c0 0%, transparent 12%),
          repeating-linear-gradient(
            180deg,
            #e8d5a3 0px, #d4bc7a 10px,
            #c8a850 10px, #b89040 18px,
            #e0cc90 18px, #d4b870 26px,
            #b89040 26px, #a07830 34px,
            #dcc880 34px, #e8d5a3 42px
          )
        `,
        boxShadow: `0 0 22px rgba(232,213,163,0.35), inset -14px -14px 28px rgba(0,0,0,0.55), inset 3px 3px 10px rgba(255,240,180,0.2)`
      };
    case 'uranus':
      return {
        background: `
          radial-gradient(circle at 35% 30%, #b8f0f0 0%, #7de8e8 20%, #4ad4d4 45%, #20b0b0 65%, #0a7878 85%, #054040 100%)
        `,
        boxShadow: `0 0 22px rgba(125,232,232,0.35), inset -14px -14px 28px rgba(0,0,0,0.6), inset 3px 3px 10px rgba(180,255,255,0.2)`
      };
    case 'neptune':
      return {
        background: `
          radial-gradient(circle at 32% 28%, #6090e0 0%, transparent 12%),
          radial-gradient(circle at 55% 60%, rgba(100,160,255,0.3) 0%, transparent 20%),
          radial-gradient(circle at 30% 30%, #5070d0 0%, #3f54ba 30%, #2a3a9a 55%, #1a2878 75%, #0a1550 100%)
        `,
        boxShadow: `0 0 22px rgba(63,84,186,0.4), inset -14px -14px 28px rgba(0,0,0,0.65), inset 3px 3px 10px rgba(120,160,255,0.2)`
      };
    case 'pluto':
      return {
        background: `
          radial-gradient(circle at 30% 30%, #e8ddd0 0%, #d4c5a9 25%, #b8a880 50%, #8c7a58 75%, #5a4a30 100%)
        `,
        boxShadow: `0 0 14px rgba(212,197,169,0.25), inset -14px -14px 28px rgba(0,0,0,0.7), inset 3px 3px 10px rgba(255,240,210,0.15)`
      };
    default:
      return {
        background: `radial-gradient(circle at 30% 30%, #aaa, #333)`,
        boxShadow: `0 0 20px rgba(150,150,150,0.3), inset -10px -10px 20px rgba(0,0,0,0.5)`
      };
  }
}

export function PlanetCard({ planet, index }: PlanetCardProps) {
  const { language } = useLanguage();
  const name = language === 'ar' ? planet.arabicName : planet.name;
  const description = language === 'ar' ? planet.arabicDescription : planet.description;
  const style = getPlanetStyle(planet.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass-card p-6 flex flex-col items-center text-center cursor-pointer group"
    >
      <div className="relative mb-6">
        {/* Glow behind planet */}
        <div
          className="absolute inset-0 rounded-full blur-xl opacity-40 scale-110"
          style={{ background: planet.color }}
        />
        {/* Planet sphere */}
        <div
          className="w-28 h-28 rounded-full relative overflow-hidden"
          style={{
            background: style.background,
            boxShadow: style.boxShadow,
          }}
        >
          {/* Specular highlight */}
          <div className="absolute top-[10%] left-[12%] w-[35%] h-[25%] rounded-full bg-white/20 blur-md" />
          <div className="absolute top-[8%] left-[15%] w-[15%] h-[12%] rounded-full bg-white/40 blur-sm" />

          {/* Saturn rings overlay */}
          {planet.id === 'saturn' && (
            <div
              className="absolute -inset-x-8 top-1/2 -translate-y-1/2 h-4"
              style={{
                background: 'linear-gradient(90deg, transparent 0%, rgba(232,213,163,0.3) 20%, rgba(200,168,80,0.6) 40%, rgba(232,213,163,0.7) 50%, rgba(200,168,80,0.6) 60%, rgba(232,213,163,0.3) 80%, transparent 100%)',
                transform: 'translateY(-50%) scaleY(0.3) rotate(-10deg)',
                borderRadius: '50%',
              }}
            />
          )}
        </div>

        {/* Saturn ring (external arc) */}
        {planet.id === 'saturn' && (
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              width: '148px',
              height: '148px',
              border: '5px solid transparent',
              borderRadius: '50%',
              borderTop: '5px solid rgba(232,213,163,0.4)',
              borderBottom: '5px solid rgba(232,213,163,0.4)',
              transform: 'translate(-50%, -50%) rotateX(75deg)',
            }}
          />
        )}
      </div>

      <h3 className="text-xl font-bold mb-2 tracking-wider" style={{ color: planet.color }}>{name}</h3>
      <p className="text-sm text-muted-foreground mb-6 flex-grow">{description}</p>

      <Link
        href={`/planets/${planet.id}`}
        className="px-6 py-2 rounded-full border border-white/20 hover:bg-white/10 transition-colors text-sm font-medium"
      >
        {language === 'ar' ? 'اكتشف المزيد' : 'Explore More'}
      </Link>
    </motion.div>
  );
}
