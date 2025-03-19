import { useTheme } from '../../contexts';
import { ACTION_TYPES } from '../../reducers/actionTypes';

export function ThemeSwitcher() {
  const { theme, setTheme, count, dispatch } = useTheme();

  return (
    <button
      onClick={() => {
        // setTheme(theme === 'light' ? 'dark' : 'light');
        dispatch({ action: ACTION_TYPES.INCREMENT });
      }}
    >
      Switch to Mode: {count}
    </button>
  );
}
