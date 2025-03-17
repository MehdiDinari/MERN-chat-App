import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import "../styles/ChatHeader.css";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="chat-header">
      <div className="header-content">
        <div className="user-info-container">
          {/* Avatar */}
          <div className="user-avatar">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName} 
            />
          </div>

          {/* User info */}
          <div className="user-details">
            <h3 className="user-name">{selectedUser.fullName}</h3>
            <p className="user-status">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          className="close-button" 
          onClick={() => setSelectedUser(null)}
        >
          <X className="close-icon" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;