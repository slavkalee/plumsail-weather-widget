import { ref } from 'vue';

export function useEditable() {
  const isEditable = ref(false);

  const setEditable = () => {
    isEditable.value = !isEditable.value;
  };

  return { isEditable, setEditable };
}
