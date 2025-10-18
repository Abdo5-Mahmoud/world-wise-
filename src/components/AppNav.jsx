import { NavLink } from "react-router-dom";

export default function AppNav() {
  return (
    <>
      <div className="img">
        <NavLink to={"/"}>
          <img src="../../assets/logo.png" alt="logo img" width={"100px"} />
        </NavLink>
      </div>
      <div className="navBar">
        <NavLink className={"link"} to={"cities"}>
          cities
        </NavLink>
        <NavLink className={"link"} to={"countries"}>
          countries
        </NavLink>
      </div>
    </>
  );
}
