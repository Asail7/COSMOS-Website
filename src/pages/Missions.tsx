import { missions } from '../data/missions';
import { MissionCard } from '../components/MissionCard';
import { useLanguage } from '../hooks/useLanguage';

export default function Missions() {
  const { language } = useLanguage();

  return (
    <div className="container mx-auto px-6 md:px-12 py-12 relative z-10">
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-6xl font-black mb-6">
          {language === 'ar' ? 'المهمات الفضائية' : 'Space Missions'}
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {language === 'ar' 
            ? 'أعظم إنجازات البشرية في استكشاف الكون المجهول.'
            : 'Humanity\'s greatest achievements in exploring the unknown cosmos.'}
        </p>
      </div>

      <div className="max-w-4xl mx-auto space-y-6">
        {missions.map((mission, idx) => (
          <MissionCard key={mission.id} mission={mission} index={idx} />
        ))}
      </div>
    </div>
  );
}
