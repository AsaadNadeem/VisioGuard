import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./style.css";
import { Button } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import { Spinner } from "react-bootstrap";

const Home = () => {
  const [moderations, setModerations] = useState([]);

  const [showToast, setShowToast] = useState(false);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch moderations
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/moderations`,
        );

        setModerations(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const saveModeration = async (moderationId) => {
    try {
      setLoading(true);
      const email = localStorage.getItem("VisioGuardEmail");

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/user/saveModeration`,
        {
          email,
          moderationId,
        },
      );
      setShowToast(true);
      console.log(response.data);
    } catch (error) {
      console.error("Error saving moderation:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadImage = (url, fileName = "image") => {
    // Insert fl_attachment into Cloudinary URL
    const downloadUrl = url.replace(
      "/upload/",
      `/upload/fl_attachment:${encodeURIComponent(fileName)}/`,
    );

    // Open download
    window.open(downloadUrl, "_blank");
  };

  return (
    <>
      <div
        className="hero-section py-5"
        style={{
          background: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
          minHeight: "70vh",
        }}
      >
        <div className="container">
          <div className="row justify-content-center text-center">
            <div className="col-lg-8">
              <span className="badge bg-dark px-3 py-2 mb-3">
                🛡️ AI-Powered Image Moderation
              </span>

              <h1 className="display-3 fw-bold mb-3">VisioGuard</h1>

              <p className="lead text-dark mb-4">
                VisioGuard uses AI to analyze uploaded images for nudity,
                weapons, gore, and other potentially unsafe content. Upload an
                image and receive detailed moderation scores within seconds.
              </p>
            </div>
          </div>

          <div className="row g-4 mt-3 d-none d-md-flex">
            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h3>🔍</h3>
                  <h5>AI Analysis</h5>
                  <p className="text-muted mb-0">
                    Intelligent image scanning powered by modern AI moderation
                    systems.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h3>⚡</h3>
                  <h5>Instant Results</h5>
                  <p className="text-muted mb-0">
                    Get moderation scores within seconds after uploading your
                    content.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body text-center">
                  <h3>📊</h3>
                  <h5>Detailed Reports</h5>

                  <p className="text-muted mb-0">
                    View moderation scores for nudity, weapons, and gore with a
                    clean visual report.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="row mt-5 d-none d-lg-flex">
            <div className="col-lg-10 mx-auto">
              <div className="alert alert-light shadow-sm border-0">
                <h5 className="fw-bold mb-3">How It Works</h5>

                <ol className="mb-0">
                  <li>Upload an image for moderation.</li>
                  <li>AI analyzes the content for safety risks.</li>
                  <li>Receive detailed moderation scores.</li>
                  <li>Review flagged content and make informed decisions.</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-flex flex-wrap gap-5 px-3 py-3 justify-content-center">
        {moderations.map((moderation, index) => (
          <Card className="moderation-card h-100">
            <div className="image-wrapper">
              <Card.Img src={moderation.url} className="card-image" />

              {/* Top badges */}
              <div className="top-bar">
                <Badge bg="dark" className="category-badge">
                  {moderation.category}
                </Badge>

                <Badge
                  bg={
                    moderation.weaponScore > 60 ||
                    moderation.nudityScore > 60 ||
                    moderation.goreScore > 60
                      ? "danger"
                      : "success"
                  }
                >
                  {moderation.weaponScore > 60 ||
                  moderation.nudityScore > 60 ||
                  moderation.goreScore > 60
                    ? "Unsafe"
                    : "Safe"}
                </Badge>
              </div>

              {/* Hover Overlay */}

              <div className="overlay">
                <h5 className="fw-bold mb-3">AI Moderation</h5>

                <div className="score">
                  <span>Nudity</span>

                  <ProgressBar
                    now={moderation.nudityScore}
                    variant="warning"
                    label={`${moderation.nudityScore}%`}
                  />
                </div>

                <div className="score">
                  <span>Weapon</span>

                  <ProgressBar
                    now={moderation.weaponScore}
                    variant="danger"
                    label={`${moderation.weaponScore}%`}
                  />
                </div>

                <div className="score">
                  <span>Gore</span>

                  <ProgressBar
                    now={moderation.goreScore}
                    variant="success"
                    label={`${moderation.goreScore}%`}
                  />
                </div>
              </div>
            </div>

            <Card.Body>
              <Card.Title>{moderation.name}</Card.Title>

              <Card.Text className="description">
                {moderation.description}
              </Card.Text>
            </Card.Body>

            <Card.Footer className="footer-actions">
              <Button
                onClick={() => saveModeration(moderation._id)}
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  "💾 Save"
                )}
              </Button>

              <Button
                variant="outline-dark"
                onClick={() =>
                  downloadImage(moderation.url, moderation.name || "moderation")
                }
              >
                ⬇️ Download
              </Button>
            </Card.Footer>
          </Card>
        ))}
        <Toast
          show={showToast}
          autohide
          delay={2500}
          onClose={() => setShowToast(false)}
          bg="success"
        >
          <Toast.Body className="text-white">✅ Saved successfully!</Toast.Body>
        </Toast>
      </div>
    </>
  );
};

export default Home;
