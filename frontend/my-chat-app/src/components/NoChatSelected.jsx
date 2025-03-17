import { MessageSquare } from "lucide-react";
import "../styles/NoChatSelected.css";

const NoChatSelected = () => {
  return (
    <div className="no-chat-container">
      <div className="no-chat-content">
        {/* Icon Display */}
        <div className="icon-container">
          <div className="icon-wrapper">
            <div className="icon-background">
              <MessageSquare className="chat-icon" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="welcome-title">Welcome to Chatty!</h2>
        <p className="welcome-subtitle">
          Select a conversation from the sidebar to start chatting
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;