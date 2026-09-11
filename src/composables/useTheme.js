import { ref, watch } from 'vue';
import { loadFromStorage, saveToStorage } from './usePersistence.js';

const THEME_STORAGE_KEY = 'flipbox-builder:theme';

function getPreferredTheme() {
  const stored = loadFromStorage(THEME_STORAGE_KEY, null);
  if (stored === 'light' || stored === 'dark') {
    return stored;
  }
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function applyTheme(value) {
  document.documentElement.setAttribute('data-theme', value);
}

// Module-level (not created inside a component's setup()) so every
// component that calls useTheme() shares the same reactive theme state,
// and the theme is only read from storage/media query once per page load.
const theme = ref(getPreferredTheme());
applyTheme(theme.value);

watch(theme, value => {
  applyTheme(value);
  saveToStorage(THEME_STORAGE_KEY, value);
});

export function useTheme() {
  function toggleTheme() {
    theme.value = theme.value === 'dark' ? 'light' : 'dark';
  }

  return { theme, toggleTheme };
}
