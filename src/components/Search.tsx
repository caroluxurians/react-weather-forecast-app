import { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

const loadOptions = (inputValue, setOptions) => {
  return fetch(
    `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?minPopulation=100000&namePrefix=${inputValue}`,
    {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "f3e13718b2mshcc4ae55dc7fd047p11cd0ejsn6816aa8db411",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    },
  )
    .then((response) => response.json())
    .then((result) => {
      const formattedResult = result.data.map((city) => {
        return {
          id: `${city.latitude} ${city.longitude}`,
          name: `${city.name}, ${city.countryCode}`,
        };
      });
      console.log(formattedResult);
      setOptions(formattedResult);
    })
    .catch((err) => console.error(err));
};

const Search = ({ setLatitude, setLongitude }) => {
  const [options, setOptions] = useState([]);
  console.log(options);
  return (
    <div>
      <ReactSearchAutocomplete
        onSearch={(val) => loadOptions(val, setOptions)}
        items={options}
        onSelect={(city) => {
          console.log(city.id.split(" "));
          setLatitude(city.id.split(" ")[0]);
          setLongitude(city.id.split(" ")[1]);
        }}
      />
    </div>
  );
};
export default Search;
