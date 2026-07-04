const sizes = [
  ['Poppy seed', 'maanzaadje', '🌱'], ['Sesame seed', 'sesamzaadje', '🌱'], ['Lentil', 'linze', '🫘'], ['Blueberry', 'bosbes', '🫐'],
  ['Raspberry', 'framboos', '🍓'], ['Olive', 'olijf', '🫒'], ['Prune', 'pruim', '🟣'], ['Lime', 'limoen', '🍋'],
  ['Peach', 'perzik', '🍑'], ['Lemon', 'citroen', '🍋'], ['Apple', 'appel', '🍎'], ['Avocado', 'avocado', '🥑'],
  ['Pear', 'peer', '🍐'], ['Bell pepper', 'paprika', '🫑'], ['Mango', 'mango', '🥭'], ['Banana', 'banaan', '🍌'],
  ['Carrot', 'wortel', '🥕'], ['Papaya', 'papaja', '🟠'], ['Corn cob', 'maïskolf', '🌽'], ['Eggplant', 'aubergine', '🍆'],
  ['Coconut', 'kokosnoot', '🥥'], ['Pineapple', 'ananas', '🍍'], ['Melon', 'meloen', '🍈'], ['Cauliflower', 'bloemkool', '🥦'],
  ['Cabbage', 'kool', '🥬'], ['Butternut squash', 'pompoen', '🎃'], ['Large lettuce', 'grote sla', '🥬'], ['Honeydew', 'honingmeloen', '🍈'],
  ['Small pumpkin', 'kleine pompoen', '🎃'], ['Large coconut', 'grote kokosnoot', '🥥'], ['Bunch of bananas', 'bananentros', '🍌'], ['Watermelon', 'watermeloen', '🍉'],
  ['Large melon', 'grote meloen', '🍈'], ['Pumpkin', 'pompoen', '🎃'], ['Winter melon', 'wintermeloen', '🍈'], ['Big pumpkin', 'grote pompoen', '🎃'],
  ['Newborn size', 'pasgeboren maat', '👶'], ['Ready baby', 'klaar voor geboorte', '👶'], ['Birth size', 'geboorteformaat', '👶'], ['Delivery week', 'uitgerekende week', '👶'],
];

const symptomSets = [
  {
    nl: ['Vermoeidheid', 'Gevoelige borsten', 'Misselijkheid'],
    en: ['Fatigue', 'Tender breasts', 'Nausea'],
  },
  {
    nl: ['Meer energie', 'Bandenpijn', 'Stemmingswisselingen'],
    en: ['More energy', 'Round ligament pain', 'Mood changes'],
  },
  {
    nl: ['Rugpijn', 'Brandend maagzuur', 'Vocht vasthouden'],
    en: ['Back pain', 'Heartburn', 'Fluid retention'],
  },
  {
    nl: ['Bekkenpijn', 'Slecht slapen', 'Harde buiken'],
    en: ['Pelvic pain', 'Poor sleep', 'Braxton Hicks'],
  },
];

function makeLength(week) {
  if (week < 8) return `${Math.max(1, week * 2)} mm`;
  return `${Math.round(week * 1.18 + 3)} cm`;
}

function makeWeight(week) {
  if (week < 10) return '< 5 g';
  const grams = Math.round(Math.pow(week - 7, 2.05) * 2.35);
  return grams > 1000 ? `${(grams / 1000).toFixed(1)} kg` : `${grams} g`;
}

function makeDevelopment(week) {
  if (week <= 8) {
    return {
      nl: ['De basis van organen en zenuwstelsel wordt aangelegd.', 'Het hartje ontwikkelt zich snel.', 'Kleine knopjes voor armen en benen worden zichtbaar.'],
      en: ['The foundation of organs and the nervous system is forming.', 'The tiny heart is developing quickly.', 'Small buds for arms and legs are becoming visible.'],
    };
  }
  if (week <= 13) {
    return {
      nl: ['Gezicht, vingers en tenen krijgen meer vorm.', 'Je baby maakt kleine bewegingen, al voel je die meestal nog niet.', 'Belangrijke organen groeien verder door.'],
      en: ['Face, fingers and toes become more defined.', 'Your baby makes small movements, although you usually cannot feel them yet.', 'Important organs continue to mature.'],
    };
  }
  if (week <= 20) {
    return {
      nl: ['De botten worden sterker en de bewegingen nemen toe.', 'Je baby oefent met slikken en bewegen.', 'Het gehoor ontwikkelt zich stap voor stap.'],
      en: ['Bones become stronger and movement increases.', 'Your baby practices swallowing and moving.', 'Hearing develops step by step.'],
    };
  }
  if (week <= 28) {
    return {
      nl: ['Je baby krijgt meer vetlaag en groeit sneller.', 'De longen oefenen met ademhalingsbewegingen.', 'Slaap- en waakmomenten worden duidelijker.'],
      en: ['Your baby gains more fat and grows faster.', 'The lungs practice breathing movements.', 'Sleep and wake patterns become clearer.'],
    };
  }
  if (week <= 36) {
    return {
      nl: ['Je baby wordt sterker en reageert op licht en geluid.', 'De hersenen ontwikkelen zich in hoog tempo.', 'De meeste baby’s draaien richting een geboortepositie.'],
      en: ['Your baby becomes stronger and responds to light and sound.', 'The brain is developing rapidly.', 'Most babies start moving toward a birth position.'],
    };
  }
  return {
    nl: ['Je baby komt steeds dichter bij de geboorte.', 'De longen en reflexen zijn bijna volledig klaar.', 'Bewegingen voelen vaak krachtig maar met minder ruimte.'],
    en: ['Your baby is getting closer to birth.', 'The lungs and reflexes are almost fully ready.', 'Movements may feel strong, but there is less room.'],
  };
}

function makeBody(week) {
  if (week <= 13) {
    return {
      nl: ['Je lichaam past zich hormonaal aan.', 'Rust, kleine maaltijden en genoeg drinken kunnen helpen.', 'Neem contact op met je verloskundige bij hevige pijn of bloedverlies.'],
      en: ['Your body is adjusting hormonally.', 'Rest, small meals and enough fluids can help.', 'Contact your midwife or doctor for severe pain or bleeding.'],
    };
  }
  if (week <= 27) {
    return {
      nl: ['Je buik groeit zichtbaarder en je houding kan veranderen.', 'Lichte beweging kan helpen bij stijfheid.', 'Let op ijzer, hydratatie en voldoende slaap.'],
      en: ['Your belly becomes more visible and posture may change.', 'Gentle movement can help with stiffness.', 'Pay attention to iron, hydration and enough sleep.'],
    };
  }
  return {
    nl: ['Je lichaam werkt hard richting de bevalling.', 'Plan rustmomenten en luister goed naar je grenzen.', 'Bel je zorgverlener bij minder leven voelen of aanhoudende klachten.'],
    en: ['Your body is working hard toward birth.', 'Plan rest moments and listen carefully to your limits.', 'Call your care provider if movement decreases or symptoms persist.'],
  };
}

export const pregnancyWeeks = Array.from({ length: 40 }, (_, index) => {
  const week = index + 1;
  const size = sizes[index];
  const symptomSet = symptomSets[Math.min(symptomSets.length - 1, Math.floor((week - 1) / 10))];

  return {
    week,
    fruit: {
      en: size[0],
      nl: size[1],
    },
    emoji: size[2],
    length: makeLength(week),
    weight: makeWeight(week),
    development: makeDevelopment(week),
    body: makeBody(week),
    symptoms: symptomSet,
  };
});

export function getWeekData(week) {
  const safeWeek = Math.max(1, Math.min(40, Number.parseInt(week, 10) || 1));
  return pregnancyWeeks[safeWeek - 1];
}
