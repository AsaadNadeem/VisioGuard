import React from "react";
import axios from "axios";
import { useState } from "react";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UploadProfilePicture = () => {
  const [uploadedImage, setUploadedImage] = useState(null); // { url, publicId }

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedImage) {
      return alert("Please select an image first.");
    }

    try {
      setSubmitting(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/user/uploadProfilePicture`,
        {
          email: localStorage.getItem("VisioGuardEmail"),
          profilePicture: uploadedImage.url,
        },
      );

      console.log(response.data);

      navigate("/");
    } catch (error) {
      console.error(error.response?.data || error);
      alert(
        error.response?.data?.message || "Failed to upload profile picture.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadedImage(null);
    setError(null);

    const imageFormData = new FormData();
    imageFormData.append("image", file);

    try {
      setUploadingImage(true);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/uploadImage`,
        imageFormData,
      );

      setUploadedImage({
        url: response.data.url,
        publicId: response.data.publicId,
      });
    } catch (err) {
      console.error("Image upload failed:", err.response?.data || err);
      setError("Failed to upload image. Please try again.");
    } finally {
      setUploadingImage(false);
    }
  };

  const loading = uploadingImage || submitting;

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
            <h2 className="fw-bold">Upload Profile Picture</h2>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}
          <Form className="mb-4">
            <Form.Label className="fw-semibold">Select Image</Form.Label>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={uploadingImage}
            />
            {uploadingImage && (
              <div className="mt-2 text-muted">
                <Spinner animation="border" size="sm" className="me-2" />
                Uploading image...
              </div>
            )}
            {uploadedImage && !uploadingImage && (
              <div className="text-center mt-3">
                <img
                  src={uploadedImage.url}
                  alt="Profile Preview"
                  style={{
                    width: "150px",
                    height: "150px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    border: "3px solid #ddd",
                  }}
                />

                <p className="text-success mt-2">Image ready ✓</p>
              </div>
            )}
            <div className="d-flex justify-content-between mt-3 gap-5">
              <Button variant="secondary" size="lg"
                className="w-100 mt-3" onClick={() => navigate("/")}>
                Cancel
              </Button>
              <Button
                variant="dark"
                size="lg"
                className="w-100 mt-3"
                onClick={handleSubmit}
                disabled={loading || !uploadedImage}
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Uploading Profile Picture...
                  </>
                ) : (
                  "Upload"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default UploadProfilePicture;
