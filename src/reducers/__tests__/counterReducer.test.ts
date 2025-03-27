import { counterReducer, CounterAction, CounterState } from '../counterReducer';
import { ACTION_TYPES } from '../actionTypes';

describe('counterReducer', () => {
  it('should return the initial state', () => {
    expect(counterReducer(0, { type: 'unknown' } as CounterAction)).toBe(0);
  });

  it('should handle INCREMENT', () => {
    expect(counterReducer(0, { type: ACTION_TYPES.INCREMENT })).toBe(1);
    expect(counterReducer(1, { type: ACTION_TYPES.INCREMENT })).toBe(2);
  });

  it('should handle DECREMENT', () => {
    expect(counterReducer(0, { type: ACTION_TYPES.DECREMENT })).toBe(-1);
    expect(counterReducer(1, { type: ACTION_TYPES.DECREMENT })).toBe(0);
  });

  it('should handle RESET', () => {
    expect(counterReducer(5, { type: ACTION_TYPES.RESET })).toBe(0);
    expect(counterReducer(-5, { type: ACTION_TYPES.RESET })).toBe(0);
  });

  it('should handle unknown action type', () => {
    const currentState = 5;
    expect(counterReducer(currentState, { type: 'UNKNOWN' } as CounterAction)).toBe(currentState);
  });
});
