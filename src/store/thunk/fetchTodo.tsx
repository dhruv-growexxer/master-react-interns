import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const fetchTodos = createAsyncThunk('todos/fetchTodos', async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:3001/todos?limit=5');
    return response.data.map((todo: any) => ({
      id: todo.id.toString(),
      text: todo.todo,
      completed: todo.completed,
    }));
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Failed to fetch todos');
  }
});
