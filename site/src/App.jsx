import { useEffect, useMemo, useRef, useState } from 'react';
import Toolbar from './components/Toolbar.jsx';
import VacancyCard from './components/VacancyCard.jsx';
import VacancyFormModal from './components/VacancyFormModal.jsx';
import ConfirmDialog from './components/ConfirmDialog.jsx';
import EmptyState from './components/EmptyState.jsx';
import { useVacancies } from './hooks/useVacancies.js';
import { STATUSES } from './lib/statuses.js';
import { dayNumber, firstFutureDate, isPast } from './lib/dates.js';

const HIGHLIGHT_MS = 1800;
const NOTICE_MS = 3200;

// «ё» и регистр не должны мешать поиску: «стажер» находит «Стажёр».
function normalizeQuery(value) {
  return value.trim().toLowerCase().replace(/ё/g, 'е');
}

// Сначала просроченные дедлайны тестовых, затем ближайшие будущие даты,
// затем всё остальное (в том числе прошедшие собеседования) — по времени изменения.
function sortVacancies(vacancies) {
  return [...vacancies].sort((left, right) => {
    const leftOverdue = isPast(left.testDeadline);
    const rightOverdue = isPast(right.testDeadline);

    if (leftOverdue !== rightOverdue) return leftOverdue ? -1 : 1;
    if (leftOverdue && rightOverdue) {
      return dayNumber(left.testDeadline) - dayNumber(right.testDeadline);
    }

    const leftNext = firstFutureDate(left);
    const rightNext = firstFutureDate(right);
    if (leftNext && rightNext) return dayNumber(leftNext) - dayNumber(rightNext);
    if (leftNext) return -1;
    if (rightNext) return 1;

    return (right.updatedAt ?? '').localeCompare(left.updatedAt ?? '');
  });
}

export default function App() {
  const { vacancies, warning, addVacancy, updateVacancy, removeVacancy, loadSamples } = useVacancies();

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [formState, setFormState] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [highlightId, setHighlightId] = useState(null);
  const [notice, setNotice] = useState(null);

  const addButtonRef = useRef(null);
  const restoreFocusRef = useRef(null);

  const counts = useMemo(() => {
    const result = Object.fromEntries(STATUSES.map((status) => [status.id, 0]));
    for (const vacancy of vacancies) {
      if (Object.hasOwn(result, vacancy.status)) result[vacancy.status] += 1;
    }
    return result;
  }, [vacancies]);

  const overdueCount = useMemo(
    () => vacancies.filter((vacancy) => isPast(vacancy.testDeadline)).length,
    [vacancies],
  );

  const visibleVacancies = useMemo(() => {
    const query = normalizeQuery(search);
    const filtered = vacancies.filter((vacancy) => {
      if (statusFilter !== 'all' && vacancy.status !== statusFilter) return false;
      if (!query) return true;
      return (
        normalizeQuery(vacancy.company).includes(query) ||
        normalizeQuery(vacancy.position).includes(query)
      );
    });
    return sortVacancies(filtered);
  }, [vacancies, search, statusFilter]);

  const hasFilters = statusFilter !== 'all' || search.trim() !== '';

  useEffect(() => {
    if (!highlightId) return undefined;
    const card = document.querySelector(`[data-vacancy-id="${highlightId}"]`);
    card?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    const timer = setTimeout(() => setHighlightId(null), HIGHLIGHT_MS);
    return () => clearTimeout(timer);
  }, [highlightId]);

  useEffect(() => {
    if (!notice) return undefined;
    const timer = setTimeout(() => setNotice(null), NOTICE_MS);
    return () => clearTimeout(timer);
  }, [notice]);

  const rememberFocus = () => {
    const active = document.activeElement;
    restoreFocusRef.current = active && active !== document.body ? active : null;
  };

  const restoreFocus = () => {
    const target = restoreFocusRef.current;
    restoreFocusRef.current = null;
    window.requestAnimationFrame(() => {
      if (target && target.isConnected && typeof target.focus === 'function') target.focus();
      else addButtonRef.current?.focus();
    });
  };

  const openCreate = () => {
    rememberFocus();
    setFormState({ mode: 'create' });
  };

  const openEdit = (vacancy) => {
    rememberFocus();
    setFormState({ mode: 'edit', vacancy });
  };

  const closeForm = () => {
    setFormState(null);
    restoreFocus();
  };

  const openDelete = (vacancy) => {
    rememberFocus();
    setPendingDelete(vacancy);
  };

  const closeDelete = () => {
    setPendingDelete(null);
    restoreFocus();
  };

  const resetFilters = () => {
    setSearch('');
    setStatusFilter('all');
  };

  const handleSave = (payload) => {
    if (formState?.mode === 'edit') {
      const { id } = formState.vacancy;
      updateVacancy(id, payload);
      setNotice('Изменения сохранены');
      setHighlightId(id);
    } else {
      const created = addVacancy(payload);
      setNotice('Вакансия добавлена');
      setHighlightId(created.id);
    }
    closeForm();
  };

  const handleDeleteConfirm = () => {
    if (pendingDelete) removeVacancy(pendingDelete.id);
    setNotice('Вакансия удалена');
    closeDelete();
  };

  const showEmptyState = vacancies.length === 0;
  const showNoResults = !showEmptyState && visibleVacancies.length === 0;

  return (
    <div className="app">
      <header className="app-header">
        <div className="app-heading">
          <h1 className="app-title">Карьерный дневник</h1>
          <p className="app-subtitle">
            Вакансии, дедлайны тестовых и этапы собеседований — в одном месте
          </p>
        </div>
        <button
          ref={addButtonRef}
          type="button"
          className="btn btn-primary"
          onClick={openCreate}
        >
          + Вакансия
        </button>
      </header>

      {notice && (
        <p className="notice" role="status">
          {notice}
        </p>
      )}

      {warning && (
        <p className="warning-banner" role="status">
          {warning}
        </p>
      )}

      {!showEmptyState && (
        <Toolbar
          search={search}
          onSearchChange={setSearch}
          statusFilter={statusFilter}
          onStatusChange={setStatusFilter}
          total={vacancies.length}
          counts={counts}
        />
      )}

      {!showEmptyState && (
        <p className="summary" aria-live="polite">
          {hasFilters
            ? `Показано ${visibleVacancies.length} из ${vacancies.length}`
            : `Всего: ${vacancies.length}`}
          {overdueCount > 0 && (
            <span className="summary-overdue"> · Просрочено: {overdueCount}</span>
          )}
        </p>
      )}

      {showEmptyState && <EmptyState onAdd={openCreate} onLoadSamples={loadSamples} />}

      {showNoResults && (
        <div className="empty-state empty-state-compact">
          <h2>Ничего не найдено</h2>
          <p>Попробуйте изменить запрос или сбросить фильтры.</p>
          <div className="empty-actions">
            <button type="button" className="btn" onClick={resetFilters}>
              Сбросить фильтры
            </button>
          </div>
        </div>
      )}

      {visibleVacancies.length > 0 && (
        <ul className="vacancy-list">
          {visibleVacancies.map((vacancy) => (
            <VacancyCard
              key={vacancy.id}
              vacancy={vacancy}
              highlighted={vacancy.id === highlightId}
              onEdit={() => openEdit(vacancy)}
              onDelete={() => openDelete(vacancy)}
            />
          ))}
        </ul>
      )}

      {formState && (
        <VacancyFormModal
          vacancy={formState.mode === 'edit' ? formState.vacancy : null}
          onSave={handleSave}
          onClose={closeForm}
        />
      )}

      {pendingDelete && (
        <ConfirmDialog
          title="Удалить вакансию?"
          message={`«${pendingDelete.company} · ${pendingDelete.position}» исчезнет из списка. Отменить это действие нельзя.`}
          confirmLabel="Удалить"
          cancelLabel="Отмена"
          onConfirm={handleDeleteConfirm}
          onCancel={closeDelete}
        />
      )}
    </div>
  );
}
