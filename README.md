# WayHeaven

A full-stack accommodation rental platform inspired by Airbnb, built with Node.js, Express.js, MongoDB, EJS, Passport.js, Cloudinary and Mapbox.

## Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/d485d6e1-0d5e-49e1-99d5-913cd05a4a87" width="49%" />
  <img src="https://github.com/user-attachments/assets/2d22fd18-0bea-4318-98f4-8f6b28e8562f" width="49%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/4bd52bcd-b4e8-44ee-9995-54a25c448265" width="49%" />
  <img src="https://github.com/user-attachments/assets/9a911d14-25fc-416c-a6b1-c5cbe8c4aa64" width="49%" />
</p>

## Features

- User registration, login and logout
- Session-based authentication with Passport.js
- Create, view, edit and delete property listings
- Listing ownership and authorization
- Image uploads using Cloudinary
- Interactive maps and location geocoding using Mapbox
- Search and category-based filtering
- User reviews with 1–5 star ratings
- Server-side validation using Joi
- Flash messages for user feedback
- Responsive interface using Bootstrap
- MongoDB database integration with Mongoose
- Centralized Express error handling

## Tech Stack

**Frontend:** EJS, HTML, CSS, JavaScript, Bootstrap

**Backend:** Node.js, Express.js

**Database:** MongoDB, Mongoose

**Authentication:** Passport.js, Express Session, Connect-Mongo

**Services:** Cloudinary, Mapbox

**Other:** Joi, Multer, EJS Mate, Method Override, Connect Flash

## Project Structure

```text
WayHeaven/
├── controllers/
├── init/
├── models/
├── public/
├── routes/
├── utils/
├── views/
├── .env.example
├── .gitignore
├── app.js
├── cloudConfig.js
├── middleware.js
├── schema.js
├── package.json
└── package-lock.json
```

## Getting Started

### Prerequisites

- Node.js
- MongoDB or MongoDB Atlas
- Cloudinary account
- Mapbox access token

### Installation

Clone the repository:

```bash
git clone https://github.com/lakshyajaiswal63/WayHeaven.git
cd WayHeaven
```

Install the dependencies:

```bash
npm install
```

Create a `.env` file in the project root using `.env.example` as a reference:

```env
CLOUD_NAME=
CLOUD_API_KEY=
CLOUD_API_SECRET=
MAP_TOKEN=
ATLASDB_URL=
SECRET=
```

Add your own credentials and API keys to the `.env` file.

Start the application:

```bash
npm start
```

The application will run at:

```text
http://localhost:8080
```

## Environment Variables

| Variable | Purpose |
|---|---|
| `ATLASDB_URL` | MongoDB connection string |
| `SECRET` | Express session secret |
| `CLOUD_NAME` | Cloudinary cloud name |
| `CLOUD_API_KEY` | Cloudinary API key |
| `CLOUD_API_SECRET` | Cloudinary API secret |
| `MAP_TOKEN` | Mapbox access token |

Never commit the `.env` file or any credentials to the repository.

## Author

**Lakshya Jaiswal**  
B.Tech Computer Science & Engineering
