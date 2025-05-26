import type { CardType } from '../types/CardTypes';

const STORAGE_KEY = 'todo_cards' as const;

interface LocalStorageService {
  getCards(): CardType[];
  saveCards(cards: CardType[]): void;
  addCard(card: CardType): void;
  updateCard(id: CardType['id'], updatedCard: CardType): void;
  deleteCard(id: CardType['id']): void;
  generateId(): number;
  getCardStatus(id: CardType['id']): { status: string } | null;
}

export const localStorageService: LocalStorageService = {
  getCards(): CardType[] {
    const cards = localStorage.getItem(STORAGE_KEY);
    return cards ? JSON.parse(cards) : [];
  },

  saveCards(cards: CardType[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cards));
  },

  addCard(card: CardType): void {
    const cards = this.getCards();
    cards.push(card);
    this.saveCards(cards);
  },

  updateCard(id: CardType['id'], updatedCard: CardType): void {
    const cards = this.getCards();
    const index = cards.findIndex((card) => card.id === id);
    if (index !== -1) {
      cards[index] = updatedCard;
      this.saveCards(cards);
    }
  },

  deleteCard(id: CardType['id']): void {
    const cards = this.getCards();
    const filteredCards = cards.filter((card) => card.id !== id);
    this.saveCards(filteredCards);
  },

  generateId(): number {
    const cards = this.getCards();
    return cards.length > 0 ? Math.max(...cards.map((card) => card.id)) + 1 : 1;
  },

  getCardStatus(id: CardType['id']): { status: string } | null {
    const cards = this.getCards();
    const card = cards.find((card) => card.id === id);
    return card ? { status: card.status } : null;
  },
};
