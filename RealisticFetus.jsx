function getScale(week) {
  if (week < 8) return 0.58;
  if (week < 14) return 0.72;
  if (week < 22) return 0.86;
  if (week < 30) return 1;
  return 1.12;
}

export default function RealisticFetus({ week = 12 }) {
  const scale = getScale(week);
  const opacity = Math.min(0.9, 0.45 + week / 80);

  return (
    <div className="relative flex h-72 items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#F8EEE9] via-[#F3DED8] to-[#E8C5C0]">
      <div className="absolute inset-6 rounded-full border border-white/70 bg-white/20 blur-[1px]" />
      <div className="absolute h-48 w-48 rounded-full bg-[#F4B4AE]/25 blur-2xl" />
      <svg
        viewBox="0 0 260 260"
        className="relative h-60 w-60 drop-shadow-xl"
        style={{ transform: `scale(${scale})`, opacity }}
        role="img"
        aria-label={`Baby development week ${week}`}
      >
        <defs>
          <radialGradient id="fetusSkin" cx="45%" cy="35%" r="70%">
            <stop stopColor="#FFE1D0" />
            <stop offset="0.55" stopColor="#F6AA9F" />
            <stop offset="1" stopColor="#D87984" />
          </radialGradient>
          <linearGradient id="cord" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="#D87984" />
            <stop offset="1" stopColor="#7D263D" />
          </linearGradient>
        </defs>
        <path d="M151 33c39 5 66 35 67 73 2 57-46 109-105 105-37-3-67-24-79-58-12-35 5-72 36-87 13-7 26-7 38-4 8-19 22-31 43-29z" fill="url(#fetusSkin)" />
        <circle cx="151" cy="81" r="47" fill="url(#fetusSkin)" />
        <path d="M132 82c11 9 25 10 42 2" stroke="#8C3A42" strokeWidth="5" strokeLinecap="round" opacity="0.45" />
        <circle cx="166" cy="74" r="4" fill="#5A2A2E" opacity="0.5" />
        <path d="M106 127c-16 15-15 37-1 48 15 12 42 7 55-6" stroke="#AC5564" strokeWidth="15" strokeLinecap="round" fill="none" opacity="0.65" />
        <path d="M92 123c-25 17-33 43-22 62" stroke="#AC5564" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M129 163c17 10 35 12 52 2" stroke="#AC5564" strokeWidth="12" strokeLinecap="round" fill="none" opacity="0.55" />
        <path d="M195 123c22 15 29 34 21 51" stroke="#AC5564" strokeWidth="9" strokeLinecap="round" fill="none" opacity="0.45" />
        <path d="M101 193c16 15 40 18 64 4" stroke="#7D263D" strokeWidth="5" strokeLinecap="round" fill="none" opacity="0.25" />
        <path d="M81 160c-18 26-5 50 21 61" stroke="url(#cord)" strokeWidth="6" strokeLinecap="round" fill="none" opacity="0.55" />
      </svg>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-white/75 px-4 py-2 text-xs font-medium text-[#7D263D] backdrop-blur">
        Week {week}
      </div>
    </div>
  );
}
