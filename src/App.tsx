import { useEffect, useState } from "react";

// test: key: ef0494f73cfc0bd0feeb383fc9b32268

const App = () => {
  const [latitude, setLatitude] = useState([]);
  const [longitude, setLongitude] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      navigator.geolocation.getCurrentPosition((position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
      });

      await fetch(`${process.env.REACT_APP_API_URL}/weather/
    ?latitude=${latitude}&longitude=${longitude}&units=metric&APPID=${process.env.REACT_APP_API_KEY}`)
        .then((response) => response.json())
        .then((result) => {
          setData(result);
          console.log(result);
        });
    };
    // console.log(`Latitude is: ${latitude}`);
    // console.log(`Longitude is ${longitude}`);
    fetchData();
  }, [latitude, longitude]);

  return <div className="App" />;
};

export default App;
