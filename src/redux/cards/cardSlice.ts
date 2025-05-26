import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { localStorageService } from '../../services/localStorageService';
import type { CardType, FilterStatus, NewCardType, UpdateCardType } from '../../types/CardTypes';

type CardState = {
  cards: CardType[];
  filter: FilterStatus;
  editingCard: CardType | null;
};

const initialState: CardState = {
  cards: localStorageService.getCards(),
  filter: 'all',
  editingCard: null,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    loadCards: (state) => {
      state.cards = localStorageService.getCards();
    },

    addCard: (state, { payload }: PayloadAction<NewCardType>) => {
      const newCard: CardType = {
        ...payload,
        id: localStorageService.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.cards.push(newCard);
      localStorageService.saveCards(state.cards);
    },

    deleteCard: (state, { payload }: PayloadAction<number>) => {
      state.cards = state.cards.filter((card) => card.id !== payload);
      localStorageService.saveCards(state.cards);
    },

    updateCard: (state, { payload }: PayloadAction<{ id: number; updates: UpdateCardType }>) => {
      const { id, updates } = payload;
      state.cards = state.cards.map((card) =>
        card.id === id
          ? {
              ...card,
              ...updates,
              updatedAt: new Date().toISOString(),
            }
          : card,
      );
      localStorageService.saveCards(state.cards);
    },

    setFilter: (state, { payload }: PayloadAction<FilterStatus>) => {
      state.filter = payload;
    },

    setEditingCard: (state, { payload }: PayloadAction<CardType | null>) => {
      state.editingCard = payload;
    },

    toggleCardStatus: (state, { payload }: PayloadAction<number>) => {
      state.cards = state.cards.map((card) =>
        card.id === payload
          ? {
              ...card,
              status: card.status === 'active' ? 'completed' : 'active',
              updatedAt: new Date().toISOString(),
            }
          : card,
      );
      localStorageService.saveCards(state.cards);
    },
  },
});

export const {
  loadCards,
  addCard,
  deleteCard,
  updateCard,
  setFilter,
  setEditingCard,
  toggleCardStatus,
} = cardSlice.actions;

export const selectFilteredCards = (state: { cards: CardState }) => {
  const { cards, filter } = state.cards;
  if (filter === 'all') return cards;
  return cards.filter((card) => card.status === filter);
};

export default cardSlice;
