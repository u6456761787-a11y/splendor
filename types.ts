
export enum GemColor {
  White = 'White',
  Blue = 'Blue',
  Green = 'Green',
  Red = 'Red',
  Black = 'Black',
}

export interface Cost {
  [GemColor.White]?: number;
  [GemColor.Blue]?: number;
  [GemColor.Green]?: number;
  [GemColor.Red]?: number;
  [GemColor.Black]?: number;
}

export interface Card {
  id: string;
  tier: 1 | 2 | 3;
  points: number;
  gemColor: GemColor; // The bonus this card provides
  cost: Cost;
  img?: string; // Optional image URL for the card art
}

export interface Noble {
  id: string;
  points: number;
  requirements: Cost;
  img?: string; // Optional image URL for the noble card art
}

export interface Player {
  id: number;
  name: string;
  isAI?: boolean;
  tokens: { [key in GemColor]: number };
  cards: { [key in GemColor]: number }; // Count of bonuses owned
  purchasedCards: Card[]; // Array of actual card objects owned
  reserved: Card[];
  nobles: Noble[];
  score: number;
}

export interface GameState {
  players: Player[];
  currentPlayerIndex: number;
  bank: { [key in GemColor]: number };
  decks: {
    1: Card[];
    2: Card[];
    3: Card[];
  };
  visibleCards: {
    1: Card[];
    2: Card[];
    3: Card[];
  };
  nobles: Noble[];
  winner: number | null;
  turn: number;
  log: string[];
}