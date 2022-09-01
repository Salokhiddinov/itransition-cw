import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faSun } from "@fortawesome/free-solid-svg-icons";

function NavScrollExample() {
  const theme = "light";
  return (
    <Navbar variant="dark" bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <span className="fw-lighter">the</span>
          <span className="fw-bold">COLLECTOR</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 align-items-center"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/login">Log In</Nav.Link>
            <Nav.Link href="/signup">Sign Up</Nav.Link>

            <NavDropdown title="Language" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">English</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Русский</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/profile">
              Profile <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
            <Button variant="outline-secondary">
              {theme === "light" ? <FontAwesomeIcon icon={faMoon} /> : null}
              {theme === "dark" ? <FontAwesomeIcon icon={faSun} /> : null}
            </Button>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;
