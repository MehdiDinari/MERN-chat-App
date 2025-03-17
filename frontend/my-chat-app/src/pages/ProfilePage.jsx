import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Mail, User } from "lucide-react";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        <div className="profile-card">
          <div className="profile-header">
            <h1 className="profile-title">Profile</h1>
            <p className="profile-subtitle">Your profile information</p>
          </div>

          {/* Avatar upload section */}
          <div className="avatar-section">
            <div className="avatar-container">
              <img
                src={selectedImg || authUser.profilePic || "/avatar.png"}
                alt="Profile"
                className="avatar-image"
              />
              <label
                htmlFor="avatar-upload"
                className={`avatar-upload-label ${isUpdatingProfile ? "uploading" : ""}`}
              >
                <Camera className="camera-icon" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="avatar-upload-input"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="avatar-hint">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>

          <div className="info-section">
            <div className="info-field">
              <div className="field-label">
                <User className="info-icon" />
                Full Name
              </div>
              <p className="field-value">{authUser?.fullName}</p>
            </div>

            <div className="info-field">
              <div className="field-label">
                <Mail className="info-icon" />
                Email Address
              </div>
              <p className="field-value">{authUser?.email}</p>
            </div>
          </div>

          <div className="account-section">
            <h2 className="account-title">Account Information</h2>
            <div className="account-info">
              <div className="account-row">
                <span className="account-label">Member Since</span>
                <span className="account-value">{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="account-row">
                <span className="account-label">Account Status</span>
                <span className="status-active">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;