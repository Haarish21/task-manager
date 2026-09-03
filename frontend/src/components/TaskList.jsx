import TaskItem from "./TaskItem.jsx";

export default function TaskList({ tasks, loading, onToggle, onDelete, onUpdate }) {
  if (loading) {
    return <p className="state-message">Loading tasks…</p>;
  }

  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-state__title">Nothing here.</p>
        <p className="empty-state__subtitle">Add a task above to start your list.</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          onToggle={onToggle}
          onDelete={onDelete}
          onUpdate={onUpdate}
        />
      ))}
    </ul>
  );
}
