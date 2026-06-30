import { useLanguageContext } from '../context/LanguageContext';
import { translations } from '../i18n/translations';

export function useLanguage() {
  const { language, setLanguage, dir } = useLanguageContext();
  const t = translations[language];

  return { language, setLanguage, dir, t };
}
