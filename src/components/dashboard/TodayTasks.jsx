import { useLocalStorage } from "../../hooks/useLocalStorage.js";
import "./TodayTasks.css";

const DEFAULT_TASKS = [
  { id: "1", text: "Solve 2 DSA problems", done: false },
  { id: "2", text: "Complete one learning lesson", done: false },
  { id: "3", text: "Apply to 2 jobs", done: false },
];

function TodayTasks() {
  const [tasks, setTasks] = useLocalStorage("tasks", DEFAULT_TASKS);

  function toggleTask(id) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <section className="card today-tasks">
      <h2>Today's Tasks</h2>

      <ul className="today-tasks-list">
        {tasks.map((task) => (
          <li key={task.id}>
            <label className="today-task-item">
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleTask(task.id)}
              />
              <span className={task.done ? "task-text task-text-done" : "task-text"}>
                {task.text}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default TodayTasks;