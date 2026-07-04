import React, { useEffect, useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';

const STORAGE_KEY = 'bebiko.profile.v2';

const colors = {
  burgundy: '#7D263D',
  rose: '#C98A9A',
  blush: '#F5F0EB',
  cream: '#FFF9F6',
  ink: '#2C2825',
  muted: '#8A7F76',
  line: '#DBCAC0',
};

const weekSizes = [
  'maanzaad', 'sesamzaad', 'linze', 'bosbes', 'framboos', 'erwt', 'blauwe bes', 'druif', 'olijf', 'pruim',
  'limoen', 'perzik', 'citroen', 'appel', 'avocado', 'peer', 'ui', 'paprika', 'mango', 'banaan',
  'wortel', 'papaja', 'aubergine', 'maïskolf', 'courgette', 'bloemkool', 'sla', 'pompoen', 'ananas', 'kool',
  'kokosnoot', 'jicama', 'ananas groot', 'meloen', 'honingmeloen', 'romeinse sla', 'snijbiet', 'prei', 'watermeloen', 'baby'
];

const weekHighlights = [
  'De basis van groei en ontwikkeling is in volle gang.',
  'Kleine veranderingen gaan snel, ook al merk je zelf nog weinig.',
  'Je lichaam werkt hard achter de schermen.',
  'Rust, regelmaat en goed eten helpen je door deze periode.',
  'Je baby ontwikkelt zich stap voor stap verder.',
  'De komende weken worden groei en vorm steeds duidelijker.',
];

const symptoms = [
  'Moeheid', 'Misselijkheid', 'Gevoelige borsten', 'Meer plassen', 'Stemmingswisselingen', 'Trek in eten', 'Rugpijn', 'Brandend maagzuur'
];

const bodyTips = [
  'Plan rustmomenten en forceer jezelf niet.',
  'Drink genoeg water gedurende de dag.',
  'Kies lichte beweging als dat goed voelt.',
  'Noteer vragen voor je verloskundige of arts.',
  'Neem contact op met een professional bij hevige klachten of twijfel.'
];

const checklistDefaults = [
  'Uitgerekende datum invullen',
  'Eerste afspraak plannen',
  'Vitamines bespreken',
  'Belangrijke vragen noteren',
  'Babyspullen lijst maken',
  'Ziekenhuistas later voorbereiden'
];

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function calcWeekFromDueDate(dueDate) {
  if (!dueDate) return 11;
  const due = new Date(dueDate + 'T12:00:00');
  const now = new Date();
  const daysLeft = Math.ceil((due.getTime() - now.getTime()) / 86400000);
  return clamp(40 - Math.floor(daysLeft / 7), 1, 40);
}

function getWeekData(week) {
  const trimester = week <= 13 ? 1 : week <= 27 ? 2 : 3;
  const length = week < 8 ? '< 2 cm' : `${Math.round(week * 1.18)} cm`;
  const weight = week < 10 ? '< 5 g' : `${Math.round(Math.pow(week, 2) * 3.8)} g`;
  const highlight = weekHighlights[week % weekHighlights.length];
  return {
    trimester,
    fruit: weekSizes[week - 1],
    length,
    weight,
    highlight,
    development: [
      `Week ${week}: je baby groeit verder en ontwikkelt steeds meer herkenbare functies.`,
      trimester === 1 ? 'In het eerste trimester ligt de focus vooral op basisontwikkeling.' : trimester === 2 ? 'In het tweede trimester worden beweging, groei en zintuigen steeds belangrijker.' : 'In het derde trimester groeit je baby vooral verder en bereidt je lichaam zich voor.',
      'Elke zwangerschap is anders; gebruik deze informatie als algemene gids.'
    ],
    body: [
      bodyTips[week % bodyTips.length],
      bodyTips[(week + 2) % bodyTips.length],
      'Bij pijn, bloedverlies, koorts of ernstige klachten: neem contact op met je zorgverlener.'
    ],
    symptoms: symptoms.slice(0, 4 + (week % 4))
  };
}

function useLocalProfile() {
  const [profile, setProfile] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return {
      name: '',
      dueDate: '',
      selectedWeek: 11,
      skinTone: 'medium',
      checklist: checklistDefaults.map((title) => ({ title, done: false })),
      notes: ''
    };
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
  }, [profile]);

  return [profile, setProfile];
}

function Icon({ children }) {
  return <span className="icon">{children}</span>;
}

function TopBar({ tab, setTab, reset }) {
  return (
    <header className="topbar">
      <button className="ghost-menu" aria-label="Menu">☰</button>
      <div>
        <div className="brand">BEBIKO</div>
        <div className="subbrand">Zwangerschap • Groei • Rust</div>
      </div>
      <button onClick={() => setTab(tab === 'profile' ? 'home' : 'profile')} className="avatar" aria-label="Profiel">♡</button>
      {tab === 'profile' && <button className="hidden-reset" onClick={reset}>reset</button>}
    </header>
  );
}

function Hero({ week, data, progress }) {
  return (
    <section className="hero-card">
      <div className="hero-glow one" />
      <div className="hero-glow two" />
      <div className="hero-copy">
        <span className="eyebrow">Vandaag</span>
        <h1>Week {week}</h1>
        <p>{data.highlight}</p>
      </div>
      <div className="baby-orb" aria-label="Baby illustratie">
        <div className="orb-inner">👶</div>
        <div className="pulse" />
      </div>
      <div className="hero-progress">
        <div className="progress-label"><span>Zwangerschap</span><b>{Math.round(progress)}%</b></div>
        <div className="progress"><span style={{ width: `${progress}%` }} /></div>
      </div>
    </section>
  );
}

function Home({ profile, setProfile, setTab }) {
  const dueWeek = calcWeekFromDueDate(profile.dueDate);
  const week = profile.dueDate ? dueWeek : profile.selectedWeek;
  const data = getWeekData(week);
  const progress = (week / 40) * 100;

  return (
    <main className="screen fade-in">
      <Hero week={week} data={data} progress={progress} />

      <section className="quick-grid">
        <article className="mini-card">
          <Icon>🍼</Icon>
          <span>Baby grootte</span>
          <b>{data.fruit}</b>
        </article>
        <article className="mini-card">
          <Icon>📏</Icon>
          <span>Lengte</span>
          <b>{data.length}</b>
        </article>
        <article className="mini-card">
          <Icon>⚖️</Icon>
          <span>Gewicht</span>
          <b>{data.weight}</b>
        </article>
        <article className="mini-card">
          <Icon>✨</Icon>
          <span>Trimester</span>
          <b>{data.trimester}</b>
        </article>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow dark">Ontwikkeling</span>
            <h2>Deze week</h2>
          </div>
          <button className="small-button" onClick={() => setTab('weeks')}>Alle weken</button>
        </div>
        <ul className="nice-list">
          {data.development.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="panel soft-panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow dark">Jouw lichaam</span>
            <h2>Rust & tips</h2>
          </div>
        </div>
        <ul className="nice-list pink">
          {data.body.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow dark">Symptomen</span>
            <h2>Vaak voorkomend</h2>
          </div>
        </div>
        <div className="chips">
          {data.symptoms.map((item) => <span key={item}>{item}</span>)}
        </div>
      </section>

      {!profile.dueDate && (
        <section className="panel alert-panel">
          <h2>Week handmatig kiezen</h2>
          <p>Geen uitgerekende datum ingevuld. Kies hieronder tijdelijk je week.</p>
          <input
            type="range"
            min="1"
            max="40"
            value={profile.selectedWeek}
            onChange={(e) => setProfile({ ...profile, selectedWeek: Number(e.target.value) })}
          />
          <b>Week {profile.selectedWeek}</b>
        </section>
      )}
    </main>
  );
}

function Weeks({ profile, setProfile }) {
  const activeWeek = profile.dueDate ? calcWeekFromDueDate(profile.dueDate) : profile.selectedWeek;
  const [openWeek, setOpenWeek] = useState(activeWeek);
  const data = getWeekData(openWeek);

  return (
    <main className="screen fade-in">
      <section className="page-title">
        <span className="eyebrow dark">Overzicht</span>
        <h1>Alle weken</h1>
        <p>Klik op een week voor ontwikkeling, grootte en symptomen.</p>
      </section>

      <section className="week-grid panel">
        {Array.from({ length: 40 }, (_, i) => i + 1).map((week) => (
          <button
            key={week}
            onClick={() => {
              setOpenWeek(week);
              if (!profile.dueDate) setProfile({ ...profile, selectedWeek: week });
            }}
            className={`week-button ${week === openWeek ? 'selected' : ''} ${week === activeWeek ? 'current' : ''}`}
          >
            {week}
          </button>
        ))}
      </section>

      <section className="panel week-detail">
        <div className="week-hero-line">
          <div>
            <span className="eyebrow dark">Week {openWeek}</span>
            <h2>{data.fruit}</h2>
            <p>{data.length} • {data.weight} • trimester {data.trimester}</p>
          </div>
          <div className="small-baby">👶</div>
        </div>
        <ul className="nice-list">
          {data.development.map((item) => <li key={item}>{item}</li>)}
        </ul>
      </section>
    </main>
  );
}

function Checklist({ profile, setProfile }) {
  const updateItem = (index) => {
    const checklist = profile.checklist.map((item, i) => i === index ? { ...item, done: !item.done } : item);
    setProfile({ ...profile, checklist });
  };

  const doneCount = profile.checklist.filter((item) => item.done).length;

  return (
    <main className="screen fade-in">
      <section className="page-title">
        <span className="eyebrow dark">Voorbereiding</span>
        <h1>Checklist</h1>
        <p>{doneCount} van {profile.checklist.length} taken klaar.</p>
      </section>

      <section className="panel checklist-panel">
        {profile.checklist.map((item, index) => (
          <button className={`check-row ${item.done ? 'done' : ''}`} key={item.title} onClick={() => updateItem(index)}>
            <span className="checkmark">{item.done ? '✓' : ''}</span>
            <span>{item.title}</span>
          </button>
        ))}
      </section>

      <section className="panel">
        <div className="panel-head">
          <div>
            <span className="eyebrow dark">Notities</span>
            <h2>Mijn vragen</h2>
          </div>
        </div>
        <textarea
          value={profile.notes}
          onChange={(e) => setProfile({ ...profile, notes: e.target.value })}
          placeholder="Bijvoorbeeld: vragen voor de verloskundige, klachten, afspraken..."
          className="notes"
        />
      </section>
    </main>
  );
}

function Profile({ profile, setProfile, reset }) {
  return (
    <main className="screen fade-in">
      <section className="page-title">
        <span className="eyebrow dark">Account</span>
        <h1>Profiel</h1>
        <p>Alles wordt lokaal op dit apparaat opgeslagen.</p>
      </section>

      <section className="panel form-panel">
        <label>
          <span>Naam</span>
          <input value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} placeholder="Jouw naam" />
        </label>
        <label>
          <span>Uitgerekende datum</span>
          <input type="date" value={profile.dueDate} onChange={(e) => setProfile({ ...profile, dueDate: e.target.value })} />
        </label>
        <label>
          <span>Illustratie tint</span>
          <select value={profile.skinTone} onChange={(e) => setProfile({ ...profile, skinTone: e.target.value })}>
            <option value="light">Licht</option>
            <option value="medium">Medium</option>
            <option value="dark">Donker</option>
          </select>
        </label>
      </section>

      <section className="panel danger-zone">
        <h2>Gegevens wissen</h2>
        <p>Dit verwijdert alleen de lokale gegevens op dit apparaat.</p>
        <button className="danger-button" onClick={reset}>Alles resetten</button>
      </section>
    </main>
  );
}

function Onboarding({ profile, setProfile }) {
  const [localName, setLocalName] = useState(profile.name || '');
  const [localDueDate, setLocalDueDate] = useState(profile.dueDate || '');

  const start = () => {
    setProfile({ ...profile, name: localName, dueDate: localDueDate, onboarded: true });
  };

  return (
    <main className="onboarding fade-in">
      <div className="onboarding-bg" />
      <section className="onboarding-card">
        <div className="logo-mark">B</div>
        <span className="eyebrow">BEBIKO</span>
        <h1>Een rustige zwangerschapsapp voor elke week</h1>
        <p>Volg groei, ontwikkeling, symptomen, notities en checklist in een zachte app-stijl.</p>
        <label>
          <span>Naam</span>
          <input value={localName} onChange={(e) => setLocalName(e.target.value)} placeholder="Bijvoorbeeld: Mama" />
        </label>
        <label>
          <span>Uitgerekende datum</span>
          <input type="date" value={localDueDate} onChange={(e) => setLocalDueDate(e.target.value)} />
        </label>
        <button className="primary" onClick={start}>Start BEBIKO</button>
        <button className="secondary" onClick={() => setProfile({ ...profile, onboarded: true })}>Later invullen</button>
      </section>
    </main>
  );
}

function BottomNav({ tab, setTab }) {
  const items = [
    ['home', 'Vandaag', '⌂'],
    ['weeks', 'Weken', '◷'],
    ['checklist', 'Lijst', '✓'],
    ['profile', 'Profiel', '♡'],
  ];
  return (
    <nav className="bottom-nav">
      {items.map(([id, label, icon]) => (
        <button key={id} className={tab === id ? 'active' : ''} onClick={() => setTab(id)}>
          <span>{icon}</span>
          {label}
        </button>
      ))}
    </nav>
  );
}

function App() {
  const [profile, setProfile] = useLocalProfile();
  const [tab, setTab] = useState('home');

  const reset = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).catch(() => {});
    }
  }, []);

  if (!profile.onboarded) {
    return <Onboarding profile={profile} setProfile={setProfile} />;
  }

  return (
    <div className="app-shell">
      <TopBar tab={tab} setTab={setTab} reset={reset} />
      {tab === 'home' && <Home profile={profile} setProfile={setProfile} setTab={setTab} />}
      {tab === 'weeks' && <Weeks profile={profile} setProfile={setProfile} />}
      {tab === 'checklist' && <Checklist profile={profile} setProfile={setProfile} />}
      {tab === 'profile' && <Profile profile={profile} setProfile={setProfile} reset={reset} />}
      <BottomNav tab={tab} setTab={setTab} />
    </div>
  );
}

const style = document.createElement('style');
style.textContent = `
:root{
  font-family: Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  color:${colors.ink};
  background:${colors.blush};
  font-synthesis:none;
  text-rendering:geometricPrecision;
  -webkit-font-smoothing:antialiased;
}
*{box-sizing:border-box;-webkit-tap-highlight-color:transparent}
body{margin:0;min-height:100vh;background:
  radial-gradient(circle at 10% -10%, rgba(201,138,154,.35), transparent 28rem),
  radial-gradient(circle at 100% 0%, rgba(125,38,61,.12), transparent 24rem),
  ${colors.blush};
}
button,input,textarea,select{font:inherit}
button{cursor:pointer}
.app-shell{min-height:100vh;padding-bottom:96px}
.topbar{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;padding:14px 18px calc(12px + env(safe-area-inset-top));background:rgba(245,240,235,.82);backdrop-filter:blur(18px);border-bottom:1px solid rgba(219,202,192,.75)}
.brand{font-weight:900;letter-spacing:.34em;color:${colors.burgundy};font-size:20px;line-height:1}.subbrand{font-size:10px;color:${colors.muted};letter-spacing:.06em;margin-top:4px}.ghost-menu,.avatar{width:42px;height:42px;border-radius:16px;border:1px solid ${colors.line};background:rgba(255,255,255,.8);color:${colors.ink};font-weight:900;box-shadow:0 8px 22px rgba(44,40,37,.06)}.hidden-reset{display:none}
.screen{max-width:480px;margin:0 auto;padding:18px 18px 8px}.fade-in{animation:fade .28s ease both}@keyframes fade{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
.hero-card{position:relative;min-height:310px;border-radius:34px;overflow:hidden;padding:26px;border:1px solid rgba(255,255,255,.6);background:linear-gradient(145deg,#8f2d4a,#c98a9a 54%,#f1d6ce);box-shadow:0 24px 60px rgba(125,38,61,.22);color:white}.hero-glow{position:absolute;border-radius:999px;filter:blur(8px);opacity:.55}.hero-glow.one{width:170px;height:170px;right:-44px;top:-34px;background:#fff}.hero-glow.two{width:210px;height:210px;left:-70px;bottom:-90px;background:#f5c5cc}.hero-copy{position:relative;z-index:2;max-width:62%}.eyebrow{display:inline-flex;align-items:center;gap:8px;text-transform:uppercase;letter-spacing:.16em;font-size:11px;font-weight:800;color:rgba(255,255,255,.82)}.eyebrow.dark{color:${colors.muted}}.hero-copy h1{font-size:54px;line-height:.9;margin:14px 0 12px;letter-spacing:-.06em}.hero-copy p{font-size:15px;line-height:1.55;margin:0;color:rgba(255,255,255,.9)}.baby-orb{position:absolute;right:22px;top:84px;width:128px;height:128px;border-radius:40px;display:grid;place-items:center;background:linear-gradient(145deg,rgba(255,255,255,.86),rgba(255,255,255,.46));box-shadow:inset 0 1px 0 rgba(255,255,255,.7),0 24px 50px rgba(44,40,37,.22);transform:rotate(5deg)}.orb-inner{font-size:62px;filter:drop-shadow(0 6px 14px rgba(44,40,37,.16))}.pulse{position:absolute;inset:16px;border-radius:30px;border:1px solid rgba(255,255,255,.6);animation:pulse 2.7s ease-in-out infinite}@keyframes pulse{0%,100%{transform:scale(.95);opacity:.45}50%{transform:scale(1.08);opacity:.9}}
.hero-progress{position:absolute;left:22px;right:22px;bottom:22px;z-index:3;padding:14px;border-radius:22px;background:rgba(255,255,255,.22);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,.32)}.progress-label{display:flex;justify-content:space-between;font-size:12px;margin-bottom:8px}.progress{height:9px;background:rgba(255,255,255,.38);border-radius:999px;overflow:hidden}.progress span{display:block;height:100%;border-radius:999px;background:white;box-shadow:0 0 18px rgba(255,255,255,.85)}
.quick-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:18px 0}.mini-card{background:rgba(255,255,255,.78);border:1px solid ${colors.line};border-radius:26px;padding:16px;box-shadow:0 12px 30px rgba(44,40,37,.06)}.icon{width:38px;height:38px;border-radius:16px;display:grid;place-items:center;background:${colors.blush};margin-bottom:12px}.mini-card span:not(.icon){display:block;color:${colors.muted};font-size:12px;margin-bottom:4px}.mini-card b{font-size:18px;text-transform:capitalize}
.panel{background:rgba(255,255,255,.82);border:1px solid ${colors.line};border-radius:28px;padding:20px;margin:14px 0;box-shadow:0 16px 38px rgba(44,40,37,.06)}.soft-panel{background:linear-gradient(180deg,#fff,#fff6f4)}.alert-panel{background:#fff8e9}.panel-head{display:flex;align-items:flex-start;justify-content:space-between;gap:12px;margin-bottom:12px}.panel h2,.page-title h1{margin:4px 0 0;letter-spacing:-.04em}.small-button{border:0;border-radius:999px;background:${colors.burgundy};color:white;padding:9px 13px;font-weight:800;font-size:12px}.nice-list{list-style:none;padding:0;margin:12px 0 0;display:grid;gap:12px}.nice-list li{position:relative;padding-left:24px;color:${colors.ink};line-height:1.48;font-size:14px}.nice-list li:before{content:"";position:absolute;left:0;top:.58em;width:9px;height:9px;border-radius:999px;background:${colors.burgundy};box-shadow:0 0 0 4px rgba(125,38,61,.1)}.nice-list.pink li:before{background:${colors.rose};box-shadow:0 0 0 4px rgba(201,138,154,.16)}.chips{display:flex;flex-wrap:wrap;gap:9px}.chips span{background:#f0e6de;color:${colors.burgundy};border:1px solid ${colors.line};border-radius:999px;padding:9px 12px;font-size:13px;font-weight:700}.alert-panel p,.page-title p,.danger-zone p{color:${colors.muted};font-size:14px;line-height:1.55}input[type=range]{width:100%;accent-color:${colors.burgundy}}
.page-title{padding:8px 4px 4px}.page-title h1{font-size:38px}.week-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:9px}.week-button{aspect-ratio:1;border-radius:18px;border:1px solid ${colors.line};background:${colors.cream};font-weight:900;color:${colors.ink};position:relative}.week-button.selected{background:${colors.burgundy};color:white;box-shadow:0 12px 24px rgba(125,38,61,.22)}.week-button.current:after{content:"";position:absolute;width:7px;height:7px;border-radius:50%;background:${colors.rose};right:8px;top:8px}.week-detail .small-baby{font-size:50px}.week-hero-line{display:flex;justify-content:space-between;align-items:center;gap:14px}.week-hero-line p{color:${colors.muted};font-size:13px;margin:5px 0 0}
.checklist-panel{display:grid;gap:10px}.check-row{display:flex;align-items:center;gap:12px;text-align:left;border:1px solid ${colors.line};background:${colors.cream};padding:14px;border-radius:20px;color:${colors.ink};font-weight:800}.check-row.done{background:#f0e6de;color:${colors.muted};text-decoration:line-through}.checkmark{width:26px;height:26px;border-radius:10px;border:1px solid ${colors.line};display:grid;place-items:center;background:white;color:${colors.burgundy};text-decoration:none}.notes{width:100%;min-height:150px;border:1px solid ${colors.line};border-radius:20px;background:${colors.cream};padding:14px;resize:vertical;outline:none;color:${colors.ink}}
.form-panel{display:grid;gap:14px}.form-panel label,.onboarding-card label{display:grid;gap:7px;font-weight:800;color:${colors.ink};font-size:13px}.form-panel input,.form-panel select,.onboarding-card input{border:1px solid ${colors.line};border-radius:18px;background:${colors.cream};padding:14px 15px;outline:none;color:${colors.ink};font-weight:600}.danger-button{border:0;border-radius:18px;background:${colors.burgundy};color:white;padding:13px 16px;font-weight:900}
.onboarding{min-height:100vh;display:grid;place-items:center;padding:26px;position:relative;overflow:hidden}.onboarding-bg{position:absolute;inset:0;background:radial-gradient(circle at 50% 0%,rgba(125,38,61,.24),transparent 28rem),radial-gradient(circle at 0 100%,rgba(201,138,154,.28),transparent 24rem)}.onboarding-card{position:relative;z-index:1;width:min(100%,440px);border-radius:38px;background:rgba(255,255,255,.82);border:1px solid rgba(255,255,255,.7);box-shadow:0 30px 80px rgba(125,38,61,.18);padding:28px;display:grid;gap:14px;backdrop-filter:blur(18px)}.logo-mark{width:70px;height:70px;border-radius:25px;background:linear-gradient(145deg,${colors.burgundy},${colors.rose});color:white;display:grid;place-items:center;font-weight:900;font-size:34px;box-shadow:0 18px 30px rgba(125,38,61,.25)}.onboarding-card h1{font-size:36px;line-height:1;margin:0;letter-spacing:-.06em}.onboarding-card p{color:${colors.muted};line-height:1.55;margin:0}.primary,.secondary{border:0;border-radius:20px;padding:15px 17px;font-weight:900}.primary{background:${colors.burgundy};color:white;box-shadow:0 14px 28px rgba(125,38,61,.22)}.secondary{background:#f0e6de;color:${colors.ink}}
.bottom-nav{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:20;width:min(calc(100% - 24px),480px);display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:8px;border-radius:28px;background:rgba(255,255,255,.86);border:1px solid rgba(219,202,192,.8);box-shadow:0 18px 60px rgba(44,40,37,.18);backdrop-filter:blur(18px)}.bottom-nav button{border:0;background:transparent;border-radius:20px;padding:9px 4px;color:${colors.muted};font-size:11px;font-weight:900;display:grid;gap:3px;place-items:center}.bottom-nav span{font-size:18px}.bottom-nav button.active{background:${colors.burgundy};color:white;box-shadow:0 10px 22px rgba(125,38,61,.24)}
@media (max-width:380px){.hero-copy h1{font-size:46px}.baby-orb{width:108px;height:108px}.orb-inner{font-size:52px}.week-grid{gap:7px}.panel{padding:18px}.onboarding-card h1{font-size:32px}}
`;
document.head.appendChild(style);

createRoot(document.getElementById('root')).render(<App />);
