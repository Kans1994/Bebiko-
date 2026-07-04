import { useNavigate, useParams } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { getWeekData } from '@/data/pregnancyWeeks';
import RealisticFetus from '@/components/RealisticFetus';
import SizeComparison from '@/components/SizeComparison';
import LanguageToggle from '@/components/LanguageToggle';
import PageTransition from '@/components/PageTransition';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function WeekDetail() {
  const { week } = useParams();
  const navigate = useNavigate();
  const { t, language } = useI18n();
  const weekNum = Math.max(1, Math.min(40, Number.parseInt(week, 10) || 1));
  const data = getWeekData(weekNum);

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5F0EB]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DBCAC0] bg-[#F5F0EB]/95 px-6 py-4 pt-[env(safe-area-inset-top)] backdrop-blur">
          <button onClick={() => navigate(-1)} className="select-none rounded-full border border-[#DBCAC0] bg-white p-2">
            <ChevronLeft className="h-4 w-4 text-[#2C2825]" />
          </button>
          <span className="font-heading text-base text-[#2C2825]">{t('weekDetail.weekOf40').replace('{n}', weekNum)}</span>
          <LanguageToggle />
        </div>

        <div className="mx-auto max-w-md space-y-3 px-6 py-6">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-[#8A7F76]">{t('weekDetail.babyGrowth')}</p>
            <h1 className="font-heading text-3xl text-[#2C2825]">{t('home.week')} {weekNum}</h1>
          </div>

          <div className="rounded-2xl border border-[#DBCAC0] bg-white p-4 shadow-soft">
            <RealisticFetus week={weekNum} />
            <p className="mt-2 text-center text-[11px] uppercase tracking-wider text-[#8A7F76]">{t('weekDetail.babyGrowth')}</p>
          </div>

          <SizeComparison week={weekNum} />

          <div className="rounded-2xl border border-[#DBCAC0] bg-white p-5">
            <h3 className="mb-1 font-heading text-lg text-[#2C2825]">{t('home.yourBody')}</h3>
            <p className="mb-3 text-[11px] text-[#8A7F76]">{t('home.yourBodyHint')}</p>
            <ul className="space-y-2.5">
              {data.body[language].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#C98A9A]" />
                  <span className="text-sm leading-relaxed text-[#2C2825]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#DBCAC0] bg-white p-5">
            <h3 className="mb-3 font-heading text-lg text-[#2C2825]">{t('weekDetail.development')}</h3>
            <ul className="space-y-2.5">
              {data.development[language].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[#7D263D]" />
                  <span className="text-sm leading-relaxed text-[#2C2825]">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border border-[#DBCAC0] bg-white p-5">
            <h3 className="mb-3 font-heading text-lg text-[#2C2825]">{t('weekDetail.symptoms')}</h3>
            <div className="flex flex-wrap gap-2">
              {data.symptoms[language].map((item) => (
                <span key={item} className="rounded-full border border-[#DBCAC0] bg-[#F0E6DE] px-3 py-1.5 text-sm text-[#7D263D]">{item}</span>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              onClick={() => navigate(`/week/${weekNum - 1}`)}
              disabled={weekNum <= 1}
              className="flex flex-1 select-none items-center justify-center gap-1 rounded-xl border border-[#DBCAC0] bg-white py-3 text-sm font-medium text-[#2C2825] disabled:opacity-40"
            >
              <ChevronLeft className="h-4 w-4" /> {t('weekDetail.previousWeek')}
            </button>
            <button
              onClick={() => navigate(`/week/${weekNum + 1}`)}
              disabled={weekNum >= 40}
              className="flex flex-1 select-none items-center justify-center gap-1 rounded-xl bg-[#7D263D] py-3 text-sm font-medium text-white disabled:opacity-40"
            >
              {t('weekDetail.nextWeek')} <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
