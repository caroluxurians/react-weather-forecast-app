import { useEffect, useState } from "react";
import Weather from "./components/Weather";

// test: key: ef0494f73cfc0bd0feeb383fc9b32268

const App = () => {
  const [latitude, setLatitude] = useState<number>(null);
  const [longitude, setLongitude] = useState<number>(null);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      await fetch(
        `${"https://api.openweathermap.org/data/2.5"}/weather/?lat=${latitude}&lon=${longitude}&units=metric&APPID=${"ef0494f73cfc0bd0feeb383fc9b32268"}`
      )
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };

    if (latitude && longitude) {
      fetchData();
      console.log(`Latitude is: ${latitude}`);
      console.log(`Longitude is ${longitude}`);
    }
  }, [latitude, longitude]);

  return (
    <div className="App">{data?.main && <Weather weatherData={data} />}</div>
  );
};

export default App;
