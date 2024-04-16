import { Dispatch, SetStateAction } from "react";
// import "./styles.css";
// import { Card } from "semantic-ui-react";
import moment from "moment";
import WeatherDataType from "../types/WeatherDataType";
import Refresh from "../icons/Refresh";
import Search from "./Search";

type WeatherProps = {
  weatherData: WeatherDataType;
  setLatitude: Dispatch<SetStateAction<number>>;
  setLongitude: Dispatch<SetStateAction<number>>;
};

const refresh = () => {
  window.location.reload();
};

const Weather = ({ weatherData, setLatitude, setLongitude }: WeatherProps) => {
  return (
    <div className="main">
      <p className="header flex flex-between">
        {weatherData.name}
        <button
          type="button"
          className="button flex flex-center"
          onClick={refresh}
          aria-label="Refresh"
        >
          <Refresh width={20} />
        </button>
      </p>

      <div className="flex flex-between">
        <p className="day">
          {moment().format("dddd")}, {moment().format("LL")}
        </p>
        <p className="description">{weatherData.weather[0].description}</p>
      </div>

      <div className="flex flex-between">
        <p className="weatherCat">
          Temperature: {Math.round(weatherData.main.temp)}
          &deg;C
        </p>
        <p className="weatherCat">Humidity: {weatherData.main.humidity} %</p>
      </div>

      <div className="flex flex-between">
        <p className="sun">
          Sunrise:{" "}
          {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString("en-CZ")}
        </p>
        <p className="sun">
          Sunset:{" "}
          {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString("en-CZ")}
        </p>
      </div>

      <div className="search-div">
        <Search setLatitude={setLatitude} setLongitude={setLongitude} />
      </div>
    </div>
  );
};
export default Weather;
