import { useRef, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { Image, Send, X } from "lucide-react";
import toast from "react-hot-toast";
import "../styles/MessageInput.css";

const MessageInput = () => {
  const [text, setText] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const { sendMessage } = useChatStore();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className="message-input-container">
      {imagePreview && (
        <div className="image-preview-container">
          <div className="image-preview-wrapper">
            <img
              src={imagePreview}
              alt="Preview"
              className="preview-image"
            />
            <button
              onClick={removeImage}
              className="remove-image-button"
              type="button"
            >
              <X className="remove-icon" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="message-form">
        <div className="input-container">
          <input
            type="text"
            className="message-input"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="file-input"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`image-button ${imagePreview ? "active" : ""}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image className="image-icon" />
          </button>
        </div>
        <button
          type="submit"
          className="send-button"
          disabled={!text.trim() && !imagePreview}
        >
          <Send className="send-icon" />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;