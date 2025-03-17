import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User } from "lucide-react";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import "../styles/SignUpPage.css";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) signup(formData);
  };

  return (
    <div className="signup-container">
      {/* Left side */}
      <div className="form-side">
        <div className="form-wrapper form-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-content">
              <div className="logo-icon-wrapper">
                <MessageSquare className="logo-icon" />
              </div>
              <h1 className="signup-title">Create Account</h1>
              <p className="signup-subtitle">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="signup-form">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Full Name</span>
              </label>
              <div className="input-container">
                <div className="input-icon">
                  <User className="icon" />
                </div>
                <input
                  type="text"
                  className="form-input"
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

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

            <button type="submit" className="submit-button" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="icon spinner" />
                  Loading...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <div className="login-link-container">
            <p className="login-text">
              Already have an account?{" "}
              <Link to="/login" className="login-link">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  );
};

export default SignUpPage;