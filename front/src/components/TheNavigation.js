import { Link } from "react-router-dom";
import { useState } from "react";
// eslint-disable-next-line
import modules from "./Navigation.modules.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export default function TheNavigation() {
  function logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }
  const [navIsOpen, setNavIsOpen] = useState(false);
  const list = (
    <ul className="list">
      <li className="list-item">
        <Link className="link" onClick={toggleMenu} to="/">
          Home
        </Link>
      </li>
      <li className="list-item">
        <Link className="link" onClick={toggleMenu} to="/login">
          Login
        </Link>
      </li>
      <li className="list-item">
        <Link className="link" onClick={toggleMenu} to="/signup">
          Sign up
        </Link>
      </li>
      <li className="list-item">
        <Link className="link" onClick={toggleMenu} to="/profile">
          Profile
        </Link>
      </li>
      <div className="logout">
        {localStorage.getItem("currentUser") ? (
          <button className="btn btn-danger logout-button" onClick={logOut}>
            Log Out
          </button>
        ) : null}
      </div>
    </ul>
  );
  function toggleMenu() {
    setNavIsOpen(!navIsOpen);
  }

  return (
    <div className="navigation">
      <div className="d-flex justify-content-between logo">
        <div className="logo-text">
          the<strong>COLLECTOR</strong>
        </div>
        <div>
          {navIsOpen ? (
            <FontAwesomeIcon
              icon={faEyeSlash}
              onClick={toggleMenu}
              className="menu"
            />
          ) : (
            <FontAwesomeIcon
              icon={faBars}
              className="menu"
              onClick={toggleMenu}
            />
          )}
        </div>
      </div>
      <nav>{navIsOpen ? list : null}</nav>
    </div>
  );
}
