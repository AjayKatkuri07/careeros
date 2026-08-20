import { useMemo } from "react";
import { getItem } from "../../utils/storage.js";
import { getDsaStats } from "../../utils/dsaStats.js";
import { getWeeklyActivity } from "../../utils/weeklyActivity.js";
import { APPLICATION_STATUSES } from "../../data/applicationConstants.js";
import AnalyticsSection from "../../components/analytics/AnalyticsSection.jsx";
import BarBreakdown from "../../components/analytics/BarBreakdown.jsx";
import WeeklyActivityChart from "../../components/analytics/WeeklyActivityChart.jsx";
import "./Analytics.css";

function Analytics() {
  const dsaProblems = useMemo(() => getItem("dsa") || [], []);
  const learningSkills = useMemo(() => getItem("learning") || [], []);
  const applications = useMemo(() => getItem("applications") || [], []);

  const dsaStats = useMemo(() => getDsaStats(dsaProblems), [dsaProblems]);
  const weeklyActivity = useMemo(() => getWeeklyActivity(), []);

  const dsaBreakdown = [
    { label: "Easy", value: dsaStats.easy },
    { label: "Medium", value: dsaStats.medium },
    { label: "Hard", value: dsaStats.hard },
  ];

  const learningBreakdown = learningSkills.map((skill) => ({
    label: skill.name,
    value: skill.progress,
  }));

  const applicationsBreakdown = APPLICATION_STATUSES.map((status) => ({
    label: status,
    value: applications.filter((a) => a.status === status).length,
  }));

  return (
    <div className="analytics-page">
      <h1>Analytics</h1>

      <AnalyticsSection title="DSA Progress" hasData={dsaStats.totalSolved > 0}>
        <BarBreakdown items={dsaBreakdown} />
      </AnalyticsSection>

      <AnalyticsSection title="Learning Progress" hasData={learningSkills.length > 0}>
        <BarBreakdown items={learningBreakdown} />
      </AnalyticsSection>

      <AnalyticsSection title="Job Applications" hasData={applications.length > 0}>
        <BarBreakdown items={applicationsBreakdown} />
      </AnalyticsSection>

      <AnalyticsSection title="Weekly Activity" hasData={weeklyActivity.hasAnyActivity}>
        <WeeklyActivityChart activityByDate={weeklyActivity.activityByDate} />
      </AnalyticsSection>
    </div>
  );
}

export default Analytics;