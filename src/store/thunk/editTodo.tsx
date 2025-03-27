import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const editTodoAsync = createAsyncThunk(
  'todos/editTodoAsync',
  async ({ id, text }: { id: string; text: string }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`http://localhost:3001/todos/${id}`, {
        todo: text,
        completed: false,
      });

      return {
        id: response.data.id.toString(),
        text: response.data.todo,
        completed: response.data.completed,
      };
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to edit todo');
    }
  },
);
