import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const toggleTodoAsync = createAsyncThunk(
  'todos/toggleTodoAsync',
  async (
    { id, completed, text }: { id: string; completed: boolean; text: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await axios.put(`http://localhost:3001/todos/${id}`, {
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
