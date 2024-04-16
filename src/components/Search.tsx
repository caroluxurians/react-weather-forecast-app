import { Dispatch, SetStateAction, useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

type Options = {
  id: string;
  name: string;
}[];
type City = {
  latitude: number;
  longitude: number;
  name: string;
  countryCode: number;
};

const loadOptions = (inputValue: string, setOptions: Dispatch<SetStateAction<Options>>) => {
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
      const formattedResult = result.data.map((city: City) => {
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

type SearchProps = {
  setLatitude: Dispatch<SetStateAction<number>>;
  setLongitude: Dispatch<SetStateAction<number>>;
};

const Search = ({ setLatitude, setLongitude }: SearchProps) => {
  const [options, setOptions] = useState<Options>([]);
  console.log(options);
  return (
    <div>
      <ReactSearchAutocomplete
        onSearch={(val) => loadOptions(val, setOptions)}
        items={options}
        onSelect={(city) => {
          console.log(city.id.split(" "));
          setLatitude(Number(city.id.split(" ")[0]));
          setLongitude(Number(city.id.split(" ")[1]));
        }}
      />
    </div>
  );
};
export default Search;
