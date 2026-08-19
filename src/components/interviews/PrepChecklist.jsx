import "./PrepChecklist.css";

function groupByCategory(checklist) {
  const grouped = {};
  checklist.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });
  return grouped;
}

function PrepChecklist({ checklist, onToggle }) {
  const grouped = groupByCategory(checklist);
  const checkedCount = checklist.filter((item) => item.checked).length;

  return (
    <div className="prep-checklist">
      <div className="prep-checklist-summary">
        {checkedCount} / {checklist.length} completed
      </div>

      {Object.keys(grouped).map((category) => (
        <div key={category} className="prep-checklist-group">
          <h4>{category}</h4>
          {grouped[category].map((item) => (
            <label key={item.id} className="prep-checklist-item">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={() => onToggle(item.id)}
              />
              <span className={item.checked ? "prep-checklist-item-done" : ""}>
                {item.label}
              </span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}

export default PrepChecklist;