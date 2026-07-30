import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  ProgressBar,
  Button,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Saved = () => {
  const navigate = useNavigate();

  const [moderations, setModerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingUnsave, setLoadingUnsave] = useState(null);

  useEffect(() => {
    const fetchSavedModerations = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/user/getSavedModerations/${localStorage.getItem(
            "VisioGuardEmail",
          )}`,
        );

        setModerations(response.data);
      } catch (error) {
        console.error("Error fetching saved moderations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedModerations();
  }, []);

  const unsaveModeration = async (moderationId) => {
    try {
      setLoadingUnsave(moderationId);
      const email = localStorage.getItem("VisioGuardEmail");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/user/unSaveModeration`,
        {
          email,
          moderationId,
        },
      );

      // Remove the moderation from the state
      setModerations((prev) => prev.filter((m) => m._id !== moderationId));
    } catch (error) {
      console.error("Error unsaving moderation:", error);
    } finally {
      setLoadingUnsave(null);
    }
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "70vh" }}
      >
        <Spinner animation="border" />
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">Saved Moderations</h2>

        <Badge bg="dark" pill>
          {moderations.length}
        </Badge>
      </div>

      {moderations.length === 0 ? (
        <Card className="border-0 shadow-sm text-center p-5">
          <h4>No Saved Moderations</h4>

          <p className="text-muted">You haven't saved any moderations yet.</p>

          <Button variant="primary" onClick={() => navigate("/")}>
            Browse Moderations
          </Button>
        </Card>
      ) : (
        <Row className="g-4">
          {moderations.map((moderation) => (
            <Col lg={4} md={6} key={moderation._id}>
              <Card className="h-100 shadow-sm border-0 rounded-4 overflow-hidden">
                <div className="position-relative">
                  <Card.Img
                    variant="top"
                    src={moderation.url}
                    style={{
                      height: "250px",
                      objectFit: "cover",
                    }}
                  />

                  <Badge
                    bg="primary"
                    className="position-absolute top-0 end-0 m-3"
                  >
                    {moderation.category}
                  </Badge>
                </div>

                <Card.Body>
                  <Card.Title className="fw-bold">{moderation.name}</Card.Title>

                  <Card.Text className="text-muted">
                    {moderation.description}
                  </Card.Text>

                  <hr />

                  <small className="fw-semibold">Nudity</small>
                  <ProgressBar
                    className="mb-3"
                    now={moderation.nudityScore}
                    variant="warning"
                    label={`${moderation.nudityScore.toFixed(0)}%`}
                  />

                  <small className="fw-semibold">Weapon</small>
                  <ProgressBar
                    className="mb-3"
                    now={moderation.weaponScore}
                    variant="danger"
                    label={`${moderation.weaponScore.toFixed(0)}%`}
                  />

                  <small className="fw-semibold">Gore</small>
                  <ProgressBar
                    now={moderation.goreScore}
                    variant="success"
                    label={`${moderation.goreScore.toFixed(0)}%`}
                  />
                </Card.Body>
                <Button
                  variant="danger"
                  disabled={loadingUnsave === moderation._id}
                  onClick={() => unsaveModeration(moderation._id)}
                >
                  {loadingUnsave === moderation._id ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Removing...
                    </>
                  ) : (
                    "🗑️ Remove"
                  )}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      <div className="d-flex justify-content-center mt-5">
        <Button variant="outline-dark" onClick={() => navigate("/")}>
          Back to Home
        </Button>
      </div>
    </Container>
  );
};

export default Saved;
