import { useI18n } from '@/lib/i18n';
import { getWeekData } from '@/data/pregnancyWeeks';

export default function SizeComparison({ week }) {
  const { t, language } = useI18n();
  const data = getWeekData(week);

  return (
    <div className="rounded-2xl border border-[#DBCAC0] bg-white p-5">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-heading text-lg text-[#2C2825]">{t('weekDetail.sizeComparison')}</h3>
          <p className="text-xs text-[#8A7F76]">{t('weekDetail.approx')} {data.length} · {data.weight}</p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#E8C5C0] to-[#C98A9A] text-xl">
          {data.emoji}
        </div>
      </div>
      <div className="rounded-xl bg-[#F5F0EB] p-4">
        <div className="mb-2 flex items-center justify-between text-xs text-[#8A7F76]">
          <span>{data.fruit[language]}</span>
          <span>Week {week}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#C98A9A] to-[#7D263D]"
            style={{ width: `${Math.max(7, Math.min(100, (week / 40) * 100))}%` }}
          />
        </div>
      </div>
    </div>
  );
}
