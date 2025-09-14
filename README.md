# Land237 Backend

A **Node.js + Express backend** for the Land237 Real Estate project, with **MongoDB**, **JWT authentication**, **property management**, **favorites/bookmarks**, **role-based access**, **image uploads**, and **search/filter/pagination**.  

---

## Table of Contents

- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Getting Started](#getting-started)  
- [Folder Structure](#folder-structure)  
- [Environment Variables](#environment-variables)  
- [Scripts](#scripts)  
- [API Documentation](#api-documentation)  
- [Testing](#testing)  
- [CI/CD](#cicd)  
- [Notes](#notes)  

---

## Features

- User authentication: **register/login/logout**  
- Role-based access: `user` and `admin`  
- Property management: **CRUD operations**  
- Image uploads for properties using **Multer**  
- Favorites/bookmarks for users  
- Search, filter, and pagination for property listings  
- JWT authentication for protected routes  
- Swagger API documentation  
- Error handling and input validation  

---

## Tech Stack

- **Node.js**  
- **Express.js**  
- **MongoDB** with **Mongoose**  
- **JWT** for authentication  
- **Multer** for file uploads  
- **bcrypt** for password hashing  
- **Swagger** for API docs  
- **Jest + Supertest** for testing  

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/Beven-Awusa/land237-backend.git
cd land237-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup environment variables

Create a `.env` file in the root:

```
PORT=5000
MONGO_URI=your_mongodb_atlas_connection_string
JWT_SECRET=your_super_secret_key
NODE_ENV=development
```

### 4. Start the development server

```bash
npm run dev
```

- Server runs on `http://localhost:5000`  
- Access Swagger docs at `http://localhost:5000/api/docs`  

---

## Folder Structure

```
src/
├─ controllers/       # Route handlers
├─ middlewares/       # Auth, role, error handling
├─ models/            # Mongoose schemas
├─ routes/            # Express routes
├─ utils/             # Multer config, helpers
├─ app.js             # Express app
├─ index.js           # Server entry point
├─ swagger.js         # Swagger config
```

---

## Environment Variables

| Variable    | Description                          |
|------------|--------------------------------------|
| PORT       | Port number the server runs on        |
| MONGO_URI  | MongoDB Atlas connection URI          |
| JWT_SECRET | Secret key for signing JWTs          |
| NODE_ENV   | `development` or `production`        |

---

## Scripts

```bash
npm run dev     # Run server in development mode
npm start       # Run server in production
npm run lint    # Lint the codebase
npm test        # Run unit tests
```

---

## API Documentation

- Swagger docs available at:  
`http://localhost:5000/api/docs`  
- Includes all routes: **auth, properties, favorites**  

---

## Testing

- Tests use **Jest + Supertest + mongodb-memory-server**  
- Run tests:

```bash
npm test
```

- Tests cover:  
  - Auth routes  
  - Property CRUD  
  - Favorites/bookmarks  
  - Role-based access  

---

## CI/CD

- Uses **GitHub Actions** to automatically:  
  - Lint code  
  - Run tests  
  - Deploy backend (Render/Heroku/Railway) but still not ready or approved yet
- Secrets must be set in GitHub: `JWT_SECRET`, `MONGO_URI`, `RENDER_API_KEY`, `RENDER_SERVICE_ID`  

---

## Notes

- Uploaded images are stored in `/uploads/properties`  
- Only authenticated users can create/update properties  
- Only property owners or admins can delete/update properties  
- Search, filter, and pagination available via query params  

