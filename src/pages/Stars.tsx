import { useLanguage } from '../hooks/useLanguage';

export default function Stars() {
  const { language } = useLanguage();
  return (
    <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          {language === 'ar' ? 'النجوم' : 'Stars'}
        </h1>
      </div>
      <div className="glass-card p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl mb-4 text-accent">Stellar Evolution</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {language === 'ar' 
            ? 'النجوم تولد وتعيش وتموت. من السدم إلى الثقوب السوداء، استكشف دورة حياة النجوم هنا قريبًا.'
            : 'Stars are born, live, and die. From nebulas to black holes, explore the lifecycle of stars. (Content coming soon)'}
        </p>
      </div>
    </div>
  );
}
