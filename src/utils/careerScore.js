import { getItem } from "./storage.js";

// Weights must add up to 100
const WEIGHTS = {
  dsa: 20,
  skills: 25,
  projects: 20,
  applications: 10,
  interviewPrep: 15,
  consistency: 10,
};

function getDsaScore() {
  const problems = getItem("dsa") || [];
  const solvedCount = problems.filter((p) => p.status === "Solved").length;
  // 50 solved problems is treated as "fully ready" for this category
  return Math.min(100, Math.round((solvedCount / 50) * 100));
}

function getSkillsScore() {
  const skills = getItem("learning") || [];
  if (skills.length === 0) return 0;
  const total = skills.reduce((sum, skill) => sum + (skill.progress || 0), 0);
  return Math.round(total / skills.length);
}

function getProjectsScore() {
  const projects = getItem("projects") || [];
  const completedCount = projects.filter((p) => p.status === "Completed").length;
  // 3 completed projects is treated as a solid portfolio
  return Math.min(100, Math.round((completedCount / 3) * 100));
}

function getApplicationsScore() {
  const applications = getItem("applications") || [];
  // 10 applications is treated as reasonable outreach volume
  return Math.min(100, Math.round((applications.length / 10) * 100));
}

function getInterviewPrepScore() {
  const interviews = getItem("interviews") || [];
  if (interviews.length === 0) return 0;

  let totalItems = 0;
  let checkedItems = 0;

  interviews.forEach((interview) => {
    const checklist = interview.checklist || [];
    totalItems += checklist.length;
    checkedItems += checklist.filter((item) => item.checked).length;
  });

  if (totalItems === 0) return 0;
  return Math.round((checkedItems / totalItems) * 100);
}

function getConsistencyScore() {
  const tasks = getItem("tasks") || [];
  if (tasks.length === 0) return 0;
  const doneCount = tasks.filter((t) => t.done).length;
  return Math.round((doneCount / tasks.length) * 100);
}

export function calculateCareerScore() {
  const breakdown = {
    dsa: getDsaScore(),
    skills: getSkillsScore(),
    projects: getProjectsScore(),
    applications: getApplicationsScore(),
    interviewPrep: getInterviewPrepScore(),
    consistency: getConsistencyScore(),
  };

  const overall = Math.round(
    Object.keys(WEIGHTS).reduce(
      (sum, key) => sum + (breakdown[key] * WEIGHTS[key]) / 100,
      0
    )
  );

  const labels = {
    dsa: "DSA",
    skills: "Skills",
    projects: "Projects",
    applications: "Applications",
    interviewPrep: "Interview Prep",
    consistency: "Consistency",
  };

  const strongAreas = Object.keys(breakdown)
    .filter((key) => breakdown[key] >= 60)
    .map((key) => labels[key]);

  const needsAttention = Object.keys(breakdown)
    .filter((key) => breakdown[key] < 40)
    .map((key) => labels[key]);

  return { overall, breakdown, labels, strongAreas, needsAttention };
}