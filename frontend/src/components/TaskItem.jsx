import { useState } from "react";

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

function isOverdue(dateStr, completed) {
  if (!dateStr || completed) return false;
  return new Date(dateStr) < new Date(new Date().toDateString());
}

export default function TaskItem({ task, onToggle, onDelete, onUpdate }) {
  const [editing, setEditing] = useState(false);
  const [title, setTitle] = useState(task.title);

  function saveTitle() {
    setEditing(false);
    if (title.trim() && title !== task.title) {
      onUpdate(task._id, { title: title.trim() });
    } else {
      setTitle(task.title);
    }
  }

  const overdue = isOverdue(task.dueDate, task.completed);

  return (
    <li className={`task-item priority-${task.priority} ${task.completed ? "task-item--done" : ""}`}>
      <button
        className="task-item__checkbox"
        onClick={() => onToggle(task._id)}
        aria-label={task.completed ? "Mark as active" : "Mark as complete"}
      >
        {task.completed && <span className="task-item__check">✓</span>}
      </button>

      <div className="task-item__body">
        {editing ? (
          <input
            className="task-item__edit-input"
            value={title}
            autoFocus
            onChange={(e) => setTitle(e.target.value)}
            onBlur={saveTitle}
            onKeyDown={(e) => e.key === "Enter" && saveTitle()}
          />
        ) : (
          <p className="task-item__title" onDoubleClick={() => setEditing(true)}>
            {task.title}
          </p>
        )}
        {task.notes && <p className="task-item__notes">{task.notes}</p>}
      </div>

      <div className="task-item__meta">
        {task.dueDate && (
          <span className={`badge-date ${overdue ? "badge-date--overdue" : ""}`}>
            {formatDate(task.dueDate)}
          </span>
        )}
        <span className={`badge-priority badge-priority--${task.priority}`}>{task.priority}</span>
        <button className="task-item__delete" onClick={() => onDelete(task._id)} aria-label="Delete task">
          ×
        </button>
      </div>
    </li>
  );
}
