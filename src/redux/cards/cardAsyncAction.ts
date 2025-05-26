import { createAsyncThunk } from '@reduxjs/toolkit';
import cardService from '../../services/cardService';
import type { ApiResponse, CardDataType, CardType } from '../../types/CardTypes';

export const getCardsThunk = createAsyncThunk<ApiResponse>('cards/getCards', async () => {
  const data = await cardService.getCards();
  return data;
});

export const addCardThunk = createAsyncThunk<CardType, CardDataType>(
  'cards/addCard',
  async (cardData) => {
    const data = await cardService.addCard(cardData);
    return data;
  },
);

export const deleteCardThunk = createAsyncThunk<CardType['id'], CardType['id']>(
  'cards/deleteCard',
  async (id) => {
    await cardService.deleteCard(id);
    return id;
  },
);

export const updateCardThunk = createAsyncThunk<
  CardType,
  { id: CardType['id']; updatedCard: CardType }
>('cards/updateCard', async ({ id, updatedCard }) => {
  const data = await cardService.updateCard(id, updatedCard);
  return data;
});

export const getCardStatusThunk = createAsyncThunk<{ status: string }, number>(
  'cards/getCardStatus',
  async (id) => {
    const data = await cardService.getCardStatus(id);
    return data;
  },
);
