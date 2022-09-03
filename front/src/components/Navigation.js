// import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Theme from "./UI/Theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

function NavScrollExample() {
//   const navigate = useNavigate();
  const theme = "light";
  console.log(theme);
  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("currentUser");
    window.location.reload();
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
            <Nav.Link href="/">Home</Nav.Link>

            <NavDropdown title="Account" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/login">Log In</NavDropdown.Item>
              <NavDropdown.Item href="/signup">Sign Up</NavDropdown.Item>
              <NavDropdown.Item onClick={logOut} className="delete-control">
                Log Out
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Language" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">English</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Русский</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="/profile">
              Profile <FontAwesomeIcon icon={faUser} />
            </Nav.Link>
            <Theme />
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
