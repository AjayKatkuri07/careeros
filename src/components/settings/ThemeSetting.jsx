import { useTheme } from "../../context/ThemeContext.jsx";
import "./ThemeSetting.css";

function ThemeSetting() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="theme-setting">
      <div>
        <span className="theme-setting-label">Theme</span>
        <p className="theme-setting-description">
          Currently using {theme === "light" ? "light" : "dark"} mode.
        </p>
      </div>
      <button className="btn-secondary" onClick={toggleTheme}>
        Switch to {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}

export default ThemeSetting;