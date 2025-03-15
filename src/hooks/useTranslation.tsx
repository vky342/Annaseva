
import { useTheme } from '@/store/ThemeContext';
import { getTranslation } from '@/lib/translations';

export const useTranslation = () => {
  const { language } = useTheme();
  
  const t = (key: string): string => {
    return getTranslation(key, language);
  };
  
  return { t };
};
