<template>
  <div class="flipbox-preview d-flex flex-column flex-fill align-items-center justify-content-center gap-3">
    <!--
      Flip interaction: a 3D CSS flip is used for sighted users, but the
      current side is also communicated via:
      - a visible text status line ("Showing: Front/Back")
      - an aria-live region so screen readers hear the change on flip
      - aria-hidden on the face that's currently turned away, so its
        content isn't read while hidden
      - aria-pressed on the flip button reflecting state
    -->
    <p class="flipbox-status badge rounded-pill mb-0" aria-live="polite">
      Showing: {{ isFlipped ? 'Back' : 'Front' }}
    </p>

    <div
      ref="cardRef"
      class="flipbox"
      :class="{ 'is-flipped': isFlipped }"
      role="button"
      tabindex="0"
      :aria-pressed="isFlipped"
      aria-label="Flip the card"
      @click="toggleFlip"
      @keydown.enter.prevent="toggleFlip"
    >
      <div class="flipbox-inner">
        <div
          class="flipbox-face flipbox-front rounded-3 overflow-hidden"
          :aria-hidden="isFlipped"
        >
          <div
            class="flipbox-face-content d-flex flex-column align-items-center justify-content-center text-start w-100 h-100 p-3 overflow-auto"
            :tabindex="isFlipped ? -1 : 0"
          >
            <div v-if="flipbox.front" v-html="flipbox.front"></div>
            <p v-else class="flipbox-placeholder">No front content yet.</p>
          </div>
        </div>
        <div
          class="flipbox-face flipbox-back rounded-3 overflow-hidden"
          :aria-hidden="!isFlipped"
        >
          <div
            class="flipbox-face-content d-flex flex-column align-items-center justify-content-center text-start w-100 h-100 p-3 overflow-auto"
            :tabindex="isFlipped ? 0 : -1"
          >
            <div v-if="flipbox.back" v-html="flipbox.back"></div>
            <p v-else class="flipbox-placeholder">No back content yet.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./FlipboxPreview.js"></script>

<style src="./FlipboxPreview.scss" lang="scss" scoped></style>
