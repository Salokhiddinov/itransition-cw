import Button from "react-bootstrap/Button";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function Theme() {
  const [theme, setTheme] = useState("light");

  function switchToDark() {
    localStorage.setItem("theme", "dark");
    setTheme("dark");
    document.documentElement.style.setProperty("--main-bg", "#010101");
    document.documentElement.style.setProperty("--second-bg", "#181818");
    document.documentElement.style.setProperty("--main-font", "#ffffff");
    document.documentElement.style.setProperty("--main-link", "#0453ff");
  }
  function switchToLight() {
    localStorage.setItem("theme", "light");
    setTheme("light");
    document.documentElement.style.setProperty("--main-bg", "#f4f9ff");
    document.documentElement.style.setProperty("--second-bg", "#ffffff");
    document.documentElement.style.setProperty("--main-font", "#000000");
    document.documentElement.style.setProperty("--main-link", "#0453ff");
  }

  return (
    <div>
      <Button variant="outline-secondary">
        {theme === "light" ? (
          <FontAwesomeIcon icon={faMoon} onClick={switchToDark} />
        ) : null}
        {theme === "dark" ? (
          <FontAwesomeIcon icon={faSun} onClick={switchToLight} />
        ) : null}
      </Button>
    </div>
  );
}
