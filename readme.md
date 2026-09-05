## Live API

[https://bits-backend-mq00.onrender.com](https://bits-backend-mq00.onrender.com)

> This project is a backend-only REST API. Use Postman or another API client to interact with the endpoints.

# BITS Backend

A role-based backend API built with **Node.js, Express, and MongoDB** for managing users, courses, and course enrollments.

The project focuses on **JWT authentication, role-based authorization, ownership-based access control, and secure API design**.

## Features

- JWT-based authentication
- Role-based authorization
- Ownership-based access control
- Course creation and management
- Course enrollment and de-enrollment
- MongoDB data persistence
- Centralized error handling

## Authentication

- User registration and login
- Password hashing with **bcrypt**
- JWT-based authentication
- Protected routes using authentication middleware

## Authorization

- Role-based access control for **Student, Professor, and Admin**
- Protected routes based on user roles
- Ownership checks for user-specific actions
- Admin-only operations for privileged actions

## Ownership-Based Access Control

- Users can modify or access only their own resources.
- Admins can perform privileged actions across resources.
- Ownership checks are enforced through reusable middleware.

## Course Enrollment

- Students can enroll themselves in courses.
- Students can only modify their own enrollments.
- Admins can manage course enrollments.
- Enrollment access is protected through authentication and authorization middleware.

## Middleware Architecture

- Reusable middleware for authentication and authorization
- Role-based access control through `allowRoles`
- Ownership validation through dedicated middleware
- Centralized error-handling middleware

## API Request Flow

Client → Express Server → Middleware → Route → Controller → MongoDB → Response

- Authentication and authorization are handled through middleware.
- Controllers handle business logic and database operations.
- Errors are handled by centralized error-handling middleware.

## Database & Data Models

- MongoDB is used for persistent data storage.
- Mongoose is used for schema definition and database operations.
- Core data models include **Users, Courses, and Enrollments**.

## API Endpoints

- User authentication and account management
- User profile operations
- Course creation and management
- Course enrollment and de-enrollment
- Protected endpoints based on role and ownership

## Error Handling

- Centralized error-handling middleware
- Custom `ExpressError` for consistent API errors
- Validation and database errors are handled through the same error flow

## Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **Mongoose**
- **JWT**
- **bcrypt**
- **Joi**

## Project Structure

- `routes/` — API route definitions
- `controllers/` — Business logic
- `models/` — Mongoose schemas
- `middleware/` — Authentication, authorization, and validation
- `app.js` — Application entry point

## Environment Variables

Create a `.env` file in the project root:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=6000
```

## Installation & Local Setup

```bash
git clone https://github.com/nikhildevx/BITS-Backend.git
cd BITS-Backend
npm install
npm start
```

## API Testing

The API can be tested using **Postman**.

Test the main authentication, user, course, enrollment, authorization, and ownership flows to verify the API behavior.

## Security

- Passwords are securely hashed using **bcrypt**.
- JWTs are used to protect authenticated routes.
- Role and ownership checks prevent unauthorized access.
- Sensitive environment variables are excluded from version control.

## Project Goals

This project demonstrates practical backend development concepts including:

- RESTful API development
- Authentication and authorization
- Role-based access control
- Ownership-based security
- Database integration
- Middleware-based architecture

## Author

**Nikhil Kumar**

Backend developer focused on building secure and scalable web applications.
