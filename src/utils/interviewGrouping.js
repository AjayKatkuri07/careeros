function startOfDay(date) {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  return d;
}

function daysBetween(from, to) {
  const msPerDay = 1000 * 60 * 60 * 24;
  return Math.round((startOfDay(to) - startOfDay(from)) / msPerDay);
}

export function groupInterviews(interviews) {
  const today = new Date();

  const groups = {
    today: [],
    tomorrow: [],
    thisWeek: [],
    upcoming: [],
    completed: [],
  };

  interviews.forEach((interview) => {
    const diff = daysBetween(today, interview.date);

    if (diff < 0) {
      groups.completed.push(interview);
    } else if (diff === 0) {
      groups.today.push(interview);
    } else if (diff === 1) {
      groups.tomorrow.push(interview);
    } else if (diff <= 7) {
      groups.thisWeek.push(interview);
    } else {
      groups.upcoming.push(interview);
    }
  });

  groups.today.sort((a, b) => a.time.localeCompare(b.time));
  groups.tomorrow.sort((a, b) => a.time.localeCompare(b.time));
  groups.thisWeek.sort((a, b) => new Date(a.date) - new Date(b.date));
  groups.upcoming.sort((a, b) => new Date(a.date) - new Date(b.date));
  groups.completed.sort((a, b) => new Date(b.date) - new Date(a.date));

  return groups;
}