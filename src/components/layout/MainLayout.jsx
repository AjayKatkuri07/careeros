import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Header from "./Header.jsx";
import MobileNav from "./MobileNav.jsx";
import "./MainLayout.css";

function MainLayout() {
  return (
    <div className="app-layout">
      <Sidebar />

      <div className="app-layout-main">
        <Header />
        <main className="app-content">
          <Outlet />
        </main>
      </div>

      <MobileNav />
    </div>
  );
}

export default MainLayout;