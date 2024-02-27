import mapboxgl from 'mapbox-gl';
import { useState } from "react";
import Autocomplete from "@mui/joy/Autocomplete";
import Config from "../../config";

mapboxgl.accessToken = Config.MAPBOX_KEY;

export type Place = {
  name: string;
  lat: number;
  lng: number;
  country:string,
  city:string
}

type PlacesAutoCompleteProps = {
  onPlaceSelected: (place: Place) => void;
}
const PlacesAutoComplete: React.FC<PlacesAutoCompleteProps> = ({onPlaceSelected}) => {
  const [searchValue, setSearchValue] = useState('');
  const [predictions, setPredictions] = useState([]);

  const handleChange = async (value:string) => {
    setSearchValue(value);

    console.log({value});

    if (!value) {
      setPredictions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          value
        )}.json?access_token=${mapboxgl.accessToken}&types=address`
      );
      const data = await response.json();
      setPredictions(data.features);
    } catch (error) {
      console.error('Error fetching search predictions:', error);
    }
    console.log({ predictions });
  };

  const handlePlaceSelected = (place:any) => {


    let city = '';
    let country = '';

    // Iterate through address components to find city and country
    place.context.forEach((component:any) => {
      if (component.id.startsWith('region')) {
        city = component.text;
      } else if (component.id.startsWith('country')) {
        country = component.text;
      }
    });
    onPlaceSelected({
      name: place.place_name,
      lat: place.center[1],
      lng: place.center[0],
      country,
      city
    });
    setPredictions([]);
    setSearchValue(place.place_name);
  };

  return (
    <div>
      <Autocomplete
        placeholder="Enter a location"
        options={predictions}
        value={searchValue}
        getOptionLabel={(prediction:any) => prediction?.place_name ??  prediction}
        onInputChange={(_, value) => handleChange(value!)}
        onChange={(_, value) => handlePlaceSelected(value!)}
      />
    </div>
  );
};

export default PlacesAutoComplete;