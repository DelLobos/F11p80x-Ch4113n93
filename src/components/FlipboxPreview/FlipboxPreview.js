import { ref } from 'vue';

export default {
  name: 'FlipboxPreview',
  props: {
    flipbox: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const isFlipped = ref(false);
    const cardRef = ref(null);

    function toggleFlip() {
      // Move focus to the card before flipping if it's currently inside a
      // face, so we don't leave focus in an element about to be aria-hidden.
      const activeEl = document.activeElement;
      if (cardRef.value && activeEl && activeEl !== cardRef.value && cardRef.value.contains(activeEl)) {
        cardRef.value.focus();
      }
      isFlipped.value = !isFlipped.value;
    }

    return { isFlipped, toggleFlip, cardRef };
  },
};
