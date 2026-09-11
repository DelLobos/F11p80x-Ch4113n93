<template>
  <div class="app-shell min-vh-100">
    <AppHeader />
    <!--
      Starter layout: builder and preview shown side by side, both driven
      by the same reactive `flipbox` state, so the preview updates live
      as you edit - no manual save/refresh needed.

      You are free to restructure this (e.g. a toggle between builder and
      preview "modes" on the same page) as long as the preview still
      updates live and does not require a separate browser tab or window.
      See the task spec's "Layout" note under Flipbox component.

      Uses Bootstrap's grid (container/row/col-lg-6) instead of a custom
      CSS grid, so the side-by-side -> stacked breakpoint follows
      Bootstrap's standard lg breakpoint (992px) rather than a bespoke
      value. Grid rows stretch columns to equal height by default, which
      is what keeps the two panels the same height.

      The visual `.panel` box is a child div, not the column itself: the
      column (section.col-lg-6) only carries grid sizing/gutter, so the
      gutter's padding creates space *between* the panels. Putting the
      panel's own border/background/padding directly on the column would
      have them painted edge-to-edge across the gutter, leaving no gap.
    -->
    <main class="app-main container py-4">
      <div class="row g-4">
        <section class="col-lg-6" aria-labelledby="builder-heading">
          <div class="panel h-100 d-flex flex-column rounded-4 p-4">
            <h2 id="builder-heading" class="panel-heading text-uppercase fw-bold small pb-2 mb-3">Builder</h2>
            <FlipboxBuilder v-model="flipbox" />
          </div>
        </section>

        <section class="col-lg-6" aria-labelledby="preview-heading">
          <div class="panel h-100 d-flex flex-column rounded-4 p-4">
            <h2 id="preview-heading" class="panel-heading text-uppercase fw-bold small pb-2 mb-3">Preview</h2>
            <FlipboxPreview :flipbox="flipbox" />
          </div>
        </section>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader/AppHeader.vue';
import FlipboxBuilder from './components/FlipboxBuilder/FlipboxBuilder.vue';
import FlipboxPreview from './components/FlipboxPreview/FlipboxPreview.vue';
import { loadFromStorage, FLIPBOX_STORAGE_KEY } from './composables/usePersistence.js';

// Initialize from localStorage (if present) so a refresh restores the
// last saved flipbox. FlipboxBuilder is responsible for saving on change.
const flipbox = ref(
  loadFromStorage(FLIPBOX_STORAGE_KEY, { front: '', back: '' }),
);
</script>

<style lang="scss" scoped>
@use './styles/colors' as *;

.panel {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  box-shadow: 0 1px 3px rgba(var(--color-shadow-rgb), 0.08);
}

.panel-heading {
  letter-spacing: 0.08em;
  border-bottom: 2px solid $color-accent;
  color: var(--color-muted);
}
</style>
