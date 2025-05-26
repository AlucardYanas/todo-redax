import { useEffect, useState, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';

import { useAppDispatch, useAppSelector } from './reduxHooks';
import {
  loadTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodoStatus,
  setFilter,
} from '../../redux/actions/todoActions';
import type { CardType, NewCardType, FilterStatus } from '../../types/CardTypes';

export default function useCards() {
  const { todos, filter, editingTodo } = useAppSelector((state) => state.todos);
  const dispatch = useAppDispatch();
  const [filteredCards, setFilteredCards] = useState<CardType[]>([]);

  const filterCards = useCallback(
    (status: FilterStatus) => {
      if (status === 'all') return todos;
      return todos.filter((todo: CardType) => todo.status === status);
    },
    [todos],
  );

  const memoizedFilteredCards = useMemo(() => filterCards(filter), [filterCards, filter]);

  useEffect(() => {
    setFilteredCards(memoizedFilteredCards);
  }, [memoizedFilteredCards]);

  useEffect(() => {
    dispatch(loadTodos(todos));
  }, [dispatch, todos]);

  const cardSubmitHandler = useCallback(
    (e: React.FormEvent<HTMLFormElement>): void => {
      e.preventDefault();
      const form = e.currentTarget as HTMLFormElement;
      const formData = new FormData(form);
      const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        status: 'active' as const,
      };

      if (!data.title || !data.description) {
        toast.error('Заполните все поля');
        return;
      }

      dispatch(addTodo(data));
      toast.success('Задача успешно создана');
      form.reset();
    },
    [dispatch],
  );

  const deleteHandler = useCallback(
    (id: number): void => {
      dispatch(deleteTodo(id));
      toast.success('Задача успешно удалена');
    },
    [dispatch],
  );

  const editHandler = useCallback(
    (id: number, updates: Partial<NewCardType>): void => {
      dispatch(updateTodo({ id, updates }));
      toast.success('Задача успешно изменена');
    },
    [dispatch],
  );

  const filterHandler = useCallback(
    (status: FilterStatus): void => {
      dispatch(setFilter(status));
    },
    [dispatch],
  );

  const updateStatusHandler = useCallback(
    (id: number): void => {
      dispatch(toggleTodoStatus(id));
      toast.success('Статус задачи изменен');
    },
    [dispatch],
  );

  return {
    cards: todos,
    filteredCards,
    cardSubmitHandler,
    deleteHandler,
    editHandler,
    filterHandler,
    updateStatusHandler,
    selectedStatus: filter,
    editingTodo,
  };
}
