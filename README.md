# Resume Builder

A modern, full-stack resume builder application that helps users create professional resumes with integrated course progress tracking and achievements. Built with React, TypeScript, Node.js, Express, and MongoDB.

## ✨ Features

- 🔐 User authentication with JWT
- 📊 Dashboard for resume and course management
- 🎓 Course progress tracking and achievements
- 📝 Dynamic resume generation
- 🔄 Real-time updates and preview
- 📱 Responsive design for all devices

## 🚀 Tech Stack

### Frontend

- React 19 with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- React Router for navigation
- React Query for data fetching
- Radix UI components
- HTML2PDF for PDF generation

### Backend

- Node.js with Express
- MongoDB with Mongoose
- JWT for authentication
- Google Generative AI integration
- Morgan for HTTP request logging

## 🛠️ Project Structure

```
resume-builder/
├── backend/
│   ├── src/
│   │   ├── config/        # Configuration files
│   │   ├── controllers/   # Request handlers
│   │   ├── middleware/    # Custom middleware
│   │   ├── models/        # Database models
│   │   ├── routes/        # API routes
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── app.ts         # Express app configuration
│   │   └── server.ts      # Server entry point
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── assets/        # Static assets
│   │   ├── components/    # Reusable UI components
│   │   ├── context/       # React context providers
│   │   ├── hooks/         # Custom React hooks
│   │   ├── lib/           # Third-party library configurations
│   │   ├── middleware/    # Client-side middleware
│   │   ├── services/      # API service layer
│   │   ├── types/         # TypeScript type definitions
│   │   ├── utils/         # Utility functions
│   │   ├── App.tsx        # Main application component
│   │   └── main.tsx       # Application entry point
│   └── package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or pnpm (recommended)
- MongoDB Atlas account or local MongoDB instance
- Google Cloud account (for AI features)

### Setup Instructions

1. **Clone the repository**

   ```bash
   git clone https://github.com/KaranMali2001/resume-builder.git
   cd resume-builder
   ```

2. **Backend Setup**

   ```bash
   cd backend
   pnpm install  # or npm install

   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration
   ```

   Required environment variables for backend (`.env`):

   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   GOOGLE_API_KEY=your_google_ai_api_key
   ```

3. **Frontend Setup**

   ```bash
   cd ../frontend
   pnpm install  # or npm install

   # Create .env file
   cp .env.example .env
   # Edit .env with your configuration
   ```

   Required environment variables for frontend (`.env`):

   ```
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Running the Application**
   - Start the backend server:
     ```bash
     cd backend
     pnpm dev  # or npm run dev
     ```
   - Start the frontend development server:
     ```bash
     cd frontend
     pnpm dev  # or npm run dev
     ```
   - Open your browser and visit: `http://localhost:5173`

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

Contributions are welcome!

## License

This project is licensed under the MIT License.
