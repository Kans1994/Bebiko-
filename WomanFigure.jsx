const tones = {
  light: {
    skin: '#E8C4A0',
    skinDark: '#D7A77F',
    hair: '#5A372B',
  },
  dark: {
    skin: '#7C4A31',
    skinDark: '#5C3420',
    hair: '#251713',
  },
};

export default function WomanFigure({ skinTone = 'light', onChange }) {
  const palette = tones[skinTone] || tones.light;

  return (
    <div className="flex w-full flex-col items-center">
      <svg viewBox="0 0 140 190" className="h-36 w-full" role="img" aria-label="Pregnant woman illustration">
        <defs>
          <linearGradient id="dress" x1="0" x2="1" y1="0" y2="1">
            <stop stopColor="#E8C5C0" />
            <stop offset="1" stopColor="#C98A9A" />
          </linearGradient>
        </defs>
        <circle cx="70" cy="32" r="23" fill={palette.skin} />
        <path d="M48 28c5-20 40-21 47 1 6 18-8 33-24 34-17 1-31-14-23-35z" fill={palette.hair} opacity="0.95" />
        <circle cx="70" cy="36" r="18" fill={palette.skin} />
        <path d="M47 78c8-14 38-15 48 0 9 13 13 40 15 78H31c3-38 7-65 16-78z" fill="url(#dress)" />
        <ellipse cx="78" cy="120" rx="31" ry="36" fill="#F0D4D5" opacity="0.9" />
        <path d="M36 91c-16 11-18 34-16 53" stroke={palette.skinDark} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M103 91c17 11 19 34 17 53" stroke={palette.skinDark} strokeWidth="9" strokeLinecap="round" fill="none" />
        <path d="M56 67c8 9 21 9 29 0" stroke="#fff" strokeWidth="4" strokeLinecap="round" opacity="0.75" />
      </svg>
      <div className="mt-2 grid w-full grid-cols-2 gap-2">
        <button
          onClick={() => onChange?.('light')}
          className={`rounded-full border px-2 py-2 text-[11px] font-medium ${
            skinTone === 'light' ? 'border-[#7D263D] bg-[#7D263D] text-white' : 'border-[#DBCAC0] bg-[#F5F0EB] text-[#2C2825]'
          }`}
        >
          Light
        </button>
        <button
          onClick={() => onChange?.('dark')}
          className={`rounded-full border px-2 py-2 text-[11px] font-medium ${
            skinTone === 'dark' ? 'border-[#7D263D] bg-[#7D263D] text-white' : 'border-[#DBCAC0] bg-[#F5F0EB] text-[#2C2825]'
          }`}
        >
          Dark
        </button>
      </div>
    </div>
  );
}
