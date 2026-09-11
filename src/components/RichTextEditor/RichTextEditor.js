import { watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3';
import StarterKit from '@tiptap/starter-kit';

export default {
  name: 'RichTextEditor',
  components: {
    EditorContent,
  },
  props: {
    modelValue: {
      type: String,
      default: '',
    },
    id: {
      type: String,
      default: undefined,
    },
    labelledBy: {
      type: String,
      default: undefined,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    // useEditor() gives a reactive ref that updates on every transaction
    // and auto-destroys on unmount, unlike `new Editor()`.
    const editor = useEditor({
      extensions: [StarterKit],
      content: props.modelValue,
      editorProps: {
        attributes: {
          // label/for doesn't work on role="textbox" divs, so we also
          // need aria-labelledby for an accessible name.
          ...(props.id ? { id: props.id } : {}),
          ...(props.labelledBy ? { 'aria-labelledby': props.labelledBy } : {}),
          role: 'textbox',
          'aria-multiline': 'true',
        },
      },
      onUpdate: ({ editor: currentEditor }) => {
        emit('update:modelValue', currentEditor.getHTML());
      },
    });

    // Syncs the editor if modelValue changes externally (e.g. loaded
    // from storage).
    watch(
      () => props.modelValue,
      value => {
        const isSame = value === editor.value?.getHTML();
        if (!isSame) {
          editor.value?.commands.setContent(value || '', false);
        }
      },
    );

    // Clicking the padded area (not just existing text) focuses the end,
    // like a <textarea>.
    function focusEnd(event) {
      if (event.target.closest('.ProseMirror')) {
        // Already inside the editor; let TipTap handle cursor placement.
        return;
      }
      editor.value?.chain().focus('end').run();
    }

    return { editor, focusEnd };
  },
};
