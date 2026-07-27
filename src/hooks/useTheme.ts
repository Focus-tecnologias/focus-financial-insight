import { useState, useEffect } from 'react';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    try {
      const stored = localStorage.getItem('focus_dark_mode');
      return stored !== null ? JSON.parse(stored) : false;
    } catch {
      return false;
    }
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    
    const applyTheme = (dark: boolean) => {
      if (dark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    };

    applyTheme(isDark);

    const handleThemeChange = () => {
      try {
        const stored = localStorage.getItem('focus_dark_mode');
        const dark = stored !== null ? JSON.parse(stored) : false;
        setIsDark(dark);
        applyTheme(dark);
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener('focus_theme_update', handleThemeChange);
    return () => window.removeEventListener('focus_theme_update', handleThemeChange);
  }, [isDark]);

  const toggleTheme = (enableDark?: boolean) => {
    const nextState = enableDark !== undefined ? enableDark : !isDark;
    setIsDark(nextState);
    try {
      localStorage.setItem('focus_dark_mode', JSON.stringify(nextState));
      if (nextState) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      window.dispatchEvent(new Event('focus_theme_update'));
    } catch (e) {
      console.error(e);
    }
  };

  return { isDark, toggleTheme };
}
