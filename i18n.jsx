import React, { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  nl: {
    common: {
      profile: 'Profiel',
      back: 'Terug',
    },
    onboarding: {
      title1: 'Jouw rustige',
      title2: 'zwangerschapsreis',
      body: 'Volg je baby per week, bekijk de groei en bewaar je voorkeuren veilig op dit apparaat.',
      motherAppearance: 'Uiterlijk moeder',
      lightSkin: 'Lichte huid',
      darkSkin: 'Donkere huid',
      notPregnant: 'Niet zwanger',
      pregnant: 'Zwanger',
      dueDate: 'Uitgerekende datum',
      getStarted: 'Starten',
    },
    home: {
      greeting: 'Vandaag in je zwangerschap',
      title1: 'Groei, liefde',
      title2: 'en rust',
      noPregnancy: 'Welkom bij BEBIKO',
      setupPregnancy: 'Vul eerst je gegevens in om je weekoverzicht te maken.',
      completedWeek: 'Voltooide week',
      babyToday: 'Baby vandaag',
      weeklyDevelopment: 'Ontwikkeling deze week',
      viewWeek: 'Bekijk week',
      yourBody: 'Jouw lichaam',
      yourBodyHint: 'Elke zwangerschap is anders. Neem contact op met je zorgverlener bij twijfel.',
      symptoms: 'Mogelijke symptomen',
      exploreWeeks: 'Bekijk alle weken',
      deliveryWeek: 'weken',
      week: 'Week',
    },
    weekDetail: {
      weekOf40: 'Week {n} van 40',
      babyGrowth: 'Babygroei',
      development: 'Ontwikkeling',
      symptoms: 'Symptomen',
      previousWeek: 'Vorige',
      nextWeek: 'Volgende',
      sizeComparison: 'Vergelijking',
      approx: 'ongeveer',
    },
    errors: {
      notFoundTitle: 'Pagina niet gevonden',
      notFoundText: 'Deze pagina bestaat niet of is verplaatst.',
      goHome: 'Naar start',
      notRegistered: 'Gebruiker niet geregistreerd',
    },
  },
  en: {
    common: {
      profile: 'Profile',
      back: 'Back',
    },
    onboarding: {
      title1: 'Your calm',
      title2: 'pregnancy journey',
      body: 'Follow your baby week by week, view growth and keep your preferences safely on this device.',
      motherAppearance: 'Mother appearance',
      lightSkin: 'Light skin',
      darkSkin: 'Dark skin',
      notPregnant: 'Not pregnant',
      pregnant: 'Pregnant',
      dueDate: 'Due date',
      getStarted: 'Get started',
    },
    home: {
      greeting: 'Today in your pregnancy',
      title1: 'Growth, love',
      title2: 'and calm',
      noPregnancy: 'Welcome to BEBIKO',
      setupPregnancy: 'Fill in your details first to create your week overview.',
      completedWeek: 'Completed week',
      babyToday: 'Baby today',
      weeklyDevelopment: 'Development this week',
      viewWeek: 'View week',
      yourBody: 'Your body',
      yourBodyHint: 'Every pregnancy is different. Contact your care provider when in doubt.',
      symptoms: 'Possible symptoms',
      exploreWeeks: 'Explore all weeks',
      deliveryWeek: 'weeks',
      week: 'Week',
    },
    weekDetail: {
      weekOf40: 'Week {n} of 40',
      babyGrowth: 'Baby growth',
      development: 'Development',
      symptoms: 'Symptoms',
      previousWeek: 'Previous',
      nextWeek: 'Next',
      sizeComparison: 'Comparison',
      approx: 'around',
    },
    errors: {
      notFoundTitle: 'Page not found',
      notFoundText: 'This page does not exist or has moved.',
      goHome: 'Go home',
      notRegistered: 'User not registered',
    },
  },
};

const I18nContext = createContext(null);

function getSavedLanguage() {
  if (typeof window === 'undefined') return 'nl';
  return localStorage.getItem('bebiko_language') || 'nl';
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(getSavedLanguage);

  const setLanguage = (nextLanguage) => {
    const safeLanguage = nextLanguage === 'en' ? 'en' : 'nl';
    setLanguageState(safeLanguage);
    localStorage.setItem('bebiko_language', safeLanguage);
  };

  const value = useMemo(() => ({
    language,
    setLanguage,
    t: (key) => key.split('.').reduce((obj, part) => obj?.[part], translations[language]) || key,
  }), [language]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
}
