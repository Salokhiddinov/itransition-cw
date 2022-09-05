// import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Theme from "../UI/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function NavScrollExample() {
  const { t } = useTranslation();
  //   const navigate = useNavigate();
  const theme = "light";
  console.log(theme);
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.reload();
  };
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    localStorage.setItem("language", lng);
  };

  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <span className="fw-lighter">the</span>
          <span className="fw-bold">COLLECTOR</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0 align-items-center">
            <Nav.Link href="/">{t("nav-home")}</Nav.Link>

            <NavDropdown title={t("nav-account")} id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">
                {t("nav-login")}
              </NavDropdown.Item>
              <NavDropdown.Item href="/signup">
                {t("nav-signup")}
              </NavDropdown.Item>
              <NavDropdown.Item onClick={logOut} className="delete-control">
                {t("nav-logout")}
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown
              title={localStorage.getItem("language") === "ru" ? "RUS" : "ENG"}
              id="navbarScrollingDropdown"
            >
              <NavDropdown.Item onClick={() => changeLanguage("en")}>
                English
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => changeLanguage("ru")}>
                Русский
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/profile">
              {t("nav-profile")} <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
            <Theme />
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder={t("nav-search")}
              className="me-2 input"
              aria-label="Search"
            />
            <Button variant="outline-secondary">{t("nav-search")}</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
