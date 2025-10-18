import { NavLink } from "react-router-dom";

import { faBars, faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import NavLogo from "../../assets/logo.png";
export default function Navbar() {
  const [clicked, setClicked] = useState(false);
  function handleClick() {
    document.getElementById("navbar").classList.toggle("barActive");
    setClicked(!clicked);
  }
  return (
    <nav>
      <div className="navbarCont">
        <div className="logo">
          <NavLink to={"/"}>
            <img src={NavLogo} alt="logo" />
          </NavLink>
        </div>
        <ul id="navbar">
          <NavLink to={"/products"}>
            <li className="link">products</li>
          </NavLink>
          <NavLink to={"/pricing"}>
            <li className="link">pricing</li>
          </NavLink>
          <NavLink to={"/login"}>
            <li className="link button">login</li>
          </NavLink>
        </ul>
        <div className="bar" onClick={handleClick}>
          {clicked ? (
            <FontAwesomeIcon icon={faBarsStaggered} />
          ) : (
            <FontAwesomeIcon icon={faBars} />
          )}
        </div>
      </div>
    </nav>
  );
}
