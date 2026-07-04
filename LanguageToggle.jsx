import { useI18n } from '@/lib/i18n';

export default function LanguageToggle() {
  const { language, setLanguage } = useI18n();

  return (
    <div className="inline-flex items-center gap-0.5 rounded-full border border-[#DBCAC0] bg-[#F0E6DE] p-0.5">
      <button
        onClick={() => setLanguage('nl')}
        aria-label="Switch to Dutch"
        className={`select-none rounded-full px-4 py-2 text-xs font-medium tracking-wider transition-all ${
          language === 'nl' ? 'bg-[#7D263D] text-white' : 'text-[#8A7F76]'
        }`}
      >
        NL
      </button>
      <button
        onClick={() => setLanguage('en')}
        aria-label="Switch to English"
        className={`select-none rounded-full px-4 py-2 text-xs font-medium tracking-wider transition-all ${
          language === 'en' ? 'bg-[#7D263D] text-white' : 'text-[#8A7F76]'
        }`}
      >
        EN
      </button>
    </div>
  );
}
