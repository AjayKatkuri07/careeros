import { getItem } from "./storage.js";

function daysUntil(dateString) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const target = new Date(dateString);
  target.setHours(0, 0, 0, 0);

  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((target - today) / msPerDay);
}

export function generateRecommendations() {
  const dsaProblems = getItem("dsa") || [];
  const learningSkills = getItem("learning") || [];
  const interviews = getItem("interviews") || [];

  const recommendations = [];

  // Rule: low progress on a specific skill, if the user's roadmap includes it
  const springBoot = learningSkills.find((skill) => skill.name === "Spring Boot");
  if (springBoot && springBoot.progress < 40) {
    recommendations.push({
      id: "spring-boot",
      text: "Spend some time learning Spring Boot REST APIs.",
    });
  }

  // Rule: low count of a specific DSA topic
  const graphsSolved = dsaProblems.filter(
    (p) => p.topic === "Graphs" && p.status === "Solved"
  ).length;
  if (graphsSolved < 5) {
    recommendations.push({
      id: "graphs",
      text: "Practice Graph problems this week.",
    });
  }

  // Rule: interview coming up soon
  const upcomingInterview = interviews
    .filter((i) => daysUntil(i.date) >= 0 && daysUntil(i.date) <= 3)
    .sort((a, b) => new Date(a.date) - new Date(b.date))[0];

  if (upcomingInterview) {
    recommendations.push({
      id: "interview-soon",
      text: `Your interview with ${upcomingInterview.company} is coming soon. Focus on the preparation checklist.`,
    });
  }

  return recommendations;
}