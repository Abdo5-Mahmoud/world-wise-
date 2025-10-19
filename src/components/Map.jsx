import L from "leaflet";
import { useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useNavigate } from "react-router-dom";
import MarkerImg from "../../assets/marker.png";
import useUriPositon from "../Hooks/useUriPositon.js";
import { useCitiesContext } from "../Stores/CitiesContext.jsx";
import PropTypes from "prop-types";

import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
// Fix default icon paths if needed
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const customIcon = new L.Icon({
  iconUrl: MarkerImg,
  iconSize: [50, 32],
  iconAnchor: [16, 32],
});

function ClickMarker({ onClick }) {
  const navigate = useNavigate();
  useMapEvents({
    click(e) {
      let {
        latlng: { lat, lng },
      } = e;
      if (typeof onClick === "function") onClick([lat, lng]);
      // console.log(e);
      
      navigate(`form?lat=${lat}&lng=${lng}`);
    },
  });
  return null;
}

ClickMarker.propTypes = {
  onClick: PropTypes.func.isRequired,
};

function Recenter({ center }) {
  const map = useMap();
  useEffect(() => {
    if (!center) return;
    const [lat, lng] = center;
    if (lat == null || lng == null) return;
    if (lat != 0 && lng != 0)
      map.setView([Number(lat), Number(lng)], map.getZoom());
  }, [center, map]);
  return null;
}

Recenter.propTypes = {
  center: PropTypes.array,
};

export default function MapComponent() {
  const { cities } = useCitiesContext();
  const { lat, lng } = useUriPositon();
  const [mapFocus, setMapFocus] = useState([30.11, 31.22]);

  useEffect(() => {
    if (lat == null || lng == null) return;
    const latNum = Number(lat);
    const lngNum = Number(lng);
    if (Number.isNaN(latNum) || Number.isNaN(lngNum)) return;
    setMapFocus([latNum, lngNum]);
  }, [lat, lng]);

  return (
    <MapContainer
      center={mapFocus}
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap contributors"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <Recenter center={mapFocus} />

      {cities.map((city) => {
        return (
          <Marker
            position={[city.position.lat, city.position.lng]}
            draggable={true}
            key={city.id}
            eventHandlers={{
              dragend: (e) => setMapFocus(e.target.getLatLng()),
            }}
            icon={customIcon}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
              <span>{city.cityNotes}</span>
            </Popup>
          </Marker>
        );
      })}
      <ClickMarker
        onClick={(latlng) => {
          // console.log(latlng);
          setMapFocus(latlng);
        }}
      />
    </MapContainer>
  );
}
