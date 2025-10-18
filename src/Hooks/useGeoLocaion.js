import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useGeoLocaion() {
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const getPosition = () => {
    if (!navigator.geolocation)
      return setErr("Your browser does not support geolocation");
    setIsLoading(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        navigate(`form?lat=${pos.coords.latitude}&lng=${pos.coords.longitude}`);

        setIsLoading(false);
      },
      (error) => {
        setErr(error.message);
        setIsLoading(false);
      }
    );
  };
  return { isLoading, getPosition, err };
}
