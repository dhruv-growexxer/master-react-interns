import { useState, useEffect } from 'react';

const RederCycle = () => {
  console.log('1 Component rendering...');

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('4 useEffect runs (empty dependency array)');
  }, []);

  const logger = () => {
    console.log('loggerr......');
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
  };

  const increment = () => {
    console.log('increment......');
    setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
    // setCount(count + 1);
  };

  console.log('3 JSX processing...', count);

  return (
    <div>
      <>Count: {logger()}</>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default RederCycle;

// //
// 4
// 1
// 3
// logger...
// increment...

// // ----
// 1
// 3
// logger...
// 4
