import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Card,
  Button,
  Form,
  Spinner,
} from "react-bootstrap";

function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image first.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("image", file);
      formData.append(
        "uploader",
        localStorage.getItem("username")
      );

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/upload`,
        formData
      );

      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.error(error.response?.data);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Card
        className="shadow-lg border-0"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
        }}
      >
        <Card.Body className="p-5">

          <div className="text-center mb-4">
            <h2 className="fw-bold">
              Upload Content
            </h2>

            <p className="text-muted">
              Upload an image and let AI analyze it for
              nudity, weapons, gore, and unsafe content.
            </p>
          </div>

          <Form>
            <Form.Group className="mb-4">
              <Form.Label className="fw-semibold">
                Select Image
              </Form.Label>

              <Form.Control
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFile(e.target.files[0])
                }
              />
            </Form.Group>

            {file && (
              <div className="alert alert-info">
                <strong>Selected File:</strong>{" "}
                {file.name}
              </div>
            )}

            <Button
              variant="dark"
              size="lg"
              className="w-100"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                  />
                  Analyzing Content...
                </>
              ) : (
                "Upload & Analyze"
              )}
            </Button>
          </Form>

          {loading && (
            <div className="text-center mt-4">
              <Spinner
                animation="border"
                role="status"
              />
              <p className="mt-3 text-muted">
                Uploading image, running AI moderation,
                and generating safety scores...
              </p>
            </div>
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Upload;