import { ref, watch, onBeforeUnmount } from 'vue';
import RichTextEditor from '../RichTextEditor/RichTextEditor.vue';
import { saveToStorage, FLIPBOX_STORAGE_KEY } from '../../composables/usePersistence.js';

export default {
  name: 'FlipboxBuilder',
  components: {
    RichTextEditor,
  },
  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const front = ref(props.modelValue.front);
    const back = ref(props.modelValue.back);
    const saveStatus = ref('');

    let saveTimeout = null;

    watch([front, back], () => {
      const next = {
        ...props.modelValue,
        front: front.value,
        back: back.value,
      };
      emit('update:modelValue', next);

      // Debounce writes so we're not hitting localStorage on every keystroke.
      saveStatus.value = 'Saving…';
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        saveToStorage(FLIPBOX_STORAGE_KEY, next);
        saveStatus.value = 'Saved';
      }, 500);
    });

    onBeforeUnmount(() => {
      clearTimeout(saveTimeout);
    });

    return { front, back, saveStatus };
  },
};
