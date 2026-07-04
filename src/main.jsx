import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";

const weeks = Array.from({ length: 40 }, (_, i) => i + 1);

const css = `
*{box-sizing:border-box}
body{margin:0;font-family:Inter,system-ui,Arial;background:#f5f0eb;color:#2c2825}
.app{min-height:100vh}
.header{padding:22px;display:flex;justify-content:space-between;align-items:center}
.brand{font-size:22px;letter-spacing:8px;font-weight:800;color:#7d263d}
.btn{border:0;border-radius:14px;padding:12px 18px;background:#7d263d;color:white;font-weight:700;cursor:pointer}
.btn.light{background:white;color:#2c2825;border:1px solid #dbcac0}
.wrap{max-width:460px;margin:0 auto;padding:0 22px 40px}
.card{background:white;border:1px solid #dbcac0;border-radius:24px;padding:20px;margin:14px 0;box-shadow:0 8px 20px rgba(44,40,37,.05)}
.hero{height:250px;border-radius:26px;background:linear-gradient(135deg,#e8c5c0,#c98a9a,#7d263d);display:flex;align-items:end;padding:24px;color:white;overflow:hidden}
.hero h1{font-size:34px;line-height:1.05;margin:0}
.small{color:#8a7f76;font-size:13px}
.grid{display:grid;grid-template-columns:repeat(5,1fr);gap:8px}
.week{aspect-ratio:1;border-radius:12px;border:1px solid #dbcac0;background:#f5f0eb;color:#2c2825;font-weight:700}
.week.active{background:#7d263d;color:white}
.progress{height:8px;background:#f0e6de;border-radius:20px;overflow:hidden}
.progress div{height:100%;background:linear-gradient(90deg,#c98a9a,#7d263d)}
.input{width:100%;padding:14px;border:1px solid #dbcac0;border-radius:14px;font-size:16px}
.row{display:flex;gap:10px;align-items:center;justify-content:space-between}
.pill{display:inline-block;background:#f0e6de;color:#7d263d;border:1px solid #dbcac0;border-radius:999px;padding:8px 12px;margin:4px;font-size:13px}
`;

function weekInfo(week) {
  const fruit = [
    "maanzaad","sesamzaad","linze","bosbes","framboos","erwt","blauwe bes","druif","olijf","pruim",
    "limoen","perzik","citroen","appel","avocado","peer","ui","paprika","mango","banaan",
    "wortel","papaja","aubergine","maïskolf","courgette","bloemkool","sla","pompoen","ananas","kool",
    "kokosnoot","jicama","ananas groot","meloen","honingmeloen","romeinse sla","snijbiet","prei","watermeloen","baby"
  ][week - 1];

  return {
    fruit,
    length: Math.max(1, Math.round(week * 1.25)),
    weight: week < 10 ? "< 5g" : `${Math.round(week * week * 4)}g`,
    development: [
      `Je baby groeit verder in week ${week}.`,
      "Belangrijke organen en lichaamsfuncties ontwikkelen door.",
      "Elke week worden bewegingen en groei duidelijker."
    ],
    body: [
      "Je lichaam past zich aan de zwangerschap aan.",
      "Rust, water drinken en goed eten blijven belangrijk.",
      "Bij twijfel of klachten altijd contact opnemen met je verloskundige."
    ],
    symptoms: ["Moeheid", "Gevoelige borsten", "Misselijkheid", "Meer emotie"]
  };
}

function App() {
  const [dueDate, setDueDate] = useState(localStorage.getItem("bebiko_due_date") || "");
  const [saved, setSaved] = useState(Boolean(localStorage.getItem("bebiko_due_date")));
  const [selectedWeek, setSelectedWeek] = useState(11);

  const currentWeek = useMemo(() => {
    if (!dueDate) return selectedWeek;
    const due = new Date(dueDate);
    const now = new Date();
    const daysLeft = Math.ceil((due - now) / 86400000);
    return Math.max(1, Math.min(40, 40 - Math.floor(daysLeft / 7)));
  }, [dueDate, selectedWeek]);

  const data = weekInfo(currentWeek);

  const save = () => {
    if (dueDate) localStorage.setItem("bebiko_due_date", dueDate);
    setSaved(true);
  };

  const reset = () => {
    localStorage.removeItem("bebiko_due_date");
    setDueDate("");
    setSaved(false);
    setSelectedWeek(11);
  };

  return (
    <div className="app">
      <div className="header">
        <div className="brand">BEBIKO</div>
        {saved && <button className="btn light" onClick={reset}>Profiel</button>}
      </div>

      <main className="wrap">
        {!saved ? (
          <>
            <div className="hero">
              <h1>Jouw zwangerschap<br />week voor week</h1>
            </div>

            <div className="card">
              <h2>Start je app</h2>
              <p className="small">Vul je uitgerekende datum in. Dan berekent BEBIKO automatisch je zwangerschapsweek.</p>
              <input
                className="input"
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
              />
              <br /><br />
              <button className="btn" onClick={save}>Beginnen</button>
            </div>
          </>
        ) : (
          <>
            <div className="hero">
              <h1>Week {currentWeek}<br />van 40</h1>
            </div>

            <div className="card">
              <div className="row">
                <div>
                  <div className="small">Baby vandaag</div>
                  <h2>{data.fruit}</h2>
                  <p className="small">{data.length} cm · {data.weight}</p>
                </div>
                <div style={{fontSize:54}}>👶</div>
              </div>
              <div className="progress">
                <div style={{ width: `${(currentWeek / 40) * 100}%` }} />
              </div>
            </div>

            <div className="card">
              <h2>Ontwikkeling</h2>
              {data.development.map((x, i) => <p key={i}>• {x}</p>)}
            </div>

            <div className="card">
              <h2>Jouw lichaam</h2>
              {data.body.map((x, i) => <p key={i}>• {x}</p>)}
            </div>

            <div className="card">
              <h2>Symptomen</h2>
              {data.symptoms.map((x) => <span className="pill" key={x}>{x}</span>)}
            </div>

            <div className="card">
              <h2>Alle weken</h2>
              <div className="grid">
                {weeks.map((w) => (
                  <button
                    key={w}
                    className={`week ${w === currentWeek ? "active" : ""}`}
                    onClick={() => setSelectedWeek(w)}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

const style = document.createElement("style");
style.innerHTML = css;
document.head.appendChild(style);

createRoot(document.getElementById("root")).render(<App />);
