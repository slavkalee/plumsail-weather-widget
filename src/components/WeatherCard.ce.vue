<template>
  <div class="weather--card">
    <div class="row justify-space-between">
      <div class="weather--card__location">{{ location }}, {{ country }}</div>
      <div class="weather--card__temp">
        <div class="weather--card__icon">
          <img
            :src="`http://openweathermap.org/img/wn/${weatherIcon}.png`"
            alt=""
          />
        </div>

        <div class="weather--card__temperature">{{ temp }}&#176; С</div>
      </div>
    </div>

    <div class="weather--card__desc">
      Feels like {{ feelsLike }}&#176; С. {{ capitalize(weatherDesc + '') }}
    </div>

    <div class="weather--card__other">
      <div class="row justify-space-between">
        <div class="row">
          <div class="weather--card__other-icon">
            <humidity-icon />
          </div>
          <div class="weather--card__other-value">{{ humidity }}%</div>
        </div>

        <div class="row">
          <div class="weather--card__other-icon">
            <visibility-icon />
          </div>
          <div class="weather--card__other-value">
            {{ visibilityInKilometres }} km
          </div>
        </div>

        <div class="row">
          <div class="weather--card__other-icon">
            <wind-icon />
          </div>
          <div class="weather--card__other-value">{{ wind }} m/s</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
import { capitalize } from '@/helpers/utils';
import HumidityIcon from '@/components/icons/HumidityIcon.vue';
import VisibilityIcon from '@/components/icons/VisibilityIcon.vue';
import WindIcon from '@/components/icons/WindIcon.vue';

const props = defineProps({
  location: String,
  country: String,
  weatherIcon: String,
  temp: Number,
  wind: Number,
  feelsLike: Number,
  humidity: Number,
  visibility: Number,
  weatherDesc: String,
});

const visibilityInKilometres = computed(() => {
  const km = +props.visibility / 1000;

  return km.toFixed(1);
});
</script>

<style lang="scss">
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

  &__location {
    font-size: 20px;
    font-weight: bold;
  }

  &__temp {
    display: flex;
    align-items: center;
  }

  &__desc {
    font-size: 14px;
  }

  &__icon {
    width: 45px;
    height: 45px;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  &__temperature {
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
  }

  &__other {
    margin-top: 20px;

    &-icon {
      display: flex;
    }

    &-value {
      margin-left: 5px;
    }
  }
}
</style>
