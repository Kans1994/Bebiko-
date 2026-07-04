import { AlertTriangle } from 'lucide-react';

export default function UserNotRegisteredError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#F5F0EB] px-6 text-center">
      <AlertTriangle className="mb-4 h-12 w-12 text-[#7D263D]" />
      <h1 className="font-heading text-2xl text-[#2C2825]">Account niet gevonden</h1>
      <p className="mt-2 max-w-xs text-sm text-[#8A7F76]">
        Je account is nog niet gekoppeld. Controleer je login of maak eerst een account aan.
      </p>
    </div>
  );
}
