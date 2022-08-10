<template>
  <div class="wrapper">
    <modal v-if="modalVisible">
      <form-field @hideModal="hideModal" />
    </modal>

    <div class="container" v-else>
      <header>
        <div class="settings">
          <button class="btn btn__icon" @click="setEditable">
            <cross-icon v-if="isEditable" />
            <settings-icon v-else />
          </button>
        </div>
      </header>

      <form-field v-if="isEditable" />

      <div class="widget" v-if="!isEditable">
        <weather-card
          v-for="city in displayData"
          :key="city.id"
          :location="city.name"
          :country="city.sys.country"
          :weather-icon="city.weather[0].icon"
          :temp="city.main.temp"
          :wind="city.wind.speed"
          :feels-like="city.main.feels_like"
          :humidity="city.main.humidity"
          :visibility="city.visibility"
          :weather-desc="city.weather[0].description"
        />
      </div>

      <div class="widget--editable" v-else>
        <vue-draggable-next v-model="displayData" handle=".handle">
          <transition-group type="transition" name="flip-list">
            <editable-weather-card
              v-for="city in displayData"
              :key="city.id"
              :id="city.id"
              :location="city.name"
              :country="city.sys.country"
            />
          </transition-group>
        </vue-draggable-next>
      </div>

      <div class="loader--container" v-if="isLoading">
        <loader />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { VueDraggableNext } from 'vue-draggable-next';

import { actionTypes } from '@/store/index';
import { ICityWeather } from '@/models/index';
import WeatherCard from '@/components/WeatherCard.ce.vue';
import EditableWeatherCard from '@/components/EditableWeatherCard.ce.vue';
import FormField from '@/components/FormField.ce.vue';
import Modal from '@/components/Modal.ce.vue';
import Loader from '@/components/Loader.ce.vue';

import SettingsIcon from '@/components/icons/SettingsIcon.vue';
import CrossIcon from '@/components/icons/CrossIcon.vue';
import { getItem } from '@/helpers/persistanceStorage';
import { useModal } from '@/compositions/modal';
import { useEditable } from '@/compositions/editable';

const store = useStore();
const { modalVisible, showModal, hideModal } = useModal();
const { isEditable, setEditable } = useEditable();

onMounted(() => {
  initialiseData();
});

function initialiseData() {
  const cities = getItem('cities') || [];

  if (cities.length) {
    store.dispatch(actionTypes.getWeatherData, cities);
  } else {
    showModal();
  }
}

const displayData = computed<ICityWeather[]>({
  get() {
    return store.state.data;
  },
  set(val) {
    store.dispatch(actionTypes.updateData, val);
  },
});

const isLoading = computed<boolean>(() => {
  return store.state.isLoading;
});
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  margin: 0;
  padding: 0;
}

.wrapper {
  font-family: 'Heebo', sans-serif;
  color: #000;
  background: #fff;
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  max-width: 400px;
  padding-top: 50px;
  margin: 0 auto;
}

.row {
  display: flex;
  align-items: center;
}

.justify-space-between {
  justify-content: space-between;
}

header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 30px;
}

.settings {
  display: flex;
  align-items: center;
}

.title {
  letter-spacing: 2px;
}

.widget {
}

.btn {
  cursor: pointer;
  outline: 0;

  &__icon {
    border: none;
    background: none;
  }
}

.loader--container {
  display: flex;
  justify-content: center;
}

.flip-list-move {
  transition: transform 0.5s;
}
</style>
