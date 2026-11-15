import StatusBadge from './StatusBadge.jsx';
import DateBadge from './DateBadge.jsx';

export default function VacancyCard({ vacancy, highlighted, onEdit, onDelete }) {
  const { id, company, position, status, testDeadline, nextInterviewAt, link, notes } = vacancy;
  const hasDates = Boolean(testDeadline || nextInterviewAt);

  return (
    <li
      className={`vacancy-card ${highlighted ? 'vacancy-card-highlight' : ''}`}
      data-vacancy-id={id}
    >
      <div className="vacancy-head">
        <div className="vacancy-titles">
          <h2 className="vacancy-company" title={company}>
            {company}
          </h2>
          <p className="vacancy-position" title={position}>
            {position}
          </p>
        </div>
        <StatusBadge status={status} />
      </div>

      <div className="vacancy-dates">
        <DateBadge label="Тестовое" date={testDeadline} kind="deadline" />
        <DateBadge label="Собеседование" date={nextInterviewAt} kind="interview" />
        {!hasDates && <span className="date-badge date-empty">Даты не указаны</span>}
      </div>

      {notes && (
        <p className="vacancy-notes" title={notes}>
          {notes}
        </p>
      )}

      <div className={`vacancy-footer ${link ? '' : 'vacancy-footer-actions-only'}`}>
        {link && (
          <a className="vacancy-link" href={link} target="_blank" rel="noreferrer">
            {link}
          </a>
        )}

        <div className="vacancy-actions">
          <button type="button" className="btn btn-small" onClick={onEdit}>
            Изменить
          </button>
          <button type="button" className="btn btn-small btn-danger-ghost" onClick={onDelete}>
            Удалить
          </button>
        </div>
      </div>
    </li>
  );
}
