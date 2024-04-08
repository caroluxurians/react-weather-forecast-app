import { useEffect, useState } from "react";

// test: key: ef0494f73cfc0bd0feeb383fc9b32268

const [latitude, setLatitude] = useState([]);
const [longitude, setLongitude] = useState([]);

useEffect(() => {
  navigator.geolocation.getCurrentPosition(function (position) {
    setLatitude(position.coords.latitude);
    setLongitude(position.coords.longitude);
  });

  console.log(`Latitude is: ${latitude}`);
  console.log(`Longitude is ${longitude}`);
}, [latitude, longitude]);

const App = () => {
  return (
    <>
      <div className="App"></div>
    </>
  );
};

export default App;
