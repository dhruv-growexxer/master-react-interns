import { useState, useMemo } from 'react';

const WithUseMemo = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(10);

  const memoizedResult = useMemo(() => {
    console.log('Running expensive calculation...');
    return num ** 2;
  }, [num]);

  return (
    <div>
      <h2>Result: {memoizedResult}</h2>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

export default WithUseMemo;
