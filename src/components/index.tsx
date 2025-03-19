import Counter from './Counter/CustomHookCounter';
import RenderCycle from './RenderCycle';
import UseCallback from './UseCallback';
import Parent from './UseMemo/Parent';
import WithoutUseMemo from './UseMemo/WithoutUseMemo';
import WithUseMemo from './UseMemo/WithUseMemo';
import UsersList from './User';
import WithUseRef from './UseRef';
import Small from './small/Small';
import CounterReducer from './Counter/CounterReducer';
import { useReducer } from 'react';
import { counterReducer } from '../reducers/counterReducer';
import { useTheme } from '../contexts';

export default function Components() {
  const { count } = useTheme();
  return (
    <>
      <h1>Components & Hooks count: {count}</h1>
      {/* <Small /> */}
      {/* <RenderCycle /> */}
      {/* <WithoutUseMemo /> */}
      {/* <WithUseMemo /> */}
      {/* <Parent /> */}
      {/* <UseCallback /> */}
      {/* <WithUseRef /> */}
      {/* <Counter /> */}
      {/* <UsersList /> */}
      <CounterReducer />
    </>
  );
}
