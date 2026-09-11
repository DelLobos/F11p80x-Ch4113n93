<template>
  <div class="rich-text-editor rounded-2 overflow-hidden">
    <div class="toolbar d-flex align-items-center gap-1 p-2" role="toolbar" aria-label="Text formatting">
      <div class="toolbar-group d-flex align-items-center gap-1">
        <button
          type="button"
          title="Bold"
          aria-label="Bold"
          :aria-pressed="editor?.isActive('bold') ?? false"
          @click="editor?.chain().focus().toggleBold().run()"
        >
          <i class="bi bi-type-bold" aria-hidden="true"></i>
          <span class="visually-hidden">Bold</span>
        </button>
        <button
          type="button"
          title="Italic"
          aria-label="Italic"
          :aria-pressed="editor?.isActive('italic') ?? false"
          @click="editor?.chain().focus().toggleItalic().run()"
        >
          <i class="bi bi-type-italic" aria-hidden="true"></i>
          <span class="visually-hidden">Italic</span>
        </button>
        <button
          type="button"
          title="Bulleted list"
          aria-label="Bulleted list"
          :aria-pressed="editor?.isActive('bulletList') ?? false"
          @click="editor?.chain().focus().toggleBulletList().run()"
        >
          <i class="bi bi-list-ul" aria-hidden="true"></i>
          <span class="visually-hidden">Bulleted list</span>
        </button>
        <button
          type="button"
          title="Numbered list"
          aria-label="Numbered list"
          :aria-pressed="editor?.isActive('orderedList') ?? false"
          @click="editor?.chain().focus().toggleOrderedList().run()"
        >
          <i class="bi bi-list-ol" aria-hidden="true"></i>
          <span class="visually-hidden">Numbered list</span>
        </button>
      </div>

      <div class="toolbar-group toolbar-group--end d-flex align-items-center gap-1 ms-auto">
        <button
          type="button"
          title="Undo"
          aria-label="Undo"
          :disabled="!editor?.can().undo()"
          @click="editor?.chain().focus().undo().run()"
        >
          <i class="bi bi-arrow-counterclockwise" aria-hidden="true"></i>
          <span class="visually-hidden">Undo</span>
        </button>
        <button
          type="button"
          title="Redo"
          aria-label="Redo"
          :disabled="!editor?.can().redo()"
          @click="editor?.chain().focus().redo().run()"
        >
          <i class="bi bi-arrow-clockwise" aria-hidden="true"></i>
          <span class="visually-hidden">Redo</span>
        </button>
      </div>
    </div>

    <EditorContent :editor="editor" class="editor-content" @click="focusEnd" />
  </div>
</template>

<script src="./RichTextEditor.js"></script>

<style src="./RichTextEditor.scss" lang="scss" scoped></style>
