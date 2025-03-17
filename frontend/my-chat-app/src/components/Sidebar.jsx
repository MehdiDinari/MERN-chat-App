import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users } from "lucide-react";
import "../styles/Sidebar.css";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="contacts-title">
          <Users className="contacts-icon" />
          <span className="contacts-label">Contacts</span>
        </div>
        
        <div className="online-filter">
          <label className="filter-checkbox-label">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="filter-checkbox"
            />
            <span className="filter-label">Show online only</span>
          </label>
          <span className="online-count">({onlineUsers.length - 1} online)</span>
        </div>
      </div>

      <div className="users-list">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`user-button ${selectedUser?._id === user._id ? "selected" : ""}`}
          >
            <div className="avatar-container">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.fullName}
                className="user-avatar"
              />
              {onlineUsers.includes(user._id) && (
                <span className="online-indicator" />
              )}
            </div>

            <div className="user-info">
              <div className="user-name">{user.fullName}</div>
              <div className="user-status">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="no-users-message">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;