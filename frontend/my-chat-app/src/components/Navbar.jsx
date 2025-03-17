import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import { LogOut, MessageSquare, Settings, User } from "lucide-react";
import "../styles/Navbar.css";

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="logo-link">
              <div className="logo-icon-container">
                <MessageSquare className="logo-icon" />
              </div>
              <h1 className="logo-text">Chatty</h1>
            </Link>
          </div>

          <div className="navbar-right">
            <Link to="/settings" className="nav-button">
              <Settings className="nav-button-icon" />
              <span className="button-text">Settings</span>
            </Link>

            {authUser && (
              <>
                <Link to="/profile" className="nav-button">
                  <User className="profile-icon" />
                  <span className="button-text">Profile</span>
                </Link>

                <button className="logout-button" onClick={logout}>
                  <LogOut className="logout-icon" />
                  <span className="button-text">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;