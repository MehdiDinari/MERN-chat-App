import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";
import { Send } from "lucide-react";
import "../styles/SettingsPage.css";

/**
 * Messages de prévisualisation pour la démo du thème
 */
const PREVIEW_MESSAGES = [
  { id: 1, content: "Hey! How's it going?", isSent: false },
  { id: 2, content: "I'm doing great! Just working on some new features.", isSent: true },
];

/**
 * Page des paramètres permettant de changer le thème de l'application
 */
const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="settings-container">
      <div className="settings-section">
        {/* En-tête de la section des thèmes */}
        <div className="section-header">
          <h2 className="section-title">Theme</h2>
          <p className="section-description">Choose a theme for your chat interface</p>
        </div>

        {/* Grille de sélection des thèmes */}
        <div className="themes-grid">
          {THEMES.map((t) => (
            <button
              key={t}
              className={`theme-button ${theme === t ? "active" : ""}`}
              onClick={() => setTheme(t)}
              aria-label={`Select ${t} theme`}
            >
              <div className="theme-preview" data-theme={t}>
                <div className="theme-colors">
                  <div className="color-primary"></div>
                  <div className="color-secondary"></div>
                  <div className="color-accent"></div>
                  <div className="color-neutral"></div>
                </div>
              </div>
              <span className="theme-name">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

        {/* Section de prévisualisation */}
        <h3 className="preview-title">Preview</h3>
        <div className="preview-container">
          <div className="preview-wrapper">
            <div className="preview-chat">
              {/* Interface de chat factice */}
              <div className="chat-ui">
                {/* En-tête du chat */}
                <div className="chat-header">
                  <div className="user-info">
                    <div className="user-avatar">
                      J
                    </div>
                    <div className="user-details">
                      <h3 className="user-name">John Doe</h3>
                      <p className="user-status">Online</p>
                    </div>
                  </div>
                </div>

                {/* Messages du chat */}
                <div className="chat-messages">
                  {PREVIEW_MESSAGES.map((message) => (
                    <div
                      key={message.id}
                      className={`message-wrapper ${message.isSent ? "sent" : "received"}`}
                    >
                      <div
                        className={`message-bubble ${message.isSent ? "sent" : "received"}`}
                      >
                        <p className="message-text">{message.content}</p>
                        <p
                          className={`message-time ${message.isSent ? "sent" : "received"}`}
                        >
                          12:00 PM
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Zone de saisie */}
                <div className="chat-input-area">
                  <div className="input-wrapper">
                    <input
                      type="text"
                      className="message-input"
                      placeholder="Type a message..."
                      value="This is a preview"
                      readOnly
                    />
                    <button className="send-button" aria-label="Send message">
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;