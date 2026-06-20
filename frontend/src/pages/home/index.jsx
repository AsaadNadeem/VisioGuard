import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

const Home = () => {
  const [moderations, setModerations] = useState([]);
  const [userNames, setUserNames] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch moderations
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/moderations`
        );

        setModerations(response.data);

        // Fetch uploader names
        const fetchedNames = {};

        for (const moderation of response.data) {
          if (!fetchedNames[moderation.uploader]) {
            const userResponse = await axios.get(
              `${process.env.REACT_APP_BACKEND_API}/users/${moderation.uploader}`
            );

            fetchedNames[moderation.uploader] =
              userResponse.data.fullName;
          }
        }

        setUserNames(fetchedNames);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <div
  className="hero-section py-5"
  style={{
    background:
      "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    minHeight: "70vh",
  }}
>
  <div className="container">
    <div className="row justify-content-center text-center">
      <div className="col-lg-8">

        <span className="badge bg-dark px-3 py-2 mb-3">
          AI-Powered Content Safety
        </span>

        <h1 className="display-3 fw-bold mb-3">
          AI Content Moderation Platform
        </h1>

        <p className="lead text-dark mb-4">
          Automatically detect and analyze harmful, unsafe, or
          inappropriate content using advanced AI moderation
          technology. Upload images and receive instant safety
          assessments for nudity, violence, gore, and weapon-related
          content.
        </p>
      </div>
    </div>

    <div className="row g-4 mt-3">

      <div className="col-md-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body text-center">
            <h3>🔍</h3>
            <h5>AI Analysis</h5>
            <p className="text-muted mb-0">
              Intelligent image scanning powered by modern AI
              moderation systems.
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
              Get moderation scores within seconds after uploading
              your content.
            </p>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm border-0 h-100">
          <div className="card-body text-center">
            <h3>👁️</h3>
            <h5>Public Platforms</h5>
            <p className="text-muted mb-0">
              Displays publically available previous content for example purposes.
            </p>
          </div>
        </div>
      </div>

    </div>

    <div className="row mt-5">
      <div className="col-lg-10 mx-auto">
        <div className="alert alert-light shadow-sm border-0">
          <h5 className="fw-bold mb-3">
            How It Works
          </h5>

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
          <Card key={index} style={{ width: "18rem" }}>
            <Card.Img variant="top" src={moderation.url} />

            <Card.Body>
              <Card.Title>
                Uploader:{" "}
                {userNames[moderation.uploader] || "Loading..."}
              </Card.Title>

              <ListGroup className="list-group-flush">
                <ListGroup.Item>
                  Nudity Score: {moderation.nudityScore}
                </ListGroup.Item>

                <ListGroup.Item>
                  Weapon Score: {moderation.weaponScore}
                </ListGroup.Item>

                <ListGroup.Item>
                  Gore Score: {moderation.goreScore}
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        ))}
      </div>
    </>
  );
};

export default Home;