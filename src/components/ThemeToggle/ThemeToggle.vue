<template>
  <div class="theme-toggle form-check form-switch d-flex align-items-center gap-2 mb-0">
    <input
      id="theme-toggle-input"
      class="form-check-input"
      type="checkbox"
      role="switch"
      :checked="isDark"
      @change="toggleTheme"
    />
    <label class="form-check-label text-white" for="theme-toggle-input">Dark mode</label>
  </div>
</template>

<script src="./ThemeToggle.js"></script>

<style src="./ThemeToggle.scss" lang="scss" scoped></style>
