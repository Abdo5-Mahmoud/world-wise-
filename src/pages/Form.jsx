import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton.jsx";
import Loader from "../components/Loader.jsx";
import Message from "../components/Message.jsx";
import useUriPositon from "../Hooks/useUriPositon.js";
import { useCitiesContext } from "../Stores/CitiesContext.jsx";
import { citiesApi } from "../utils/axiosF.js";
import { convertToEmoji, generateId } from "../utils/functions.js";

export default function Form() {
  const { createCity } = useCitiesContext();
  const [date, setDate] = useState(new Date());
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [notes, setNotes] = useState("");
  const [geoErorr, setGeoError] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  // const { isLoading, position, err } = useGeoLocaion();
  const { lat, lng } = useUriPositon("");
  const navigate = useNavigate();
  const id = generateId();

  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchCityData() {
      setGeoLoading(true);
      setGeoError("");
      try {
        const { data } = await citiesApi.get("", {
          params: { latitude: lat, longitude: lng },
        });
        // console.log(data);
        setCityName(data.city);
        setCountry(data.country);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (err) {
        setGeoError(err);
      } finally {
        setGeoLoading(false);
      }
    }
    console.log(lat, lng);

    fetchCityData();
    return () => {
      const controller = new AbortController();
      controller.abort();
    };
  }, [lat, lng]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
      id,
    };
    // console.log(newCity);

    createCity(newCity);
    navigate("/app/cities");
  }

  if (geoLoading) return <Loader />;
  if (geoErorr) return <Message message={geoErorr} />;

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="row">
        <label htmlFor="name">City name</label>
        <input
          type="text"
          name="name"
          id="name"
          value={cityName}
          onChange={(e) => setCityName(e.target.value)}
        />
      </div>
      <div className="row">
        <label htmlFor="date"> When did you go to {cityName}</label>
        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>
      <div className="row">
        <label htmlFor="textArea">Notes about Your trip to {cityName} </label>
        <textarea
          name="notes"
          id="textArea"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        ></textarea>
      </div>

      <div className="lastRow">
        <button> ADD</button>
        <BackButton />
      </div>
    </form>
  );
}
