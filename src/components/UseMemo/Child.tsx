import { memo } from 'react';

function Child() {
  console.log('Child rendered....');
  return <div style={{ padding: '10px' }}>Child</div>;
}

export default memo(Child);
