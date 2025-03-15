
import { useContext } from 'react';
import { useTheme } from '@/store/ThemeContext';

// Simple translations for demo
const translations = {
  english: {
    "dashboard.title": "NGO Dashboard",
    "dashboard.refresh": "Refresh",
    "settings.title": "Settings",
    "settings.back": "Back",
    "settings.customize": "Customize your experience",
    "settings.notifications": "Notifications",
    "settings.notifications.desc": "Configure how you receive notifications",
    "settings.newDonations": "New Donations",
    "settings.newDonations.desc": "Get notified when new donations are available",
    "settings.expiringSoon": "Expiring Soon",
    "settings.expiringSoon.desc": "Get notified when donations are about to expire",
    "settings.dailyDigest": "Daily Digest",
    "settings.dailyDigest.desc": "Receive a daily summary of available donations",
    "settings.display": "Display",
    "settings.display.desc": "Customize the appearance of the app",
    "settings.distanceUnit": "Distance Unit",
    "settings.distanceUnit.desc": "Choose your preferred distance unit",
    "settings.kilometers": "Kilometers",
    "settings.miles": "Miles",
    "settings.language": "Language",
    "settings.language.desc": "Choose your preferred language",
    "settings.darkMode": "Dark Mode",
    "settings.darkMode.desc": "Toggle dark mode for better visibility in low light"
  },
  hindi: {
    "dashboard.title": "एनजीओ डैशबोर्ड",
    "dashboard.refresh": "रिफ्रेश",
    "settings.title": "सेटिंग्स",
    "settings.back": "वापस",
    "settings.customize": "अपने अनुभव को अनुकूलित करें",
    "settings.notifications": "सूचनाएँ",
    "settings.notifications.desc": "आप कैसे सूचनाएं प्राप्त करते हैं, कॉन्फ़िगर करें",
    "settings.newDonations": "नए दान",
    "settings.newDonations.desc": "जब नए दान उपलब्ध हों तो सूचित किया जाए",
    "settings.expiringSoon": "जल्द समाप्त होने वाले",
    "settings.expiringSoon.desc": "जब दान समाप्त होने वाले हों तो सूचित किया जाए",
    "settings.dailyDigest": "दैनिक सारांश",
    "settings.dailyDigest.desc": "उपलब्ध दान का दैनिक सारांश प्राप्त करें",
    "settings.display": "प्रदर्शन",
    "settings.display.desc": "ऐप की उपस्थिति को अनुकूलित करें",
    "settings.distanceUnit": "दूरी इकाई",
    "settings.distanceUnit.desc": "अपनी पसंदीदा दूरी इकाई चुनें",
    "settings.kilometers": "किलोमीटर",
    "settings.miles": "मील",
    "settings.language": "भाषा",
    "settings.language.desc": "अपनी पसंदीदा भाषा चुनें",
    "settings.darkMode": "डार्क मोड",
    "settings.darkMode.desc": "कम प्रकाश में बेहतर दृश्यता के लिए डार्क मोड टॉगल करें"
  }
};

export const useTranslation = () => {
  const { language } = useTheme();
  
  // Default to English if the language is not supported
  const currentLanguage = translations[language] ? language : 'english';
  
  const t = (key) => {
    return translations[currentLanguage][key] || translations.english[key] || key;
  };
  
  return { t };
};
