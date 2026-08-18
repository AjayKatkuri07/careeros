import { NavLink } from "react-router-dom";
import { navItems } from "../../data/navItems.js";
import "./Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <span className="sidebar-brand-mark">C</span>
        <span className="sidebar-brand-text">CareerOS</span>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link sidebar-link-active" : "sidebar-link"
            }
          >
            <span className="sidebar-link-icon">{item.icon}</span>
            <span className="sidebar-link-text">{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}

export default Sidebar;