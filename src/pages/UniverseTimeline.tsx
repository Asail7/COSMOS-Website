import { timeline } from '../data/timeline';
import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'framer-motion';

export default function UniverseTimeline() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          {language === 'ar' ? 'الجدول الزمني للكون' : 'Universe Timeline'}
        </h1>
      </div>

      <div className="relative max-w-4xl mx-auto">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-px h-full bg-white/10" />
        
        <div className="space-y-12">
          {timeline.map((event, idx) => {
            const isLeft = idx % 2 === 0;
            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`flex justify-between items-center w-full ${isLeft ? 'flex-row-reverse' : ''}`}
              >
                <div className="w-5/12" />
                <div className="z-20">
                  <div className="w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_#06b6d4]" />
                </div>
                <div className="w-5/12 glass-card p-6 hover:scale-105 transition-transform cursor-default">
                  <span className="text-accent font-mono text-sm tracking-wider">{event.year}</span>
                  <h3 className="text-xl font-bold mt-2 mb-2">
                    {language === 'ar' ? event.titleAr : event.titleEn}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {language === 'ar' ? event.descriptionAr : event.descriptionEn}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
