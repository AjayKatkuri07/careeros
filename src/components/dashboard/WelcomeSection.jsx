import { useAuth } from "../../context/AuthContext.jsx";
import "./WelcomeSection.css";

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function WelcomeSection() {
  const { user } = useAuth();
  const firstName = user?.fullName?.split(" ")[0] || "there";

  return (
    <section className="welcome-section">
      <h1>
        {getGreeting()}, {firstName} 👋
      </h1>
      <p>Here's what your career progress looks like today.</p>
    </section>
  );
}

export default WelcomeSection;