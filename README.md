# BEBIKO Pregnancy App

Een nette React/Vite app voor GitHub. De app heeft onboarding, profiel, taalwissel NL/EN, zwangerschapsweek-overzicht, weekdetailpagina, simpele lokale opslag en mobiele styling.

## Installeren

```bash
npm install
npm run dev
```

Open daarna de lokale Vite-link die in je terminal verschijnt.

## Uploaden naar GitHub

```bash
git init
git add .
git commit -m "Initial BEBIKO app"
git branch -M main
git remote add origin https://github.com/JOUW-GEBRUIKERSNAAM/JOUW-REPO.git
git push -u origin main
```

## Build maken

```bash
npm run build
```

De productieversie komt in de map `dist`.

## Belangrijk

Deze versie gebruikt een lokale Base44-vervanger in `src/api/base44Client.js`, zodat de app meteen werkt zonder externe backend. Later kun je dit bestand vervangen door je echte Base44/API-koppeling.
