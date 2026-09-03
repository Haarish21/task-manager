const STATUS_OPTIONS = [
  { value: "all", label: "All" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="filter-bar">
      <div className="filter-bar__status">
        {STATUS_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            className={`chip ${filters.status === opt.value ? "chip--active" : ""}`}
            onClick={() => onChange({ ...filters, status: opt.value })}
            type="button"
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="filter-bar__controls">
        <select
          value={filters.priority}
          onChange={(e) => onChange({ ...filters, priority: e.target.value })}
        >
          <option value="">Any priority</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>

        <input
          type="search"
          placeholder="Search tasks…"
          value={filters.q}
          onChange={(e) => onChange({ ...filters, q: e.target.value })}
        />
      </div>
    </div>
  );
}
