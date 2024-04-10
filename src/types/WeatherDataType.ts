type WeatherDataType = {

  name: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
  }
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  weather: Array <string | number>
};

export default WeatherDataType;
