# MERN Image Moderation App

Simple MERN-stack project for uploading images, storing them in Cloudinary, and running automated content moderation (nudity, weapons, gore) before saving metadata to MongoDB.

## Features
- Image upload endpoint with Cloudinary storage
- Automated moderation using Sightengine
- MongoDB persistence for users and moderation results
- Minimal React frontend for login/signup and upload UI

## Repo structure
- `backend/` — Express API, routes, middleware, and utilities
- `frontend/` — React app (create-react-app)
- `uploads/` — (local uploads; ignored in git)

## Prerequisites
- Node.js (16+ recommended)
- npm
- A MongoDB instance (URI)
- Cloudinary account (for image storage)
- Sightengine account (for content moderation)

## Environment variables
Create a `.env` file in `backend/` containing at least:

- `MONGO_URI` — MongoDB connection string
- `PORT` — server port (e.g. 5000)
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `SIGHTENGINE_USER` — Sightengine user
- `SIGHTENGINE_SECRET` — Sightengine secret

### Environment sample files
This repo includes sample environment files for convenience:

- `backend/.envSample` — copy to `backend/.env` and populate real values.
- `frontend/.envSample` — copy to `frontend/.env` and update the `REACT_APP_*` values.

Example commands (from repository root):

```bash
cp backend/.envSample backend/.env
cp frontend/.envSample frontend/.env
```

Notes for the frontend:
- Create-React-App requires client env vars to be prefixed with `REACT_APP_`.
- `REACT_APP_API_URL` should point to your backend (e.g. `http://localhost:5000`).

## Quick start

Backend
```bash
cd backend
npm install
npm start
```

Frontend
```bash
cd frontend
npm install
npm start
```

The backend exposes routes under `/api` and `/users`. The server uses Cloudinary to upload images and Sightengine to evaluate them; moderation results are attached to requests before being saved.

## Notes
- Local `backend/uploads` is ignored by default; files are uploaded to Cloudinary.
- The backend expects `express.json()` body parsing and `cors` to be enabled (already configured).
- If `nodemon` start script fails, run `node index.js` from the `backend` folder.

## License
MIT
# MERN Image Moderation App

Simple MERN-stack project for uploading images, storing them in Cloudinary, and running automated content moderation (nudity, weapons, gore) before saving metadata to MongoDB.

## Features
- Image upload endpoint with Cloudinary storage
- Automated moderation using Sightengine
- MongoDB persistence for users and moderation results
- Minimal React frontend for login/signup and upload UI

## Repo structure
- `backend/` — Express API, routes, middleware, and utilities
- `frontend/` — React app (create-react-app)
- `uploads/` — (local uploads; ignored in git)

## Prerequisites
- Node.js (16+ recommended)
- npm
- A MongoDB instance (URI)
- Cloudinary account (for image storage)
- Sightengine account (for content moderation)

## Environment variables
Create a `.env` file in `backend/` containing at least:

- `MONGO_URI` — MongoDB connection string
- `PORT` — server port (e.g. 5000)
- `CLOUDINARY_CLOUD_NAME` — Cloudinary cloud name
- `CLOUDINARY_API_KEY` — Cloudinary API key
- `CLOUDINARY_API_SECRET` — Cloudinary API secret
- `SIGHTENGINE_USER` — Sightengine user
- `SIGHTENGINE_SECRET` — Sightengine secret

## Quick start

Backend
```bash
cd backend
npm install
npm start
```

Frontend
```bash
cd frontend
npm install
npm start
```

The backend exposes routes under `/api` and `/users`. The server uses Cloudinary to upload images and Sightengine to evaluate them; moderation results are attached to requests before being saved.

## Notes
- Local `backend/uploads` is ignored by default; files are uploaded to Cloudinary.
- The backend expects `express.json()` body parsing and `cors` to be enabled (already configured).
- If `nodemon` start script fails, run `node index.js` from the `backend` folder.

## License
MIT
