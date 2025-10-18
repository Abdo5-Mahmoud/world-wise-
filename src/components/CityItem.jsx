import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/functions.js";

export default function CityItem({ city, deleteCity }) {
  const {
    id,
    emoji,
    cityName,
    date,
    position: { lat, lng },
  } = city;
  // useEffect(() => {
  //   console.log(city);
  // }, [city]);
  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
    // console.log("city deleted");
    // console.log(id);
  }
  return (
    <Link to={`${id}?lat=${lat}&lng=${lng}`}>
      <li key={id}>
        <span>{emoji}</span>
        <h3>{cityName}</h3>
        <time>{formatDate(date)}</time>
        <span className="deleteBtn" onClick={handleDelete}></span>
      </li>
    </Link>
  );
}

CityItem.propTypes = {
  city: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    emoji: PropTypes.string.isRequired,
    cityName: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)])
      .isRequired,
    position: PropTypes.shape({
      lat: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      lng: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  }).isRequired,
  getCity: PropTypes.func,
  deleteCity: PropTypes.func,
};
