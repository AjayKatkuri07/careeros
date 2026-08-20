import { getItem } from "./storage.js";

function getLastSevenDays() {
  const days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    days.push(date.toISOString().slice(0, 10));
  }
  return days;
}

function formatDayLabel(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", { weekday: "short" });
}

export function getWeeklyActivity() {
  const dsa = getItem("dsa") || [];
  const applications = getItem("applications") || [];
  const interviews = getItem("interviews") || [];

  const dates = getLastSevenDays();

  const activityByDate = dates.map((date) => {
    const dsaCount = dsa.filter((p) => p.date === date).length;
    const applicationCount = applications.filter((a) => a.applicationDate === date).length;
    const interviewCount = interviews.filter((i) => i.date === date).length;

    return {
      date,
      label: formatDayLabel(date),
      total: dsaCount + applicationCount + interviewCount,
    };
  });

  const hasAnyActivity = activityByDate.some((day) => day.total > 0);

  return { activityByDate, hasAnyActivity };
}