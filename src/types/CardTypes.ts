export type CardStatus = 'active' | 'completed';

export type FilterStatus = CardStatus | 'all';

export type CardType = {
  id: number;
  title: string;
  description: string;
  status: CardStatus;
  createdAt: string;
  updatedAt: string;
};

export type NewCardType = {
  title: string;
  description: string;
  status: CardStatus;
};

export type UpdateCardType = Partial<NewCardType>;

export type CardDataType = Omit<CardType, 'id' | 'createdAt' | 'updatedAt'>;

export type ApiResponse = CardType[];
