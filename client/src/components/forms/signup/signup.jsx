import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import "./style.css";

const SignUp = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Always call hooks in the same order
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!location.state) {
      navigate("/signup", { replace: true });
    }
  }, [location.state, navigate]);

  // Wait until the redirect happens
  if (!location.state) {
    return null;
  }

  const { name, email, password } = location.state;

  const addUser = async () => {
    setError("");

    if (!code.trim()) {
      return setError("Please enter the verification code.");
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/user/signUp`,
        {
          fullName: name,
          email,
          password,
          code,
        },
      );

      localStorage.setItem("VisioGuardEmail", response.data.user.email);

      localStorage.setItem("fullName", response.data.user.fullName);

      navigate("/upload-profile-picture");
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const resendCode = async () => {
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_API}/user/sendCode`, {
        email,
      });

      setError("");
      alert("A new verification code has been sent.");
    } catch (err) {
      setError("Unable to resend the code.");
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-card">
        <h2 className="fw-bold text-center">Verify Your Email</h2>

        <p className="text-center text-muted mb-4">
          We've sent a 6-digit verification code to
          <br />
          <strong>{email}</strong>
        </p>

        {error && (
          <Alert variant="danger" dismissible onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Form>
          <Form.Group className="mb-4">
            <Form.Label>Verification Code</Form.Label>

            <Form.Control
              type="text"
              maxLength={6}
              placeholder="123456"
              value={code}
              disabled={loading}
              className="text-center fs-4"
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
            />
          </Form.Group>

          <Button
            className="w-100 mb-3"
            variant="success"
            disabled={loading}
            onClick={addUser}
          >
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </Button>

          <Button
            variant="outline-primary"
            className="w-100 mb-4"
            disabled={loading}
            onClick={resendCode}
          >
            Resend Code
          </Button>

          <div className="d-flex justify-content-between">
            <Button
              variant="outline-secondary"
              disabled={loading}
              onClick={() => navigate("/")}
            >
              Home
            </Button>

            <Button
              variant="link"
              disabled={loading}
              onClick={() => navigate("/signup")}
            >
              Back
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default SignUp;
