import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Container, Card, Button, Form, Spinner } from "react-bootstrap";

function Upload() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  // const [selectedFile, setSelectedFile] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null); // { url, publicId }

  const [uploadingImage, setUploadingImage] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // setSelectedFile(file);
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

  const handleUpload = async () => {
    if (!uploadedImage) {
      setError("Please select and wait for an image to finish uploading.");
      return;
    }
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }

    try {
      setSubmitting(true);
      setError(null);

      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_API}/api/uploadModeration`,
        {
          email: localStorage.getItem("VisioGuardEmail"),
          moderationData: {
            url: uploadedImage.url,
            publicId: uploadedImage.publicId,
            name,
            description,
            category,
          },
        },
      );

      console.log(response.data);
      navigate("/");
    } catch (err) {
      console.error(err.response?.data || err);
      setError("Failed to submit for moderation. Please try again.");
    } finally {
      setSubmitting(false);
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
            <h2 className="fw-bold">Upload Content</h2>
            <p className="text-muted">
              Upload an image and let AI analyze it for nudity, weapons, gore,
              and unsafe content.
            </p>
          </div>

          {error && <p className="text-danger text-center">{error}</p>}

          <Form>
            <Form.Group className="mb-4">
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
                <div className="mt-2 text-success">Image ready ✓</div>
              )}

              <Form.Label className="fw-semibold mt-3">Enter Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Form.Label className="fw-semibold mt-3">
                Enter Description
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />

              <Form.Label className="fw-semibold mt-3">
                Select Category
              </Form.Label>
              <Form.Select
                aria-label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Select a category</option>

                <option value="Technology">Technology</option>
                <option value="Science">Science</option>
                <option value="Research">Research</option>
                <option value="Education">Education</option>
                <option value="Business">Business</option>
                <option value="Finance">Finance</option>
                <option value="Healthcare">Healthcare</option>
                <option value="Religion">Religion</option>
                <option value="Politics">Politics</option>
                <option value="News">News</option>
                <option value="History">History</option>
                <option value="Law">Law</option>
                <option value="Sports">Sports</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Gaming">Gaming</option>
                <option value="Art & Design">Art & Design</option>
                <option value="Photography">Photography</option>
                <option value="Travel">Travel</option>
                <option value="Food & Cooking">Food & Cooking</option>
                <option value="Fashion">Fashion</option>
                <option value="Lifestyle">Lifestyle</option>
                <option value="Nature & Environment">
                  Nature & Environment
                </option>
                <option value="Animals">Animals</option>
                <option value="Automotive">Automotive</option>
                <option value="Architecture">Architecture</option>
                <option value="Music">Music</option>
                <option value="Movies & TV">Movies & TV</option>
                <option value="Books & Literature">Books & Literature</option>
                <option value="Social Media">Social Media</option>
                <option value="Marketing">Marketing</option>
                <option value="E-commerce">E-commerce</option>
                <option value="Personal">Personal</option>
                <option value="Other">Other</option>
              </Form.Select>
            </Form.Group>

            <Button
              variant="dark"
              size="lg"
              className="w-100"
              onClick={handleUpload}
              disabled={loading || !uploadedImage}
            >
              {submitting ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Analyzing Content...
                </>
              ) : (
                "Upload"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Upload;
