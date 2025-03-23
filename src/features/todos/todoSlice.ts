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
    return response.data.todos.map((todo: any) => ({
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
      const response = await axios.post('/todos/add', {
        todo: text,
        completed: false,
        userId: 1,
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
  async ({ id, completed }: { id: string; completed: boolean }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/todos/${id}`, {
        completed: !completed,
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
      });
  },
});

export const { clearError } = todoSlice.actions;
export default todoSlice.reducer;
