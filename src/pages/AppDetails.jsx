import { Outlet } from "react-router-dom";
import AppNav from "../components/AppNav.jsx";
import Footer from "../components/Footer.jsx";
import MapComponent from "../components/Map.jsx";
import UserInfo from "../components/UserInfo.jsx";
import { CitiesProvider } from "../Stores/CitiesContext.jsx";
import useGeoLocaion from "../Hooks/useGeoLocaion.js";

export default function AppDetails() {
  const { getPosition } = useGeoLocaion();
  return (
    <div className="appDetails">
      <CitiesProvider>
        <div className="details">
          <AppNav />
          <Outlet />
          <Footer />
        </div>
        <div className="map">
          <UserInfo />
          <MapComponent center={[30.0444, 31.2357]} zoom={12} />{" "}
          {/* Cairo coords example */}
          <button className="link button geoBtn" onClick={getPosition}>
            Use Your Location
          </button>
        </div>{" "}
      </CitiesProvider>
    </div>
  );
}
