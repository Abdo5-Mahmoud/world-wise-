import { useSearchParams } from "react-router-dom";

export default function useUriPositon() {
  const [serchParams] = useSearchParams();
  const lat = Number(serchParams.get("lat"));
  const lng = Number(serchParams.get("lng"));
  return { lat, lng };
}
