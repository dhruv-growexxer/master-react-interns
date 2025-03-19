import { useState } from 'react';

const WithoutUseMemo = () => {
  const [count, setCount] = useState(0);
  const [num, setNum] = useState(10);

  const expensiveCalculation = (num: number) => {
    console.log('Running expensive calculation...');
    return num ** 2;
  };

  const result = expensiveCalculation(num);

  return (
    <div>
      <h2>Result: {result}</h2>
      <button onClick={() => setCount(count + 1)}>Increment Count</button>
    </div>
  );
};

export default WithoutUseMemo;
