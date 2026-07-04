import { useNavigate } from 'react-router-dom';
import { Baby } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

export default function PageNotFound() {
  const navigate = useNavigate();
  const { t } = useI18n();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F0EB] px-6 text-center">
      <Baby className="mb-4 h-14 w-14 text-[#C98A9A]" />
      <h1 className="font-heading text-2xl text-[#2C2825]">{t('errors.notFoundTitle')}</h1>
      <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#8A7F76]">{t('errors.notFoundText')}</p>
      <button
        onClick={() => navigate('/')}
        className="mt-6 rounded-xl bg-[#7D263D] px-6 py-3 text-sm font-medium text-white shadow-soft"
      >
        {t('errors.goHome')}
      </button>
    </div>
  );
}
