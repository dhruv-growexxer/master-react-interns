import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const deleteTodoAsync = createAsyncThunk(
  'todos/deleteTodoAsync',
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`http://localhost:3001/todos/${id}`);
      console.log('Delete API Response:', response.data);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'Failed to delete todo');
    }
  },
);
