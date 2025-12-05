
import { Card, GemColor, Noble, Cost } from './types';

// Helper to generate a unique ID
const uid = () => Math.random().toString(36).substr(2, 9);

const GEM_COLORS = [GemColor.White, GemColor.Blue, GemColor.Green, GemColor.Red, GemColor.Black];

// Sample Images based on the user's request (Sapphire/Blue theme)
const DIAMOND_IMAGES = [
  'nano-banana-1764285933426-removebg-preview.png',
  'nano-banana-1764291293902-removebg-preview.png',
  'nano-banana-1764291457896-removebg-preview.png',
  'nano-banana-1764291490550-removebg-preview.png',
  'nano-banana-1764291649942-removebg-preview.png',
  'nano-banana-1764291708474-removebg-preview.png',
  'nano-banana-1764291741539-removebg-preview.png',
  'nano-banana-1764291828516-removebg-preview.png',
  'nano-banana-1764291969969-removebg-preview.png',
  'nano-banana-1764292080682-removebg-preview (1).png',
  'nano-banana-1764292226919-removebg-preview.png',
  'nano-banana-1764292372754-removebg-preview.png',
  'nano-banana-1764292506476-removebg-preview.png',
  'nano-banana-1764292642000-removebg-preview.png',
  'nano-banana-1764292679999-removebg-preview.png',
  'nano-banana-1764292782931-removebg-preview.png',
  'nano-banana-1764292935996-removebg-preview.png',
  'nano-banana-1764293067642-removebg-preview.png',
];

const EMERALD_IMAGES = [
  '1fc20e72-a1ce-48ed-bd9c-61497b01c3c8-removebg-preview.png',
  '24e01a6c-acaa-462f-a0f1-4da885c1dd13-removebg-preview.png',
  '2a512400-8137-4d99-98ae-8fe57b54f0af-removebg-preview.png',
  '4b97579f-2259-42ea-a27a-9fb4b4392b8c-removebg-preview.png',
  '5730304f-05fd-46ec-a104-c9dc00bcd17e__1_-removebg-preview.png',
  '70c40f86-dd18-42f8-bc3b-ce3a137596e6-removebg-preview.png',
  'dac47ed4-c194-44ed-8fec-6689f7dc7c6b-removebg-preview.png',
  'f65ff81f-b96f-4497-a740-b5d53766cd21-removebg-preview.png',
  'fc6d0947-dd13-4f0b-a2fb-59cc35c67705__1_-removebg-preview.png',
  'nano-banana-1764284395047-removebg-preview.png',
  'nano-banana-1764284451445-removebg-preview.png',
  'nano-banana-1764284495650-removebg-preview.png',
  'nano-banana-1764284513574-removebg-preview.png',
  'nano-banana-1764284737874-removebg-preview.png',
  'nano-banana-1764284770444-removebg-preview.png',
  'nano-banana-1764285188508-removebg-preview.png',
  'nano-banana-1764285355688-removebg-preview.png',
  'nano-banana-1764285379957-removebg-preview.png',
];

const RUBY_IMAGES = [
  '1ecba234-369d-4a1f-b49c-3dd30637bfe0-removebg-preview.png',
  '2be8c22f-4349-4a2c-ba50-8cfe2f6a4825-removebg-preview.png',
  '4aaa14ac-69fa-404e-9dc8-07e087dc0363-removebg-preview.png',
  '562fb752-b3a6-4b4f-a8ec-eeb50942db27-removebg-preview.png',
  '58c507f2-c1ad-4c49-a2b6-9ad7434f19b5-removebg-preview.png',
  '6040c69d-5dc7-4b3b-8bf6-db097cc04bdb-removebg-preview.png',
  '60eac363-8fcc-4feb-b08d-ad71b02d72e3-removebg-preview.png',
  '670b18ef-0eda-42ff-8af5-92354cc9f97d-removebg-preview.png',
  '6a273c66-1372-45f3-9988-05e459197858-removebg-preview.png',
  '81676ec1-fd17-41fa-bf33-c96ab77536c0-removebg-preview.png',
  '82989b1e-2782-4f31-902c-f0b6c1582799-removebg-preview.png',
  '9cf88e69-db6a-40bb-b041-f6c9a051d1ec-removebg-preview.png',
  'a9524d65-8903-432e-8d51-aac09c7bbaf5-removebg-preview (1).png',
  'd78ec4f0-2cbf-4c46-909a-9e729633a174-removebg-preview.png',
  'ee0882d4-b28c-4069-bf19-bac28337f94f-removebg-preview.png',
  'nano-banana-1764282733465-removebg-preview.png',
  'nano-banana-1764282903125-removebg-preview.png',
  'nano-banana-1764283830889-removebg-preview.png',
];

const SAPPHIRE_IMAGES = [
  'nano-banana-1764332563440-removebg-preview.png',
  'nano-banana-1764332645431-removebg-preview.png',
  'nano-banana-1764332715670-removebg-preview.png',
  'nano-banana-1764332808000-removebg-preview.png',
  'nano-banana-1764332843916-removebg-preview.png',
  'nano-banana-1764333125836-removebg-preview.png',
  'nano-banana-1764333148753-removebg-preview.png',
  'nano-banana-1764333200239-removebg-preview.png',
  'nano-banana-1764333237759-removebg-preview.png',
  'nano-banana-1764333284635-removebg-preview.png',
  'nano-banana-1764333332466-removebg-preview.png',
  'nano-banana-1764333375795-removebg-preview.png',
  'nano-banana-1764333420663__1_-removebg-preview.png',
  'nano-banana-1764333506789-removebg-preview.png',
  'nano-banana-1764333541687-removebg-preview.png',
  'nano-banana-1764333597616-removebg-preview.png',
  'nano-banana-1764333740012-removebg-preview.png',
  'nano-banana-1764333813906-removebg-preview.png',
];

const ONYX_IMAGES = [
  'nano-banana-1764293816422-removebg-preview.png',
  'nano-banana-1764294062140-removebg-preview.png',
  'nano-banana-1764294135143-removebg-preview.png',
  'nano-banana-1764294558305-removebg-preview.png',
  'nano-banana-1764294825197-removebg-preview.png',
  'nano-banana-1764326054953-removebg-preview-removebg-preview.png',
  'nano-banana-1764326110773-removebg-preview.png',
  'nano-banana-1764326154590-removebg-preview.png',
  'nano-banana-1764326298422-removebg-preview.png',
  'nano-banana-1764326560144-removebg-preview.png',
  'nano-banana-1764327236390-removebg-preview.png',
  'nano-banana-1764327292551-removebg-preview.png',
  'nano-banana-1764327335844-removebg-preview.png',
  'nano-banana-1764327474995-removebg-preview.png',
  'nano-banana-1764327524050-removebg-preview.png',
  'nano-banana-1764327570198-removebg-preview.png',
  'nano-banana-1764327739869-removebg-preview.png',
  'nano-banana-1764327776386-removebg-preview.png',
];

const getRandomImage = (gemColor: GemColor): string => {
  let images: string[] = [];
  let folder = '';
  switch (gemColor) {
    case GemColor.White:
      images = DIAMOND_IMAGES;
      folder = 'diamond';
      break;
    case GemColor.Green:
      images = EMERALD_IMAGES;
      folder = 'emerald';
      break;
    case GemColor.Red:
      images = RUBY_IMAGES;
      folder = 'ruby';
      break;
    case GemColor.Blue:
      images = SAPPHIRE_IMAGES;
      folder = 'sapphire';
      break;
    case GemColor.Black:
      images = ONYX_IMAGES;
      folder = 'onyx';
      break;
    default:
      return '';
  }
  const randomImage = images[Math.floor(Math.random() * images.length)];
  return `/cards/${folder}/${randomImage}`;
};

// Simplified Card Generation Logic to simulate the real deck
// Simplified Card Generation Logic to simulate the real deck
const generateTier1Cards = (): Card[] => {
  const cards: Card[] = [];

  GEM_COLORS.forEach(bonusColor => {
    // === کارت‌های استاندارد سطح 1 (شبیه بازی اصلی) ===

    // 1. هزینه: 1 از هر 4 رنگ دیگر (مجموع 4)
    // مثال: برای کارت آبی -> 1 سفید، 1 سبز، 1 قرمز، 1 سیاه
    {
      const cost: Cost = {};
      GEM_COLORS.forEach(c => {
        if (c !== bonusColor) cost[c] = 1;
      });
      const img = getRandomImage(bonusColor);
      cards.push({ id: uid(), tier: 1, points: 0, gemColor: bonusColor, cost, img });
    }

    // 2. هزینه: 2 از یک رنگ + 1 از رنگ دیگر (مجموع 3)
    for (let i = 0; i < 2; i++) {
      const cost: Cost = {};
      const c1 = GEM_COLORS[Math.floor(Math.random() * 5)];
      const c2 = GEM_COLORS[Math.floor(Math.random() * 5)];

      cost[c1] = 2;
      // اگر رنگ دوم تکراری بود، رنگ دیگری انتخاب کن یا همان را 3 کن
      if (c1 === c2) {
        cost[c1] = 3;
      } else {
        cost[c2] = 1;
      }

      const img = getRandomImage(bonusColor);
      cards.push({ id: uid(), tier: 1, points: 0, gemColor: bonusColor, cost, img });
    }

    // 3. هزینه: 3 از یک رنگ خاص (مجموع 3)
    {
      const cost: Cost = {};
      const c = GEM_COLORS[Math.floor(Math.random() * 5)];
      cost[c] = 3;
      const img = getRandomImage(bonusColor);
      cards.push({ id: uid(), tier: 1, points: 0, gemColor: bonusColor, cost, img });
    }

    // 4. هزینه: 2 از دو رنگ مختلف (مجموع 4)
    {
      const cost: Cost = {};
      let c1 = GEM_COLORS[Math.floor(Math.random() * 5)];
      let c2 = GEM_COLORS[Math.floor(Math.random() * 5)];
      while (c1 === c2) c2 = GEM_COLORS[Math.floor(Math.random() * 5)]; // اطمینان از متفاوت بودن

      cost[c1] = 2;
      cost[c2] = 2;

      const img = getRandomImage(bonusColor);
      cards.push({ id: uid(), tier: 1, points: 0, gemColor: bonusColor, cost, img });
    }

    // === کارت‌های با امتیاز (1 امتیاز، هزینه 4) ===
    {
      const cost: Cost = {};
      const c = GEM_COLORS[Math.floor(Math.random() * 5)];
      cost[c] = 4;

      const img = getRandomImage(bonusColor);
      cards.push({ id: uid(), tier: 1, points: 1, gemColor: bonusColor, cost, img });
    }
  });

  // مخلوط کردن کارت‌ها
  return cards.sort(() => Math.random() - 0.5);
};

const generateTier2Cards = (): Card[] => {
  const cards: Card[] = [];
  GEM_COLORS.forEach(bonusColor => {
    // 1-2 points, cost 5-8 gems
    for (let i = 0; i < 4; i++) {
      const cost: Cost = {};
      const c1 = GEM_COLORS[Math.floor(Math.random() * 5)];
      const c2 = GEM_COLORS[Math.floor(Math.random() * 5)];
      const c3 = GEM_COLORS[Math.floor(Math.random() * 5)];

      cost[c1] = (cost[c1] || 0) + 3;
      cost[c2] = (cost[c2] || 0) + 2;
      cost[c3] = (cost[c3] || 0) + 2;

      const img = getRandomImage(bonusColor);

      cards.push({ id: uid(), tier: 2, points: Math.floor(Math.random() * 2) + 1, gemColor: bonusColor, cost, img });
    }
  });
  return cards.sort(() => Math.random() - 0.5);
};

const generateTier3Cards = (): Card[] => {
  const cards: Card[] = [];
  GEM_COLORS.forEach(bonusColor => {
    // 3-5 points, high cost
    for (let i = 0; i < 3; i++) {
      const cost: Cost = {};
      const c1 = GEM_COLORS[Math.floor(Math.random() * 5)];
      const c2 = GEM_COLORS[Math.floor(Math.random() * 5)];
      cost[c1] = (cost[c1] || 0) + 3;
      cost[c2] = (cost[c2] || 0) + 7;

      // Normalize slightly
      if (Math.random() > 0.5) {
        cost[c2] = 5;
        cost[c1] = 5;
        const c3 = GEM_COLORS[Math.floor(Math.random() * 5)];
        cost[c3] = 5;
      }

      const img = getRandomImage(bonusColor);

      cards.push({ id: uid(), tier: 3, points: Math.floor(Math.random() * 3) + 3, gemColor: bonusColor, cost, img });
    }
  });
  return cards.sort(() => Math.random() - 0.5);
};

export const INITIAL_DECKS = {
  1: generateTier1Cards(),
  2: generateTier2Cards(),
  3: generateTier3Cards(),
};

export const NOBLES: Noble[] = [
  { id: 'n1', points: 3, requirements: { [GemColor.Blue]: 4, [GemColor.White]: 4 }, img: '/assets/nobles/noble_1_new.png' },
  { id: 'n2', points: 3, requirements: { [GemColor.Red]: 4, [GemColor.Green]: 4 }, img: '/assets/nobles/noble_2_new.png' },
  { id: 'n3', points: 3, requirements: { [GemColor.Black]: 4, [GemColor.Red]: 4 }, img: '/assets/nobles/noble_3_new.png' },
  { id: 'n4', points: 3, requirements: { [GemColor.Blue]: 3, [GemColor.Green]: 3, [GemColor.Red]: 3 }, img: '/assets/nobles/noble_4_new.png' },
  { id: 'n5', points: 3, requirements: { [GemColor.White]: 3, [GemColor.Black]: 3, [GemColor.Blue]: 3 }, img: '/assets/nobles/noble_5_new.png' },
]; // In a real game, shuffle and pick N+1 nobles.

export const INITIAL_BANK_4_PLAYERS = {
  [GemColor.White]: 7,
  [GemColor.Blue]: 7,
  [GemColor.Green]: 7,
  [GemColor.Red]: 7,
  [GemColor.Black]: 7,
};

export const INITIAL_BANK_2_PLAYERS = {
  [GemColor.White]: 4,
  [GemColor.Blue]: 4,
  [GemColor.Green]: 4,
  [GemColor.Red]: 4,
  [GemColor.Black]: 4,
};
