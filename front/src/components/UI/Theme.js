import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

export default function Theme() {
  const theme = "light";
  return (
    <div>
      <Button variant="outline-secondary">
        {theme === "light" ? <FontAwesomeIcon icon={faMoon} /> : null}
        {theme === "dark" ? <FontAwesomeIcon icon={faSun} /> : null}
      </Button>
    </div>
  );
}