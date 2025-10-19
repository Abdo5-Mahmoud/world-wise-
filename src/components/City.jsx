import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCitiesContext } from "../Stores/CitiesContext.jsx";
import BackButton from "./BackButton.jsx";
import Loader from "./Loader.jsx";
import { formatDate } from "../utils/functions.js";

export default function City() {
  const { currentCity, isLoading, getCity } = useCitiesContext();
  const city = currentCity || {};
  const { id } = useParams();

  useEffect(() => {
    if (!id) return;
    // if (currentCity.id == currentCity.id) return;
    getCity(id);
    console.log(currentCity);
  }, [id, getCity, currentCity]);

  if (isLoading) return <Loader />;

  if (!Object.keys(city).length) return <div>No City Data</div>;

  return (
    <div className="city">
      <div className="row">
        <span>{city?.emojy}</span> <h6>cityName</h6>
        <p>{city?.cityName}</p>
      </div>
      <div className="row">
        <h6>You Went To {city?.cityName} on</h6>
        <time>{formatDate(city?.date)}</time>
      </div>
      {city?.notes && (
        <div className="row">
          <h6>Your notes</h6>
          <p>{city?.notes}</p>
        </div>
      )}
      <div className="row">
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${city?.cityName}`}
          target="_balnk"
          rel="noreferrer"
        >
          Check out {city?.cityName} on Wikipedia &rarr;
        </a>
      </div>
      <BackButton />
    </div>
  );
}
