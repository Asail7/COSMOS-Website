import { useLanguage } from '../hooks/useLanguage';

export default function BlackHoles() {
  const { language } = useLanguage();
  return (
    <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          {language === 'ar' ? 'الثقوب السوداء' : 'Black Holes'}
        </h1>
      </div>
      <div className="glass-card p-12 text-center max-w-4xl mx-auto">
        <h2 className="text-2xl mb-4 text-purple-400">The Ultimate Mystery</h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          {language === 'ar' 
            ? 'الجاذبية الشديدة التي لا يستطيع حتى الضوء الهروب منها. (المحتوى قريباً)'
            : 'Extreme gravity from which not even light can escape. Event horizons and singularities await. (Content coming soon)'}
        </p>
      </div>
    </div>
  );
}
