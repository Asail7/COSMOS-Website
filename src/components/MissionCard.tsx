import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface MissionCardProps {
  mission: any;
  index: number;
}

export function MissionCard({ mission, index }: MissionCardProps) {
  const { dir } = useLanguage();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: dir === 'rtl' ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="flex flex-col md:flex-row gap-6 glass-card p-6 md:items-center relative"
    >
      <div className="md:w-32 flex-shrink-0">
        <div className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-br from-primary to-accent">
          {mission.year}
        </div>
        <div className="text-xs tracking-widest text-muted-foreground mt-1 uppercase">
          {mission.agency}
        </div>
      </div>
      
      <div className="h-full w-px bg-white/10 hidden md:block" />
      
      <div className="flex-grow">
        <h3 className="text-xl font-bold text-white mb-2">{mission.name}</h3>
        <p className="text-muted-foreground leading-relaxed text-sm">
          {mission.achievement}
        </p>
      </div>
    </motion.div>
  );
}
