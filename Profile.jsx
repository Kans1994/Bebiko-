import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useI18n } from '@/lib/i18n';
import { base44 } from '@/api/base44Client';
import LanguageToggle from '@/components/LanguageToggle';
import PageTransition from '@/components/PageTransition';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { ChevronLeft, Loader2, Trash2 } from 'lucide-react';

export default function Profile() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      if (typeof base44.auth?.deleteAccount === 'function') {
        await base44.auth.deleteAccount();
      }
    } catch {
      // Continue to logout.
    }
    try {
      await base44.auth.logout();
    } catch {
      // Ignore logout failure for local mode.
    }
    window.location.href = '/onboarding';
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-[#F5F0EB]">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#DBCAC0] bg-[#F5F0EB]/95 px-6 py-4 pt-[env(safe-area-inset-top)] backdrop-blur">
          <button onClick={() => navigate(-1)} className="select-none rounded-full border border-[#DBCAC0] bg-white p-2">
            <ChevronLeft className="h-4 w-4 text-[#2C2825]" />
          </button>
          <span className="font-heading text-base text-[#2C2825]">{t('common.profile')}</span>
          <LanguageToggle />
        </div>

        <div className="mx-auto max-w-md space-y-6 px-6 py-8">
          <div>
            <h2 className="font-heading text-2xl text-[#2C2825]">{t('common.profile')}</h2>
            <p className="mt-1 text-sm text-[#8A7F76]">BEBIKO</p>
          </div>

          <div className="rounded-2xl border border-[#DBCAC0] bg-white p-5 shadow-soft">
            <h3 className="mb-1 font-heading text-lg text-[#2C2825]">Account</h3>
            <p className="mb-4 text-sm text-[#8A7F76]">Beheer je account en gegevens.</p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex w-full select-none items-center justify-center gap-2 rounded-xl border border-[#7D263D] py-3 text-sm font-medium text-[#7D263D]">
                  <Trash2 className="h-4 w-4" /> Account verwijderen
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Account verwijderen?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Weet je zeker dat je je account wilt verwijderen? Al je gegevens worden permanent verwijderd. Deze actie kan niet ongedaan worden gemaakt.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <label className="flex items-start gap-3 text-sm text-[#2C2825]">
                  <input type="checkbox" checked={confirm} onChange={(event) => setConfirm(event.target.checked)} className="mt-1" />
                  <span>Ik begrijp dat al mijn gegevens permanent worden verwijderd.</span>
                </label>
                <AlertDialogFooter>
                  <AlertDialogCancel disabled={deleting}>Annuleren</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={!confirm || deleting} className="bg-[#7D263D] text-white">
                    {deleting ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Verwijderen'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
