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
      <div className="login-form-container">
        <div className="login-form-wrapper login-space-y">
          {/* Logo */}
          <div className="login-logo-container">
            <div className="login-logo-content">
              <div className="login-logo-icon-wrapper">
                <MessageSquare className="login-logo-icon" />
              </div>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">Sign in to your account</p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-control">
              <label className="form-label">
                <span className="label-text">Email</span>
              </label>
              <div className="input-wrapper">
                <div className="input-icon-left">
                  <Mail className="input-icon" />
                </div>
                <input
                  type="email"
                  className="input-field"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="form-label">
                <span className="label-text">Password</span>
              </label>
              <div className="input-wrapper">
                <div className="input-icon-left">
                  <Lock className="input-icon" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className="input-field"
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
                    <EyeOff className="input-icon" />
                  ) : (
                    <Eye className="input-icon" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="login-button" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <>
                  <Loader2 className="input-icon spinner" />
                  Loading...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="login-footer">
            <p className="login-footer-text">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="login-link">
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