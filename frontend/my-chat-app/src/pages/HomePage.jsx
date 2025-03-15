import { useChatStore } from "../store/useChatStore";
import "../styles/LoginPage.css";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from '../components/ChatContainer';

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="page-container">
      <div className="chat-app-wrapper">
        <div className="chat-app-card">
          <div className="chat-app-content">
            <Sidebar />
            
            {!selectedUser ? <NoChatSelected /> : <ChatContainer />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;