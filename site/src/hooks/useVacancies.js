import { useCallback, useEffect, useRef, useState } from 'react';
import { createId, loadVacancies, saveVacancies } from '../lib/storage.js';
import { createSampleVacancies } from '../lib/sampleData.js';

export function useVacancies() {
  const initial = useRef(null);
  if (initial.current === null) {
    initial.current = loadVacancies();
  }

  const [vacancies, setVacancies] = useState(initial.current.vacancies);
  const [warning, setWarning] = useState(initial.current.warning);
  // Снимок того, что уже лежит в хранилище: на монтировании ничего не перезаписываем,
  // иначе StrictMode в dev затирает повреждённые данные и гасит предупреждение.
  const savedSnapshot = useRef(JSON.stringify(initial.current.vacancies));

  useEffect(() => {
    const snapshot = JSON.stringify(vacancies);
    if (snapshot === savedSnapshot.current) return;

    const result = saveVacancies(vacancies);
    if (result.ok) {
      savedSnapshot.current = snapshot;
      // Успешная запись значит, что данные в порядке: в том числе баннер
      // «данные повреждены» больше не актуален.
      setWarning(null);
    } else {
      setWarning(result.warning);
    }
  }, [vacancies]);

  const addVacancy = useCallback((input) => {
    const now = new Date().toISOString();
    const vacancy = { ...input, id: createId(), createdAt: now, updatedAt: now };
    setVacancies((prev) => [vacancy, ...prev]);
    return vacancy;
  }, []);

  const updateVacancy = useCallback((id, input) => {
    const now = new Date().toISOString();
    setVacancies((prev) =>
      prev.map((vacancy) =>
        vacancy.id === id
          ? { ...vacancy, ...input, id: vacancy.id, createdAt: vacancy.createdAt, updatedAt: now }
          : vacancy,
      ),
    );
  }, []);

  const removeVacancy = useCallback((id) => {
    setVacancies((prev) => prev.filter((vacancy) => vacancy.id !== id));
  }, []);

  const loadSamples = useCallback(() => {
    setVacancies((prev) => (prev.length === 0 ? createSampleVacancies() : prev));
  }, []);

  return { vacancies, warning, addVacancy, updateVacancy, removeVacancy, loadSamples };
}
