---
version: alpha
name: Карьерный дневник
description: Сдержанная система для локального карьерного дневника — швейцарская сетка, светлые поверхности Apple HIG и графитовый акцент.
---

# Карьерный дневник — DESIGN.md

## Overview

«Карьерный дневник» — спокойный рабочий инструмент, а не витрина. Пользователь открывает его между откликами и собеседованиями, поэтому интерфейс должен читаться за секунды: что горит, где я сейчас и что делать дальше.

Визуальный характер — **швейцарский интернациональный стиль плюс Apple Human Interface**: светлый canvas `#F5F5F7`, белые поверхности, тонкие волосяные границы, системная типографика SF Pro / Helvetica Neue, строгая левая выключка и много воздуха. Иерархия строится масштабом текста, интервалами и границами, а не декором, тенями и цветными акцентами.

Референс `reference.jpeg` задаёт материал и оптику, но не структуру. Из него берём светлый фон, белую карточку с hairline-границей, системную типографику и Apple Segmented Control. Не берём sidebar, календарь, обложки, dock, аватары и любые элементы, которых нет в PRD.

**Границы продукта.** Проектируем только один экран из PRD: шапка, поиск, фильтр статусов, счётчик, список карточек, модальная форма, подтверждение и пустые состояния. Никаких новых функций, экранов, навигации, тёмной темы, иллюстраций, иконок и логотипов компаний.

**Ключевые принципы**

- Один акцент — графит `#1D1D1F`. Синий `#0071E3` существует только для focus-ring и не используется как цвет кнопок, ссылок или статусов.
- Глубина — слоями поверхностей и волосяными линиями. Тени редкие и мягкие.
- Цвет в карточке — только маленький тинт статуса и тинт срочности даты. Рамка и фон карточки всегда нейтральные.
- Вес, а не цвет, отвечает за главное: компания в карточке — самый сильный текстовый элемент.
- Только три насыщенности шрифта: 400, 500, 600.

## Colors

Палитра нейтральная: графит, серые ступени и белые поверхности. Функциональные цвета приглушены и используются маленькими площадями.

- **Primary (#1D1D1F):** графит для главной кнопки, заголовков и основного текста. Это единственный акцент интерфейса.
- **Canvas (#F5F5F7):** холодный светлый фон страницы. Отделяет белые поверхности от окружения без тени.
- **Surface (#FFFFFF):** карточки, поля ввода, модалки и пустые состояния. Чистый белый, без тинтов.
- **Ink (#1D1D1F / #5B5B60 / #6E6E73):** три ступени текста. Основной, вторичный и метаданные. Все ступени проходят AA на белом и на canvas.
- **Separator (#E5E5EA / #D1D1D6):** волосяные границы. `#E5E5EA` — обычное разделение, `#D1D1D6` — границы полей ввода и hover карточки.
- **Focus (#0071E3):** единственный синий. Только рамка и кольцо фокуса, никогда не заливка и не текст.
- **Danger (#B42318):** просрочка, ошибки и деструктивное действие. Не используется для статуса «Отказ» в виде заливки карточки — только в бейдже.
- **Warning (#8A5300):** «завтра» и «через 2 дн.», предупреждающий баннер.
- **Success (#1D7A46):** уведомление о сохранении и статус «Оффер».

```yaml
colors:
  primary: "#1D1D1F"
  primary-hover: "#000000"
  primary-active: "#3A3A3C"
  on-primary: "#FFFFFF"
  canvas: "#F5F5F7"
  surface: "#FFFFFF"
  surface-subtle: "#F2F2F7"
  surface-sunken: "#EFEFF4"
  ink: "#1D1D1F"
  ink-secondary: "#5B5B60"
  ink-tertiary: "#6E6E73"
  ink-disabled: "#86868B"
  separator: "#E5E5EA"
  separator-strong: "#D1D1D6"
  focus-ring: "#0071E3"
  overlay: "rgba(0, 0, 0, 0.40)"
  danger: "#B42318"
  danger-bg: "#FFF1F0"
  warning: "#8A5300"
  warning-bg: "#FFF4E5"
  warning-strong-text: "#7A4A00"
  warning-strong-bg: "#FFE8CC"
  success: "#1D7A46"
  success-bg: "#EAF7EF"
  status-applied-text: "#5B5B60"
  status-applied-bg: "#F2F2F7"
  status-screening-text: "#0057B8"
  status-screening-bg: "#EAF2FF"
  status-test-text: "#8A5300"
  status-test-bg: "#FFF4E5"
  status-interview-text: "#5E3BB5"
  status-interview-bg: "#F2EEFF"
  status-offer-text: "#1D7A46"
  status-offer-bg: "#EAF7EF"
  status-rejected-text: "#B42318"
  status-rejected-bg: "#FFF1F0"
```

**Правила применения**

- В одной карточке не больше трёх цветовых пятен: тинт статуса, тинт срочности и нейтральный текст.
- Цветные рамки, градиентные обводки, свечения и цветные фоны карточек запрещены.
- Статус никогда не меняет рамку или фон карточки — только бейдж.
- Контраст обычного текста — не ниже 4,5:1. Пары из таблицы проверены.
- `ink-disabled` допустим только для необязательного текста и нулевых счётчиков, не для смысловых подписей.

## Typography

Системная типографика без веб-шрифтов: `SF Pro Display` для крупных заголовков, `SF Pro Text` для интерфейса, затем `-apple-system`, `BlinkMacSystemFont`, `Helvetica Neue`, `Arial`. Такой стек даёт нативный SF Pro на macOS и iOS и аккуратный fallback на других платформах. Подключать SF Pro из сторонних CDN запрещено.

- **Display:** 28 px, 600, плотный трекинг `-0.02em`. Только заголовок приложения.
- **Title:** 20 px и 17 px, 600. Заголовки модалок, пустых состояний и компания в карточке.
- **Body:** 15 px и 14 px, 400. Основной текст, должность, заметки.
- **Labels:** 13 px и 12 px, 500. Кнопки, метки полей, бейджи и сегменты.
- **Numeric:** 12 px, 400, `tnum`. Счётчики, даты и сводка — цифры не «прыгают» при обновлении.

Все тексты — в предложении, без uppercase. Максимум три веса на экране: 400, 500, 600. `700` не используется.

```yaml
typography:
  display:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
    fontSize: 28px
    fontWeight: 600
    lineHeight: 1.15
    letterSpacing: -0.02em
  title-lg:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
    fontSize: 20px
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: -0.01em
  title-md:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Helvetica Neue", Arial, sans-serif'
    fontSize: 17px
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: -0.005em
  body-md:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-sm:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: 0em
  label-md:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    fontSize: 13px
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: 0em
  label-sm:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.25
    letterSpacing: 0em
  caption:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: 0em
  numeric:
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "Helvetica Neue", Arial, sans-serif'
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.2
    letterSpacing: 0em
    fontFeature: "tnum"
```

## Layout

Одна колонка, левая выключка, ширина контента до **880 px**. Страница центрируется, боковые отступы 24 px на десктопе и 16 px на мобильном.

Ритм — 8 px с половинным шагом 4 px. Между секциями 24–32 px, между карточками 12 px, внутри карточки 20 px, внутри модалки 24 px. Заголовок шапки и кнопка «+ Вакансия» стоят в одной строке на десктопе и складываются в стек на мобильном.

```yaml
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  "2xl": 24px
  "3xl": 32px
  "4xl": 40px
  "5xl": 48px
  "6xl": 64px
  page-x: 24px
  page-x-mobile: 16px
  content-max: 880px
  card-gap: 12px
  section-gap: 24px
  control-height: 36px
  control-height-sm: 28px
  touch-target: 44px
  modal-max: 560px
  dialog-max: 420px
```

**Адаптив**

- До 640 px: боковые отступы 16 px, шапка в стек, главная кнопка на всю ширину, форма в одну колонку, кнопки карточки растягиваются, модалка занимает `calc(100% - 32px)` и скроллится внутри.
- Segmented Control на узком экране прокручивается по горизонтали и не переносится на вторую строку.
- Минимальная область нажатия — 44 px, даже если визуальная высота контрола 36 px.
- Горизонтального переполнения быть не должно на 390 px и на 1180 px.

## Elevation & Depth

Глубина строится на **слоях поверхностей и волосяных границах**, а не на тяжёлых тенях. Canvas `#F5F5F7` — нижний слой, белая поверхность — верхний. Этого достаточно, чтобы карточка читалась без тени.

- **Уровень 0 — canvas.** Без границы и тени.
- **Уровень 1 — карточка, пустое состояние.** Граница 1 px `#E5E5EA`; допускается едва заметная тень `0 1px 2px rgba(0, 0, 0, 0.03)`.
- **Уровень 2 — hover карточки.** Граница `#D1D1D6` и тень `0 2px 8px rgba(0, 0, 0, 0.06)`. Без `transform` и масштабирования.
- **Уровень 3 — модалка и подтверждение.** Overlay `rgba(0, 0, 0, 0.40)` без blur, панель с тенью `0 24px 64px rgba(0, 0, 0, 0.18)`.
- **Выбранный сегмент.** Белая заливка и тень `0 1px 2px rgba(0, 0, 0, 0.08)` — только чтобы отделиться от трека.

Тени не используются на кнопках, полях ввода, бейджах и вторичных поверхностях. Focus-ring — это доступность, а не глубина: рамка `#0071E3` плюс кольцо `0 0 0 3px rgba(0, 113, 227, 0.28)`.

## Shapes

Форма спокойная и почти прямоугольная. Крупные скругления только у модалок; pill — только у бейджей.

- **4 px (`xs`)** — микроповерхности и внутренние элементы.
- **6 px (`sm`)** — date-badge, выбранный сегмент, маленькие кнопки.
- **8 px (`md`)** — кнопки, поиск, поля ввода и select.
- **10 px (`lg`)** — трек Segmented Control, баннеры.
- **12 px (`xl`)** — карточка вакансии, пустое состояние.
- **16 px (`2xl`)** — модальная форма и диалог подтверждения.
- **9999 px (`full`)** — только статусные бейджи-пилюли.

Смешивать острые и круглые углы в одном блоке нельзя. Вложенный элемент всегда на 2–4 px «острее» родителя: сегмент 6 px внутри трека 10 px, поле 8 px внутри модалки 16 px.

```yaml
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 10px
  xl: 12px
  "2xl": 16px
  full: 9999px
```

## Components

Описываем только то, что есть в PRD. Никаких иконок, аватаров, обложек и дополнительных контролов.

### Шапка

Заголовок «Карьерный дневник» — `display`, графит. Подзаголовок — `body-sm`, `ink-tertiary`, максимально в одну–две строки. Справа — только primary-кнопка «+ Вакансия». Без иконки приложения, аватара, логотипа и дополнительных действий.

### Кнопки

- **Primary:** графитовая заливка, белый текст, высота 36 px, радиус 8 px, горизонтальные отступы 16 px. Hover — `#000000`, active — `#3A3A3C`, disabled — 40 % прозрачности без смены цвета.
- **Secondary:** белая поверхность, граница 1 px `#E5E5EA`, графитовый текст. Hover — `#F2F2F7`, active — `#E5E5EA`.
- **Small:** высота 28 px, 12 px/500, отступы 10 px по горизонтали. Используется в футере карточки.
- **Danger ghost:** прозрачный фон, текст `#B42318`. Hover — фон `#FFF1F0`. Применяется для «Удалить» в карточке.
- **Danger solid:** заливка `#B42318`, белый текст. Только подтверждение удаления.
- Текст кнопок — в предложении, без uppercase; иконка не заменяет подпись.

### Поиск

Поле на всю ширину, высота 36 px, белая поверхность, граница `#D1D1D6`, радиус 8 px, текст 14 px. Placeholder — `#6E6E73`. Focus — граница `#0071E3` и кольцо `rgba(0, 113, 227, 0.28)`. Без иконки лупы: подпись и placeholder объясняют назначение.

### Segmented Control

Главный «фирменный» элемент Apple HIG. Это фильтр статусов, а не навигация.

- Трек — `#EFEFF4`, высота 36 px, внутренний отступ 3 px, радиус 10 px.
- Сегменты — короткие подписи: «Все», «Отклик», «Скрининг», «Тестовое», «Интервью», «Оффер», «Отказ». Полное «Тестовое задание» остаётся в бейдже карточки и в select формы.
- Рядом с подписью — счётчик: 12 px, tabular, `#6E6E73`, через пробел, без скобок.
- Выбранный сегмент — белая заливка, радиус 6 px, лёгкая тень, графитовый текст 13 px/500. Никакой графитовой или синей заливки всего сегмента.
- Невыбранный — прозрачный фон, `#5B5B60`; hover — текст `#1D1D1F` и едва заметный белый тинт.
- Нулевой статус остаётся видимым, но disabled: 45 % прозрачности, без hover, счётчик «0».
- На мобильном — горизонтальный скролл без переноса, без видимого скроллбара.

### Сводка

Строка «Всего: 6 · Просрочено: 1» — 12 px numeric, `#6E6E73`, tabular. Число просроченных — `#B42318`. Сводка не заключается в карточку и не получает фона.

### Карточка вакансии

Белая поверхность, граница 1 px `#E5E5EA`, радиус 12 px, внутренние отступы 20 px, расстояние между карточками 12 px. Карточка — текстовая, без обложки и аватара.

- **Компания** — `title-md`, графит, одна строка с ellipsis.
- **Должность** — `body-sm`, `ink-secondary`, одна строка с ellipsis.
- **Бейдж статуса** — справа сверху, pill, 12 px/500, отступы 4×9 px, тинт и текст из пары статуса.
- **Блок дат** — под заголовком, gap 8 px. Каждый бейдж: 12 px/500, отступы 4×8 px, радиус 6 px. Внутри — подпись «Тестовое:» / «Собеседование:», относительная дата и абсолютная дата через `·`. Абсолютная дата — 70 % прозрачности, tabular.
- **Заметки** — `body-sm`, `ink-secondary`, максимум две строки через line-clamp. Полный текст доступен в title и в форме.
- **Футер** — отделён верхней границей 1 px `#F2F2F7`, отступ сверху 12 px. Слева ссылка, справа «Изменить» и «Удалить».
- **Hover** — только граница `#D1D1D6` и мягкая тень. Без подъёма, масштаба и смены фона.
- **Подсветка после сохранения** — графитовое кольцо 3 px `rgba(29, 29, 31, 0.12)` на 1,8 секунды. Не цветная рамка.
- **Нет ссылки** — футер без placeholder, действия прижаты вправо.
- **Нет дат** — пунктирный бейдж «Даты не указаны»: прозрачный фон, граница `#D1D1D6`, текст `#6E6E73`.

### Бейджи статусов

| Статус | Текст | Фон |
|---|---|---|
| Отклик | `#5B5B60` | `#F2F2F7` |
| Скрининг | `#0057B8` | `#EAF2FF` |
| Тестовое задание | `#8A5300` | `#FFF4E5` |
| Интервью | `#5E3BB5` | `#F2EEFF` |
| Оффер | `#1D7A46` | `#EAF7EF` |
| Отказ | `#B42318` | `#FFF1F0` |

Бейдж не бывает контурным и не получает тень. Цвет бейджа не переносится на рамку карточки.

### Бейджи дат и срочность

| Тон | Когда | Текст | Фон |
|---|---|---|---|
| `overdue` | дедлайн в прошлом | `#B42318` | `#FFF1F0` |
| `today` | сегодня | `#7A4A00` | `#FFE8CC` |
| `soon` | завтра и через 2 дня | `#8A5300` | `#FFF4E5` |
| `future` | позже | `#5B5B60` | `#F2F2F7` |
| `past` | прошедшее собеседование | `#6E6E73` | `#F2F2F7` |
| `empty` | дат нет | `#6E6E73` | прозрачный, dashed `#D1D1D6` |

Срочность меняет только тинт даты. «Сегодня» не становится красным: красный зарезервирован за просрочкой и ошибками.

### Ссылка на вакансию

13 px/500, графит, подчёркивание с `text-underline-offset: 2px`. Hover — толщина подчёркивания 2 px. Синий цвет ссылки запрещён: акцент интерфейса графитовый. Ссылка обрезается ellipsis и ведёт в новую вкладку.

### Модальная форма

Overlay `rgba(0, 0, 0, 0.40)` без blur. Панель — белая, ширина до 560 px, радиус 16 px, внутренние отступы 24 px, тень `0 24px 64px rgba(0, 0, 0, 0.18)`. Заголовок — `title-lg`. На мобильном — `calc(100% - 32px)`, отступы 20 px, внутренний скролл.

Поля формы:

- Метка — 13 px/500, `#5B5B60`; обязательное поле помечается звёздочкой `#B42318`.
- Input / select / textarea — высота 36 px, белый фон, граница `#D1D1D6`, радиус 8 px, текст 14 px. Textarea — минимум 72 px, resize только по вертикали.
- Focus — граница `#0071E3` и кольцо `rgba(0, 113, 227, 0.28)`, без `outline: none` в пользу кастомного кольца.
- Ошибка — граница `#B42318`, сообщение 12 px `#B42318` под полем. Ошибка не заменяет метку.
- Сетка полей — две колонки на десктопе (компания/должность, дедлайн/собеседование), одна на мобильном.
- Кнопки — «Отмена» secondary слева от primary «Сохранить», прижаты вправо. На мобильном можно растянуть на всю ширину.

### Подтверждение

Диалог до 420 px, радиус 16 px, отступы 24 px, заголовок `title-lg`. Отмена — secondary, подтверждение — danger solid. Кнопка отмены стоит слева. Overlay тот же, без blur.

### Пустые состояния

Белая поверхность, граница 1 px `#E5E5EA`, радиус 12 px, внутренние отступы 40 px, выравнивание по центру. Без иллюстраций, иконок и emoji.

- **Нет вакансий:** заголовок «Пока ни одной вакансии» (`title-lg`), пояснение `body-sm` и две кнопки: primary «Добавить первую», secondary «Загрузить примеры». Ниже — подсказка 12 px `#6E6E73` о локальном хранении.
- **Ничего не найдено:** компактный вариант с отступами 32×20 px, заголовок `title-lg`, кнопка «Сбросить фильтры».

### Баннеры

Полоса на всю ширину контента, радиус 10 px, отступы 12×16 px, без иконок и без тени. Текст 14 px.

- **Notice:** фон `#EAF7EF`, текст `#1D7A46` — «Вакансия добавлена», «Изменения сохранены».
- **Warning:** фон `#FFF4E5`, текст `#8A5300` — «Данные не сохраняются» и другие предупреждения хранилища.

Баннер не перекрывает контент и не превращается в toast поверх карточек.

```yaml
components:
  app-header:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.ink}"
    typography: "{typography.display}"
    padding: "{spacing.2xl}"
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
    padding: 8px
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
  button-primary-active:
    backgroundColor: "{colors.primary-active}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
    padding: 8px
  button-secondary-hover:
    backgroundColor: "{colors.surface-subtle}"
  button-small:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: "{spacing.control-height-sm}"
    padding: 4px
  button-danger-ghost:
    backgroundColor: transparent
    textColor: "{colors.danger}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: "{spacing.control-height-sm}"
    padding: 4px
  button-danger-ghost-hover:
    backgroundColor: "{colors.danger-bg}"
  button-danger:
    backgroundColor: "{colors.danger}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
    padding: 8px
  search-field:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
    padding: 8px
  search-field-placeholder:
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.body-sm}"
  segmented-control:
    backgroundColor: "{colors.surface-sunken}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.lg}"
    height: "{spacing.control-height}"
    padding: 3px
  segmented-control-selected:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
  segmented-control-count:
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.numeric}"
  segmented-control-disabled:
    textColor: "{colors.ink-disabled}"
    typography: "{typography.label-md}"
  summary:
    textColor: "{colors.ink-tertiary}"
    typography: "{typography.numeric}"
  vacancy-card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 20px
  vacancy-card-title:
    textColor: "{colors.ink}"
    typography: "{typography.title-md}"
  vacancy-card-position:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body-sm}"
  vacancy-card-notes:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.body-sm}"
  status-badge:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.full}"
    height: 22px
    padding: 4px
  status-badge-applied:
    backgroundColor: "{colors.status-applied-bg}"
    textColor: "{colors.status-applied-text}"
  status-badge-screening:
    backgroundColor: "{colors.status-screening-bg}"
    textColor: "{colors.status-screening-text}"
  status-badge-test:
    backgroundColor: "{colors.status-test-bg}"
    textColor: "{colors.status-test-text}"
  status-badge-interview:
    backgroundColor: "{colors.status-interview-bg}"
    textColor: "{colors.status-interview-text}"
  status-badge-offer:
    backgroundColor: "{colors.status-offer-bg}"
    textColor: "{colors.status-offer-text}"
  status-badge-rejected:
    backgroundColor: "{colors.status-rejected-bg}"
    textColor: "{colors.status-rejected-text}"
  date-badge:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label-sm}"
    rounded: "{rounded.sm}"
    height: 22px
    padding: 4px
  date-badge-overdue:
    backgroundColor: "{colors.danger-bg}"
    textColor: "{colors.danger}"
  date-badge-today:
    backgroundColor: "{colors.warning-strong-bg}"
    textColor: "{colors.warning-strong-text}"
  date-badge-soon:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning}"
  date-badge-future:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink-secondary}"
  date-badge-past:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink-tertiary}"
  date-badge-empty:
    backgroundColor: transparent
    textColor: "{colors.ink-tertiary}"
  vacancy-link:
    backgroundColor: transparent
    textColor: "{colors.ink}"
    typography: "{typography.label-md}"
  modal-overlay:
    backgroundColor: "{colors.overlay}"
  modal:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: 24px
    width: "{spacing.modal-max}"
  confirm-dialog:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.2xl}"
    padding: 24px
    width: "{spacing.dialog-max}"
  field-label:
    textColor: "{colors.ink-secondary}"
    typography: "{typography.label-md}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    height: "{spacing.control-height}"
    padding: 8px
  input-focus:
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
  textarea:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.md}"
    padding: 8px
  field-error:
    textColor: "{colors.danger}"
    typography: "{typography.caption}"
  empty-state:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.xl}"
    padding: 40px
  banner-notice:
    backgroundColor: "{colors.success-bg}"
    textColor: "{colors.success}"
    rounded: "{rounded.lg}"
    padding: 12px
  banner-warning:
    backgroundColor: "{colors.warning-bg}"
    textColor: "{colors.warning}"
    rounded: "{rounded.lg}"
    padding: 12px
```

## Do's and Don'ts

**Do**

- Держать ритм 8 px и полушаг 4 px; выравнивать текст влево.
- Использовать графит как единственный акцент, а синий — только для focus-ring.
- Отделять слои волосяной границей `#E5E5EA`, а не тенью.
- Показывать статус приглушённым бейджем, а срочность — тинтом даты.
- Применять tabular numbers для счётчиков, дат и сводки.
- Сохранять область нажатия не меньше 44 px; высота контрола при этом может быть 36 px.
- Проверять контраст AA: 4,5:1 для обычного текста.
- Анимировать только цвет, границу и тень за 120–160 мс с `ease`; уважать `prefers-reduced-motion`.
- Обрезать длинные значения через ellipsis и давать полный текст в `title` и в форме.
- Оставлять пустые состояния текстовыми, без иллюстраций.

**Don't**

- Не использовать градиенты, glassmorphism, blur, шум, неоновые свечения и декоративные обводки.
- Не делать цветные или «радужные» рамки карточек; не менять фон карточки по статусу.
- Не добавлять аватары, инициалы, логотипы компаний, обложки, иллюстрации, emoji и иконки-заглушки.
- Не использовать pill-фильтры вместо Apple Segmented Control.
- Не делать ссылки и главные кнопки синими; синий — только фокус.
- Не добавлять тёмную тему, второй акцент, дополнительные экраны, sidebar, календарь, dock, канбан и таблицы.
- Не использовать красный как primary-цвет; красный — только просрочка, ошибка и деструктивное подтверждение.
- Не писать метки uppercase и не использовать больше трёх весов шрифта.
- Не добавлять функции, которых нет в PRD, даже если они есть в референсе.
- Не ставить тени на кнопки, поля и бейджи; не складывать несколько теней.
- Не отключать видимый focus без замены на кастомное кольцо.
- Не подключать SF Pro из сторонних CDN: только системный стек.
