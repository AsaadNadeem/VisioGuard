# 🛡️ VisioGuard

**VisioGuard** is an AI-powered Content Moderation Platform that automatically analyzes uploaded images for inappropriate or unsafe content. It leverages the **Sightengine AI Moderation API** to detect nudity, weapons, and graphic violence, stores moderation results in MongoDB, and provides a clean dashboard for reviewing uploaded images.

---

## 📖 Overview

Every day, thousands of images are uploaded to online platforms. Manually reviewing them is slow and impractical.

VisioGuard automates this process by:

- Uploading images securely
- Storing images on Cloudinary
- Scanning images using AI
- Calculating moderation scores
- Displaying results in a responsive dashboard

The project demonstrates a complete MERN stack application integrated with third-party cloud services and AI moderation.

---

# ✨ Features

## 🔐 Authentication

- User Registration
- Email Verification using OTP
- Google Sign-In
- Secure Login
- Password Hashing using bcrypt
- JWT Authentication
- Protected Routes

---

## 🖼 Image Moderation

- Upload Images
- Cloudinary Image Storage
- AI Content Moderation
- Nudity Detection
- Weapon Detection
- Gore Detection
- Moderation Score Calculation

---

## 📊 Dashboard

- Responsive Gallery
- Moderation Score Progress Bars
- Safety Status
- Image Preview
- User Information
- Download Images
- Save Images
- Modern Card Design

---

## 👤 User Profile

- Profile Information
- Uploaded Images
- Saved Images

---

## 🎨 UI

- Responsive Design
- Bootstrap 5
- React Bootstrap Components
- Modern Layout
- Mobile Friendly

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router
- Axios
- React Bootstrap
- Bootstrap 5

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcrypt
- Multer
- Nodemailer

---

## Cloud Services

- Cloudinary
- Sightengine API
- Google OAuth

---

# 📁 Project Structure

```
VisioGuard
│
├── client
│   ├── public
│   ├── src
│   │   ├── assets
│   │   ├── components
│   │   ├── pages
│   │   ├── App.jsx
│   │   └── index.js
│   │
│   └── package.json
│
├── server
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── utils
│   ├── config
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

# ⚙ Installation

## 1. Clone Repository

```bash
git clone https://github.com/AsaadNadeem/VisioGuard.git

cd VisioGuard
```

---

## 2. Install Dependencies

### Backend

```bash
cd server

npm install
```

### Frontend

```bash
cd client

npm install
```

---

# 🔑 Environment Variables

## Backend (.env)

```env
PORT=5000

MONGO_URI=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

SIGHTENGINE_USER=
SIGHTENGINE_SECRET=

EMAIL_USER=
EMAIL_PASS=

GOOGLE_CLIENT_ID=

FRONTEND_URL=http://localhost:3000
```

---

## Frontend (.env)

```env
REACT_APP_BACKEND_API=http://localhost:5000

REACT_APP_GOOGLE_CLIENT_ID=
```

---

# ▶ Running the Project

## Backend

```bash
cd server

npm start
```

---

## Frontend

```bash
cd client

npm start
```

Frontend runs on

```
http://localhost:3000
```

Backend runs on

```
http://localhost:5000
```

---

# 🔄 Application Workflow

```
User
   │
   ▼
Login / Register
   │
   ▼
Upload Image
   │
   ▼
Cloudinary Upload
   │
   ▼
Sightengine Analysis
   │
   ▼
Store Result in MongoDB
   │
   ▼
Display Moderation Dashboard
```

---


# 🔒 Security

- Passwords are hashed using bcrypt.
- JWT-based authentication.
- Email verification before account creation.
- Protected API routes.
- Environment variables for sensitive credentials.

---

# 🚀 Future Improvements

- Admin Dashboard
- Appeal System
- Real-Time Notifications
- Image Search
- Dark Mode
- Analytics Dashboard

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a new branch.

```bash
git checkout -b feature-name
```

3. Commit your changes.

```bash
git commit -m "Added new feature"
```

4. Push to GitHub.

```bash
git push origin feature-name
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Asaad Nadeem**

MERN Stack Developer

GitHub:
https://github.com/AsaadNadeem

LinkedIn:
https://linkedin.com/in/asaadnadeem686