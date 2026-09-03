import { useState } from "react";

const emptyForm = { title: "", notes: "", priority: "medium", dueDate: "" };

export default function TaskForm({ onCreate }) {
  const [form, setForm] = useState(emptyForm);
  const [expanded, setExpanded] = useState(false);
  const [error, setError] = useState("");

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) {
      setError("Give the task a title first.");
      return;
    }
    setError("");
    try {
      await onCreate({
        ...form,
        dueDate: form.dueDate ? form.dueDate : null,
      });
      setForm(emptyForm);
      setExpanded(false);
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="task-form__row">
        <input
          className="task-form__title"
          type="text"
          placeholder="Add a task…"
          value={form.title}
          onChange={(e) => update("title", e.target.value)}
          onFocus={() => setExpanded(true)}
        />
        <button type="submit" className="btn btn--primary">
          Add
        </button>
      </div>

      {expanded && (
        <div className="task-form__details">
          <textarea
            placeholder="Notes (optional)"
            value={form.notes}
            onChange={(e) => update("notes", e.target.value)}
            rows={2}
          />
          <div className="task-form__row task-form__row--tight">
            <label className="field">
              <span>Priority</span>
              <select value={form.priority} onChange={(e) => update("priority", e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </label>
            <label className="field">
              <span>Due date</span>
              <input
                type="date"
                value={form.dueDate}
                onChange={(e) => update("dueDate", e.target.value)}
              />
            </label>
          </div>
        </div>
      )}

      {error && <p className="task-form__error">{error}</p>}
    </form>
  );
}
