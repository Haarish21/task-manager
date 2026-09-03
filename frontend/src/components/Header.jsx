export default function Header({ stats }) {
  return (
    <header className="header">
      <div className="header__title">
        <span className="header__mark">Ledger</span>
        <h1>Today's line-up</h1>
      </div>
      <dl className="header__stats">
        <div className="header__stat">
          <dt>Open</dt>
          <dd>{stats.active}</dd>
        </div>
        <div className="header__stat">
          <dt>Done</dt>
          <dd>{stats.completed}</dd>
        </div>
        <div className="header__stat header__stat--flag">
          <dt>Urgent</dt>
          <dd>{stats.highPriorityActive}</dd>
        </div>
      </dl>
    </header>
  );
}
