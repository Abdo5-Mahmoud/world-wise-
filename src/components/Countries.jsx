import { useEffect } from "react";
import { useCitiesContext } from "../Stores/CitiesContext.jsx";
import Loader from "./Loader.jsx";
import CountryItem from "./CountryItem.jsx";

export default function Countries() {
  const { cities, isLoading } = useCitiesContext();

  useEffect(() => {}, [cities]);
  if (isLoading) return <Loader />;

  if (!cities.length)
    return <div>👋 Add Your first city by clicking on a city on the map</div>;

  const countries = cities.reduce((arr, city) => {
    if (!arr.map((el) => el.country).includes(city.country))
      return [...arr, { country: city.country, emoji: city.emoji }];
    else return arr;
  }, []);

  return (
    <ul className="countryList">
      {countries.map((city) => {
        return <CountryItem key={city.country} city={city} />;
      })}
    </ul>
  );
}
