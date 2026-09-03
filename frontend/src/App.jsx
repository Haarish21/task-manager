import { useEffect, useState, useCallback } from "react";
import Header from "./components/Header.jsx";
import TaskForm from "./components/TaskForm.jsx";
import FilterBar from "./components/FilterBar.jsx";
import TaskList from "./components/TaskList.jsx";
import * as api from "./api/tasks.js";
import "./App.css";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, active: 0, highPriorityActive: 0 });
  const [filters, setFilters] = useState({ status: "all", priority: "", q: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadTasks = useCallback(async () => {
    setLoading(true);
    try {
      const [taskData, statData] = await Promise.all([api.fetchTasks(filters), api.fetchStats()]);
      setTasks(taskData);
      setStats(statData);
      setError("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const timeout = setTimeout(loadTasks, filters.q ? 250 : 0);
    return () => clearTimeout(timeout);
  }, [loadTasks, filters.q]);

  async function handleCreate(payload) {
    await api.createTask(payload);
    await loadTasks();
  }

  async function handleToggle(id) {
    setTasks((prev) => prev.map((t) => (t._id === id ? { ...t, completed: !t.completed } : t)));
    try {
      await api.toggleTask(id);
      const statData = await api.fetchStats();
      setStats(statData);
    } catch (err) {
      setError(err.message);
      loadTasks();
    }
  }

  async function handleDelete(id) {
    const previous = tasks;
    setTasks((prev) => prev.filter((t) => t._id !== id));
    try {
      await api.deleteTask(id);
      const statData = await api.fetchStats();
      setStats(statData);
    } catch (err) {
      setError(err.message);
      setTasks(previous);
    }
  }

  async function handleUpdate(id, payload) {
    try {
      const updated = await api.updateTask(id, payload);
      setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div className="app">
      <div className="app__shell">
        <Header stats={stats} />
        <TaskForm onCreate={handleCreate} />
        <FilterBar filters={filters} onChange={setFilters} />
        {error && <p className="app__error">{error}</p>}
        <TaskList
          tasks={tasks}
          loading={loading}
          onToggle={handleToggle}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      </div>
    </div>
  );
}
