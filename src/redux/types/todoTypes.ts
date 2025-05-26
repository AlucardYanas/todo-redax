import type { CardType, FilterStatus, NewCardType, UpdateCardType } from '../../types/CardTypes';

export const TODO_ACTIONS = {
  LOAD_TODOS: 'todos/loadTodos',
  ADD_TODO: 'todos/addTodo',
  DELETE_TODO: 'todos/deleteTodo',
  UPDATE_TODO: 'todos/updateTodo',
  TOGGLE_TODO_STATUS: 'todos/toggleTodoStatus',
  SET_FILTER: 'todos/setFilter',
  SET_EDITING_TODO: 'todos/setEditingTodo',
} as const;

export interface TodoState {
  todos: CardType[];
  filter: FilterStatus;
  editingTodo: CardType | null;
}

export interface LoadTodosAction {
  type: typeof TODO_ACTIONS.LOAD_TODOS;
  payload: CardType[];
}

export interface AddTodoAction {
  type: typeof TODO_ACTIONS.ADD_TODO;
  payload: NewCardType;
}

export interface DeleteTodoAction {
  type: typeof TODO_ACTIONS.DELETE_TODO;
  payload: number;
}

export interface UpdateTodoAction {
  type: typeof TODO_ACTIONS.UPDATE_TODO;
  payload: {
    id: number;
    updates: UpdateCardType;
  };
}

export interface ToggleTodoStatusAction {
  type: typeof TODO_ACTIONS.TOGGLE_TODO_STATUS;
  payload: number;
}

export interface SetFilterAction {
  type: typeof TODO_ACTIONS.SET_FILTER;
  payload: FilterStatus;
}

export interface SetEditingTodoAction {
  type: typeof TODO_ACTIONS.SET_EDITING_TODO;
  payload: CardType | null;
}

export type TodoActionTypes =
  | LoadTodosAction
  | AddTodoAction
  | DeleteTodoAction
  | UpdateTodoAction
  | ToggleTodoStatusAction
  | SetFilterAction
  | SetEditingTodoAction;
