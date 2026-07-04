import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import LanguageToggle from '@/components/LanguageToggle';
import PageTransition from '@/components/PageTransition';
import { Calendar, ChevronRight } from 'lucide-react';

const HERO = 'https://images.unsplash.com/photo-1492725764893-90b379c2b6e7?auto=format&fit=crop&w=900&q=80';

export default function Onboarding() {
  const { t, language } = useI18n();
  const navigate = useNavigate();
  const [skinTone, setSkinTone] = useState('light');
  const [isPregnant, setIsPregnant] = useState(false);
  const [showDate, setShowDate] = useState(false);
  const [dueDate, setDueDate] = useState('');
  const [saving, setSaving] = useState(false);

  const handleStart = async () => {
    if (isPregnant && !dueDate) {
      setShowDate(true);
      return;
    }
    setSaving(true);
    try {
      const existing = await base44.entities.Pregnancy.list('-created_date', 1);
      const data = { skin_tone: skinTone, language, is_pregnant: isPregnant };
      if (isPregnant && dueDate) data.due_date = dueDate;
      if (existing && existing.length > 0) {
        await base44.entities.Pregnancy.update(existing[0].id, data);
      } else {
        await base44.entities.Pregnancy.create(data);
      }
      navigate('/');
    } catch {
      navigate('/');
    } finally {
      setSaving(false);
    }
  };

  return (
    <PageTransition>
      <div className="flex min-h-screen flex-col bg-[#F5F0EB]">
        <div className="flex items-center justify-between px-6 py-5 pt-[env(safe-area-inset-top)]">
          <span className="font-heading text-xl tracking-[0.3em] text-[#7D263D]">BEBIKO</span>
          <LanguageToggle />
        </div>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center px-6 pb-10">
          <div className="relative w-full overflow-hidden rounded-2xl border border-[#DBCAC0] shadow-soft">
            <img src={HERO} alt="Pregnancy" className="h-72 w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#2C2825]/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 text-white">
              <h1 className="font-heading text-2xl leading-tight">{t('onboarding.title1')}</h1>
              <h1 className="font-heading text-2xl italic">{t('onboarding.title2')}</h1>
            </div>
            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 shadow-sm">
              <div className="text-center">
                <div className="font-heading text-xl font-semibold leading-none text-[#2C2825]">40</div>
                <div className="mt-0.5 text-[9px] uppercase tracking-wider text-[#8A7F76]">{t('home.deliveryWeek')}</div>
              </div>
              <Calendar className="h-4 w-4 text-[#7D263D]" />
            </div>
          </div>

          <p className="mt-6 max-w-xs text-center text-sm leading-relaxed text-[#8A7F76]">{t('onboarding.body')}</p>

          <div className="mt-8 w-full">
            <p className="mb-3 text-[11px] font-medium uppercase tracking-[0.15em] text-[#8A7F76]">{t('onboarding.motherAppearance')}</p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setSkinTone('light')}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                  skinTone === 'light' ? 'border-[#7D263D] bg-white' : 'border-[#DBCAC0] bg-white/50'
                }`}
              >
                <span className="h-7 w-7 rounded-full border border-[#DBCAC0]" style={{ background: 'linear-gradient(135deg, #f3d9b8, #e8c4a0)' }} />
                <span className="text-sm font-medium text-[#2C2825]">{t('onboarding.lightSkin')}</span>
              </button>
              <button
                onClick={() => setSkinTone('dark')}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                  skinTone === 'dark' ? 'border-[#7D263D] bg-white' : 'border-[#DBCAC0] bg-white/50'
                }`}
              >
                <span className="h-7 w-7 rounded-full border border-[#DBCAC0]" style={{ background: 'linear-gradient(135deg, #8b5a3c, #5c3420)' }} />
                <span className="text-sm font-medium text-[#2C2825]">{t('onboarding.darkSkin')}</span>
              </button>
            </div>
          </div>

          <div className="mt-4 w-full">
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setIsPregnant(false)}
                className={`rounded-full border px-4 py-3 text-sm font-medium transition-all ${
                  !isPregnant ? 'border-[#7D263D] bg-[#7D263D] text-white' : 'border-[#DBCAC0] bg-white/50 text-[#2C2825]'
                }`}
              >
                {t('onboarding.notPregnant')}
              </button>
              <button
                onClick={() => { setIsPregnant(true); setShowDate(true); }}
                className={`rounded-full border px-4 py-3 text-sm font-medium transition-all ${
                  isPregnant ? 'border-[#7D263D] bg-[#7D263D] text-white' : 'border-[#DBCAC0] bg-white/50 text-[#2C2825]'
                }`}
              >
                {t('onboarding.pregnant')}
              </button>
            </div>
          </div>

          {showDate && isPregnant && (
            <div className="mt-4 w-full">
              <label className="mb-2 block text-[11px] font-medium uppercase tracking-[0.15em] text-[#8A7F76]">{t('onboarding.dueDate')}</label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full rounded-xl border border-[#DBCAC0] bg-white px-4 py-3 text-[#2C2825] outline-none focus:border-[#7D263D]"
              />
            </div>
          )}

          <button
            onClick={handleStart}
            disabled={saving}
            className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-[#7D263D] py-4 text-base font-medium text-white shadow-sm transition-all hover:bg-[#6a1f33] active:scale-[0.99] disabled:opacity-60"
          >
            {saving ? '…' : t('onboarding.getStarted')} {!saving && <ChevronRight className="h-4 w-4" />}
          </button>
        </div>
      </div>
    </PageTransition>
  );
}
