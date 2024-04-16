import { useEffect, useState } from "react";
import Weather from "./components/Weather";
import WeatherDataType from "./types/WeatherDataType";

// test: key: ef0494f73cfc0bd0feeb383fc9b32268

const App = () => {
  const [latitude, setLatitude] = useState<number>(50.11262375912861);
  const [longitude, setLongitude] = useState<number>(14.469758137148327);
  const [data, setData] = useState<WeatherDataType>(null);
  console.log(latitude, longitude);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=ef0494f73cfc0bd0feeb383fc9b32268`,
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
        });
    };

    if (latitude && longitude) {
      fetchData();
    }
  }, [latitude, longitude]);

  return data?.main && (
    <Weather
      setLatitude={setLatitude}
      setLongitude={setLongitude}
      weatherData={data}
    />
  );
};

export default App;
