import { createSlice } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import { addTodoAsync } from '../thunk/addTodo';
import { deleteTodoAsync } from '../thunk/deleteTodo';
import { editTodoAsync } from '../thunk/editTodo';
import { fetchTodos } from '../thunk/fetchTodo';
import { toggleTodoAsync } from '../thunk/toggleTodo';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoState {
  todos: Todo[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  errors: {
    [key: string]: string | null;
  };
  loadingStates: {
    [key: string]: boolean;
  };
}

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
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        state.loadingStates['fetch'] = true;
        delete state.errors['fetch'];
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.todos = action.payload;
        state.loadingStates['fetch'] = false;
        delete state.errors['fetch'];
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.status = 'failed';
        state.loadingStates['fetch'] = false;
        state.errors['fetch'] = action.payload as string;
      })
      // Add Todo
      .addCase(addTodoAsync.pending, (state) => {
        state.loadingStates['add'] = true;
        delete state.errors['add'];
      })
      .addCase(addTodoAsync.fulfilled, (state, action) => {
        state.todos.push(action.payload);
        state.loadingStates['add'] = false;
        delete state.errors['add'];
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loadingStates['add'] = false;
        state.errors['add'] = action.payload as string;
      })
      // Toggle Todo
      .addCase(toggleTodoAsync.pending, (state, action) => {
        const id = action.meta.arg.id;
        state.loadingStates[id] = true;
        delete state.errors[id];
      })
      .addCase(toggleTodoAsync.fulfilled, (state, action) => {
        const todo = state.todos.find((todo) => todo.id === action.payload.id);
        if (todo) {
          todo.completed = action.payload.completed;
        }
        state.loadingStates[action.payload.id] = false;
        delete state.errors[action.payload.id];
      })
      .addCase(toggleTodoAsync.rejected, (state, action) => {
        const id = action.meta.arg.id;
        state.loadingStates[id] = false;
        state.errors[id] = action.payload as string;
      })
      // Delete Todo
      .addCase(deleteTodoAsync.pending, (state, action) => {
        const id = action.meta.arg;
        state.loadingStates[`delete_${id}`] = true;
        delete state.errors[`delete_${id}`];
      })
      .addCase(deleteTodoAsync.fulfilled, (state, action) => {
        const id = action.payload;
        state.todos = state.todos.filter((todo) => todo.id !== id);
        state.loadingStates[`delete_${id}`] = false;
        delete state.errors[`delete_${id}`];
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        console.log(state, action);
        const id = action.meta.arg;
        state.loadingStates[`delete_${id}`] = false;
        state.errors[`delete_${id}`] = action.payload as string;
      })

      ///Edit Todo
      .addCase(editTodoAsync.pending, (state, action) => {
        const id = action.meta.arg.id;
        state.loadingStates[`edit_${id}`] = true;
        delete state.errors[`edit_${id}`];
      })
      .addCase(editTodoAsync.fulfilled, (state, action) => {
        const { id, text, completed } = action.payload;
        const todoIndex = state.todos.findIndex((todo) => todo.id === id);
        if (todoIndex !== -1) {
          state.todos[todoIndex] = { id, text, completed };
        }
        state.loadingStates[`edit_${id}`] = false;
        delete state.errors[`edit_${id}`];
      })
      .addCase(editTodoAsync.rejected, (state, action) => {
        const id = action.meta.arg.id;
        state.loadingStates[`edit_${id}`] = false;
        state.errors[`edit_${id}`] = action.payload as string;
      });
  },
});

export const { clearError } = todoSlice.actions;
export default todoSlice.reducer;
