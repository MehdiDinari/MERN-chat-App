import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import AuthImagePattern from "../components/AuthImagePattern";
import { Link } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare } from "lucide-react";
import "../styles/LoginPage.css";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    login(formData);
  };

  return (
    <div className="login-container">
      {/* Left Side - Form */}
      <div className="form-side">
        <div className="form-wrapper form-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-content">
              <div className="logo-icon-wrapper">
                <MessageSquare className="logo-icon" />
              </div>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Email</span>
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <Mail className="icon" />
                </div>
                <input
                  type="email"
                  className="form-input"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <Lock className="icon" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="icon" />
                  ) : (
                    <Eye className="icon" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="submit-button" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="icon spinner" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="signup-link-container">
            <p className="signup-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="signup-link">
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Image/Pattern */}
      <AuthImagePattern
        title={"Welcome back!"}
        subtitle={"Sign in to continue your conversations and catch up with your messages."}
      />
    </div>
  );
};

export default LoginPage;