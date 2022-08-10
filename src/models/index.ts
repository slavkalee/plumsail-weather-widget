export interface ICityWeather {
  base: string;
  clouds: any;
  cod: number;
  coord: any;
  dt: number;
  id: number;
  main: any;
  name: string;
  sys: any;
  timezone: number;
  visibility: number;
  weather: any[];
  wind: any;
}

export enum WeatherConditions {
  CLEAR_SKY = 'clear sky',
  FEW_CLOUDS = 'few clouds',
  SCATTERED_CLOUDS = 'scattered clouds',
  BROKEN_CLOUDS = 'broken clouds',
  SHOWER_RAIN = 'shower rain',
  RAIN = 'rain',
  THUNDERSTORM = 'thunderstorm',
  SNOW = 'snow',
  MIST = 'mist'
}
