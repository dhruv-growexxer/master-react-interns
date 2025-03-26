import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from '../../lib/axios';

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

export interface TodoResponse {
  id: string;
  todo: string;
  completed: boolean;
}

export const todoApi = createApi({
  reducerPath: 'todoApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001' }),
  tagTypes: ['Todo'],
  endpoints: (builder) => ({
    getTodos: builder.query<Todo[], void>({
      query: () => 'todos?limit=5',
      transformResponse: (response: TodoResponse[]) => {
        return response.map((todo) => ({
          id: todo.id.toString(),
          text: todo.todo,
          completed: todo.completed,
        }));
      },
      providesTags: ['Todo'],
    }),
    addTodo: builder.mutation<Todo, string>({
      query: (text) => ({
        url: 'todos',
        method: 'POST',
        body: {
          todo: text,
          completed: false,
          id: Date.now().toString(),
        },
      }),
      transformResponse: (response: TodoResponse) => ({
        id: response.id.toString(),
        text: response.todo,
        completed: response.completed,
      }),
      invalidatesTags: ['Todo'],
    }),
    toggleTodo: builder.mutation<Todo, { id: string; completed: boolean; text: string }>({
      query: ({ id, completed, text }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: {
          completed: !completed,
          todo: text,
          id,
        },
      }),
      transformResponse: (response: TodoResponse) => ({
        id: response.id.toString(),
        text: response.todo,
        completed: response.completed,
      }),
      invalidatesTags: ['Todo'],
    }),
    deleteTodo: builder.mutation<void, string>({
      query: (id) => ({
        url: `todos/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Todo'],
    }),
    editTodo: builder.mutation<Todo, { id: string; newText: string }>({
      query: ({ id, newText }) => ({
        url: `todos/${id}`,
        method: 'PUT',
        body: {
          todo: newText,
          id,
        },
      }),
      transformResponse: (response: TodoResponse) => ({
        id: response.id.toString(),
        text: response.todo,
        completed: response.completed,
      }),
      invalidatesTags: ['Todo'],
    }),
  }),
});

export const {
  useGetTodosQuery,
  useAddTodoMutation,
  useToggleTodoMutation,
  useDeleteTodoMutation,
  useEditTodoMutation,
} = todoApi;
