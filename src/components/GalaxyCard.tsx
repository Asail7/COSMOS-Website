import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';

interface GalaxyCardProps {
  galaxy: any;
  index: number;
}

export function GalaxyCard({ galaxy, index }: GalaxyCardProps) {
  const { language, t } = useLanguage();
  const name = language === 'ar' ? galaxy.arabicName : galaxy.name;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="glass-card p-6 group hover:border-white/30 transition-colors"
    >
      <h3 className="text-2xl font-bold mb-2 tracking-wider" style={{ color: galaxy.color }}>{name}</h3>
      <div className="h-px w-full bg-white/10 my-4 group-hover:bg-white/20 transition-colors" />
      
      <div className="space-y-3">
        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
          <span className="text-muted-foreground">{t.common.distance}</span>
          <span className="font-medium text-right rtl:text-left">{galaxy.distance}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
          <span className="text-muted-foreground">{t.common.diameter}</span>
          <span className="font-medium text-right rtl:text-left">{galaxy.diameter}</span>
        </div>
        <div className="flex justify-between items-center text-sm border-b border-white/5 pb-2">
          <span className="text-muted-foreground">Stars</span>
          <span className="font-medium text-right rtl:text-left">{galaxy.stars}</span>
        </div>
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground">Type</span>
          <span className="font-medium text-right rtl:text-left">{galaxy.type}</span>
        </div>
      </div>
    </motion.div>
  );
}
