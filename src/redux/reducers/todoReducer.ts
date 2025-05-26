import { createReducer } from '@reduxjs/toolkit';

import { localStorageService } from '../../services/localStorageService';
import {
  loadTodos,
  addTodo,
  deleteTodo,
  updateTodo,
  toggleTodoStatus,
  setFilter,
  setEditingTodo,
  reorderTodos,
} from '../actions/todoActions';
import type { TodoState } from '../types/todoTypes';

const initialState: TodoState = {
  todos: localStorageService.getCards(),
  filter: 'all',
  editingTodo: null,
};

export const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(loadTodos, (state, action) => {
      state.todos = action.payload;
    })
    .addCase(addTodo, (state, action) => {
      const newTodo = {
        ...action.payload,
        id: localStorageService.generateId(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      state.todos.push(newTodo);
      localStorageService.saveCards(state.todos);
    })
    .addCase(deleteTodo, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      localStorageService.saveCards(state.todos);
    })
    .addCase(updateTodo, (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload.id
          ? {
              ...todo,
              ...action.payload.updates,
              updatedAt: new Date().toISOString(),
            }
          : todo,
      );
      localStorageService.saveCards(state.todos);
    })
    .addCase(toggleTodoStatus, (state, action) => {
      state.todos = state.todos.map((todo) =>
        todo.id === action.payload
          ? {
              ...todo,
              status: todo.status === 'active' ? 'completed' : 'active',
              updatedAt: new Date().toISOString(),
            }
          : todo,
      );
      localStorageService.saveCards(state.todos);
    })
    .addCase(setFilter, (state, action) => {
      state.filter = action.payload;
    })
    .addCase(setEditingTodo, (state, action) => {
      state.editingTodo = action.payload;
    })
    .addCase(reorderTodos, (state, action) => {
      state.todos = action.payload;
      localStorageService.saveCards(state.todos);
    });
});
