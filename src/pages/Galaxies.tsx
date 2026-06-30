import { galaxies } from '../data/galaxies';
import { GalaxyCard } from '../components/GalaxyCard';
import { useLanguage } from '../hooks/useLanguage';

export default function Galaxies() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          {language === 'ar' ? 'المجرات' : 'Galaxies'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'استكشف هذه المدن النجمية الهائلة التي تتكون من مليارات النجوم.'
            : 'Explore these massive island universes consisting of billions of stars.'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galaxies.map((galaxy, idx) => (
          <GalaxyCard key={galaxy.id} galaxy={galaxy} index={idx} />
        ))}
      </div>
    </div>
  );
}
