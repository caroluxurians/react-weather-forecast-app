import { TextField, Autocomplete } from "@mui/material";
import { Dispatch, SetStateAction, useState } from "react";
import _ from "lodash";

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
      console.log(result);
      const formattedResults = (result.data ?? []).map((city: City) => {
        return {
          id: `${city.latitude} ${city.longitude}`,
          label: `${city.name}, ${city.countryCode}`,
        };
      });
      const filteredResults = [];
      formattedResults.forEach((result) => {
        const labels = filteredResults.map((res) => res.label);
        if (!labels.includes(result.label)) {
          filteredResults.push(result);
        }
      });
      setOptions(filteredResults);
      console.log(formattedResults, filteredResults);
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
  const debouncedLoadOptions = _.debounce(loadOptions, 1000);
  return (
    <Autocomplete
      options={options}
      autoHighlight
      renderInput={(params) => (
        <TextField
          {...params}
          label="Type your city"
          sx={{
            fieldset: {
              border: "2px solid grey",
              borderRadius: "16px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            },
          }}
        />
      )}
      onInputChange={(e, val) => debouncedLoadOptions(val, setOptions)}
      filterOptions={(option) => option}
      onChange={(e, val) => {
        console.log("sel");
        setLatitude(Number(val.id.split(" ")[0]));
        setLongitude(Number(val.id.split(" ")[1]));
      }}
    />
  );
};
export default Search;
