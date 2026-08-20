import "./WeeklyActivityChart.css";

function WeeklyActivityChart({ activityByDate }) {
  const maxValue = Math.max(...activityByDate.map((day) => day.total), 1);

  return (
    <div className="weekly-activity-chart">
      {activityByDate.map((day) => (
        <div key={day.date} className="weekly-activity-column">
          <div className="weekly-activity-bar-track">
            <div
              className="weekly-activity-bar-fill"
              style={{ height: `${(day.total / maxValue) * 100}%` }}
            />
          </div>
          <span className="weekly-activity-count">{day.total}</span>
          <span className="weekly-activity-label">{day.label}</span>
        </div>
      ))}
    </div>
  );
}

export default WeeklyActivityChart;