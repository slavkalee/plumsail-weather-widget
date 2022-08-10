import App from './App.ce.vue';
import store from '@/store/index';
import { setItem } from '@/helpers/persistanceStorage';
import { defineCustomElement } from '@/helpers/utils';

store.subscribe((mutation, state) => {
  const cities = state.data.map((city) => city.name);

  setItem<string[]>('cities', cities);
});

customElements.define(
  'weather-widget',
  defineCustomElement(App, {
    plugins: [store],
  })
);
