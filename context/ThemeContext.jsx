import { createContext, useCallback, useContext, useMemo, useState } from 'react';

import { palettes, THEME_MODES } from '../theme/palettes';

export const ThemeContext = createContext(null);

export function ThemeProvider({ children, initialMode = THEME_MODES.LIGHT }) {
  const [mode, setMode] = useState(initialMode);

  const toggleTheme = useCallback(
    () => setMode((current) => (current === THEME_MODES.LIGHT ? THEME_MODES.DARK : THEME_MODES.LIGHT)),
    []
  );

  // The value is memoised on mode: without it every render would hand consumers
  // a new object and re-render the whole tree on unrelated state changes.
  const value = useMemo(
    () => ({
      mode,
      colors: palettes[mode],
      isDark: mode === THEME_MODES.DARK,
      toggleTheme,
      setMode,
    }),
    [mode, toggleTheme]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme має викликатись усередині ThemeProvider');
  }

  return context;
}
