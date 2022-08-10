import { createStore, Store } from 'vuex';
import { InjectionKey } from 'vue';
import { ICityWeather } from '@/models/index';

import api from '@/api/index';

export interface State {
  data: ICityWeather[];
  isLoading: boolean;
  error: any;
}

export const key: InjectionKey<Store<State>> = Symbol();

export const actionTypes = {
  getWeatherData: 'Get weather data',
  getWeather: 'Get weather',
  createWeather: 'Create weather',
  updateData: 'Update data',
  removeWeather: 'Remove weather',
};

export const mutationTypes = {
  getWeatherDataStart: 'Get weather data start',
  getWeatherDataSuccess: 'Get weather data success',
  getWeatherDataFailure: 'Get weather data failure',

  createWeatherStart: 'Create weather start',
  createWeatherSuccess: 'Create weather success',
  createWeatherFailure: 'Create weather failure',

  updateData: 'Update data',

  removeWeather: 'Remove weather',
};

export default createStore<State>({
  state: {
    data: [],
    isLoading: false,
    error: null,
  },
  actions: {
    [actionTypes.getWeatherData](ctx, cities) {
      ctx.commit(mutationTypes.getWeatherDataStart);
      return Promise.all(
        cities.map((city: any) => {
          return api.getWeather(city).then((res) => res.data);
        })
      )
        .then((res) => {
          ctx.commit(mutationTypes.getWeatherDataSuccess, res);
        })
        .catch((err) => {
          ctx.commit(
            mutationTypes.getWeatherDataFailure,
            err.response.data.message
          );
        });
    },
    [actionTypes.createWeather](ctx, payload) {
      return new Promise((resolve) => {
        ctx.commit(mutationTypes.createWeatherStart);
        api
          .getWeather(payload)
          .then((response) => {
            ctx.commit(mutationTypes.createWeatherSuccess, response.data);
            resolve(response.data);
          })
          .catch((err) => {
            ctx.commit(
              mutationTypes.createWeatherFailure,
              err.response.data.message
            );
          });
      });
    },
    [actionTypes.updateData](ctx, payload) {
      ctx.commit(mutationTypes.updateData, payload);
    },
    [actionTypes.removeWeather](ctx, id) {
      ctx.commit(mutationTypes.removeWeather, id);
    },
  },
  mutations: {
    [mutationTypes.getWeatherDataStart](state) {
      state.isLoading = true;
      state.error = null;
    },
    [mutationTypes.getWeatherDataSuccess](state, payload) {
      state.isLoading = false;
      state.data = payload;
    },
    [mutationTypes.getWeatherDataFailure](state, error) {
      state.isLoading = false;
      state.error = error;
    },

    [mutationTypes.createWeatherStart](state) {
      state.isLoading = true;
      state.error = null;
    },
    [mutationTypes.createWeatherSuccess](state, payload) {
      state.isLoading = false;
      state.data.push(payload);
    },
    [mutationTypes.createWeatherFailure](state, error) {
      state.isLoading = false;
      state.error = error;
    },
    [mutationTypes.updateData](state, payload) {
      state.data = payload;
    },
    [mutationTypes.removeWeather](state, id) {
      state.data = state.data.filter((item) => +item.id !== id);
    },
  },
  getters: {},
});
