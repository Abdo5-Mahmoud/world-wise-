import { useEffect } from "react";
import CityItem from "../components/CityItem.jsx";
import { useCitiesContext } from "../Stores/CitiesContext.jsx";

export default function Cities() {
  const { cities, isLoading, deleteCity } = useCitiesContext();

  useEffect(() => {}, [cities]);
  if (isLoading) return <div>Loading...</div>;
  return (
    <ul className="cities">
      {cities.map((city) => {
        return (
          <div key={city.id}>
            <CityItem city={city} deleteCity={deleteCity} />
          </div>
        );
      })}
    </ul>
  );
  // return <div>👋 Add Your first city by clicking on a city on the map</div>;
}
