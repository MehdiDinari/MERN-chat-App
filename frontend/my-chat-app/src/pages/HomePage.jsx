import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import "../styles/HomePage.css";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="home-container">
      <div className="content-wrapper">
        <div className="chat-card">
          <div className="card-content">
            <Sidebar />
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;