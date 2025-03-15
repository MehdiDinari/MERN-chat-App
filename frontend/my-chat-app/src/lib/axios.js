import axios from "axios";
import toast from "react-hot-toast";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/api",
  withCredentials: true,
});

// Add response interceptor for error handling and mock responses
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // No response from server (server not running or network error)
    if (!error.response) {
      console.log("Backend server not available, using mock data");
      
      const url = error.config.url;
      const method = error.config.method;
      
      // Handle auth/check endpoint
      if (url.includes('/auth/check')) {
        const user = JSON.parse(localStorage.getItem("chatty-user"));
        if (user) {
          return Promise.resolve({ data: user });
        }
        return Promise.reject({ message: "Not authenticated" });
      }
      
      // Handle auth/login endpoint
      if (url.includes('/auth/login') && method === 'post') {
        const requestData = JSON.parse(error.config.data);
        // Simple mock login (demo@example.com/password)
        if (requestData.email === "demo@example.com" && requestData.password === "password") {
          const mockUser = { 
            _id: "demo123", 
            username: "demo", 
            email: "demo@example.com" 
          };
          localStorage.setItem("chatty-user", JSON.stringify(mockUser));
          return Promise.resolve({ data: mockUser });
        }
        return Promise.reject({ 
          response: { data: { message: "Invalid credentials. Try demo@example.com/password" } }
        });
      }
      
      // Handle auth/signup endpoint
      if (url.includes('/auth/signup') && method === 'post') {
        const requestData = JSON.parse(error.config.data);
        const newUser = {
          _id: "user_" + Date.now(),
          ...requestData,
          createdAt: new Date().toISOString()
        };
        localStorage.setItem("chatty-user", JSON.stringify(newUser));
        return Promise.resolve({ data: newUser });
      }
      
      // Handle auth/logout endpoint
      if (url.includes('/auth/logout')) {
        localStorage.removeItem("chatty-user");
        return Promise.resolve({ data: { message: "Logged out successfully" } });
      }
      
      // Default mock response
      toast.error("Backend server unavailable - running in demo mode");
      return Promise.reject(error);
    }
    
    return Promise.reject(error);
  }
);