// Тип для статуса карточки
export type CardStatus = 'active' | 'completed';

// Основной тип карточки
export type CardType = {
  id: number;
  title: string;
  description: string;
  status: CardStatus;
  createdAt: string;
  updatedAt: string;
};

export type CardDataType = Omit<CardType, 'id' | 'createdAt' | 'updatedAt'>;

export type ApiResponse = CardType[];
