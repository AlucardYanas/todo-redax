import React from 'react';
import { renderHook } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cardSlice from '../../../redux/cards/cardSlice';
import {
  getCardsThunk,
  updateCardThunk,
  deleteCardThunk,
} from '../../../redux/cards/cardAsyncAction';
import useCards from '../useCards';
import type { CardType } from '../../../types/CardTypes';

vi.mock('../../../services/cardService', () => {
  const mockCard: CardType = {
    id: 1,
    title: 'Test Todo',
    description: 'Test Description',
    status: 'active',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  return {
    default: {
      getCards: vi.fn().mockResolvedValue([mockCard]),
      updateCard: vi.fn().mockImplementation((id, updatedCard) => Promise.resolve(updatedCard)),
      deleteCard: vi.fn().mockResolvedValue(undefined),
    },
  };
});

const mockCard: CardType = {
  id: 1,
  title: 'Test Todo',
  description: 'Test Description',
  status: 'active',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const createTestStore = () => {
  const store = configureStore({
    reducer: {
      cards: cardSlice.reducer,
    },
  });
  store.dispatch(getCardsThunk.fulfilled([mockCard], '', undefined));
  return store;
};

interface WrapperProps {
  children: React.ReactNode;
}

const wrapper = ({ children }: WrapperProps) => {
  const store = createTestStore();
  return <Provider store={store}>{children}</Provider>;
};

describe('useCards', () => {
  it('should filter cards correctly', async () => {
    const { result } = renderHook(() => useCards(), { wrapper });

    await result.current.filterHandler('all');
    expect(result.current.selectedStatus).toBe('all');

    await result.current.filterHandler('active');
    expect(result.current.selectedStatus).toBe('active');
  });

  it('should update card status', async () => {
    const { result } = renderHook(() => useCards(), { wrapper });
    const store = createTestStore();

    await store.dispatch(
      updateCardThunk.fulfilled({ ...mockCard, status: 'completed' }, '', {
        id: mockCard.id,
        updatedCard: { ...mockCard, status: 'completed' },
      }),
    );

    await result.current.updateStatusHandler(mockCard.id);
    const updatedCard = result.current.cards.find((card: CardType) => card.id === mockCard.id);
    expect(updatedCard?.status).toBe('completed');
  });

  it('should handle card deletion', async () => {
    const { result } = renderHook(() => useCards(), { wrapper });
    const store = createTestStore();

    await store.dispatch(deleteCardThunk.fulfilled(mockCard.id, '', mockCard.id));

    await result.current.deleteHandler(mockCard.id);
    const deletedCard = result.current.cards.find((card: CardType) => card.id === mockCard.id);
    expect(deletedCard).toBeUndefined();
  });
});
