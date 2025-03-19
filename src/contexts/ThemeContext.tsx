import { createContext, useContext, useReducer, useState } from 'react';
import { counterReducer } from '../reducers/counterReducer';

interface ThemeContextType {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  count: number;
  dispatch: React.Dispatch<any>;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<string>('light');
  //   const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(counterReducer, 0);
  return (
    <ThemeContext.Provider value={{ theme, setTheme, count, dispatch }}>
      <div className="App" style={{ backgroundColor: theme === 'light' ? 'white' : 'black' }}>
        {children}
      </div>
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
