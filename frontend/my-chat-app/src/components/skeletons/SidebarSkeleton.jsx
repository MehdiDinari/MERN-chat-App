import { Users } from "lucide-react";
import "./SidebarSkeleton.css";

const SidebarSkeleton = () => {
  // Create 8 skeleton items
  const skeletonContacts = Array(8).fill(null);

  return (
    <aside className="skeleton-sidebar">
      {/* Header */}
      <div className="skeleton-header">
        <div className="skeleton-title">
          <Users className="contacts-icon" />
          <span className="contacts-label">Contacts</span>
        </div>
      </div>

      {/* Skeleton Contacts */}
      <div className="skeleton-contacts-list">
        {skeletonContacts.map((_, idx) => (
          <div key={idx} className="skeleton-contact-item">
            {/* Avatar skeleton */}
            <div className="avatar-container">
              <div className="skeleton-avatar" />
            </div>

            {/* User info skeleton - only visible on larger screens */}
            <div className="skeleton-user-info">
              <div className="skeleton-name" />
              <div className="skeleton-status" />
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
};

export default SidebarSkeleton;