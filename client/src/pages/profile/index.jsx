import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,
  ProgressBar,
  Spinner,
} from "react-bootstrap";

const Profile = () => {
  const navigate = useNavigate();

  const [profilePicture, setProfilePicture] = useState(null);
  const [moderations, setModerations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingDelete, setLoadingDelete] = useState(null);

  const fullName = localStorage.getItem("fullName") || "User";
  const email = localStorage.getItem("VisioGuardEmail");

  useEffect(() => {
    const fetchData = async () => {
      if (!email) {
        navigate("/login");
        return;
      }

      try {
        const [profileResponse, moderationsResponse] = await Promise.all([
          axios.get(
            `${process.env.REACT_APP_BACKEND_API}/user/getProfilePicture/${email}`,
          ),
          axios.get(
            `${process.env.REACT_APP_BACKEND_API}/user/getUserModerations/${email}`,
          ),
        ]);

        setProfilePicture(profileResponse.data.profilePicture);
        setModerations(moderationsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [email, navigate]);

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

  const deleteModeration = async (publicId) => {
    try {
      setLoadingDelete(publicId);
      const email = localStorage.getItem("VisioGuardEmail");

      await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/deleteModeration`,
        {
          email,
          publicId,
        },
      );

      // Remove the deleted moderation from the UI
      setModerations((prev) => prev.filter((m) => m.publicId !== publicId));
    } catch (error) {
      console.error("Error deleting moderation:", error);
    } finally {
      setLoadingDelete(null);
    }
  };

  return (
    <Container className="py-5">
      {/* Profile Header */}
      <Card className="shadow-lg border-0 rounded-4 mb-5">
        <Card.Body className="p-4">
          <Row className="align-items-center">
            <Col lg={8}>
              <div className="d-flex flex-column flex-md-row align-items-center">
                {profilePicture ? (
                  <img
                    src={profilePicture}
                    alt="Profile"
                    className="rounded-circle border shadow-sm"
                    style={{
                      width: "140px",
                      height: "140px",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <div
                    className="rounded-circle bg-primary text-white d-flex justify-content-center align-items-center shadow"
                    style={{
                      width: "140px",
                      height: "140px",
                      fontSize: "48px",
                      fontWeight: "bold",
                    }}
                  >
                    {fullName.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="ms-md-4 mt-4 mt-md-0 text-center text-md-start">
                  <h2 className="fw-bold mb-2">{fullName}</h2>

                  <p className="text-muted mb-3">{email}</p>

                  {!profilePicture && (
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate("/upload-profile-picture")}
                    >
                      Upload Profile Picture
                    </Button>
                  )}
                </div>
              </div>
            </Col>

            <Col lg={4} className="text-center text-lg-end mt-4 mt-lg-0">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate("/upload")}
              >
                Upload New Moderation
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Moderation Heading */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3 className="fw-bold">Your Moderations</h3>

        <Badge bg="dark" pill>
          {moderations.length}
        </Badge>
      </div>

      {/* Empty State */}
      {moderations.length === 0 ? (
        <Card className="border-0 shadow-sm text-center p-5">
          <h4>No Moderations Yet</h4>

          <p className="text-muted">
            Upload your first image to begin moderating content.
          </p>

          <Button variant="primary" onClick={() => navigate("/upload")}>
            Upload Image
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
                  variant="dark"
                  disabled={loadingDelete === moderation.publicId}
                  onClick={() => deleteModeration(moderation.publicId)}
                >
                  {loadingDelete === moderation.publicId ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Deleting...
                    </>
                  ) : (
                    "🗑️ Delete"
                  )}
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Footer Buttons */}
      <div className="d-flex justify-content-between mt-5">
        <Button variant="outline-dark" onClick={() => navigate("/")}>
          Back to Home
        </Button>

        <Button variant="primary" onClick={() => navigate("/upload")}>
          Upload More
        </Button>
      </div>
    </Container>
  );
};

export default Profile;
