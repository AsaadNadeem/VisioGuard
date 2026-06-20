import React from "react";
import Logo from "../../../assets/images/Logo and Name.png";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";

const Header = () => {
  const buttonDecision = () => {
  return localStorage.getItem("username")!=null ? (
    <Button variant="dark" as={Link} to="/upload">
      Upload
    </Button>
  ) : (
    <Button variant="dark" as={Link} to="/login">
      Login
    </Button>
  );
};

  return (
    <div>
      <Navbar expand="sm" style={{"background-image": "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)"}} variant="dark">
        <Container>
          <Navbar.Brand href="/" className="text-white">
            <img src={Logo} alt="Logo" className="img-fluid" style={{ maxHeight: '40px' }} />
          </Navbar.Brand>
              {buttonDecision()}
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
