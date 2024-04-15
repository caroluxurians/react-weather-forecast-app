import React from "react";
// import "./styles.css";
// import { Card } from "semantic-ui-react";
import moment from "moment";
import WeatherDataType from "../types/WeatherDataType";

type WeatherProps = {
  weatherData: WeatherDataType;
};

const Weather = ({ weatherData }: WeatherProps) => {
  return (
    <div className="main">
      <p className="header">
        City name:
        {weatherData.name}
      </p>
      <div className="flex">
        <p className="day">
          Day:
          {moment().format("dddd")}
        </p>
        <p className="day">{moment().format("LL")}</p>
      </div>
      <div className="flex">
        <p className="weatherCat">
          Temperature: {weatherData.main.temp}
          &deg;C
        </p>
        <p className="weatherCat">
          Humidity:
          {weatherData.main.humidity} %
        </p>
      </div>
    </div>
  );
};
export default Weather;

/* <p>
        Sunrise:
        {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-CZ")}
      </p>
      <p>
        Sunset:
        {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-CZ")}
      </p>
      <p>
        Description:
        {weatherData.weather[0].description}
      </p>

       */
