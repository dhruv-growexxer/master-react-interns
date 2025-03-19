import { useReducer } from 'react';
import { counterReducer } from '../../reducers/counterReducer';
import { ACTION_TYPES } from '../../reducers/actionTypes';
import { useTheme } from '../../contexts';

export default function CounterReducer() {
  const { count, dispatch } = useTheme();
  return (
    <div>
      <h2>Counter: {count}</h2>
      <button onClick={() => dispatch({ type: ACTION_TYPES.INCREMENT })}>Increment</button>
      <button onClick={() => dispatch({ type: ACTION_TYPES.DECREMENT })}>Decrement</button>
      <button onClick={() => dispatch({ type: ACTION_TYPES.RESET })}>Reset</button>
    </div>
  );
}
