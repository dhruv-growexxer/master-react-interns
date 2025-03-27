import todoReducer, { TodoState } from '../todoReducer';
import { TODO_ACTIONS } from '../actionTypes';

describe('todoReducer', () => {
  const initialState: TodoState = {
    todos: [],
  };

  it('should handle initial state', () => {
    expect(todoReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle ADD_TODO', () => {
    const newTodo = {
      id: '1',
      text: 'Test Todo',
      completed: false,
    };

    const expectedState = {
      todos: [newTodo],
    };

    expect(
      todoReducer(initialState, {
        type: TODO_ACTIONS.ADD_TODO,
        payload: newTodo,
      }),
    ).toEqual(expectedState);
  });

  it('should handle TOGGLE_TODO', () => {
    const currentState: TodoState = {
      todos: [
        {
          id: '1',
          text: 'Test Todo',
          completed: false,
        },
      ],
    };

    const expectedState = {
      todos: [
        {
          id: '1',
          text: 'Test Todo',
          completed: true,
        },
      ],
    };

    expect(
      todoReducer(currentState, {
        type: TODO_ACTIONS.TOGGLE_TODO,
        payload: '1',
      }),
    ).toEqual(expectedState);
  });
});
