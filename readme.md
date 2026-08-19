# BITS Backend

A RESTful backend API for a course management system built with Node.js, Express, MongoDB, and JWT-based authentication.

The project focuses on backend fundamentals such as authentication, role-based authorization, middleware design, protected routes, validation, and MongoDB data management.

---

## 🚀 Features

- JWT-based user authentication
- Secure login system
- Role-based authorization
  - Student
  - Professor
  - Admin
- Protected API routes
- Ownership-based authorization
- Course enrollment management
- Admin-controlled course operations
- User management
- MongoDB database integration
- Request validation
- Centralized error handling
- MVC-style project structure
- Environment-based configuration

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT (JSON Web Tokens)**
- **bcrypt**
- **Joi**
- **dotenv**

---

## 📁 Project Structure

```text
BITS-Backend/
│
├── Models/
│   ├── User.js
│   └── Course.js
│
├── controllers/
│   ├── authController.js
│   ├── userController.js
│   └── courseController.js
│
├── middlewares/
│   ├── verifyJWT.js
│   ├── allowRoles.js
│   ├── isOwnerOrAdmin.js
│   └── isOwner.js
│
├── routes/
│   ├── authRoutes.js
│   ├── userRoutes.js
│   └── courseRoutes.js
│
├── utils/
│   └── ExpressError.js
│
├── validators/
│   ├── ...
│
├── app.js
├── package.json
├── package-lock.json
└── .gitignore

---

## 🗄️ Database

This project uses **MongoDB** as the database and **Mongoose** as the ODM.

The backend uses Mongoose schemas and models to structure and manage application data.

### Main Models

#### User

The `User` model represents users of the system.

A user contains information such as:

- Name
- Email
- Password
- Role
- Enrolled courses

Users can have one of the following roles:

- `student`
- `professor`
- `admin`

#### Course

The `Course` model represents courses available in the system.

Courses are associated with professors and enrolled students.

---

## 🔄 API Request Flow

A protected request generally follows this flow:

```text
Client
  ↓
Express Router
  ↓
Authentication Middleware
  ↓
Authorization Middleware
  ↓
Request Validation
  ↓
Controller
  ↓
Mongoose
  ↓
MongoDB
  ↓
Response

---

## 🎓 Course Enrollment

Students can enroll themselves in courses through a protected endpoint.

The enrollment route uses both JWT authentication and an ownership check to ensure that a student can only enroll **themselves**.

### Enrollment Flow

```text
Student sends request
        ↓
JWT verification
        ↓
Identify authenticated user
        ↓
Ownership check
        ↓
Does authenticated user ID match the requested user ID?
        ↓
      YES
        ↓
Controller
        ↓
Enroll student in course

