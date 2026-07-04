import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import { getWeekData, pregnancyWeeks } from '@/data/pregnancyWeeks';
import LanguageToggle from '@/components/LanguageToggle';
import WomanFigure from '@/components/WomanFigure';
import { ChevronRight, Baby, User } from 'lucide-react';

const HERO = 'https://images.unsplash.com/photo-1544717297-fa95b6ee9643?auto=format&fit=crop&w=900&q=80';

function calcWeek(dueDate) {
  if (!dueDate) return 11;
  const due = new Date(dueDate);
  const now = new Date();
  const daysLeft = Math.ceil((due - now) / (1000 * 60 * 60 * 24));
  const week = 40 - Math.floor(daysLeft / 7);
  return Math.max(1, Math.min(40, week));
}

export default function Home() {
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const [pregnancy, setPregnancy] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const touchStartY = useRef(null);

  const loadPregnancy = async () => {
    const list = await base44.entities.Pregnancy.list('-created_date', 1);
    if (list && list.length > 0) setPregnancy(list[0]);
  };

  useEffect(() => {
    (async () => {
      try {
        await loadPregnancy();
      } catch {
        setPregnancy(null);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const currentWeek = pregnancy?.is_pregnant ? calcWeek(pregnancy.due_date) : 11;
  const weekData = getWeekData(currentWeek);
  const progress = (currentWeek / 40) * 100;
  const skinTone = pregnancy?.skin_tone || 'light';

  const handleSkinTone = async (tone) => {
    setPregnancy((p) => ({ ...p, skin_tone: tone }));
    if (pregnancy?.id) {
      try {
        await base44.entities.Pregnancy.update(pregnancy.id, { skin_tone: tone });
      } catch {
        // Local update remains visible even if persistence fails.
      }
    }
  };

  const handleTouchStart = (event) => {
    const y = event.touches[0].clientY;
    touchStartY.current = window.scrollY === 0 && y < 80 ? y : null;
  };

  const handleTouchEnd = async (event) => {
    if (touchStartY.current == null) return;
    const delta = event.changedTouches[0].clientY - touchStartY.current;
    touchStartY.current = null;
    if (delta > 60) {
      setRefreshing(true);
      try {
        await loadPregnancy();
      } catch {
        // Keep existing data.
      } finally {
        setRefreshing(false);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0EB]">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#DBCAC0] border-t-[#7D263D]" />
      </div>
    );
  }

  if (!pregnancy) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F0EB] px-6 text-center">
        <Baby className="mb-4 h-14 w-14 text-[#C98A9A]" />
        <h2 className="mb-2 font-heading text-xl text-[#2C2825]">{t('home.noPregnancy')}</h2>
        <p className="mb-6 text-sm text-[#8A7F76]">{t('home.setupPregnancy')}</p>
        <button onClick={() => navigate('/onboarding')} className="rounded-xl bg-[#7D263D] px-8 py-3 font-medium text-white shadow-sm">
          {t('onboarding.getStarted')}
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F0EB]">
      <div className="flex items-center justify-between px-6 py-5 pt-[env(safe-area-inset-top)]">
        <span className="font-heading text-xl tracking-[0.3em] text-[#7D263D]">BEBIKO</span>
        <div className="flex items-center gap-2">
          <button onClick={() => navigate('/profile')} aria-label="Profile" className="select-none rounded-full border border-[#DBCAC0] bg-white p-2">
            <User className="h-4 w-4 text-[#2C2825]" />
          </button>
          <LanguageToggle />
        </div>
      </div>

      <div className="mx-auto max-w-md px-6 pb-10" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        {refreshing && (
          <div className="flex justify-center py-3">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-[#DBCAC0] border-t-[#7D263D]" />
          </div>
        )}

        <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8A7F76]">{t('home.greeting')}</p>

        <div className="mb-5 grid grid-cols-5 gap-3">
          <div className="relative col-span-3 overflow-hidden rounded-2xl border border-[#DBCAC0] shadow-soft">
            <img src={HERO} alt="Pregnancy" className="h-48 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/55 via-transparent to-transparent" />
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h2 className="font-heading text-lg leading-tight">{t('home.title1')}</h2>
              <h2 className="font-heading text-lg italic">{t('home.title2')}</h2>
            </div>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center rounded-2xl border border-[#DBCAC0] bg-white p-3 shadow-soft">
            <WomanFigure skinTone={skinTone} onChange={handleSkinTone} />
          </div>
        </div>

        <div className="mb-3 grid grid-cols-2 gap-3">
          <div className="rounded-2xl border border-[#DBCAC0] bg-white p-4">
            <div className="text-[10px] uppercase tracking-wider text-[#8A7F76]">{t('home.completedWeek')}</div>
            <div className="mt-1 font-heading text-3xl text-[#2C2825]">
              {currentWeek}<span className="text-base text-[#8A7F76]">/40</span>
            </div>
            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#F0E6DE]">
              <div className="h-full rounded-full bg-gradient-to-r from-[#C98A9A] to-[#7D263D]" style={{ width: `${progress}%` }} />
            </div>
          </div>
          <div className="flex flex-col rounded-2xl border border-[#DBCAC0] bg-white p-4">
            <div className="text-[10px] uppercase tracking-wider text-[#8A7F76]">{t('home.babyToday')}</div>
            <div className="mt-2 flex flex-1 items-center gap-2">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#E8C5C0] to-[#C98A9A] text-xl text-white">{weekData.emoji}</div>
              <div>
                <div className="text-sm font-medium capitalize text-[#2C2825]">{weekData.fruit[language]}</div>
                <div className="text-xs text-[#8A7F76]">{weekData.length} · {weekData.weight}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-3 rounded-2xl border border-[#DBCAC0] bg-white p-5">
          <h3 className="mb-3 font-heading text-lg text-[#2C2825]">{t('home.weeklyDevelopment')}</h3>
          <ul className="space-y-2.5">
            {weekData.development[language].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7D263D]" />
                <span className="text-sm leading-relaxed text-[#2C2825]">{item}</span>
              </li>
            ))}
          </ul>
          <button onClick={() => navigate(`/week/${currentWeek}`)} className="mt-4 flex w-full items-center justify-center gap-1.5 rounded-xl bg-[#7D263D] py-2.5 text-sm font-medium text-white">
            {t('home.viewWeek')} <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        <div className="mb-3 rounded-2xl border border-[#DBCAC0] bg-white p-5">
          <h3 className="mb-1 font-heading text-lg text-[#2C2825]">{t('home.yourBody')}</h3>
          <p className="mb-3 text-[11px] text-[#8A7F76]">{t('home.yourBodyHint')}</p>
          <ul className="space-y-2.5">
            {weekData.body[language].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C98A9A]" />
                <span className="text-sm leading-relaxed text-[#2C2825]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-3 rounded-2xl border border-[#DBCAC0] bg-white p-5">
          <h3 className="mb-3 font-heading text-lg text-[#2C2825]">{t('home.symptoms')}</h3>
          <div className="flex flex-wrap gap-2">
            {weekData.symptoms[language].map((item) => (
              <span key={item} className="rounded-full border border-[#DBCAC0] bg-[#F0E6DE] px-3 py-1.5 text-sm text-[#7D263D]">{item}</span>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-[#DBCAC0] bg-white p-5">
          <h3 className="mb-3 font-heading text-lg text-[#2C2825]">{t('home.exploreWeeks')}</h3>
          <div className="grid grid-cols-5 gap-2">
            {pregnancyWeeks.map((w) => (
              <button
                key={w.week}
                onClick={() => navigate(`/week/${w.week}`)}
                aria-label={`View week ${w.week}`}
                className={`aspect-square min-h-[44px] select-none rounded-lg text-sm font-medium transition-all ${
                  w.week === currentWeek ? 'bg-[#7D263D] text-white' : 'border border-[#DBCAC0] bg-[#F5F0EB] text-[#2C2825]'
                }`}
              >
                {w.week}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
