export function getSkillLevel(progress) {
  if (progress >= 70) return "Advanced";
  if (progress >= 35) return "Intermediate";
  return "Beginner";
}