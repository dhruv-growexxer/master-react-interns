import { TodoState } from './todoTypes';

export const handlePending = (state: TodoState, key: string) => {
  state.loadingStates[key] = true;
  delete state.errors[key];
};

export const handleFulfilled = (state: TodoState, key: string) => {
  state.loadingStates[key] = false;
  delete state.errors[key];
};

export const handleRejected = (state: TodoState, key: string, error: string) => {
  state.loadingStates[key] = false;
  state.errors[key] = error;
};
