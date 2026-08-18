import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import { useTheme } from "../../context/ThemeContext.jsx";
import "./Header.css";

function getInitials(name) {
  if (!name) return "?";
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function Header() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <header className="app-header">
      <span className="app-header-brand">CareerOS</span>

      <div className="app-header-actions">
        <button className="icon-button" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === "light" ? "🌙" : "☀️"}
        </button>

        <div className="app-header-avatar" title={user?.fullName}>
          {getInitials(user?.fullName)}
        </div>

        <button className="icon-button" onClick={handleLogout} aria-label="Log out">
          ⏻
        </button>
      </div>
    </header>
  );
}

export default Header;