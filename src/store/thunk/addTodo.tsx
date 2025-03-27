import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const addTodoAsync = createAsyncThunk(
  'todos/addTodoAsync',
  async (text: string, { rejectWithValue }) => {
    try {
      const response = await axios.post('http://localhost:3001/todos', {
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
