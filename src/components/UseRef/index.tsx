import { useRef, useState } from 'react';

export default function WithUseRef() {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = 'Hello World!';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };
  console.log('Component rendered....');
  return (
    <div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Type here..."
        defaultValue={value}
        onChange={handleChange}
      />
      <button onClick={handleFocus}>Focus & Set Value</button>
    </div>
  );
}
