# she-can-foundation
# She Can Foundation — Full Stack Contact Form

A full-stack web application for She Can Foundation built as part of the Full Stack Development Internship.

## Features

- **Contact Form** with name, email, message fields
- **Form Validation** (client-side + server-side)
- **Database Integration** — MongoDB via Mongoose
- **Authentication** — JWT-based admin login
- **Admin Panel** — View, mark as read, delete submissions
- **Responsive Design** — Mobile-friendly layout
- **REST API** — Express.js backend

## Tech Stack

| Layer    | Technology             |
|----------|------------------------|
| Frontend | React + Vite           |
| Backend  | Node.js + Express      |
| Database | MongoDB + Mongoose     |
| Auth     | JWT + bcryptjs         |
| Styling  | Custom CSS             |

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB running locally

### 1. Clone
```bash
git clone https://github.com/YOUR_USERNAME/she-can-foundation.git
cd she-can-foundation
```

### 2. Backend
```bash
cd server
npm install
# Edit .env with your MONGO_URI and JWT_SECRET
npm start
```

### 3. Seed Admin
Visit: `POST http://localhost:5000/api/auth/seed`
Or use Postman/Thunder Client. Credentials: **admin / shecan2024**

### 4. Frontend
```bash
cd client
npm install
npm run dev
```

### 5. Open
- App: http://localhost:5173
- Admin Login: http://localhost:5173/login

## API Endpoints

| Method | Endpoint              | Auth | Description           |
|--------|-----------------------|------|-----------------------|
| POST   | /api/contact          | No   | Submit contact form   |
| GET    | /api/contact          | Yes  | Get all submissions   |
| PATCH  | /api/contact/:id/read | Yes  | Mark as read          |
| DELETE | /api/contact/:id      | Yes  | Delete submission     |
| POST   | /api/auth/login       | No   | Admin login           |
| POST   | /api/auth/seed        | No   | Create default admin  |

## Made with 🌸 for She Can Foundation Internship