"use client";

import { useEffect, useRef, useState } from "react";
import { programTracks, extendedTracks } from "./program-data";

const telegram = "https://t.me/nikguita";
const booking = "https://n1313298.yclients.ru";
const reviews = "https://profi.ru/profile/OsadchukNA2/";
const lessonRequest =
  telegram +
  "?text=" +
  encodeURIComponent(
    "Никита, здравствуйте! Пришлите, пожалуйста, бесплатный вводный видеоурок по гитаре.",
  );
const nav = [
  ["about", "О школе"],
  ["program", "Программа"],
  ["teacher", "Преподаватель"],
  ["prices", "Стоимость"],
  ["students", "Ученики"],
  ["reviews", "Отзывы"],
];
const instruments = [
  {
    name: "Гитара",
    note: "Любимые песни, аккорды и фингерстайл",
    text: "От первых аккордов до полноценного исполнения. Разбираем ритм, бой, переборы и соединяем их с песнями.",
    topics: [
      "Постановка рук и чистый звук",
      "Аккорды, бой и переборы",
      "Песни под гитару и фингерстайл",
    ],
    image: "hero-guitar.webp",
  },
  {
    name: "Электрогитара",
    note: "Риффы, соло и любимый рок",
    text: "Работаем над звукоизвлечением, ритмом и техникой обеих рук. Подбираем упражнения и композиции под ваш уровень.",
    topics: ["Техника медиатора", "Риффы и ритм", "Разбор любимых композиций"],
    image: "nikita-about.webp",
  },
  {
    name: "Укулеле",
    note: "Компактный инструмент, знакомые песни",
    text: "Учимся настраивать укулеле, ставить аккорды, играть бой и переборы. Закрепляем навыки на выбранных песнях.",
    topics: [
      "Настройка и постановка рук",
      "Аккорды и ритм",
      "Аккомпанемент к песням",
    ],
    image: null,
  },
  {
    name: "Фортепиано",
    note: "Мелодия, аккомпанемент и две руки",
    text: "Начинаем с клавиатуры, посадки и постановки рук. Учимся читать ноты, держать ритм и играть двумя руками.",
    topics: [
      "Ноты и клавиатура",
      "Координация двух рук",
      "Мелодии и аккомпанемент",
    ],
    image: null,
  },
];
const priceSets = {
  lessons: [
    {
      title: "Разовое занятие",
      price: "1 100",
      unit: "за урок",
      info: "40 минут",
      points: [
        "Индивидуально по видеосвязи",
        "Разбор вашей задачи",
        "Упражнения для практики",
      ],
      selection: "Разовое занятие — 1 100 ₽",
    },
    {
      title: "4 занятия",
      price: "3 790",
      unit: "за абонемент",
      info: "4 × 40 минут",
      points: [
        "Один урок в неделю",
        "Последовательная программа",
        "Домашние задания и обратная связь",
      ],
      selection: "4 занятия — 3 790 ₽",
      highlight: true,
    },
    {
      title: "8 занятий",
      price: "7 190",
      unit: "за абонемент",
      info: "8 × 40 минут",
      points: [
        "Два урока в неделю",
        "Больше практики с преподавателем",
        "Домашние задания и обратная связь",
      ],
      selection: "8 занятий — 7 190 ₽",
    },
  ],
  mentor: [
    {
      title: "Личное наставничество",
      price: "1 990",
      unit: "за месяц",
      info: "В удобное время",
      points: [
        "Персональные видеоуроки",
        "Проверка домашних заданий",
        "Помощь в Telegram",
        "Видео, PDF и фото для практики",
      ],
      selection: "Наставничество — 1 990 ₽ / месяц",
      highlight: true,
    },
  ],
  songs: [
    {
      title: "Одна песня",
      price: "990",
      unit: "за разбор",
      info: "Под ваш уровень",
      points: [
        "Подробный видеоразбор",
        "PDF с аккордами и ритмом",
        "Подготовка: 2–5 рабочих дней",
      ],
      selection: "Разбор одной песни — 990 ₽",
    },
    {
      title: "Мини-сет",
      price: "2 390",
      unit: "за 3 песни",
      info: "Три песни на выбор",
      points: [
        "Видео левой и правой руки",
        "PDF с материалами",
        "Подготовка: 2–5 рабочих дней",
      ],
      selection: "Мини-сет из 3 песен — 2 390 ₽",
      highlight: true,
    },
    {
      title: "Большой сет",
      price: "3 290",
      unit: "за 5 песен",
      info: "Пять песен на выбор",
      points: [
        "Подробные видеоразборы",
        "PDF с материалами",
        "Подготовка: 2–5 рабочих дней",
      ],
      selection: "Сет из 5 песен — 3 290 ₽",
    },
  ],
};
const questions = [
  [
    "Можно начать совсем с нуля?",
    "Да. Начнём с посадки, настройки и постановки рук. Будем двигаться по шагам: ритм, первые аккорды или ноты, затем — музыка. Предварительная подготовка не нужна.",
  ],
  [
    "Что понадобится для онлайн-урока?",
    "Инструмент, устойчивый интернет и телефон, планшет или компьютер с камерой. Расположите камеру так, чтобы были видны обе руки. Ссылку на видеовстречу и подготовку обсудим перед занятием.",
  ],
  [
    "Сколько длится занятие?",
    "Обычное занятие длится 40 минут. Можно согласовать сдвоенное занятие на 80 минут. Его стоимость и время уточняются при записи.",
  ],
  [
    "Как проходит пробный урок?",
    "За 20–25 минут познакомимся, определим ваш уровень и цели, попробуем первые упражнения и обсудим план. Пробный урок стоит 650 ₽; при покупке абонемента он бесплатный.",
  ],
  [
    "Если не получается заниматься по расписанию?",
    "Есть личное наставничество: вы смотрите подготовленные видеоуроки в удобное время, отправляете домашние задания и получаете правки в Telegram.",
  ],
  [
    "Можно разбирать мои песни?",
    "Да. Выбираем музыку с учётом ваших пожеланий и уровня. Если оригинальная версия пока сложная, начинаем с доступного варианта и постепенно добавляем детали.",
  ],
  [
    "Как перенести занятие?",
    "Сообщите о переносе через сервис записи до 10:00 по Москве в день занятия. Остальные условия и срок действия абонемента указаны в памятке ученика.",
  ],
  [
    "Когда я смогу сыграть первую песню?",
    "Это зависит от начального уровня, выбранной песни и самостоятельной практики. В базовой программе последовательно соединяем аккорды, бой и слова — без обещаний одинакового срока для всех.",
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
function BookingDialog({ selection, instrument, onClose }) {
  const [step, setStep] = useState(0);
  const [name, setName] = useState("");
  const [choice, setChoice] = useState(instrument || "Гитара");
  const [level, setLevel] = useState("С нуля");
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
      title={step === 0 ? "Начнём с ваших целей" : "Запишемся на занятие"}
      onClose={onClose}
    >
      <p className="dialog-subtitle">
        {step === 0
          ? "Выберите инструмент и ваш уровень."
          : "Никита поможет выбрать время и ответит на вопросы."}
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
              {instruments.map((item) => (
                <button
                  key={item.name}
                  aria-pressed={choice === item.name}
                  className={choice === item.name ? "option active" : "option"}
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
            Откроется готовое сообщение. Отправьте его Никите, чтобы
            договориться о занятии.
          </p>
          <div className="dialog-bottom">
            <button className="text-button" onClick={() => setStep(0)}>
              ← Назад
            </button>
            <OutLink href={booking}>Записаться через Yclients ↗</OutLink>
          </div>
        </>
      )}
    </Dialog>
  );
}
export default function Home() {
  const [menu, setMenu] = useState(false),
    [instrument, setInstrument] = useState(0),
    [track, setTrack] = useState("base"),
    [prices, setPrices] = useState("lessons"),
    [modal, setModal] = useState(null),
    [moreMaterials, setMoreMaterials] = useState(false);
  const menuRef = useRef(null);
  const menuButton = useRef(null);
  const selectedTrack =
    track === "base"
      ? programTracks[0]
      : extendedTracks.find((item) => item.id === track);
  const openBooking = (
    selection = "Пробный урок — 650 ₽, бесплатно при покупке абонемента",
    chosen = instruments[instrument].name,
  ) => {
    setMenu(false);
    setModal({ type: "booking", selection, instrument: chosen });
  };
  useEffect(() => {
    if (menu) menuRef.current?.querySelector("a")?.focus();
    const escape = (e) => {
      if (e.key === "Escape") {
        setMenu(false);
        menuButton.current?.focus();
      }
    };
    if (menu) window.addEventListener("keydown", escape);
    return () => window.removeEventListener("keydown", escape);
  }, [menu]);
  return (
    <>
      <a className="skip-link" href="#main">
        К содержимому
      </a>
      <header className="header">
        <div className="header-inner">
          <a href="#top" aria-label="Струны будущего — на главную">
            <Logo />
          </a>
          <nav
            id="navigation"
            ref={menuRef}
            className={menu ? "navigation is-open" : "navigation"}
            aria-label="Главное меню"
          >
            {nav.map(([id, label]) => (
              <a key={id} href={"#" + id} onClick={() => setMenu(false)}>
                {label}
              </a>
            ))}
            <a
              href="#contact"
              className="mobile-contact"
              onClick={() => setMenu(false)}
            >
              Контакты
            </a>
          </nav>
          <OutLink className="social-button" href={telegram}>
            <svg viewBox="0 0 24 24" aria-label="Telegram">
              <path
                fill="currentColor"
                d="m21 4-3 16-6-5-3 3 1-5 8-6-10 5-5-2L21 4Z"
              />
            </svg>
          </OutLink>
          <button className="header-cta" onClick={() => openBooking()}>
            Начать учиться <Icon name="arrow" />
          </button>
          <button
            ref={menuButton}
            className="menu-button"
            aria-expanded={menu}
            aria-controls="navigation"
            aria-label={menu ? "Закрыть меню" : "Открыть меню"}
            onClick={() => setMenu((v) => !v)}
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
        <section className="hero outer" id="top">
          <div className="hero-copy">
            <p className="eyebrow">Онлайн-школа Никиты Осадчука</p>
            <h1>
              УЧИТЕСЬ
              <br />
              ИГРАТЬ <span>НА ГИТАРЕ</span>
            </h1>
            <p className="hero-audience">ДЛЯ ДЕТЕЙ И ВЗРОСЛЫХ</p>
            <p className="hero-description">
              Индивидуальные уроки по видеосвязи.
              <br />С нуля и с любого уровня.
            </p>
            <div className="hero-cta">
              <button className="button lime" onClick={() => openBooking()}>
                Хочу на урок <Icon name="arrow" />
              </button>
              <span>
                <strong>Пробный — 650 ₽</strong>
                <small>При покупке абонемента — бесплатно</small>
              </span>
            </div>
            <a className="hero-program-link" href="#program">
              Посмотреть программу <span>↓</span>
            </a>
          </div>
          <div className="hero-visual">
            <span className="decor-note note-one" aria-hidden="true">
              ♪
            </span>
            <div className="portrait-frame">
              <img
                src="./nikita-hero.webp"
                alt="Никита Осадчук с акустической гитарой"
                fetchPriority="high"
                width="1100"
                height="1366"
              />
            </div>
            <span className="name-sticker">
              Никита Осадчук <span>ваш преподаватель</span>
            </span>
            <span className="decor-note note-two" aria-hidden="true">
              ✳
            </span>
            <div className="instrument-stickers">
              {instruments.map((item, i) => (
                <a
                  key={item.name}
                  href="#directions"
                  onClick={() => setInstrument(i)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="intro section" id="about">
          <div className="wrap">
            <div className="section-title">
              <h2>
                УЧИТЕСЬ ИГРАТЬ
                <br />
                <span>В УДОБНОМ ФОРМАТЕ</span>
              </h2>
              <span className="hand-note">
                Индивидуально · Онлайн <span aria-hidden="true">↙</span>
              </span>
            </div>
            <div className="benefits">
              <article className="benefit pink">
                <Icon name="video" />
                <h3>
                  Один на один
                  <br />с преподавателем
                </h3>
                <p>
                  Урок посвящён вам: вашему темпу, вопросам и музыке, которую
                  хочется играть.
                </p>
              </article>
              <article className="benefit lime">
                <Icon name="music" />
                <h3>
                  Занимайтесь
                  <br />
                  из дома
                </h3>
                <p>
                  Нужны инструмент, камера и интернет. Подключайтесь к уроку из
                  удобного места.
                </p>
              </article>
              <article className="benefit lavender">
                <Icon name="clock" />
                <h3>
                  Выбирайте
                  <br />
                  свой формат
                </h3>
                <p>
                  Живые онлайн-уроки, наставничество с проверкой или разбор
                  конкретной песни.
                </p>
              </article>
            </div>
          </div>
        </section>

        <section className="how section pale">
          <div className="wrap">
            <h2>
              КАК ПРОХОДИТ <span>ОБУЧЕНИЕ</span>
            </h2>
            <div className="how-grid">
              <article>
                <span className="step-number">01</span>
                <h3>Знакомимся и выбираем цель</h3>
                <p>
                  На пробном уроке определим уровень, обсудим любимую музыку и
                  составим план.
                </p>
              </article>
              <article>
                <span className="step-number">02</span>
                <h3>Разбираем и играем вместе</h3>
                <p>
                  На занятиях работаем над руками, ритмом и сложными местами в
                  композициях.
                </p>
              </article>
              <article>
                <span className="step-number">03</span>
                <h3>Закрепляем дома</h3>
                <p>
                  Видео, схемы, табулатуры и тренажёры помогают повторить
                  материал между уроками.
                </p>
              </article>
              <article>
                <span className="step-number">04</span>
                <h3>Получаем обратную связь</h3>
                <p>
                  Разбираем домашнее задание, исправляем ошибки и переходим к
                  следующему шагу.
                </p>
              </article>
            </div>
            <div className="sample-strip">
              <div>
                <span className="label">Познакомьтесь с подачей</span>
                <h3>Бесплатный вводный видеоурок</h3>
              </div>
              <button
                className="button white"
                onClick={() => setModal({ type: "video" })}
              >
                <Icon name="message" /> Получить урок
              </button>
            </div>
          </div>
        </section>

        <section className="section directions" id="directions">
          <div className="wrap">
            <div className="section-title">
              <h2>
                ВЫБЕРИТЕ
                <br />
                <span>СВОЙ ИНСТРУМЕНТ</span>
              </h2>
              <p>
                Индивидуальная программа
                <br />
                для вашего уровня.
              </p>
            </div>
            <div
              className="instrument-tabs"
              role="group"
              aria-label="Инструмент"
            >
              {instruments.map((item, i) => (
                <button
                  key={item.name}
                  onClick={() => setInstrument(i)}
                  aria-pressed={instrument === i}
                  aria-controls="instrument-panel"
                  className={instrument === i ? "active" : ""}
                >
                  <span>0{i + 1}</span>
                  {item.name}
                  <Icon name="external" />
                </button>
              ))}
            </div>
            <div className="instrument-panel" id="instrument-panel">
              <div className={"instrument-picture instrument-" + instrument}>
                {instruments[instrument].image ? (
                  <img
                    src={"./" + instruments[instrument].image}
                    alt={
                      instrument === 0
                        ? "Акустическая гитара"
                        : "Никита Осадчук"
                    }
                    loading="lazy"
                  />
                ) : (
                  <div className="instrument-art" aria-hidden="true">
                    {instrument === 2 ? (
                      <>
                        <div className="uke-neck" />
                        <div className="uke-body">
                          <i />
                        </div>
                      </>
                    ) : (
                      <div className="piano-keys">
                        {Array.from({ length: 8 }, (_, i) => (
                          <i key={i} />
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <span className="picture-label">
                  {instruments[instrument].name}
                </span>
              </div>
              <div className="instrument-copy" key={instrument}>
                <span className="label">Направление обучения</span>
                <h3>{instruments[instrument].note}</h3>
                <p>{instruments[instrument].text}</p>
                <ul className="check-list">
                  {instruments[instrument].topics.map((item) => (
                    <li key={item}>
                      <Icon name="check" />
                      {item}
                    </li>
                  ))}
                </ul>
                <button className="button lime" onClick={() => openBooking()}>
                  Выбрать направление <Icon name="arrow" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="technique-ribbon" aria-label="Навыки на занятиях">
          <span>АККОРДЫ</span>
          <i>✳</i>
          <span>ПЕРЕБОРЫ</span>
          <i>✳</i>
          <span>РИТМ</span>
          <i>✳</i>
          <span>ФИНГЕРСТАЙЛ</span>
          <i>✳</i>
          <span>ЛЮБИМЫЕ ПЕСНИ</span>
        </div>

        <section className="section program" id="program">
          <div className="wrap">
            <div className="section-title">
              <h2>
                ПРОГРАММА
                <br />
                <span>ОБУЧЕНИЯ</span>
              </h2>
              <p>
                Программа для гитары.
                <br />
                Темп подбираем индивидуально.
              </p>
            </div>
            <div className="levels">
              <div>
                <span>С нуля</span>
                <p>Знакомимся с инструментом и осваиваем первые движения.</p>
              </div>
              <div>
                <span>Знаю основы</span>
                <p>Убираем паузы, работаем над ритмом и чистотой звука.</p>
              </div>
              <div>
                <span>Уже играю</span>
                <p>Разбираем новые приёмы и более сложные композиции.</p>
              </div>
            </div>
            <div className="program-shell">
              <div
                className="program-menu"
                role="group"
                aria-label="Раздел программы"
              >
                {[
                  ["base", "Базовый минимум"],
                  ["rhythm", "Бои и песни"],
                  ["technique", "Другие приёмы"],
                  ["materials", "Материалы"],
                ].map(([id, label]) => (
                  <button
                    key={id}
                    className={track === id ? "active" : ""}
                    aria-pressed={track === id}
                    aria-controls="program-lessons"
                    onClick={() => setTrack(id)}
                  >
                    {label}
                    <Icon name="arrow" />
                  </button>
                ))}
                <div className="program-note">
                  <span>♪</span>От отдельного движения
                  <br />к целой песне
                </div>
              </div>
              <div className="program-lessons" id="program-lessons" key={track}>
                <p className="program-intro">{selectedTrack.intro}</p>
                {selectedTrack.modules.map((item, i) => (
                  <details className="lesson" key={item.no} open={i === 0}>
                    <summary>
                      <span className="lesson-no">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3>{item.title}</h3>
                      <span className="plus" aria-hidden="true" />
                    </summary>
                    <div className="lesson-body">
                      <p>{item.desc}</p>
                      {track === "base" ? (
                        <div className="lesson-result">
                          <Icon name="check" />
                          <span>{item.result}</span>
                        </div>
                      ) : (
                        item.songs && (
                          <p className="lesson-songs">
                            {item.songs.replace(
                              /^Основные песни: /,
                              "Для практики: ",
                            )}
                          </p>
                        )
                      )}
                    </div>
                  </details>
                ))}
              </div>
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
                Знакомимся! <span>↗</span>
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

        <section className="section prices" id="prices">
          <div className="wrap">
            <div className="section-title">
              <h2>
                ВЫБИРАЙТЕ
                <br />
                <span>ПОДХОДЯЩИЙ ФОРМАТ</span>
              </h2>
              <p>
                Стоимость и состав занятий —<br />
                сразу перед вами.
              </p>
            </div>
            <div
              className="price-switch"
              role="group"
              aria-label="Формат занятий"
            >
              {[
                ["lessons", "Онлайн-уроки"],
                ["mentor", "Наставничество"],
                ["songs", "Разборы песен"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={prices === id ? "active" : ""}
                  aria-pressed={prices === id}
                  onClick={() => setPrices(id)}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className={"price-grid count-" + priceSets[prices].length}>
              {priceSets[prices].map((item, i) => (
                <article
                  key={prices + item.title}
                  className={"price-card" + (item.highlight ? " featured" : "")}
                >
                  <div className="price-meta">
                    <span>{item.info}</span>
                    <span aria-hidden="true">
                      {i === 0 ? "♪" : i === 1 ? "✳" : "♫"}
                    </span>
                  </div>
                  <h3>{item.title}</h3>
                  <div className="price-amount">
                    {item.price}
                    <span> ₽</span>
                  </div>
                  <p className="price-unit">{item.unit}</p>
                  <ul className="check-list">
                    {item.points.map((point) => (
                      <li key={point}>
                        <Icon name="check" />
                        {point}
                      </li>
                    ))}
                  </ul>
                  <button
                    className={
                      "button full " + (item.highlight ? "lime" : "outline")
                    }
                    onClick={() => openBooking(item.selection)}
                  >
                    Выбрать <Icon name="arrow" />
                  </button>
                </article>
              ))}
            </div>
            {prices === "lessons" && (
              <p className="price-footnote">
                Абонементы — на месяц. Условия переносов и оплаты — в{" "}
                <a
                  href="./student-info/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  памятке ученика ↗
                </a>
              </p>
            )}
          </div>
        </section>

        <section className="trial outer">
          <div>
            <span className="label">Начните со знакомства</span>
            <h2>
              ВАШ ПЕРВЫЙ
              <br />
              <span>ОНЛАЙН-УРОК</span>
            </h2>
            <div className="trial-points">
              <span>✳ Познакомимся</span>
              <span>✳ Определим уровень</span>
              <span>✳ Составим план</span>
            </div>
          </div>
          <div className="trial-action">
            <span className="trial-duration">20–25 минут</span>
            <strong>650 ₽</strong>
            <p>Бесплатно при покупке абонемента</p>
            <button className="button lime" onClick={() => openBooking()}>
              Записаться на пробный <Icon name="arrow" />
            </button>
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
                <img
                  src="./students-group.webp"
                  alt="Никита и ученики после выступления"
                  width="710"
                  height="532"
                  loading="lazy"
                />
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
                ВОПРОСЫ
                <br />
                <span>И ОТВЕТЫ</span>
              </h2>
              <p>
                Не нашли свой вопрос?
                <br />
                <OutLink href={telegram}>Напишите Никите ↗</OutLink>
              </p>
            </div>
            <div>
              {questions.map(([q, a], i) => (
                <details key={q} className="faq-item">
                  <summary>
                    <h3>{q}</h3>
                    <span className="plus" aria-hidden="true" />
                  </summary>
                  <p>
                    {a}
                    {i === 6 && (
                      <>
                        {" "}
                        <a href="./student-info/">Открыть памятку ↗</a>
                      </>
                    )}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="contact outer" id="contact">
          <span className="contact-note" aria-hidden="true">
            ♪
          </span>
          <span className="label">Давайте знакомиться</span>
          <h2>
            ГОТОВЫ
            <br />
            <span>НАЧАТЬ ИГРАТЬ?</span>
          </h2>
          <p>Выберите инструмент. Остальное обсудим вместе.</p>
          <div className="contact-actions">
            <button className="button lime" onClick={() => openBooking()}>
              Хочу на первый урок <Icon name="arrow" />
            </button>
            <OutLink className="button outline" href={telegram}>
              Написать Никите <Icon name="message" />
            </OutLink>
          </div>
          <OutLink href={booking} className="booking-link">
            Выбрать время в онлайн-записи ↗
          </OutLink>
        </section>
      </main>
      <footer className="footer wrap">
        <div className="footer-top">
          <a href="#top" aria-label="Струны будущего — к началу">
            <Logo />
          </a>
          <p>
            Индивидуальные уроки музыки онлайн
            <br />
            Никита Осадчук
          </p>
          <div className="footer-socials">
            <OutLink href={telegram}>Telegram ↗</OutLink>
            <OutLink href="https://vk.com/strunib">ВКонтакте ↗</OutLink>
            <OutLink href={reviews}>Профи.ру ↗</OutLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 «Струны будущего»</span>
          <a href="./student-info/">Памятка ученика</a>
          <a href="#top">Наверх ↑</a>
        </div>
      </footer>
      <button
        className="floating-help"
        aria-label="Подобрать занятия"
        onClick={() => openBooking("Подобрать формат обучения")}
      >
        <Icon name="message" />
        <span>Подобрать занятия</span>
      </button>
      {modal?.type === "booking" && (
        <BookingDialog
          selection={modal.selection}
          instrument={modal.instrument}
          onClose={() => setModal(null)}
        />
      )}
      {modal?.type === "video" && (
        <Dialog title="Знакомство с гитарой" onClose={() => setModal(null)}>
          <p className="dialog-subtitle">
            Напишите Никите, чтобы получить бесплатный вводный видеоурок и
            познакомиться с подачей материала.
          </p>
          <img
            className="lesson-preview"
            src="./personal-lesson.webp"
            alt="Материалы для знакомства с гитарой"
          />
          <OutLink className="button lime full" href={lessonRequest}>
            Получить урок в Telegram <Icon name="external" />
          </OutLink>
        </Dialog>
      )}
    </>
  );
}
