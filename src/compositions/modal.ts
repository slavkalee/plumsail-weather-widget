import { ref } from 'vue';

export function useModal() {
  const modalVisible = ref(false);

  const showModal = () => {
    modalVisible.value = true;
  };

  const hideModal = () => {
    modalVisible.value = false;
  };

  return {
    modalVisible,
    showModal,
    hideModal,
  };
}
