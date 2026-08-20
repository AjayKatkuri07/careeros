import WelcomeSection from "../../components/dashboard/WelcomeSection.jsx";
import CareerReadiness from "../../components/dashboard/CareerReadiness.jsx";
import CareerRecommendations from "../../components/dashboard/CareerRecommendations.jsx";
import StatsGrid from "../../components/dashboard/StatsGrid.jsx";
import TodayTasks from "../../components/dashboard/TodayTasks.jsx";
import UpcomingInterview from "../../components/dashboard/UpcomingInterview.jsx";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">
      <WelcomeSection />
      <StatsGrid />
      <CareerReadiness />
      <CareerRecommendations />

      <div className="dashboard-bottom-row">
        <TodayTasks />
        <UpcomingInterview />
      </div>
    </div>
  );
}

export default Dashboard;