import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

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

// Async thunks
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/todos?limit=5');
    return response.data.map((todo: any) => ({
      id: todo.id.toString(),
      text: todo.todo,
      completed: todo.completed,
    }));
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch todos');
  }
});

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (text: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('/todos', {
        todo: text,
        completed: false,
        id: Date.now().toString(),
      });

      return {
        id: response.data.id.toString(),
        text: response.data.todo,
        completed: response.data.completed,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to add todo');
    }
  },
);

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodoAsync',
  async (
    { id, completed, text }: { id: string; completed: boolean; text: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(`/todos/${id}`, {
        completed: !completed,
        todo: text,
        id,
      });

      console.log('Toggle API Response:', response.data);
      return {
        id,
        completed: !completed,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to toggle todo');
    }
  },
);

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/todos/${id}`);
      console.log('Delete API Response:', response.data);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete todo');
    }
  },
);
export const updateTodoAsync = createAsyncThunk(
  'todos/updateTodoAsync',
  async ({ id, text }: Pick<Todo, 'id' | 'text'>, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/todos/${id}`, { todo: text });
      return { id, text: response.data.todo };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to update todo');
    }
  },
);

const createAsyncHandlers = (
  thunk: any,
  keyGenerator: (action: any) => string,
  successHandler?: (state: TodoState, action: any) => void,
) => ({
  pending: (state: TodoState, action: any) => {
    const key = keyGenerator(action);
    state.loadingStates[key] = true;
    delete state.errors[key];
  },
  fulfilled: (state: TodoState, action: any) => {
    const key = keyGenerator(action);
    state.loadingStates[key] = false;
    delete state.errors[key];
    if (successHandler) successHandler(state, action);
  },
  rejected: (state: TodoState, action: any) => {
    const key = keyGenerator(action);
    state.loadingStates[key] = false;
    state.errors[key] = action.payload as string;
  },
});

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    clearError: (state, action: PayloadAction<string>) => {
      delete state.errors[action.payload];
    },
  },
  extraReducers: (builder) => {
    // Fetch Todos
    const fetchHandlers = createAsyncHandlers(
      fetchTodos,
      () => 'fetch',
      (state, action) => {
        state.todos = action.payload;
        state.status = 'succeeded';
      },
    );
    builder
      .addCase(fetchTodos.pending, (state) => {
        state.status = 'loading';
        fetchHandlers.pending(state, null);
      })
      .addCase(fetchTodos.fulfilled, fetchHandlers.fulfilled)
      .addCase(fetchTodos.rejected, fetchHandlers.rejected);

    // Add Todo
    const addHandlers = createAsyncHandlers(
      addTodoAsync,
      () => 'add',
      (state, action) => state.todos.push(action.payload),
    );
    builder
      .addCase(addTodoAsync.pending, addHandlers.pending)
      .addCase(addTodoAsync.fulfilled, addHandlers.fulfilled)
      .addCase(addTodoAsync.rejected, addHandlers.rejected);

    // Toggle Todo
    const toggleHandlers = createAsyncHandlers(
      toggleTodoAsync,
      (action) => action.meta.arg.id,
      (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload.id);
        if (todo) todo.completed = action.payload.completed;
      },
    );
    builder
      .addCase(toggleTodoAsync.pending, toggleHandlers.pending)
      .addCase(toggleTodoAsync.fulfilled, toggleHandlers.fulfilled)
      .addCase(toggleTodoAsync.rejected, toggleHandlers.rejected);

    // Delete Todo
    const deleteHandlers = createAsyncHandlers(
      deleteTodoAsync,
      (action) => `delete_${action.meta.arg}`,
      (state, action) => {
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      },
    );
    builder
      .addCase(deleteTodoAsync.pending, deleteHandlers.pending)
      .addCase(deleteTodoAsync.fulfilled, deleteHandlers.fulfilled)
      .addCase(deleteTodoAsync.rejected, deleteHandlers.rejected);

    // Update Todo
    const updateHandlers = createAsyncHandlers(
      updateTodoAsync,
      (action) => `update_${action.meta.arg.id}`,
      (state, action) => {
        const todo = state.todos.find((t) => t.id === action.payload.id);
        if (todo) todo.text = action.payload.text;
      },
    );
    builder
      .addCase(updateTodoAsync.pending, updateHandlers.pending)
      .addCase(updateTodoAsync.fulfilled, updateHandlers.fulfilled)
      .addCase(updateTodoAsync.rejected, updateHandlers.rejected);
  },
});

export const { clearError } = todoSlice.actions;
export default todoSlice.reducer;
