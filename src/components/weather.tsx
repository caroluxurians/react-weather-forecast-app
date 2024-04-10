import React from "react";
// import "./styles.css";
import { Card } from "semantic-ui-react";
import WeatherDataType from "../types/WeatherDataType";

type WeatherProps = {
  weatherData: WeatherDataType;
};

const Weather = ({ weatherData }: WeatherProps) => {
  return (
    <Card className="ui centered card">
      <Card.Content id="content">
        <Card.Header className="header">
          City name: {weatherData.name}
        </Card.Header>
        <p>
          Temprature:
          {weatherData.main.temp}
          &deg;C
        </p>
        <p>
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
      </Card.Content>
    </Card>
  );
};
export default Weather;
