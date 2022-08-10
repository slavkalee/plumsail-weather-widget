<template>
  <form @submit.prevent="onSubmit" class="form">
    <div class="form__field--label">
      <label>Add location:</label>
    </div>
    <fieldset class="form__fieldset">
      <input
        class="form__field"
        :class="{
          form__field_error: error,
        }"
        type="text"
        v-model.trim="cityName"
        ref="focus"
      />
      <button type="submit" class="btn btn__icon">
        <enter-icon />
      </button>
    </fieldset>
    <div class="error--alert" v-if="error">
      {{ capitalize(error) }}
    </div>
  </form>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, defineEmits } from 'vue';
import { useStore } from 'vuex';
import { actionTypes } from '@/store';
import { capitalize } from '@/helpers/utils';

import EnterIcon from './icons/EnterIcon.vue';

const emit = defineEmits(['hideModal']);

const store = useStore();

const cityName = ref('');
const focus = ref<any>(null);

onMounted(() => {
  focus.value.focus();
});

const onSubmit = () => {
  if (!cityName.value) return;

  store.dispatch(actionTypes.createWeather, cityName.value).then(() => {
    cityName.value = '';
    emit('hideModal');
  });
};

const error = computed(() => {
  return store.state.error;
});
</script>

<style lang="scss">
.form {
  margin-bottom: 25px;

  &__field {
    width: 100%;
    height: 40px;
    padding: 5px;
    margin-right: 10px;
    outline: 0;
    border: 1px solid #ccc;
    border-radius: 10px;

    &_error {
      box-shadow: 0 0 5px red;
    }

    &:focus:not(.form__field_error) {
      box-shadow: 0 0 5px #00f900;
    }
  }

  &__fieldset {
    margin-top: 10px;
    display: flex;
    border: none;
  }

  &__field--label {
    label {
      font-weight: bold;
    }
  }
}

.error--alert {
  border: 2px solid red;
  border-radius: 10px;
  padding: 10px 25px;
  margin-top: 17px;
  background: #f9d8d8;
  color: red;
  font-weight: bold;
}
</style>
