import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import { TARGET_ROLES } from "../../data/targetRoles.js";
import "./ProfileForm.css";

function ProfileForm() {
  const { user, updateUser } = useAuth();

  const [fullName, setFullName] = useState(user?.fullName || "");
  const [targetRole, setTargetRole] = useState(user?.targetRole || TARGET_ROLES[0]);
  const [error, setError] = useState("");
  const [savedMessage, setSavedMessage] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setSavedMessage("");

    if (!fullName.trim()) {
      setError("Full name is required.");
      return;
    }

    setError("");
    updateUser({ fullName, targetRole });
    setSavedMessage("Profile updated.");
  }

  return (
    <form onSubmit={handleSubmit} className="profile-form">
      {error && <div className="auth-error">{error}</div>}
      {savedMessage && <div className="profile-form-success">{savedMessage}</div>}

      <div className="form-group">
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="targetRole">Target Role</label>
        <select
          id="targetRole"
          value={targetRole}
          onChange={(e) => setTargetRole(e.target.value)}
        >
          {TARGET_ROLES.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Email</label>
        <input type="email" value={user?.email || ""} disabled />
        <span className="profile-form-hint">Email can't be changed in this version.</span>
      </div>

      <button type="submit" className="auth-submit profile-form-submit">
        Save Changes
      </button>
    </form>
  );
}

export default ProfileForm;