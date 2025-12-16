Trail Connect

📋 Overview
A full-stack application for trekking guides to upload and verify their professional licenses, with secure file handling and admin review capabilities.

🏗️ Project Structure
text
trekking-guide-license-system/
├── frontend/ # React + TypeScript frontend
│ ├── src/
│ │ ├── components/ # Reusable UI components
│ │ ├── pages/ # Page components
│ │ ├── lib/ # Utilities and API clients
│ │ └── types/ # TypeScript definitions
│ └── package.json
├── backend/ # Node.js + Express backend
│ ├── src/
│ │ ├── controllers/ # Request handlers
│ │ ├── middleware/ # Auth and validation middleware
│ │ ├── models/ # Database models
│ │ ├── routes/ # API routes
│ │ └── utils/ # Helper functions
│ └── package.json
└── README.md
✨ Features
Frontend
🎨 Modern UI with Tailwind CSS for responsive design

📁 Drag-and-drop file upload with visual feedback

✅ Real-time validation for file types (JPG, PNG, PDF) and size (≤10MB)

📱 Mobile-responsive design

🚦 Loading states and error handling

🔐 Secure authentication flow

📊 Admin dashboard for license review

Backend
🔒 JWT authentication with role-based access control

📁 Secure file upload with Multer middleware

🗄️ MongoDB integration for data persistence

📧 Email notifications for verification status

✅ File validation and virus scanning

📄 PDF processing capabilities

🛡️ Rate limiting and security headers

🐳 Docker support for easy deployment

🚀 Quick Start
Prerequisites
Node.js 18+ and npm

MongoDB 6.0+

(Optional) Docker and Docker Compose

Option 1: Using Docker (Recommended)
bash

# Clone the repository

git clone https://github.com/yourusername/trekking-guide-license-system.git
cd trekking-guide-license-system

# Copy environment files

cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env

# Start with Docker Compose

docker-compose up -d

# Access the application

# Frontend: http://localhost:3000

# Backend API: http://localhost:5000

# MongoDB: localhost:27017

Option 2: Manual Setup
Backend Setup
bash

# Navigate to backend directory

cd backend

# Install dependencies

npm install

# Set up environment variables

cp .env.example .env

# Edit .env with your configuration

# Start MongoDB (if not running)

# For macOS with Homebrew:

brew services start mongodb-community

# For Ubuntu/Debian:

sudo systemctl start mongod

# Start the backend server

npm run dev

# Server runs on http://localhost:5000

Frontend Setup
bash

# Navigate to frontend directory

cd frontend

# Install dependencies

npm install

# Set up environment variables

cp .env.example .env

# Edit .env with your API URL

# Start the development server

npm run dev

# Application runs on http://localhost:3000

🔧 Configuration
Backend Environment Variables
Create a .env file in the backend directory:

env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/trekking_licenses
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRY=7d
FILE_UPLOAD_PATH=./uploads
MAX_FILE_SIZE=10485760 # 10MB in bytes
ALLOWED_FILE_TYPES=image/jpeg,image/png,application/pdf
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
Frontend Environment Variables
Create a .env file in the frontend directory:

env
VITE_API_BASE_URL=http://localhost:5000/api
VITE_APP_NAME=Trekking Guide License System
VITE_MAX_FILE_SIZE=10485760
VITE_ALLOWED_FILE_TYPES=.jpg,.jpeg,.png,.pdf
📁 File Upload Component
The core file upload component provides:

tsx
// Key features of the LicenseUpload component
<LicenseUpload
onFileSelect={(file) => handleFileUpload(file)}
required={true}
maxSize={10 _ 1024 _ 1024} // 10MB
allowedTypes={['image/jpeg', 'image/png', 'application/pdf']}
/>
Features:
Visual Feedback: Shows selected file name and upload progress

Validation: Client-side validation for file type and size

Accessibility: Keyboard navigation and screen reader support

Error Handling: Clear error messages for invalid files

Drag-and-Drop: (Optional) Enhanced with dropzone functionality

📡 API Endpoints
Authentication
POST /api/auth/register - Register new user

POST /api/auth/login - User login

POST /api/auth/logout - User logout

GET /api/auth/me - Get current user

License Operations
POST /api/licenses/upload - Upload license document

GET /api/licenses/my-licenses - Get user's licenses

GET /api/licenses/:id - Get specific license

PUT /api/licenses/:id/status - Update license status (Admin only)

GET /api/licenses - Get all licenses (Admin only)

File Operations
GET /api/files/:filename - Download file

DELETE /api/files/:filename - Delete file (Admin only)

🗄️ Database Schema
User Model
javascript
{
username: String,
email: String,
passwordHash: String,
role: ['guide', 'admin'],
isVerified: Boolean,
createdAt: Date
}
License Model
javascript
{
userId: ObjectId,
fileName: String,
originalName: String,
fileType: String,
fileSize: Number,
status: ['pending', 'approved', 'rejected'],
reviewNotes: String,
reviewedBy: ObjectId,
reviewedAt: Date,
expiresAt: Date,
createdAt: Date
}
🧪 Testing
Backend Tests
bash
cd backend
npm test # Run all tests
npm run test:watch # Run tests in watch mode
npm run test:coverage # Generate test coverage report
Frontend Tests
bash
cd frontend
npm test # Run all tests
npm run test:ui # Run UI tests
🐳 Docker Deployment
Production Deployment
bash

# Build and run production containers

docker-compose -f docker-compose.prod.yml up -d

# View logs

docker-compose logs -f

# Stop containers

docker-compose down
Docker Compose Configuration
yaml
version: '3.8'
services:
mongodb:
image: mongo:6
volumes: - mongo_data:/data/db

backend:
build: ./backend
environment: - MONGODB_URI=mongodb://mongodb:27017/trekking_licenses - NODE_ENV=production
depends_on: - mongodb

frontend:
build: ./frontend
depends_on: - backend

nginx:
image: nginx:alpine
ports: - "80:80"
volumes: - ./nginx.conf:/etc/nginx/nginx.conf
🔐 Security Features
Backend Security
Helmet.js for security headers

CORS configuration

Rate limiting with express-rate-limit

Input validation with Joi

Password hashing with bcrypt

JWT token-based authentication

File upload restrictions and validation

Frontend Security
Environment variable protection

XSS prevention

Secure API calls

Token storage in HTTP-only cookies

📱 Responsive Design
The application is fully responsive with breakpoints:

Mobile: < 640px

Tablet: 640px - 1024px

Desktop: > 1024px

🎨 UI Components
Core Components
Button - Reusable button with variants

Card - Content container

Input - Form input field

Alert - Notification messages

Modal - Dialog windows

Table - Data tables with pagination

Feature Components
LicenseUpload - File upload with validation

LicenseList - Display user's licenses

AdminDashboard - Admin review interface

StatusBadge - License status indicators

🔄 State Management
React Context for authentication state

React Query for server state management

Local State for component-specific state

Zustand (optional) for complex state management

📈 Performance Optimization
Frontend
Code splitting with React.lazy()

Image optimization

Bundle size optimization

Memoization with React.memo and useMemo

Backend
Database indexing

Query optimization

Caching with Redis (optional)

Connection pooling

🚀 Deployment
Vercel (Frontend)
bash

# Install Vercel CLI

npm i -g vercel

# Deploy

cd frontend
vercel --prod
Railway/Heroku (Backend)
bash

# Railway

railway up

# Heroku

heroku create trekking-guide-backend
git push heroku main
Manual Deployment
Build frontend: npm run build

Serve with Nginx

Set up PM2 for backend

Configure SSL with Let's Encrypt

📚 Additional Documentation
API Documentation

Frontend Component Library

Deployment Guide

Testing Guide

Contributing Guidelines

🤝 Contributing
Fork the repository

Create a feature branch

Commit your changes

Push to the branch

Open a Pull Request

📄 License
This project is licensed under the MIT License - see the LICENSE file for details.

🆘 Support
For support, email support@example.com or open an issue in the GitHub repository.

🙏 Acknowledgments
Icons by Lucide React

UI components inspired by shadcn/ui

Backend structure from Express Generator

Made with ❤️ for the trekking community
