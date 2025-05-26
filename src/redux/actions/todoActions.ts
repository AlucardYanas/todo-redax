import { createAction } from '@reduxjs/toolkit';

import type { CardType, FilterStatus, NewCardType, UpdateCardType } from '../../types/CardTypes';

// Action Creators
export const loadTodos = createAction<CardType[]>('todos/loadTodos');
export const addTodo = createAction<NewCardType>('todos/addTodo');
export const deleteTodo = createAction<number>('todos/deleteTodo');
export const updateTodo = createAction<{ id: number; updates: UpdateCardType }>('todos/updateTodo');
export const toggleTodoStatus = createAction<number>('todos/toggleTodoStatus');
export const setFilter = createAction<FilterStatus>('todos/setFilter');
export const setEditingTodo = createAction<CardType | null>('todos/setEditingTodo');
