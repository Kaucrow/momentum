import { getContext, setContext } from 'svelte';

type Theme = 'light' | 'dark';

type ThemeStore = {
    readonly current: Theme;
    toggle: () => void;
    set: (newTheme: Theme) => void;
};

export function createThemeStore(): ThemeStore {
  const theme: { current: Theme } =
    $state({
      current: 'light'
    });

  function toggle() {
    theme.current = theme.current === 'light' ? 'dark' : 'light';
    updateBodyClass();
  }

  function set(newTheme: Theme) {
    theme.current = newTheme;
    updateBodyClass();
  }

  function updateBodyClass() {
    if (typeof document !== 'undefined') {
      document.body.classList.remove('light', 'dark');
      document.body.classList.add(`${theme.current}`);
    }
  }

  // Initialize body class
  if (typeof document !== 'undefined') {
    updateBodyClass();
  }

  return {
    get current() { return theme.current; },
    toggle,
    set
  };
}

export function initializeTheme(): ThemeStore {
  const theme = createThemeStore();
  setContext('theme', theme);
  return theme;
}

export function getTheme(): ThemeStore {
  return getContext('theme');
}