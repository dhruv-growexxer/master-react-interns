import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../lib/axios';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('/todos?limit=5');
    return response.data.map((todo: any) => ({
      id: todo.id.toString(),
      text: todo.todo,
      completed: todo.completed,
    }));
  } catch (error: any) {
    console.log('error', error);

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
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete todo');
    }
  },
);

export const editTodoAsync = createAsyncThunk(
  'todos/editTodoAsync',
  async ({ id, text }: { id: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/todos/${id}`, {
        todo: text,
        id,
      });

      return {
        id,
        text: response.data.todo,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to edit todo');
    }
  },
);
