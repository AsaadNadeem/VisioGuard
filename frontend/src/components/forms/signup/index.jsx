import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
// import Logo from "../../../assets/images/Logo.png";
import "./style.css";

const Signup = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();

  const addStudent = () => {
    if (!signupData.name || !signupData.username || !signupData.password) {
      alert("Please fill in all fields");
      return;
    }
    if (signupData.password.length < 6) {
      alert("Password must be at least 6 characters long");
      return;
    }
    axios
      .post(`${process.env.REACT_APP_BACKEND_API}/users/`, {
        fullName: signupData.name,
        username: signupData.username,
        password: signupData.password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("username", signupData.username);
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          alert(error.response.data.message);
        } else {
          alert("An error occurred. Please try again.");
        }
      });
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
      {/* <img
        src={Logo}
        alt="Logo"
        className="mt-5 d-block border rounded"
        style={{ width: "35%" }}
      /> */}
      <div className="m-5 pt-3 responsive-box">
        <h3 className="text-center mt-3">Signup</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter new username"
              value={signupData.username}
              onChange={(e) =>
                setSignupData({ ...signupData, username: e.target.value })
              }
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter new password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
          </Form.Group>
          <div className="d-flex">
            <p className="mt-3">Already have an account? </p>
            <Button variant="link" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="dark" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="primary" onClick={addStudent}>
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Signup;
