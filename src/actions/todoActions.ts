import { TODO_ACTIONS } from '../reducers/actionTypes';

export const addTodo = (todo: string) => ({
  type: TODO_ACTIONS.ADD_TODO,
  payload: {
    id: Date.now().toString(),
    text: todo,
    completed: false,
  },
});

export const toggleTodo = (id: string) => ({
  type: TODO_ACTIONS.TOGGLE_TODO,
  payload: id,
});

export const removeTodo = (id: string) => ({
  type: TODO_ACTIONS.REMOVE_TODO,
  payload: id,
});
