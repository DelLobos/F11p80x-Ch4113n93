<template>
  <div class="flipbox-builder d-flex flex-column flex-fill gap-3">
    <div class="row g-3">
      <div class="col-md-6 col-lg-12 field">
        <label id="front-editor-label" for="front-editor" class="form-label fw-semibold">Front</label>
        <RichTextEditor
          id="front-editor"
          labelled-by="front-editor-label"
          v-model="front"
        />
      </div>

      <div class="col-md-6 col-lg-12 field">
        <label id="back-editor-label" for="back-editor" class="form-label fw-semibold">Back</label>
        <RichTextEditor
          id="back-editor"
          labelled-by="back-editor-label"
          v-model="back"
        />
      </div>
    </div>

    <p class="save-status small mb-0" role="status">{{ saveStatus }}</p>
  </div>
</template>

<script src="./FlipboxBuilder.js"></script>

<style src="./FlipboxBuilder.scss" lang="scss" scoped></style>
