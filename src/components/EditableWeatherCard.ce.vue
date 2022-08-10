<template>
  <div class="weather--card weather--card_editable">
    <div class="row">
      <div class="handle">
        <button class="btn btn__icon">
          <draggable-icon />
        </button>
      </div>

      <div class="weather--card__location">{{ location }}, {{ country }}</div>
    </div>

    <div class="remove">
      <button class="btn btn__icon" @click="onRemove">
        <delete-icon />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { useStore } from 'vuex';
import { actionTypes } from '@/store';

import DeleteIcon from '@/components/icons/DeleteIcon.vue';
import DraggableIcon from '@/components/icons/DraggableIcon.vue';

const props = defineProps({
  id: Number,
  location: String,
  country: String,
});

const store = useStore();

const onRemove = () => {
  store.dispatch(actionTypes.removeWeather, props.id);
};
</script>

<style lang="scss">
.handle {
  display: flex;
  margin-right: 20px;
}

.remove {
  display: flex;
}

.weather--card {
  padding: 20px 40px;
  margin-bottom: 15px;
  border-radius: 10px;
  background: rgb(232 232 232);
  box-shadow: 0 1px 2px rgb(180 236 253 / 40%);

  &_editable {
    display: flex;
    justify-content: space-between;
    padding: 10px 15px;
  }
}
</style>
