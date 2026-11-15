import { STATUSES } from '../lib/statuses.js';

const FILTER_LABELS = {
  test: 'Тестовое',
};

export default function Toolbar({ search, onSearchChange, statusFilter, onStatusChange, total, counts }) {
  return (
    <div className="toolbar">
      <input
        type="search"
        className="search-input"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
        placeholder="Поиск по компании или должности"
        aria-label="Поиск по компании или должности"
      />

      <div className="segmented-control" role="group" aria-label="Фильтр по статусу">
        <button
          type="button"
          className={`segment ${statusFilter === 'all' ? 'segment-active' : ''}`}
          aria-pressed={statusFilter === 'all'}
          onClick={() => onStatusChange('all')}
        >
          <span className="segment-label">Все</span>
          <span className="segment-count">{total}</span>
        </button>

        {STATUSES.map((status) => {
          const count = counts[status.id] ?? 0;
          return (
            <button
              key={status.id}
              type="button"
              className={`segment ${statusFilter === status.id ? 'segment-active' : ''}`}
              aria-pressed={statusFilter === status.id}
              disabled={count === 0}
              onClick={() => onStatusChange(status.id)}
            >
              <span className="segment-label">{FILTER_LABELS[status.id] ?? status.label}</span>
              <span className="segment-count">{count}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
