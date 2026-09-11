import { computed } from 'vue';
import { useTheme } from '../../composables/useTheme.js';

export default {
  name: 'ThemeToggle',
  setup() {
    const { theme, toggleTheme } = useTheme();
    const isDark = computed(() => theme.value === 'dark');

    return { isDark, toggleTheme };
  },
};
