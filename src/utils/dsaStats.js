import { TOPICS } from "../data/dsaConstants.js";

export function getDsaStats(problems) {
  const solved = problems.filter((p) => p.status === "Solved");

  const easy = solved.filter((p) => p.difficulty === "Easy").length;
  const medium = solved.filter((p) => p.difficulty === "Medium").length;
  const hard = solved.filter((p) => p.difficulty === "Hard").length;

  const topicCounts = TOPICS.reduce((acc, topic) => {
    acc[topic] = 0;
    return acc;
  }, {});

  solved.forEach((p) => {
    if (topicCounts[p.topic] !== undefined) {
      topicCounts[p.topic] += 1;
    }
  });

  return {
    totalSolved: solved.length,
    easy,
    medium,
    hard,
    topicCounts,
  };
}