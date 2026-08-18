import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/common/ProtectedRoute.jsx";
import MainLayout from "./components/layout/MainLayout.jsx";
import Login from "./pages/Login/Login.jsx";
import Register from "./pages/Register/Register.jsx";
import Dashboard from "./pages/Dashboard/Dashboard.jsx";
import Learning from "./pages/Learning/Learning.jsx";
import DSA from "./pages/DSA/DSA.jsx";
import Applications from "./pages/Applications/Applications.jsx";
import Interviews from "./pages/Interviews/Interviews.jsx";
import Projects from "./pages/Projects/Projects.jsx";
import Analytics from "./pages/Analytics/Analytics.jsx";
import Settings from "./pages/Settings/Settings.jsx";
import NotFound from "./pages/NotFound/NotFound.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/dsa" element={<DSA />} />
        <Route path="/applications" element={<Applications />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;