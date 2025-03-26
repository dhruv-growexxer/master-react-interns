import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TodoState } from './todoTypes';
import {
  fetchTodos,
  addTodoAsync,
  toggleTodoAsync,
  deleteTodoAsync,
  editTodoAsync,
} from './todoThunks';
import { handlePending, handleFulfilled, handleRejected } from './todoUtils';

const initialState: TodoState = {
  todos: [],
  status: 'idle',
  errors: {},
  loadingStates: {},
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Todos
      .addCase(fetchTodos.pending, (state) => handlePending(state, 'fetch'))
      .addCase(fetchTodos.fulfilled, (state, action) => {
        handleFulfilled(state, 'fetch');
        state.todos = action.payload;
      })
      .addCase(fetchTodos.rejected, (state, action) =>
        handleRejected(state, 'fetch', action.payload as string),
      )
      // Add Todo
      .addCase(addTodoAsync.pending, (state) => handlePending(state, 'add'))
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        handleFulfilled(state, 'add');
        state.todos.push(action.payload);
      })
      .addCase(addTodoAsync.rejected, (state, action) =>
        handleRejected(state, 'add', action.payload as string),
      )
      // Toggle Todo
      .addCase(toggleTodoAsync.pending, (state, action) => handlePending(state, action.meta.arg.id))
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        handleFulfilled(state, action.payload.id);
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) todo.completed = action.payload.completed;
      })
      .addCase(toggleTodoAsync.rejected, (state, action) =>
        handleRejected(state, action.meta.arg.id, action.payload as string),
      )
      // Delete Todo
      .addCase(deleteTodoAsync.pending, (state, action) =>
        handlePending(state, `delete_${action.meta.arg}`),
      )
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        handleFulfilled(state, `delete_${action.payload}`);
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      })
      .addCase(deleteTodoAsync.rejected, (state, action) =>
        handleRejected(state, `delete_${action.meta.arg}`, action.payload as string),
      )
      // Edit Todo
      .addCase(editTodoAsync.pending, (state, action) =>
        handlePending(state, `edit_${action.meta.arg.id}`),
      )
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        handleFulfilled(state, `edit_${action.payload.id}`);
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) todo.text = action.payload.text;
      })
      .addCase(editTodoAsync.rejected, (state, action) =>
        handleRejected(state, `edit_${action.meta.arg.id}`, action.payload as string),
      );
  },
});

export const { clearError } = todoSlice.actions;
export default todoSlice.reducer;
