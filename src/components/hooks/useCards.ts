import { useEffect, useState, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import {
  addCardThunk,
  deleteCardThunk,
  getCardsThunk,
  updateCardThunk,
} from '../../redux/cards/cardAsyncAction';
import { clearAllCards } from '../../redux/cards/cardSlice';
import type { CardDataType, CardType, CardStatus } from '../../types/CardTypes';
import { useAppDispatch, useAppSelector } from './reduxHooks';

export default function useCards(): {
  cards: CardType[];
  filteredCards: CardType[];
  cardSubmitHandler: (e: React.FormEvent<HTMLFormElement>) => void;
  deleteHandler: (id: CardType['id']) => void;
  editHandler: (id: CardType['id'], updatedCard: CardType) => void;
  filterHandler: (status: CardStatus | 'all') => void;
  updateStatusHandler: (id: CardType['id']) => void;
  selectedStatus: CardStatus | 'all' | null;
  deleteAllCards: () => Promise<void>;
} {
  const cards = useAppSelector((state) => state.cards.data);
  const dispatch = useAppDispatch();
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<CardStatus | 'all' | null>(null);

  const filterCards = useCallback(
    (status: CardStatus | 'all' | null) => {
      if (!status) return [];
      if (status === 'all') return cards;
      return cards.filter((card) => card.status === status);
    },
    [cards],
  );

  const memoizedFilteredCards = useMemo(
    () => filterCards(selectedStatus),
    [filterCards, selectedStatus],
  );

  useEffect(() => {
    setFilteredCards(memoizedFilteredCards);
  }, [memoizedFilteredCards]);

  useEffect(() => {
    void dispatch(getCardsThunk());
  }, [dispatch]);

  const cardSubmitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const data = Object.fromEntries(new FormData(e.currentTarget)) as CardDataType;

      if (!data.description || typeof data.description !== 'string') {
        toast.error('Неверное описание задачи');
        return;
      }

      void dispatch(addCardThunk(data))
        .unwrap()
        .then(() => {
          toast.success('Задача успешно создана');
          form.reset();
        })
        .catch(() => {
          toast.error('Ошибка при создании задачи');
        });
    },
    [dispatch],
  );

  const deleteHandler = useCallback(
    (id: CardType['id']): void => {
      void dispatch(deleteCardThunk(id))
        .unwrap()
        .then(() => {
          toast.success('Задача успешно удалена');
        })
        .catch(() => {
          toast.error('Ошибка при удалении задачи');
        });
    },
    [dispatch],
  );

  const editHandler = useCallback(
    (id: CardType['id'], updatedCard: CardType): void => {
      void dispatch(updateCardThunk({ id, updatedCard }))
        .unwrap()
        .then(() => {
          toast.success('Задача успешно изменена');
        })
        .catch(() => {
          toast.error('Ошибка при изменении задачи');
        });
    },
    [dispatch],
  );

  const filterHandler = useCallback((status: CardStatus | 'all'): void => {
    setSelectedStatus(status);
  }, []);

  const updateStatusHandler = useCallback(
    (id: CardType['id']): void => {
      const updatedCard = cards.find((card) => card.id === id);
      if (updatedCard) {
        const newStatus = updatedCard.status === 'completed' ? 'active' : 'completed';
        const statusText = newStatus === 'completed' ? 'завершена' : 'активна';

        void dispatch(updateCardThunk({ id, updatedCard: { ...updatedCard, status: newStatus } }))
          .unwrap()
          .then(() => {
            toast.success(`Задача отмечена как ${statusText}`);
          })
          .catch(() => {
            toast.error('Ошибка при изменении статуса задачи');
          });
      }
    },
    [cards, dispatch],
  );

  const deleteAllCards = useCallback(async (): Promise<void> => {
    try {
      const response = await fetch('/api/cards/', {
        method: 'DELETE',
      });
      if (response.ok) {
        dispatch(clearAllCards());
        toast.success('Все задачи успешно удалены');
      } else {
        toast.error('Ошибка при удалении всех задач');
      }
    } catch {
      toast.error('Ошибка при удалении всех задач');
    }
  }, [dispatch]);

  return {
    cards,
    filteredCards,
    cardSubmitHandler,
    deleteHandler,
    editHandler,
    filterHandler,
    updateStatusHandler,
    selectedStatus,
    deleteAllCards,
  };
}
