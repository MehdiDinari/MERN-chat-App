import "./MessageSkeleton.css";

const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="skeleton-container">
      {skeletonMessages.map((_, idx) => (
        <div 
          key={idx} 
          className={`skeleton-message ${idx % 2 === 0 ? "message-start" : "message-end"}`}
        >
          <div className="skeleton-avatar-container">
            <div className="skeleton-avatar-wrapper">
              <div className="skeleton-avatar" />
            </div>
          </div>

          <div className="skeleton-message-header">
            <div className="skeleton-timestamp" />
          </div>

          <div className="skeleton-bubble-container">
            <div className="skeleton-bubble" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;