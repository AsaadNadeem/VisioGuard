import React, { useEffect, useState } from "react";
import Logo from "../../../assets/images/Logo with Name.png";
import { Link, useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import {
  BsCloudUpload,
  BsPersonCircle,
  BsBookmarkHeart,
  BsBoxArrowRight,
} from "react-icons/bs";
import axios from "axios";
import "./style.css";

const Header = () => {
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(null);

  useEffect(() => {
    const fetchProfilePicture = async () => {
      const email = localStorage.getItem("VisioGuardEmail");

      if (!email) return;

      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/user/getProfilePicture/${email}`,
        );

        setProfilePicture(response.data.profilePicture);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfilePicture();
  }, []);

  const logout = () => {
    localStorage.removeItem("VisioGuardEmail");
    localStorage.removeItem("fullName");

    navigate("/");
  };

  const isLoggedIn = !!localStorage.getItem("VisioGuardEmail");

  return (
    <Navbar
      expand="sm"
      style={{
        backgroundImage: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
      }}
      variant="dark"
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img
            src={Logo}
            alt="Logo"
            className="img-fluid"
            style={{ maxHeight: "40px" }}
          />
        </Navbar.Brand>

        {isLoggedIn ? (
          <div className="d-flex align-items-center">
            <Dropdown align="end">
              <Dropdown.Toggle
                variant="transparent"
                id="profile-dropdown"
                className="d-flex align-items-center gap-2 border-0 bg-transparent shadow-none p-0 text-dark"
              >
                {profilePicture?.trim() && (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="rounded-circle border"
                    style={{
                      width: "42px",
                      height: "42px",
                      objectFit: "cover",
                    }}
                  />
                )}

                <span className="fw-semibold" style={{ color: "#212529" }}>
                  {localStorage.getItem("fullName")}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item
                  as={Link}
                  to="/upload"
                  className="d-flex align-items-center gap-2 py-2"
                >
                  <BsCloudUpload />
                  Upload
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link}
                  to="/profile"
                  className="d-flex align-items-center gap-2 py-2"
                >
                  <BsPersonCircle />
                  Profile
                </Dropdown.Item>

                <Dropdown.Item
                  as={Link}
                  to="/saved"
                  className="d-flex align-items-center gap-2 py-2"
                >
                  <BsBookmarkHeart />
                  Saved
                </Dropdown.Item>

                <Dropdown.Divider />

                <Dropdown.Item
                  onClick={logout}
                  className="d-flex align-items-center gap-2 py-2 text-danger"
                >
                  <BsBoxArrowRight />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        ) : (
          <Button variant="dark" as={Link} to="/signup">
            Signup
          </Button>
        )}
      </Container>
    </Navbar>
  );
};

export default Header;
