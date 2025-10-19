import PropTypes from "prop-types";

export default function CountryItem({ city }) {
  return (
    <li className="countryItem">
      <p className="emoji">{city.emoji}</p>
      <p className="countryName">{city.country}</p>
    </li>
  );
}

CountryItem.propTypes = {
  city: PropTypes.shape({
    country: PropTypes.string,
    emoji: PropTypes.string,
  }).isRequired,
};
