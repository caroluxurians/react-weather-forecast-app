import { useEffect, useState } from "react";

// test: key: ef0494f73cfc0bd0feeb383fc9b32268

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [data, setData] = useState(0);

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

  return <div className="App" />;
};

export default App;
