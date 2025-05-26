import { beforeEach, describe, expect, it, vi } from 'vitest';
import { localStorageService } from '../localStorageService';
import type { CardType } from '../../types/CardTypes';

const mockCard: CardType = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe('LocalStorageService', () => {
  let storedItems: { [key: string]: string } = {};

  beforeEach(() => {
    storedItems = {};
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation((key, value) => {
      storedItems[key] = String(value);
    });
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation((key) => storedItems[key] || null);
    vi.spyOn(Storage.prototype, 'clear').mockImplementation(() => {
      storedItems = {};
    });
  });

  it('should save and retrieve cards from localStorage', () => {
    localStorageService.saveCards([mockCard]);
    const cards = localStorageService.getCards();
    expect(cards).toHaveLength(1);
    expect(cards[0]).toEqual(mockCard);
  });

  it('should update a card in localStorage', () => {
    localStorageService.saveCards([mockCard]);
    const updatedCard = { ...mockCard, title: 'Updated Title' };
    localStorageService.updateCard(mockCard.id, updatedCard);
    const cards = localStorageService.getCards();
    expect(cards[0].title).toBe('Updated Title');
  });

  it('should delete a card from localStorage', () => {
    localStorageService.saveCards([mockCard]);
    localStorageService.deleteCard(mockCard.id);
    const cards = localStorageService.getCards();
    expect(cards).toHaveLength(0);
  });
});
