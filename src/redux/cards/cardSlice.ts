import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import type { CardType } from '../../types/CardTypes';
import {
  addCardThunk,
  deleteCardThunk,
  getCardsThunk,
  updateCardThunk,
  getCardStatusThunk,
} from './cardAsyncAction';

type CardState = {
  data: CardType[];
  edit: CardType | null;
  status: string | null;
};

const initialState: CardState = {
  data: [],
  edit: null,
  status: null,
};

const cardSlice = createSlice({
  name: 'cards',
  initialState,
  reducers: {
    editCard(state, { payload }: PayloadAction<CardType | null>) {
      state.edit = payload;
    },
    clearAllCards(state) {
      state.data = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCardsThunk.fulfilled, (state, { payload }: PayloadAction<CardType[]>) => {
        state.data = payload;
      })
      .addCase(addCardThunk.fulfilled, (state, { payload }: PayloadAction<CardType>) => {
        state.data.push(payload);
      })
      .addCase(deleteCardThunk.fulfilled, (state, { payload }: PayloadAction<number>) => {
        state.data = state.data.filter((card) => card.id !== payload);
      })
      .addCase(updateCardThunk.fulfilled, (state, { payload }: PayloadAction<CardType>) => {
        state.data = state.data.map((card) => (card.id === payload.id ? payload : card));
      })
      .addCase(
        getCardStatusThunk.fulfilled,
        (state, { payload }: PayloadAction<{ status: string }>) => {
          state.status = payload.status;
        },
      );
  },
});

export const { editCard, clearAllCards } = cardSlice.actions;

export default cardSlice;
