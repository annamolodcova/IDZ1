import { DEFAULT_STATUS, isStatusId } from './statuses.js';
import { isValidISODate } from './dates.js';

export const STORAGE_KEY = 'career-diary.v1';

export function createId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `v-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
}

function normalizeText(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function normalizeVacancy(raw) {
  if (!raw || typeof raw !== 'object') return null;

  const company = normalizeText(raw.company);
  const position = normalizeText(raw.position);
  if (!company || !position) return null;

  const now = new Date().toISOString();
  return {
    id: typeof raw.id === 'string' && raw.id ? raw.id : createId(),
    company,
    position,
    status: isStatusId(raw.status) ? raw.status : DEFAULT_STATUS,
    testDeadline: isValidISODate(raw.testDeadline) ? raw.testDeadline : null,
    nextInterviewAt: isValidISODate(raw.nextInterviewAt) ? raw.nextInterviewAt : null,
    link: normalizeText(raw.link) || null,
    notes: typeof raw.notes === 'string' ? raw.notes.trim() : '',
    createdAt: typeof raw.createdAt === 'string' ? raw.createdAt : now,
    updatedAt: typeof raw.updatedAt === 'string' ? raw.updatedAt : now,
  };
}

export function loadVacancies() {
  let raw;
  try {
    raw = window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return {
      vacancies: [],
      warning: 'Хранилище браузера недоступно — данные не сохранятся.',
    };
  }

  if (!raw) return { vacancies: [], warning: null };

  try {
    const parsed = JSON.parse(raw);
    const list = Array.isArray(parsed?.vacancies) ? parsed.vacancies : [];
    return { vacancies: list.map(normalizeVacancy).filter(Boolean), warning: null };
  } catch {
    return {
      vacancies: [],
      warning: 'Сохранённые данные повреждены — список пуст. Можно загрузить примеры.',
    };
  }
}

export function saveVacancies(vacancies) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ version: 1, vacancies }));
    return { ok: true };
  } catch {
    return {
      ok: false,
      warning: 'Данные не сохраняются: хранилище недоступно или переполнено.',
    };
  }
}
