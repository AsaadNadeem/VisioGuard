import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
// import Logo from "../../../assets/images/Logo.png";
import Alert from "react-bootstrap/Alert";
import "./style.css";

import { GoogleLogin } from "@react-oauth/google";

const SendOTP = () => {
  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const sendOTP = async () => {
    setError("");

    if (
      !signupData.name.trim() ||
      !signupData.email.trim() ||
      !signupData.password ||
      !confirmPassword
    ) {
      return setError("Please fill in all fields.");
    }

    if (signupData.password.length < 6) {
      return setError("Password must be at least 6 characters long.");
    }

    if (confirmPassword !== signupData.password) {
      return setError("Passwords do not match.");
    }

    try {
      setLoading(true);

      await axios.post(`${process.env.REACT_APP_BACKEND_API}/user/sendCode`, {
        email: signupData.email,
      });

      navigate("/verify-email", {
        state: signupData,
      });
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="fw-bold text-center">Create Account</h2>

        <p className="text-center text-muted mb-4">Join VisioGuard today</p>

        {error && (
          <Alert variant="danger" onClose={() => setError("")} dismissible>
            {error}
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>

            <Form.Control
              disabled={loading}
              type="text"
              placeholder="Enter Full Name"
              value={signupData.name}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  name: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>

            <Form.Control
              disabled={loading}
              type="email"
              placeholder="Enter your Email"
              value={signupData.email}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  email: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>

            <Form.Control
              disabled={loading}
              type="password"
              placeholder="Enter new Password"
              value={signupData.password}
              onChange={(e) =>
                setSignupData({
                  ...signupData,
                  password: e.target.value,
                })
              }
            />
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Label>Confirm Password</Form.Label>

            <Form.Control
              disabled={loading}
              type="password"
              placeholder="Re-enter password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <Button
            className="w-100 mb-3"
            onClick={sendOTP}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2" />
                Sending OTP...
              </>
            ) : (
              "Continue"
            )}
          </Button>

          <div className="text-center">
            <small className="text-muted">Already have an account?</small>

            <Button
              variant="link"
              disabled={loading}
              onClick={() => navigate("/login")}
            >
              Login
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
                  console.log(err);
                }
              }}
              onError={() => console.log("Google Login Failed")}
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

export default SendOTP;
