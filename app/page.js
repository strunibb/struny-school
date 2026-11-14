"use client";
import { useEffect, useRef, useState } from "react";
import { DirectionCard, Techniques } from "./interactive";
import { programTracks, extendedTracks } from "./program-data";

const telegram = "https://t.me/nikguitar";
const channel = "https://t.me/nikguita";
const booking = "https://n1313298.yclients.ru";
const reviews = "https://profi.ru/profile/OsadchukNA2/";
const catalog = "https://strunibb.github.io/struny-songs/";
const lessonRequest =
  telegram +
  "?text=" +
  encodeURIComponent(
    "Никита, здравствуйте! Пришлите, пожалуйста, пример урока курса «Базовый минимум».",
  );
const instruments = [
  {
    id: "guitar",
    name: "Гитара",
    note: "От первых аккордов до любимых песен",
    text: "Полный видеокурс, обучение «2+2» или индивидуальные занятия. Осваивайте аккорды, бой и переборы в своём темпе.",
  },
  {
    id: "electric",
    name: "Электрогитара",
    note: "Риффы, ритм и соло",
    text: "Индивидуальные занятия с Никитой. Работа над медиатором, звукоизвлечением и композициями под ваш уровень.",
  },
  {
    id: "ukulele",
    name: "Укулеле",
    note: "Первые аккорды и знакомые мелодии",
    text: "Индивидуальные занятия с Никитой. Настройка, постановка рук, аккорды и ритм на любимых песнях.",
  },
  {
    id: "piano",
    name: "Фортепиано",
    note: "Мелодия, аккомпанемент и две руки",
    text: "Индивидуальные занятия с Никитой. Ноты, координация рук, ритм и произведения с учётом вашего опыта.",
  },
];
const coursePlans = [
  {
    title: "Самостоятельно",
    price: "5 990",
    selection: "Курс «Базовый минимум» самостоятельно — 5 990 ₽",
    points: [
      "Полная программа курса",
      "Доступ ко всем материалам на год",
      "Видео, упражнения и PDF",
      "Тренажёры для самостоятельной практики",
    ],
    note: "Проходите уроки в удобном темпе.",
  },
  {
    title: "С проверкой",
    price: "9 990",
    selection: "Курс «Базовый минимум» с проверкой — 9 990 ₽",
    points: [
      "Та же полная программа курса",
      "Доступ ко всем материалам на год",
      "Проверка домашних заданий — 6 месяцев",
      "Исправления и рекомендации Никиты",
    ],
    note: "Итоговое задание по разделу и одна повторная проверка после исправлений.",
  },
];
const questions = [
  [
    "Чем отличаются два тарифа курса?",
    "В обоих тарифах одна полная программа и год доступа к материалам. За 9 990 ₽ дополнительно включены шесть месяцев проверки домашних заданий Никитой. В каждом разделе — итоговое задание и одна повторная проверка после исправлений. Ответ — в течение двух рабочих дней.",
  ],
  [
    "Как проходит обучение «2+2»?",
    "За четыре недели проходят два индивидуальных урока по 40 минут и две недели самостоятельной работы по готовым видеозаданиям. На каждой самостоятельной неделе вы присылаете одну запись для проверки. Порядок недель согласуем перед началом.",
  ],
  [
    "Входит ли полный курс в «2+2»?",
    "В «2+2» входят подготовленные материалы под ваши текущие задачи на оплаченные четыре недели. Годовой доступ к полному курсу приобретается отдельно.",
  ],
  [
    "Можно начать с нуля?",
    "Да. Для гитары в курсе есть последовательный базовый старт — от настройки и постановки рук до первой песни. Для других инструментов Никита подбирает начало программы на индивидуальных занятиях.",
  ],
  [
    "Как получить курс или записаться?",
    "Выберите формат и отправьте подготовленное сообщение Никите в Telegram. Он подтвердит условия и подскажет способ оплаты и получения материалов. Для индивидуальных занятий также доступна онлайн-запись.",
  ],
  [
    "Что понадобится для личного урока?",
    "Инструмент, устойчивый интернет и телефон или компьютер с камерой. Расположите камеру так, чтобы были видны обе руки. Одна встреча длится 40 минут.",
  ],
  [
    "Можно посмотреть пример урока?",
    "Да, запросите бесплатный пример в Telegram. Посмотрите, как Никита объясняет и показывает движения, прежде чем выбирать курс.",
  ],
  [
    "Как перенести занятие?",
    "Правила переносов и сроки действия абонемента согласуются перед оплатой. Для действующих учеников подробности находятся в памятке ученика.",
  ],
];
function Icon({ name, ...props }) {
  const paths = {
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    external: <path d="M6 18 18 6M6 6h12v12" />,
    play: <path d="m9 5 11 7-11 7V5Z" />,
    close: <path d="m6 6 12 12M18 6 6 18" />,
    check: <path d="m5 12 4 4L19 6" />,
    music: (
      <>
        <path d="M9 18V5l10-2v13" />
        <circle cx="6" cy="18" r="3" />
        <circle cx="16" cy="16" r="3" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    message: (
      <path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1-6a6 6 0 0 1-1-3V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v7Z" />
    ),
    video: (
      <>
        <rect x="3" y="5" width="13" height="14" rx="3" />
        <path d="m16 10 5-3v10l-5-3" />
      </>
    ),
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      {paths[name] || paths.music}
    </svg>
  );
}
function Logo() {
  return (
    <span className="logo">
      <span className="logo-symbol" aria-hidden="true">
        <i />
        <i />
        <i />
        <i />
      </span>
      <span>
        СТРУНЫ<small>БУДУЩЕГО</small>
      </span>
    </span>
  );
}
function OutLink({ href, children, className = "" }) {
  return (
    <a
      className={className}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
}
function Dialog({ title, onClose, children, wide = false }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement;
    dialog.showModal();
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      dialog.close();
      previous?.focus?.();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={"dialog" + (wide ? " dialog-wide" : "")}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <button
          className="round-button dialog-close"
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <h2 id="dialog-title">{title}</h2>
        {children}
      </div>
    </dialog>
  );
}
function BookingDialog({
  selection,
  instrument,
  initialLevel,
  guitarOnly = false,
  onClose,
}) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [choice, setChoice] = useState(instrument || "Гитара");
  const [level, setLevel] = useState(initialLevel || "С нуля");
  const message = [
    "Здравствуйте, Никита! Хочу заниматься в школе «Струны будущего».",
    name.trim() ? "Меня зовут " + name.trim() + "." : null,
    "Инструмент: " + choice,
    "Уровень: " + level,
    "Интересует: " + selection,
  ]
    .filter(Boolean)
    .join("\n");
  return (
    <Dialog
      title={step === 0 ? "Начнём с ваших целей" : "Обсудим ваш выбор"}
      onClose={onClose}
    >
      <p className="dialog-subtitle">
        {step === 0
          ? "Выберите инструмент и ваш уровень."
          : "Никита подтвердит условия, поможет с оплатой и доступом."}
      </p>
      <div className="step-progress">
        <span className="active" />
        <span className={step === 1 ? "active" : ""} />
      </div>
      {step === 0 ? (
        <>
          <fieldset>
            <legend>На чём хотите играть?</legend>
            <div className="option-grid">
              {instruments
                .filter((item) => !guitarOnly || item.name === "Гитара")
                .map((item) => (
                  <button
                    key={item.name}
                    aria-pressed={choice === item.name}
                    className={
                      choice === item.name ? "option active" : "option"
                    }
                    onClick={() => setChoice(item.name)}
                  >
                    {item.name}
                  </button>
                ))}
            </div>
          </fieldset>
          <fieldset>
            <legend>Ваш опыт</legend>
            <div className="level-options">
              {["С нуля", "Знаю основы", "Уже играю"].map((item) => (
                <button
                  key={item}
                  className={level === item ? "option active" : "option"}
                  aria-pressed={level === item}
                  onClick={() => setLevel(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          </fieldset>
          <button className="button lime full" onClick={() => setStep(1)}>
            Далее <Icon name="arrow" />
          </button>
        </>
      ) : (
        <>
          <div className="booking-summary">
            <span>
              {choice} · {level}
            </span>
            <strong>{selection}</strong>
          </div>
          <label className="name-label" htmlFor="booking-name">
            Как к вам обращаться? <small>необязательно</small>
          </label>
          <input
            id="booking-name"
            autoComplete="given-name"
            placeholder="Ваше имя"
            value={name}
            maxLength={80}
            onChange={(e) => setName(e.target.value)}
          />
          <OutLink
            className="button lime full"
            href={telegram + "?text=" + encodeURIComponent(message)}
          >
            Продолжить в Telegram <Icon name="external" />
          </OutLink>
          <p className="form-note">
            Откроется готовое сообщение. Отправьте его Никите, чтобы подтвердить
            выбранный формат.
          </p>
          <div className="dialog-bottom">
            <button className="text-button" onClick={() => setStep(0)}>
              ← Назад
            </button>
            {!guitarOnly && (
              <OutLink href={booking}>
                Онлайн-запись <Icon name="external" className="inline-icon" />
              </OutLink>
            )}
          </div>
        </>
      )}
    </Dialog>
  );
}
export default function Home() {
  const [instrument, setInstrument] = useState(0);
  const [format, setFormat] = useState("course");
  const [selectedLevel, setSelectedLevel] = useState("С нуля");
  const [modal, setModal] = useState(null);
  const [menu, setMenu] = useState(false);
  const [moreMaterials, setMoreMaterials] = useState(false);
  const menuRef = useRef(null);
  const menuButton = useRef(null);
  useEffect(() => {
    const readLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const index = instruments.findIndex(
        (item) => item.id === params.get("instrument"),
      );
      const chosen = index >= 0 ? index : 0;
      const requested = params.get("format");
      const courseAnchor = ["#course", "#program"].includes(
        window.location.hash,
      );
      if (courseAnchor) {
        const url = new URL(window.location.href);
        url.searchParams.set("instrument", "guitar");
        url.searchParams.set("format", "course");
        window.history.replaceState(null, "", url);
      }
      setInstrument(courseAnchor ? 0 : chosen);
      setFormat(
        courseAnchor
          ? "course"
          : chosen === 0 &&
              ["course", "hybrid", "individual"].includes(requested)
            ? requested
            : chosen === 0
              ? "course"
              : "individual",
      );
    };
    readLocation();
    window.addEventListener("popstate", readLocation);
    window.addEventListener("hashchange", readLocation);
    return () => {
      window.removeEventListener("popstate", readLocation);
      window.removeEventListener("hashchange", readLocation);
    };
  }, []);
  useEffect(() => {
    if (!menu) return;
    menuRef.current?.querySelector("a")?.focus();
    const escape = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  const choose = (
    index,
    nextFormat = index === 0 ? "course" : "individual",
  ) => {
    setInstrument(index);
    setFormat(nextFormat);
    const url = new URL(window.location.href);
    url.searchParams.set("instrument", instruments[index].id);
    url.searchParams.set("format", nextFormat);
    url.hash = "directions";
    window.history.replaceState(null, "", url);
  };
  const openBooking = (
    selection = "Подобрать обучение",
    guitarOnly = false,
  ) => {
    setMenu(false);
    setModal({
      type: "booking",
      selection,
      instrument: guitarOnly ? "Гитара" : instruments[instrument].name,
      guitarOnly,
      initialLevel: selectedLevel,
    });
  };
  return (
    <div className="school-hub">
      <a className="skip-link" href="#main">
        К содержимому
      </a>
      <header className="header">
        <div className="header-inner">
          <a href="#top" aria-label="Струны будущего — на главную">
            <Logo />
          </a>
          <nav
            ref={menuRef}
            id="navigation"
            className={menu ? "navigation is-open" : "navigation"}
            aria-label="Главное меню"
          >
            <a href="#directions" onClick={() => setMenu(false)}>
              Обучение
            </a>
            <a
              href="#course"
              onClick={() => {
                choose(0, "course");
                setMenu(false);
              }}
            >
              Курс гитары
            </a>
            <a href={catalog}>
              Каталог песен <Icon name="external" className="inline-icon" />
            </a>
            <a href="#teacher" onClick={() => setMenu(false)}>
              Преподаватель
            </a>
            <a href="#reviews" onClick={() => setMenu(false)}>
              Отзывы
            </a>
          </nav>
          <button className="header-cta" onClick={() => openBooking()}>
            Помочь с выбором <Icon name="arrow" />
          </button>
          <button
            ref={menuButton}
            className="menu-button"
            aria-expanded={menu}
            aria-controls="navigation"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenu(!menu)}
          >
            {menu ? (
              <Icon name="close" />
            ) : (
              <>
                <span />
                <span />
              </>
            )}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="hub-hero wrap" id="top">
          <div className="hub-hero-copy">
            <p className="eyebrow">Онлайн-школа Никиты Осадчука</p>
            <h1>
              Играй музыку,
              <br />
              <span>которая нравится.</span>
            </h1>
            <p className="hub-lead">
              Курс гитары, личные занятия и готовые разборы песен. Выберите
              инструмент и учитесь в своём темпе.
            </p>
            <div className="hub-actions">
              <a className="button lime" href="#directions">
                Выбрать обучение <Icon name="arrow" />
              </a>
              <a className="button outline" href={catalog}>
                Найти песню <Icon name="music" />
              </a>
            </div>
            <div className="hub-hero-links">
              <a href="#course" onClick={() => choose(0, "course")}>
                Видеокурс от 5 990 ₽{" "}
                <Icon name="external" className="inline-icon" />
              </a>
              <a
                href="#prices"
                onClick={() => choose(instrument, "individual")}
              >
                Личные уроки от 3 990 ₽ за 4 занятия{" "}
                <Icon name="external" className="inline-icon" />
              </a>
            </div>
          </div>
          <div className="hub-hero-photo">
            <img
              src="./nikita-hero.webp"
              width="1000"
              height="1000"
              alt="Никита Осадчук с гитарой"
              fetchPriority="high"
            />
            <div className="hub-photo-caption">
              <strong>Никита Осадчук</strong>
              <span>Преподаю с 2019 года</span>
            </div>
          </div>
        </section>
        <section className="section directions" id="directions">
          <div className="wrap">
            <div className="section-title">
              <h2>
                На чём хотите <span>играть?</span>
              </h2>
              <p>Выберите инструмент, затем формат обучения.</p>
            </div>
            <div
              className="direction-cards"
              role="group"
              aria-label="Выберите инструмент"
            >
              {instruments.map((item, i) => (
                <DirectionCard
                  key={item.id}
                  item={item}
                  index={i}
                  selected={instrument === i}
                  onSelect={() => choose(i)}
                />
              ))}
            </div>
            <div
              className="hub-selection"
              id="instrument-panel"
              aria-live="polite"
            >
              <h3>{instruments[instrument].note}</h3>
              <p>{instruments[instrument].text}</p>
            </div>
            <div id="prices" className="hub-formats">
              {instrument === 0 && (
                <div
                  className="price-switch"
                  role="group"
                  aria-label="Формат обучения"
                >
                  {[
                    ["course", "Полный курс"],
                    ["hybrid", "2+2"],
                    ["individual", "Личные занятия"],
                  ].map(([id, label]) => (
                    <button
                      key={id}
                      aria-pressed={format === id}
                      className={format === id ? "active" : ""}
                      onClick={() => choose(instrument, id)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
              {format === "course" && instrument === 0 ? (
                <div id="course">
                  <div className="hub-course-heading">
                    <div>
                      <p className="label">Полный видеокурс по гитаре</p>
                      <h2>Базовый минимум</h2>
                      <p>
                        От знакомства с инструментом до боёв, переборов и
                        исполнения песен. Одна программа в обоих тарифах.
                      </p>
                    </div>
                    <a href="#program" className="text-button">
                      Посмотреть программу ↓
                    </a>
                  </div>
                  <div className="hub-course-grid">
                    {coursePlans.map((plan, i) => (
                      <article
                        className={"price-card" + (i === 1 ? " featured" : "")}
                        key={plan.title}
                      >
                        <h3>{plan.title}</h3>
                        <div className="price-amount">
                          {plan.price}
                          <span> ₽</span>
                        </div>
                        <p className="price-unit">Один платёж за полный курс</p>
                        <ul className="check-list">
                          {plan.points.map((point) => (
                            <li key={point}>
                              <Icon name="check" />
                              {point}
                            </li>
                          ))}
                        </ul>
                        <p className="hub-plan-note">{plan.note}</p>
                        <button
                          className={
                            "button full " + (i === 1 ? "lime" : "outline")
                          }
                          onClick={() => openBooking(plan.selection, true)}
                        >
                          Выбрать курс <Icon name="arrow" />
                        </button>
                      </article>
                    ))}
                  </div>
                  <div className="hub-sample">
                    <p>Посмотрите пример объяснения перед покупкой.</p>
                    <a
                      href={lessonRequest}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-button"
                    >
                      Получить пример урока{" "}
                      <Icon name="external" className="inline-icon" />
                    </a>
                  </div>
                </div>
              ) : format === "hybrid" && instrument === 0 ? (
                <article className="hub-service">
                  <div>
                    <p className="label">Гитара · четыре недели</p>
                    <h2>
                      Две встречи.
                      <br />
                      <span>Две недели по видео.</span>
                    </h2>
                    <p>
                      Учитесь самостоятельно и встречайтесь с Никитой, чтобы
                      разобрать сложные места.
                    </p>
                    <ol className="hub-weeks">
                      <li>
                        <strong>Личный урок</strong>
                        <span>40 минут, цель и упражнения</span>
                      </li>
                      <li>
                        <strong>Неделя по видео</strong>
                        <span>Готовое задание и проверка записи</span>
                      </li>
                      <li>
                        <strong>Личный урок</strong>
                        <span>40 минут, исправления и практика</span>
                      </li>
                      <li>
                        <strong>Неделя по видео</strong>
                        <span>Закрепление и проверка записи</span>
                      </li>
                    </ol>
                    <p className="hub-plan-note">
                      Порядок недель согласуем с вами. Включены видеозадания по
                      текущим темам. Годовой доступ к полному курсу
                      приобретается отдельно.
                    </p>
                  </div>
                  <div className="hub-service-price">
                    <h3>Абонемент «2+2»</h3>
                    <div className="price-amount">
                      2 990<span> ₽</span>
                    </div>
                    <p>За четыре недели</p>
                    <button
                      className="button lime full"
                      onClick={() =>
                        openBooking(
                          "Гитара — «2+2», 2 990 ₽ за четыре недели",
                          true,
                        )
                      }
                    >
                      Выбрать «2+2» <Icon name="arrow" />
                    </button>
                  </div>
                </article>
              ) : (
                <article className="hub-service">
                  <div>
                    <p className="label">
                      {instruments[instrument].name} · по видеосвязи
                    </p>
                    <h2>
                      Индивидуально
                      <br />
                      <span>с Никитой</span>
                    </h2>
                    <p>{instruments[instrument].text}</p>
                    <ul className="check-list">
                      <li>
                        <Icon name="check" />
                        Четыре занятия по 40 минут
                      </li>
                      <li>
                        <Icon name="check" />
                        Программа под ваш уровень и цели
                      </li>
                      <li>
                        <Icon name="check" />
                        Материалы и задания между встречами
                      </li>
                    </ul>
                    <a href="./schedule/" className="text-button">
                      Посмотреть свободное время{" "}
                      <Icon name="external" className="inline-icon" />
                    </a>
                  </div>
                  <div className="hub-service-price">
                    <h3>Четыре занятия</h3>
                    <div className="price-amount">
                      3 990<span> ₽</span>
                    </div>
                    <p>Абонемент на четыре недели</p>
                    <button
                      className="button lime full"
                      onClick={() =>
                        openBooking("Индивидуально — 4 × 40 минут, 3 990 ₽")
                      }
                    >
                      Записаться <Icon name="arrow" />
                    </button>
                    <a
                      className="text-button"
                      href={booking}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Выбрать время{" "}
                      <Icon name="external" className="inline-icon" />
                    </a>
                  </div>
                </article>
              )}
            </div>
          </div>
        </section>
        {instrument === 0 && (
          <section className="section program pale" id="program">
            <div className="wrap">
              <div className="section-title">
                <h2>
                  Что внутри <span>курса</span>
                </h2>
                <p>Сначала база, затем ритм, приёмы и песни для практики.</p>
              </div>
              <p className="course-included">
                Все разделы ниже входят в полный курс в обоих тарифах.
              </p>
              <div className="course-path">
                {[
                  programTracks[0],
                  ...extendedTracks.filter((item) => item.id !== "materials"),
                ].map((group, groupIndex) => (
                  <div className="path-group" key={group.id}>
                    <div className="path-header">
                      <span>0{groupIndex + 1}</span>
                      <div>
                        <h3>
                          {
                            ["Первые шаги", "Бои и песни", "Приёмы и переборы"][
                              groupIndex
                            ]
                          }
                        </h3>
                        <p>{group.intro}</p>
                      </div>
                    </div>
                    <div className="path-lessons">
                      {group.modules.map((item) => (
                        <details className="lesson" key={item.no}>
                          <summary>
                            <h3>{item.title}</h3>
                            <span className="plus" aria-hidden="true" />
                          </summary>
                          <div className="lesson-body">
                            <p>{item.desc}</p>
                            {item.result && (
                              <p className="lesson-result">{item.result}</p>
                            )}
                            {item.songs && (
                              <p className="lesson-songs">{item.songs}</p>
                            )}
                          </div>
                        </details>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="course-gift">
                <div className="gift-story">
                  <span className="gift-kicker">✦ Бонус к обучению</span>
                  <h3>Подарок к курсу</h3>
                  <p>
                    Тренажёры и PDF-материалы помогают закреплять каждую новую
                    песню в своём темпе.
                  </p>
                  <a href="#materials" className="button primary">
                    Посмотреть тренажёры <Icon name="arrow" />
                  </a>
                </div>
                <div className="gift-gallery" aria-label="Подарки к курсу">
                  <div className="gift-item gift-present">
                    <span className="gift-art" aria-hidden="true">
                      <span className="gift-lid" />
                      <span className="gift-bow" />
                      <span className="gift-box" />
                    </span>
                    <strong>Подарок</strong>
                    <small>К каждому тарифу</small>
                  </div>
                  <div className="gift-item gift-pdf">
                    <span className="gift-art" aria-hidden="true">
                      <span className="gift-book">
                        <span className="gift-book-cover">
                          PDF
                          <span className="gift-book-line" />
                          <span className="gift-book-line short" />
                        </span>
                      </span>
                    </span>
                    <strong>PDF-блокнот</strong>
                    <small>Схемы и упражнения</small>
                  </div>
                  <div className="gift-item gift-practice">
                    <span className="gift-art" aria-hidden="true">
                      <span className="gift-meter">
                        <span className="meter-dial">
                          <i />
                        </span>
                        <span className="meter-keys">♪ ♫ ♪</span>
                      </span>
                    </span>
                    <strong>Тренажёры</strong>
                    <small>Ритм и аккорды</small>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
        <Techniques />
        <section className="section level-explore" id="levels">
          <div className="wrap">
            <div className="section-title">
              <h2>
                С чего начнём <span>именно вы?</span>
              </h2>
              <p>Выберите свой уровень — учтём его при обращении.</p>
            </div>
            <div
              className="level-explore-grid"
              role="group"
              aria-label="Ваш уровень игры"
            >
              {[
                [
                  "С нуля",
                  "Начинаю с нуля",
                  "Знакомимся с инструментом и осваиваем первые аккорды.",
                ],
                [
                  "Знаю основы",
                  "Уже знаю основы",
                  "Работаем над ритмом, переходами и любимыми песнями.",
                ],
                [
                  "Уже играю",
                  "Хочу большего",
                  "Развиваем технику и разбираем сложные композиции.",
                ],
              ].map(([value, title, description], i) => (
                <button
                  key={value}
                  className={
                    "level-explore-card" +
                    (selectedLevel === value ? " selected" : "")
                  }
                  aria-pressed={selectedLevel === value}
                  onClick={() => setSelectedLevel(value)}
                >
                  <span className="level-number">0{i + 1}</span>
                  <span className="level-art" aria-hidden="true">
                    {["♪", "♫", "✦"][i]}
                  </span>
                  <strong>{title}</strong>
                  <span>{description}</span>
                  <em>
                    {selectedLevel === value ? "Выбрано ✓" : "Это про меня ↗"}
                  </em>
                </button>
              ))}
            </div>
            <button
              className="button primary level-continue"
              onClick={() => openBooking()}
            >
              Обсудить обучение <Icon name="arrow" />
            </button>
          </div>
        </section>
        <section className="section hub-catalog" id="catalog">
          <div className="wrap hub-catalog-inner">
            <img
              src="./material-song.webp"
              width="600"
              height="450"
              loading="lazy"
              alt="Материалы для изучения песен на гитаре"
            />
            <div>
              <p className="label">Готовые разборы</p>
              <h2>
                Следующая песня —<br />
                <span>на ваш выбор.</span>
              </h2>
              <p>
                Найдите исполнителя, выберите уровень и посмотрите состав
                разбора. Стоимость указана у каждой песни.
              </p>
              <a className="button lime" href={catalog}>
                Открыть каталог песен <Icon name="arrow" />
              </a>
            </div>
          </div>
        </section>
        <section className="teacher section pale" id="teacher">
          <div className="wrap teacher-grid">
            <div className="teacher-image">
              <img
                src="./nikita-about.webp"
                width="1000"
                height="1000"
                loading="lazy"
                alt="Никита Осадчук — преподаватель школы Струны будущего"
              />
              <span className="teacher-badge">
                Знакомимся!{" "}
                <span>
                  <Icon name="external" className="inline-icon" />
                </span>
              </span>
            </div>
            <div className="teacher-copy">
              <span className="label">Ваш преподаватель</span>
              <h2>
                НИКИТА
                <br />
                <span>ОСАДЧУК</span>
              </h2>
              <p className="teacher-lead">
                Основатель онлайн-школы
                <br />
                «Струны будущего»
              </p>
              <p>
                Преподаю с 2019 года. Раньше руководил музыкальным направлением
                детского центра «Зебра» в Санкт-Петербурге.
              </p>
              <p>
                На уроках соединяем технику с музыкой, которую вам хочется
                играть. Разбираем движения спокойно и подробно, пока они не
                станут понятны.
              </p>
              <div className="teacher-facts">
                <div>
                  <strong>2019</strong>
                  <span>начало преподавания</span>
                </div>
                <div>
                  <strong>1:1</strong>
                  <span>внимание к каждому</span>
                </div>
              </div>
              <button className="button outline" onClick={() => openBooking()}>
                Познакомиться на уроке <Icon name="arrow" />
              </button>
            </div>
          </div>
        </section>

        <section className="section students" id="students">
          <div className="wrap">
            <div className="section-title">
              <h2>
                УЧЕНИКИ
                <br />
                <span>НАШЕЙ ШКОЛЫ</span>
              </h2>
              <p>
                Ученики школы и материалы,
                <br />с которыми мы занимаемся.
              </p>
            </div>
            <div className="student-grid">
              <figure className="student-photo">
                <button
                  className="photo-enlarge"
                  aria-label="Увеличить фото учеников"
                  onClick={() => setModal({ type: "photo" })}
                >
                  <img
                    src="./students-group.webp"
                    alt="Никита и ученики после выступления"
                    width="710"
                    height="532"
                    loading="lazy"
                  />
                  <span className="photo-zoom" aria-hidden="true">
                    <Icon name="external" className="inline-icon" />
                  </span>
                </button>
                <figcaption>Ученики и преподаватель на сцене</figcaption>
              </figure>
              <div className="student-side">
                <span className="oversized-star" aria-hidden="true">
                  ✳
                </span>
                <h3>
                  Занятия
                  <br />и выступления
                </h3>
                <p>
                  Занимаемся техникой и песнями, учимся играть целиком и готовим
                  материал для исполнения.
                </p>
                <OutLink
                  className="button outline"
                  href={
                    telegram +
                    "?text=" +
                    encodeURIComponent(
                      "Никита, здравствуйте! Хочу посмотреть видео с игрой ваших учеников.",
                    )
                  }
                >
                  Посмотреть примеры учеников <Icon name="external" />
                </OutLink>
                <small>Никита пришлёт видео в Telegram</small>
              </div>
            </div>
          </div>
        </section>

        <section className="section reviews pale" id="reviews">
          <div className="wrap reviews-grid">
            <div>
              <span className="label">Впечатления об обучении</span>
              <h2>
                ОТЗЫВЫ
                <br />
                <span>УЧЕНИКОВ</span>
              </h2>
              <p>
                Отзывы учеников и родителей
                <br />в профиле Никиты на Профи.ру.
              </p>
            </div>
            <OutLink className="review-card" href={reviews}>
              <span className="review-quote" aria-hidden="true">
                “
              </span>
              <div>
                <span className="review-source">
                  Профи.ру <Icon name="external" />
                </span>
                <h3>
                  Никита Алексеевич
                  <br />
                  Осадчук
                </h3>
                <p>
                  Посмотрите, что ученики рассказывают о занятиях, объяснениях и
                  своих результатах.
                </p>
                <span className="review-link">
                  Читать отзывы <Icon name="arrow" />
                </span>
              </div>
            </OutLink>
          </div>
        </section>

        <section className="section materials" id="materials">
          <div className="wrap">
            <div className="section-title">
              <h2>
                ПРАКТИКА
                <br />
                <span>МЕЖДУ УРОКАМИ</span>
              </h2>
              <button
                className="text-button"
                aria-expanded={moreMaterials}
                aria-controls="extra-materials"
                onClick={() => setMoreMaterials((v) => !v)}
              >
                {moreMaterials ? "Свернуть" : "Все материалы"}{" "}
                <span>{moreMaterials ? "−" : "+"}</span>
              </button>
            </div>
            <div className="materials-grid">
              <OutLink
                href="https://strunibb.github.io/struny-songs/"
                className="material-card"
              >
                <img
                  src="./material-song.webp"
                  loading="lazy"
                  alt="Аккорды и разбор песни"
                />
                <span>
                  Разборы песен <Icon name="external" />
                </span>
                <p>Выберите музыку для практики</p>
              </OutLink>
              <OutLink
                href="https://strunibb.github.io/akkordi_guitarpro/"
                className="material-card"
              >
                <img
                  src="./material-trainer.webp"
                  loading="lazy"
                  alt="Практика игры на гитаре"
                />
                <span>
                  Тренажёр аккордов <Icon name="external" />
                </span>
                <p>Отработайте смену позиций</p>
              </OutLink>
              <OutLink
                href="https://strunibb.github.io/boi/"
                className="material-card"
              >
                <img
                  src="./material-rhythm.webp"
                  loading="lazy"
                  alt="Практика ритма"
                />
                <span>
                  Бои и переборы <Icon name="external" />
                </span>
                <p>Тренируйте правую руку и ритм</p>
              </OutLink>
            </div>
            <div
              id="extra-materials"
              hidden={!moreMaterials}
              className="extra-materials"
            >
              <button onClick={() => setModal({ type: "video" })}>
                Бесплатный видеоурок <Icon name="play" />
              </button>
              <OutLink href="./student-info/">
                Памятка ученика <Icon name="external" />
              </OutLink>
              <OutLink href="./schedule/">
                Свободное расписание <Icon name="external" />
              </OutLink>
            </div>
          </div>
        </section>

        <section className="section faq" id="faq">
          <div className="wrap faq-grid">
            <div>
              <h2>
                Вопросы
                <br />
                <span>об обучении</span>
              </h2>
              <a
                className="text-button"
                href={telegram}
                target="_blank"
                rel="noopener noreferrer"
              >
                Написать Никите <Icon name="external" className="inline-icon" />
              </a>
            </div>
            <div>
              {questions.map(([q, a]) => (
                <details key={q} className="faq-item">
                  <summary>
                    <h3>{q}</h3>
                    <span className="plus" aria-hidden="true" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="contact outer" id="contact">
          <p className="label">Поможем выбрать</p>
          <h2>
            С чего начнётся
            <br />
            <span>ваша музыка?</span>
          </h2>
          <p>Расскажите, на чём хотите играть и что уже получается.</p>
          <button className="button lime" onClick={() => openBooking()}>
            Обсудить обучение <Icon name="arrow" />
          </button>
        </section>
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <a href="#top" aria-label="Струны будущего — к началу">
            <Logo />
          </a>
          <p>
            Курс гитары, уроки и разборы песен
            <br />
            Никита Осадчук
          </p>
          <div className="footer-socials">
            <OutLink href={channel}>
              Канал Telegram <Icon name="external" className="inline-icon" />
            </OutLink>
            <OutLink href="https://vk.com/strunib">
              ВКонтакте <Icon name="external" className="inline-icon" />
            </OutLink>
            <OutLink href={reviews}>
              Профи.ру <Icon name="external" className="inline-icon" />
            </OutLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 «Струны будущего»</span>
          <a href="./student-info/">Памятка ученика</a>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>

      <a className="hub-mobile-cta" href="#directions">
        Выбрать обучение <Icon name="arrow" />
      </a>
      {modal?.type === "booking" && (
        <BookingDialog
          selection={modal.selection}
          instrument={modal.instrument}
          initialLevel={modal.initialLevel}
          guitarOnly={modal.guitarOnly}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "photo" && (
        <Dialog
          title="Ученики и преподаватель на сцене"
          wide
          onClose={() => setModal(null)}
        >
          <img
            className="gallery-photo"
            src="./students-group.webp"
            alt="Никита с учениками после выступления"
          />
        </Dialog>
      )}
      {modal?.type === "video" && (
        <Dialog title="Пример урока курса" onClose={() => setModal(null)}>
          <p>Никита пришлёт бесплатный пример объяснения в Telegram.</p>
          <a
            href={lessonRequest}
            target="_blank"
            rel="noopener noreferrer"
            className="button lime full"
          >
            Получить пример урока <Icon name="arrow" />
          </a>
        </Dialog>
      )}
    </div>
  );
}
