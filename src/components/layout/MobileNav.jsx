import { NavLink } from "react-router-dom";
import { navItems } from "../../data/navItems.js";
import "./MobileNav.css";

function MobileNav() {
  return (
    <nav className="mobile-nav">
      {navItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) =>
            isActive ? "mobile-nav-link mobile-nav-link-active" : "mobile-nav-link"
          }
        >
          <span className="mobile-nav-icon">{item.icon}</span>
          <span className="mobile-nav-label">{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

export default MobileNav;