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
