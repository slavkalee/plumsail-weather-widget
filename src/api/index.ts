import axios from 'axios';
import { API_KEY } from '@/helpers/vars';

axios.defaults.baseURL = 'https://api.openweathermap.org/data/2.5/weather';

axios.defaults.params = {
  appid: API_KEY,
};

const getWeather = (city: string) => {
  return axios.get('', {
    params: {
      q: city,
      units: 'metric',
    },
  });
};

export default {
  getWeather,
};
