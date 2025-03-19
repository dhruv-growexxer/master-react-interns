import { ACTION_TYPES } from './actionTypes';

export type CounterState = number;

export type CounterAction = { type: (typeof ACTION_TYPES)[keyof typeof ACTION_TYPES] };

export const counterReducer = (state: CounterState, action: CounterAction): CounterState => {
  switch (action.type) {
    case ACTION_TYPES.INCREMENT:
      return state + 1;
    case ACTION_TYPES.DECREMENT:
      return state - 1;
    case ACTION_TYPES.RESET:
      return 0;
    default:
      return state;
  }
};
