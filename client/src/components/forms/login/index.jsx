import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    setError("");

    if (!loginData.email.trim() || !loginData.password) {
      return setError("Please enter both email and password.");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/user/login`,
        {
          email: loginData.email,
          password: loginData.password,
        },
      );

      localStorage.setItem("VisioGuardEmail", response.data.user.email);

      localStorage.setItem("fullName", response.data.user.fullName);

      navigate("/");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Unable to connect to the server.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="fw-bold text-center">Welcome Back</h2>

        <p className="text-center text-muted mb-4">
          Sign in to continue to VisioGuard
        </p>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              type="email"
              placeholder="Enter your email"
              disabled={loading}
              value={loginData.email}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Password</Form.Label>

            <Form.Control
              type="password"
              placeholder="Enter your password"
              disabled={loading}
              value={loginData.password}
              onChange={(e) =>
                setLoginData({
                  ...loginData,
                  password: e.target.value,
                })
              }
            />
          </Form.Group>

          <div className="text-end mb-4">
            <Button
              variant="link"
              className="p-0 text-decoration-none"
              disabled={loading}
            >
              Forgot Password?
            </Button>
          </div>

          <Button
            type="submit"
            className="w-100 mb-3"
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </Button>

          <div className="text-center">
            <small className="text-muted">Don't have an account?</small>

            <Button
              variant="link"
              disabled={loading}
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </Button>
          </div>

          <div className="d-flex align-items-center my-4">
            <hr className="flex-grow-1" />
            <span className="mx-3 text-muted">OR</span>
            <hr className="flex-grow-1" />
          </div>

          <div className="d-flex justify-content-center mb-4">
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                try {
                  const response = await axios.post(
                    `${process.env.REACT_APP_BACKEND_API}/user/googleLogin`,
                    {
                      credential: credentialResponse.credential,
                    },
                  );

                  localStorage.setItem(
                    "VisioGuardEmail",
                    response.data.user.email,
                  );

                  localStorage.setItem("fullName", response.data.user.fullName);

                  navigate("/");
                } catch (err) {
                  setError("Google login failed.");
                }
              }}
              onError={() => {
                setError("Google login failed.");
              }}
            />
          </div>

          <div className="d-grid">
            <Button
              variant="outline-secondary"
              disabled={loading}
              onClick={() => navigate("/")}
            >
              Home
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default Login;
