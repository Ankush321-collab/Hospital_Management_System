# 🏥 Hospital Management System

A comprehensive full-stack hospital management system built with React, Node.js, and MongoDB. The system consists of three main applications: a public-facing frontend for patients, an admin dashboard for hospital staff, and a robust backend API.

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [API Documentation](#-api-documentation)
- [Installation & Setup](#-installation--setup)
- [Environment Variables](#-environment-variables)
- [Usage](#-usage)
- [Features Breakdown](#-features-breakdown)
- [Contributing](#-contributing)

## ✨ Features

### 🎯 Core Features
- **Multi-role Authentication** (Patient, Doctor, Admin)
- **Appointment Management** - Schedule, view, and manage appointments
- **Doctor Management** - Add, view, and manage doctor profiles
- **Patient Communication** - Contact form and messaging system
- **Admin Dashboard** - Comprehensive admin panel with analytics
- **Real-time Activity Feed** - Track system activities
- **File Upload** - Doctor avatar uploads with Cloudinary
- **Responsive Design** - Works on all devices
- **Dark/Light Mode** - Theme switching across all applications

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control
- Secure password hashing with bcrypt
- Session management with cookies

### 📊 Admin Dashboard Features
- Real-time statistics (doctors, appointments, messages, admins)
- Doctor management (add, view, delete)
- Message management (view, mark as read, delete)
- Activity logging and monitoring
- Admin user management
- Responsive sidebar navigation

### 🏥 Patient Features
- Browse departments and doctors
- Schedule appointments
- Contact hospital via message form
- View appointment history

## 🏗️ Architecture

```
Hospital Management System
├── Frontend/          # Public patient-facing application
├── Dashboards/        # Admin dashboard application  
└── Backend/           # RESTful API server
```

### System Flow
1. **Patients** use the Frontend to browse doctors, schedule appointments, and send messages
2. **Admins** use the Dashboard to manage doctors, view appointments, handle messages, and monitor system activity
3. **Backend API** handles all business logic, authentication, and data persistence

## 🛠️ Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT + bcrypt
- **File Upload**: Cloudinary + express-fileupload
- **Validation**: validator.js
- **CORS**: Cross-origin resource sharing enabled

### Frontend (Public)
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS + DaisyUI
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **Animations**: Framer Motion
- **UI Components**: React Icons, Lucide React
- **Notifications**: React Toastify

### Dashboard (Admin)
- **Framework**: React 19 with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Routing**: React Router DOM
- **HTTP Client**: Axios
- **UI Components**: React Icons
- **Notifications**: React Toastify

## 📁 Project Structure

```
Hospital_management_sysytem/
├── Backend/
│   ├── controller/           # Business logic handlers
│   │   ├── User.controller.js
│   │   ├── appointment.controller.js
│   │   ├── message.controller.js
│   │   └── activity.controller.js
│   ├── model/               # MongoDB schemas
│   │   ├── UserSchema.js
│   │   ├── appointmentSchema.js
│   │   ├── message.schema.js
│   │   └── activity.schema.js
│   ├── route/               # API route definitions
│   │   ├── user.route.js
│   │   ├── appointment.route.js
│   │   ├── message.route.js
│   │   └── activity.route.js
│   ├── middleware/          # Custom middleware
│   │   ├── auth.js
│   │   ├── error.js
│   │   └── catchasyncerror.js
│   ├── utils/              # Utility functions
│   │   └── jwtToken.js
│   ├── database/           # Database connection
│   │   └── dbConnection.js
│   ├── app.js             # Express app configuration
│   ├── server.js          # Server entry point
│   └── package.json
├── Frontend/              # Patient-facing application
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/        # Page components
│   │   └── assets/       # Static assets
│   └── package.json
├── Dashboards/           # Admin dashboard application
│   ├── src/
│   │   ├── Components/   # Dashboard components
│   │   └── main.jsx      # App entry point
│   └── package.json
└── README.md
```

## 🔌 API Documentation

### Base URL
```
http://localhost:5002
```

### Authentication Endpoints

#### User Registration & Login
```http
POST /api/signup
POST /api/login
```

#### Admin Management
```http
POST /api/addadmin          # Add new admin (Admin only)
GET /api/alladmins          # Get all admins (Admin only)
POST /api/admin/logout      # Admin logout (Admin only)
```

#### Doctor Management
```http
POST /api/adddoctor         # Add new doctor (Admin only)
GET /api/alldoctors         # Get all doctors (Public)
DELETE /api/doctor/:id      # Delete doctor (Admin only)
```

#### User Profile
```http
GET /api/patient/me         # Get patient profile (Patient only)
GET /api/admin/me           # Get admin profile (Admin only)
GET /api/doctor/me          # Get doctor profile (Doctor only)
```

### Appointment Endpoints

```http
POST /api/appointment       # Schedule appointment (Patient only)
GET /api/getallappointment  # Get all appointments (Admin only)
PUT /api/updateappointmnet/:id    # Update appointment (Admin only)
DELETE /api/deleteappointment/:id # Delete appointment (Admin only)
```

### Message Endpoints

```http
POST /api/v1/message/send           # Send message (Public)
GET /api/v1/message/getallmessage   # Get all messages (Admin only)
DELETE /api/v1/message/message/:id  # Delete message (Admin only)
PATCH /api/v1/message/message/:id/read  # Mark as read (Admin only)
```

### Activity Endpoints

```http
GET /api/v1/activity/recent  # Get recent activities (Admin only)
```

### Request/Response Examples

#### Login Request
```json
{
  "email": "admin@hospital.com",
  "password": "password123",
  "role": "Admin"
}
```

#### Login Response
```json
{
  "success": true,
  "message": "Login successful",
  "user": {
    "firstName": "John",
    "lastName": "Doe",
    "email": "admin@hospital.com",
    "role": "Admin"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Appointment Request
```json
{
  "firstName": "Jane",
  "lastName": "Smith",
  "email": "jane@email.com",
  "phone": "1234567890",
  "aadhar": "1234567890123",
  "dob": "1990-01-01",
  "gender": "Female",
  "appointment_date": "2024-01-15",
  "department": "cardiology",
  "doctor": {
    "firstName": "Dr. John",
    "lastName": "Cardiologist"
  },
  "address": "123 Main St, City",
  "doctorId": "507f1f77bcf86cd799439011"
}
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd Hospital_management_sysytem
```

### 2. Backend Setup
```bash
cd Backend
npm install
```

### 3. Frontend Setup
```bash
cd Frontend
npm install
```

### 4. Dashboard Setup
```bash
cd Dashboards
npm install
```

### 5. Environment Configuration
Create `.env` files in the Backend directory with the required environment variables (see Environment Variables section).

### 6. Start the Applications

#### Start Backend (Terminal 1)
```bash
cd Backend
npm start
# or for development
npm run dev
```

#### Start Frontend (Terminal 2)
```bash
cd Frontend
npm run dev
```

#### Start Dashboard (Terminal 3)
```bash
cd Dashboards
npm run dev
```

## 🔧 Environment Variables

Create a `.env` file in the Backend directory:

```env
# Server Configuration
PORT=5002
NODE_ENV=development

# Database
MONGODB_URI=mongodb://localhost:27017/hospital_management
# or for MongoDB Atlas
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hospital_management

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret_key_here
JWT_EXPIRES=7d

# Cloudinary Configuration (for file uploads)
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret

# CORS Origins
FRONTED_URL=http://localhost:5173
DASHBOARD_URL=http://localhost:5174

# Optional: Cookie Settings
COOKIE_EXPIRES=7
```

## 📱 Usage

### For Patients (Frontend - http://localhost:5173)
1. **Browse Departments** - View available medical departments
2. **Find Doctors** - Browse doctors by department
3. **Schedule Appointments** - Book appointments with preferred doctors
4. **Contact Hospital** - Send messages through the contact form
5. **View Information** - Access hospital information and services

### For Admins (Dashboard - http://localhost:5174)
1. **Login** - Access admin dashboard with credentials
2. **Dashboard Overview** - View real-time statistics and recent activities
3. **Manage Doctors** - Add, view, and delete doctor profiles
4. **Handle Messages** - View, mark as read, and delete patient messages
5. **Monitor Appointments** - View and manage all appointments
6. **Add Admins** - Create new admin accounts
7. **Theme Toggle** - Switch between light and dark modes

## 🔍 Features Breakdown

### Authentication System
- **Multi-role Support**: Patient, Doctor, Admin roles with different permissions
- **JWT Tokens**: Secure authentication with JSON Web Tokens
- **Password Security**: Bcrypt hashing for password protection
- **Session Management**: Cookie-based session handling

### Appointment Management
- **Scheduling**: Patients can book appointments with specific doctors
- **Validation**: Comprehensive form validation for all fields
- **Status Tracking**: Pending, Accepted, Rejected status management
- **Admin Control**: Admins can view, update, and delete appointments

### Doctor Management
- **Profile Creation**: Admins can add new doctors with detailed information
- **Department Assignment**: Doctors are assigned to specific departments
- **Avatar Upload**: Cloudinary integration for doctor profile pictures
- **Profile Management**: View and delete doctor profiles

### Communication System
- **Contact Form**: Public contact form for patient inquiries
- **Message Management**: Admin can view, mark as read, and delete messages
- **Time-based Deletion**: Messages can only be deleted within 24 hours
- **Read Status**: Track which messages have been read

### Activity Logging
- **Real-time Tracking**: Log all system activities
- **Activity Types**: Doctor added/deleted, appointments scheduled, messages received
- **Dashboard Integration**: Display recent activities in admin dashboard

### UI/UX Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark/Light Mode**: Theme switching with persistent preferences
- **Modern UI**: Clean, professional interface with smooth animations
- **Loading States**: Proper loading indicators throughout the application
- **Error Handling**: User-friendly error messages and notifications

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Ankush** - *Initial work*

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first CSS framework
- MongoDB team for the database solution
- Express.js team for the web framework
- All contributors and users of this system

---

**Note**: This is a comprehensive hospital management system designed for educational and demonstration purposes. For production use, additional security measures, testing, and compliance with healthcare regulations should be implemented. 