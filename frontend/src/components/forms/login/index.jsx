import React from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const Login = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userName || !password) {
      alert("Please enter both username and password");
      return;
    }
    try {
      let userData = await axios.get(`${process.env.REACT_APP_BACKEND_API}/users/${userName}`);
      if (userData.data.password === password) {
        localStorage.setItem("username", userData.data.username);
        navigate("/");
      } else {
        alert("Invalid username or password");
      }
    } catch (error) {
      alert("An error occurred while logging in");
    }
  };

  return (
    <div className="d-flex flex-column flex-sm-row justify-content-center align-items-center">
      {/* <img
        src={Logo}
        alt="Logo"
        className="mt-5 d-block w-25 h-25 border rounded"
      /> */}
      <div className="m-5 pt-3 responsive-box">
        <h3 className="text-center mt-3">Login</h3>
        <Form>
          <Form.Group className="mb-3" controlId="formGroupEmail">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formGroupPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className="d-flex">
            <p className="mt-3">Don't have an account? </p>
            <Button variant="link" onClick={() => navigate("/signup")}>
              Signup
            </Button>
          </div>
          <div className="d-flex justify-content-between">
            <Button variant="dark" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button variant="primary" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
