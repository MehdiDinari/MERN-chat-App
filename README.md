# Chatty - Modern React Chat Application

<div align="center">
  

[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![Custom CSS](https://img.shields.io/badge/CSS-Custom-ff69b4.svg)]()
[![Socket.IO](https://img.shields.io/badge/Socket.IO-4.x-black.svg)](https://socket.io/)

**Chatty** is a modern, real-time chat application built with React and custom CSS, designed for fluid conversations and a sleek user experience.

[View Demo](https://mern-chat-app-itvl.onrender.com) · 

</div>

## ✨ Features

- **Real-time Messaging** - Instant message delivery powered by Socket.IO
- **User Authentication** - Secure signup, login, and session management
- **Profile Management** - Customizable user profiles with photo uploads
- **Theme Customization** - Multiple themes with light/dark mode support
- **Responsive Design** - Works seamlessly on desktop and mobile devices
- **Message Status Indicators** - Know when messages are delivered and read
- **Online Status** - See which users are currently active
- **Custom CSS Architecture** - No framework dependencies, just clean custom CSS


## 🚀 Getting Started

### Prerequisites

- Node.js (v16.x or later)
- npm or yarn
- MongoDB (or compatible database)

### Installation

1. Clone the repository
   ```sh
   git clone https://github.com/yourusername/chatty.git
   cd chatty
   ```

2. Install dependencies for frontend and backend
   ```sh
   # Install frontend dependencies
   cd frontend/my-chat-app
   npm install

   # Install backend dependencies
   cd ../../backend
   npm install
   ```

3. Environment Setup
   ```sh
   # In the backend directory, create a .env file
   touch .env
   ```
   
   Add the following environment variables:
   ```
   PORT=5001
   MONGODB_URI=mongodb://localhost:27017/chatty
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers
   ```sh
   # Start backend server
   cd backend
   npm run dev

   # In a new terminal, start frontend
   cd frontend/my-chat-app
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5173`


## 🎨 CSS Architecture

Chatty uses a custom CSS architecture with:

- **Global Variables** - Centralized theme variables for colors, spacing, etc.
- **Component-Specific Styles** - Modular CSS organization by component
- **Responsive Design** - Mobile-first approach with appropriate breakpoints
- **Dark/Light Mode** - Automatic theme switching based on user preference
- **Animation System** - Consistent animations for interactive elements

## 🔧 Tech Stack

- **Frontend**
  - React (Hooks, Context)
  - Custom CSS (no frameworks)
  - Socket.IO Client
  - Zustand (State Management)
  - React Router

- **Backend**
  - Node.js
  - Express
  - MongoDB
  - Socket.IO
  - JSON Web Tokens (JWT)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

<div align="center">

Made with ❤️ by [LaFrime](https://www.linkedin.com/in/mehdi-dinari-b0487a2a9/)

</div>
