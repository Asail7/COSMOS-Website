import { useRoute } from 'wouter';
import { planets } from '../data/planets';
import { useLanguage } from '../hooks/useLanguage';

export default function PlanetDetail() {
  const [match, params] = useRoute('/planets/:id');
  const { language, t } = useLanguage();
  
  if (!match || !params?.id) return null;
  
  const planet = planets.find(p => p.id === params.id);
  
  if (!planet) {
    return <div className="pt-32 text-center text-2xl">Planet not found</div>;
  }

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-4" style={{ color: planet.color }}>
          {language === 'ar' ? planet.arabicName : planet.name}
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground mb-12">
          {language === 'ar' ? planet.arabicDescription : planet.description}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">
              {language === 'ar' ? 'الخصائص الفيزيائية' : 'Physical Properties'}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{t.common.distance}</span>
                <span className="font-medium text-right rtl:text-left">{planet.distanceFromSun}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{t.common.diameter}</span>
                <span className="font-medium text-right rtl:text-left">{planet.diameter}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{t.common.mass}</span>
                <span className="font-medium text-right rtl:text-left">{planet.mass}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{t.common.gravity}</span>
                <span className="font-medium text-right rtl:text-left">{planet.gravity}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{t.common.temperature}</span>
                <span className="font-medium text-right rtl:text-left">{planet.temperature}</span>
              </div>
              <div className="flex justify-between items-center text-lg">
                <span className="text-muted-foreground">{t.common.moons}</span>
                <span className="font-medium text-right rtl:text-left">{planet.moons}</span>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold mb-6 border-b border-white/10 pb-4">
              {language === 'ar' ? 'الغلاف الجوي' : 'Atmosphere'}
            </h3>
            <p className="text-lg leading-relaxed text-muted-foreground">
              {planet.atmosphere}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
