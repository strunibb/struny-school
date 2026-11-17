"use client";
import { useEffect, useRef, useState } from "react";
import { DirectionCard, Techniques } from "./interactive";
import SectionIcon from "./section-icons";

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
    note: "Гитара",
    text: "Курс «Базовый минимум», формат «2+2» или личные уроки.",
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
const courseSongs = [
  { artist: "Кино", title: "Пачка сигарет", cover: "zvezda", release: "Звезда по имени Солнце" },
  { artist: "Кино", title: "Звезда по имени Солнце", cover: "zvezda", release: "Звезда по имени Солнце" },
  { artist: "Кино", title: "Закрой за мной дверь", cover: "noch", release: "Ночь" },
  { artist: "Кино", title: "Когда твоя девушка больна", cover: "chernyy", release: "Чёрный альбом" },
  { artist: "Кино", title: "Кукушка", cover: "chernyy", release: "Чёрный альбом" },
  { artist: "Кино", title: "Группа крови", cover: "gruppa", release: "Группа крови" },
  { artist: "Dabro", title: "Юность", cover: "yunost", release: "Юность" },
  { artist: "Агата Кристи", title: "Как на войне", cover: "pozornaya", release: "Позорная звезда" },
  { artist: "Король и Шут", title: "Кукла колдуна", cover: "akusticheskiy", release: "Акустический альбом" },
  { artist: "Звери", title: "Районы-кварталы", cover: "rayony", release: "Районы-кварталы" },
  { artist: "А-Мега", title: "Лететь", cover: "vverh", release: "Вверх, Ч. 1" },
  { artist: "Баста", title: "Сансара", cover: "sansara", release: "Сансара" },
  { artist: "Форум · Виктор Салтыков", title: "Белая ночь", cover: "belaya", release: "Белая ночь" },
  { artist: "Сплин", title: "Моё сердце", cover: "25-kadr", release: "25-й кадр" },
  { artist: "Кипелов и Сергей Маврин", title: "Я свободен", cover: "smutnoe", release: "Смутное время" },
  { artist: "Женя Трофимов и Комната культуры", title: "Поезда", cover: "poezda", release: "Поезда" },
  { artist: "Братья Грим", title: "Кустурица", cover: "bratya", release: "Братья Гримм" },
  { artist: "Звери", title: "До скорой встречи", cover: "do-skoroy", release: "Когда мы вместе, никто не круче" },
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
// Add supplied review screenshots here, for example "./reviews/student-1.webp".
const reviewPhotos = [];
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
function Dialog({ title, onClose, children, wide = false, details = false }) {
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
      className={"dialog" + (wide ? " dialog-wide" : "") + (details ? " rev-details-dialog" : "")}
      aria-labelledby="dialog-title"
      onCancel={onClose}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-inner">
        <div className="dialog-header">
        <button
          className="round-button dialog-close"
          aria-label="Закрыть окно"
          onClick={onClose}
        >
          <Icon name="close" />
        </button>
        <h2 id="dialog-title">{title}</h2>
        </div>
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

function StudentVideoCase({ item, onOpen }) {
  const [videoReady, setVideoReady] = useState(false);
  return (
    <article className="case-story-card" aria-label={"Кейс " + item.id + " из пяти"}>
      <header className="case-story-brand">
        <span>СТРУНЫ БУДУЩЕГО</span>
        <span>ИСТОРИИ УЧЕНИКОВ</span>
      </header>
      <div className="case-story-body">
        <div className="case-story-copy">
          <span className="case-story-number">{String(item.id).padStart(2, "0")} / 05</span>
          <h3>{"КЕЙС " + String(item.id).padStart(2, "0")}</h3>
          <strong>ВИДЕО УЧЕНИКА</strong>
          <p>{videoReady ? "Нажмите, чтобы посмотреть видео ученика." : "Место для видео ученика. Запись появится после загрузки."}</p>
        </div>
        <div className="case-story-visual">
          <span className="case-story-abstract case-story-abstract-one" aria-hidden="true" />
          <span className="case-story-abstract case-story-abstract-two" aria-hidden="true" />
          <span className="case-story-note" aria-hidden="true">♫</span>
          <video
            src={item.video}
            className={videoReady ? "case-story-thumb is-visible" : "case-story-thumb"}
            preload="metadata"
            playsInline
            muted
            onLoadedMetadata={() => setVideoReady(true)}
            onError={() => setVideoReady(false)}
            aria-hidden="true"
            tabIndex={-1}
          />
          {videoReady
            ? <button className="case-story-play" type="button" onClick={() => onOpen(item)} aria-label={"Смотреть видео, кейс " + item.id}><Icon name="play" /></button>
            : <span className="case-story-play is-placeholder" aria-hidden="true"><Icon name="play" /></span>}
        </div>
      </div>
      <footer className="case-story-footer">
        <span>{videoReady ? "ВИДЕО ДОСТУПНО" : "ВИДЕО СКОРО ПОЯВИТСЯ"}</span>
        <span>{String(item.id).padStart(2, "0")}</span>
      </footer>
    </article>
  );
}

export default function Home() {
  const [instrument, setInstrument] = useState(0);
  const [selectedLevel] = useState("С нуля");
  const [songIndex, setSongIndex] = useState(0);
  const [detailView, setDetailView] = useState(null);
  const caseTrackRef = useRef(null);
  const [caseNav, setCaseNav] = useState({ back: false, forward: true });
  const [modal, setModal] = useState(null);
  const [menu, setMenu] = useState(false);
  const [leadName, setLeadName] = useState("");
  const [leadContact, setLeadContact] = useState("");
  const [leadFormat, setLeadFormat] = useState("Курс «Базовый минимум»");
  const [leadGoal, setLeadGoal] = useState("");
  const menuRef = useRef(null);
  const menuButton = useRef(null);

  useEffect(() => {
    const readLocation = () => {
      const params = new URLSearchParams(window.location.search);
      const index = instruments.findIndex((item) => item.id === params.get("instrument"));
      setInstrument(index >= 0 ? index : 0);
    };
    readLocation();
    window.addEventListener("popstate", readLocation);
    return () => window.removeEventListener("popstate", readLocation);
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

  const choose = (index) => {
    setInstrument(index);
    const url = new URL(window.location.href);
    url.searchParams.set("instrument", instruments[index].id);
    window.history.replaceState(null, "", url);
  };
  const openBooking = (selection = "Подобрать обучение", guitarOnly = false) => {
    setMenu(false);
    setDetailView(null);
    setModal({
      type: "booking",
      selection,
      instrument: guitarOnly ? "Гитара" : instruments[instrument].name,
      guitarOnly,
      initialLevel: selectedLevel,
    });
  };
  const cases = [1, 2, 3, 4, 5].map((id) => ({
    id,
    video: "./cases/student-" + String(id).padStart(2, "0") + ".mp4",
  }));
  const updateCaseNav = () => {
    const track = caseTrackRef.current;
    if (!track) return;
    setCaseNav({
      back: track.scrollLeft > 4,
      forward: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
    });
  };
  const scrollCases = (direction) => {
    const track = caseTrackRef.current;
    if (!track) return;
    const first = track.firstElementChild;
    const gap = parseFloat(window.getComputedStyle(track).gap) || 18;
    const width = first ? first.getBoundingClientRect().width : 400;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollBy({ left: direction * (width + gap), behavior: reduceMotion ? "auto" : "smooth" });
  };
  useEffect(() => {
    const track = caseTrackRef.current;
    if (!track) return;
    const sync = () => {
      setCaseNav({
        back: track.scrollLeft > 4,
        forward: track.scrollLeft + track.clientWidth < track.scrollWidth - 4,
      });
    };
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);
  const submitLead = (event) => {
    event.preventDefault();
    const message = [
      "Здравствуйте, Никита! Хочу узнать об обучении в «Струнах будущего».",
      "Меня зовут " + leadName.trim() + ".",
      "Интересует: " + leadFormat + ".",
      leadContact.trim() ? "Связаться со мной: " + leadContact.trim() + "." : null,
      leadGoal.trim() ? "Хочу научиться: " + leadGoal.trim() : null,
    ].filter(Boolean).join("\n");
    window.location.href = telegram + "?text=" + encodeURIComponent(message);
  };

  return (
    <div className="school-hub revamped">
      <a className="skip-link" href="#main">К содержимому</a>
      <header className="header">
        <div className="header-inner">
          <a href="#top" aria-label="Струны будущего — на главную"><Logo /></a>
          <nav ref={menuRef} id="navigation" className={menu ? "navigation is-open" : "navigation"} aria-label="Главное меню">
            <a href="#why" onClick={() => setMenu(false)}>Почему мы</a>
            <a href="#directions" onClick={() => setMenu(false)}>Инструменты</a>
            <a href="#learning" onClick={() => setMenu(false)}>Обучение</a>
            <a href="#teacher" onClick={() => setMenu(false)}>Обо мне</a>
            <a href="#cases" onClick={() => setMenu(false)}>Кейсы</a>
            <a href="#reviews" onClick={() => setMenu(false)}>Отзывы</a>
          </nav>
          <a className="header-cta" href="#contact">Оставить заявку <Icon name="arrow" /></a>
          <button ref={menuButton} className="menu-button" aria-expanded={menu} aria-controls="navigation" aria-label={menu ? "Закрыть меню" : "Открыть меню"} onClick={() => setMenu(!menu)}>
            {menu ? <Icon name="close" /> : <><span /><span /></>}
          </button>
        </div>
      </header>
      <main id="main">
        <section className="rev-hero" id="top">
          <div className="rev-hero-photo" aria-hidden="true"><img src="./nikita-hero.webp" alt="" fetchPriority="high" width="1000" height="1245" /></div>
          <div className="rev-hero-shape" aria-hidden="true" />
          <div className="wrap rev-hero-content">
            <h1>Онлайн-школа<br />музыки <em>Никиты<br />Осадчука</em></h1>
            <div className="rev-hero-actions">
              <a className="button lime" href="#learning">Выбрать обучение <Icon name="arrow" /></a>
              <a className="rev-text-link" href="#why">Как проходят занятия ↓</a>
            </div>
            <span className="rev-hero-bottom">ГИТАРА · ЭЛЕКТРОГИТАРА · УКУЛЕЛЕ · ФОРТЕПИАНО</span>
          </div>
        </section>

        <section className="section rev-why" id="why">
          <div className="wrap rev-why-grid">
            <div>
              <span className="rev-kicker">01 / ЗНАКОМСТВО</span>
              <h2>Почему <span>«Струны будущего»?</span></h2>
            </div>
            <div className="rev-video-slot">
              <img src="./lesson-planning.webp" alt="Никита готовит материалы для урока" loading="lazy" width="1000" height="668" />
              <div><SectionIcon name="video" /><span>Скоро здесь будет видео<br />о школе и занятиях</span></div>
            </div>
          </div>
        </section>

        <section className="section directions" id="directions">
          <div className="wrap">
            <div className="section-title"><h2>На чём хотите <span>играть?</span></h2><p>Выберите инструмент.</p></div>
            <div className="direction-cards" role="group" aria-label="Выберите инструмент">
              {instruments.map((item, i) => <DirectionCard key={item.id} item={item} index={i} selected={instrument === i} onSelect={() => choose(i)} />)}
            </div>
          </div>
        </section>

        <section className="section rev-learning" id="learning">
          <div className="wrap">
            <div className="section-title rev-learning-title"><div><span className="rev-kicker">02 / ФОРМАТЫ</span><h2>Как можно <span>учиться</span></h2></div></div>
            <article className="rev-offer rev-offer-course" id="course">
              <div className="rev-offer-visual rev-course-visual">
                <img className="rev-offer-main-img" src="./material-rhythm.webp" loading="lazy" alt="Никита показывает ритмический рисунок на гитаре" width="960" height="540" />
                <img className="rev-offer-inset-img" src="./material-trainer.webp" loading="lazy" alt="Никита объясняет бой с помощью тренажёра" width="960" height="540" />
                <SectionIcon name="course" className="rev-offer-icon" />
              </div>
              <div className="rev-offer-copy">
                <span className="rev-offer-label">01 / ПОЛНЫЙ ВИДЕОКУРС ПО ГИТАРЕ</span>
                <h3>«Базовый минимум»</h3>
                <p>Вы освоите 10 самых популярных боёв на примерах 17 песен, научитесь аккордам и всему, что нужно для старта игры на гитаре и даже для выступлений.</p>
              </div>
              <div className="rev-offer-prices">
                {coursePlans.map((plan, i) => <div className="rev-mini-price" key={plan.title}>
                  <div><span>{plan.title}</span><strong>{plan.price} ₽</strong></div>
                  <p>{i === 0 ? "Полный курс · доступ на год" : "Полный курс · год доступа · 6 месяцев проверки ДЗ"}</p>
                  <div className="rev-price-actions"><button onClick={() => openBooking(plan.selection, true)}>Выбрать <Icon name="arrow" /></button></div>
                </div>)}
                <div className="rev-course-details-action"><button className="button outline rev-details-button" type="button" aria-haspopup="dialog" aria-controls="course-details" onClick={() => setDetailView("course")}>Подробнее <Icon name="arrow" /></button></div>
                <a className="rev-sample" href={lessonRequest} target="_blank" rel="noopener noreferrer">Посмотреть пример урока <Icon name="external" /></a>
              </div>


            </article>
            <article className="rev-offer rev-offer-personal" id="individual">
              <div className="rev-offer-copy">
                <h3>Индивидуальные онлайн-уроки</h3>
                <p>На личных уроках мы разбираем все «подвохи», учимся тому, что вам действительно нравится, и пропускаем лишнюю теорию.</p>
                <div className="rev-price-line"><strong>3 990 ₽</strong><span>/ 4 занятия</span></div>
                <div className="rev-primary-actions"><button className="button lime" onClick={() => openBooking("Индивидуально — 4 × 40 минут, 3 990 ₽")}>Записаться на уроки <Icon name="arrow" /></button><button className="button outline rev-details-button" type="button" aria-haspopup="dialog" aria-controls="personal-details" onClick={() => setDetailView("personal")}>Подробнее <Icon name="arrow" /></button></div>
              </div>
              <div className="rev-offer-visual rev-personal-visual">
                <img className="rev-offer-main-img" src="./personal-lesson.webp" loading="lazy" alt="Никита объясняет материал ученику на онлайн-уроке" width="1000" height="667" />
                <SectionIcon name="lesson" className="rev-offer-icon" />
              </div>
              <div className="rev-hybrid-strip">
                <SectionIcon name="hybrid" />
                <div><strong>Абонемент «2+2»</strong><p>Два личных урока по 40 минут и две недели работы по видео с проверкой записи.</p></div>
                <span>2 990 ₽ / 4 недели</span>
                <div className="rev-price-actions"><button onClick={() => openBooking("Гитара — «2+2», 2 990 ₽ за четыре недели", true)}>Выбрать <Icon name="arrow" /></button></div>
              </div>


            </article>
            <article className="rev-offer rev-offer-catalog" id="catalog">
              <div className="rev-offer-visual rev-catalog-visual">
                <img className="rev-offer-main-img" src="./catalog-preview.png" loading="lazy" alt="Пример каталога песен с обложками исполнителей и ценами PDF-разборов" width="1363" height="1152" />
                <SectionIcon name="catalog" className="rev-offer-icon" />
              </div>
              <div className="rev-offer-copy">
                <span className="rev-offer-label">03 / ПЕСНИ ПО ВАШЕМУ ВЫБОРУ</span>
                <h3>Разборы песен и табы</h3>
                <p>А если вы уже умеете играть и хотите понятных и интерактивных разборов, то вам сюда!</p>
                <div className="rev-primary-actions"><a className="button lime" href={catalog}>Открыть каталог <Icon name="arrow" /></a><button className="button outline rev-details-button" type="button" aria-haspopup="dialog" aria-controls="catalog-details" onClick={() => setDetailView("catalog")}>Подробнее <Icon name="arrow" /></button></div>
              </div>


            </article>
          </div>
        </section>

        <section className="teacher section pale" id="teacher">
          <div className="wrap teacher-grid">
            <div className="teacher-image"><img src="./nikita-about.webp" width="1000" height="1000" loading="lazy" alt="Никита Осадчук с гитарой" /><span className="teacher-badge">Знакомимся! <span><Icon name="external" className="inline-icon" /></span></span></div>
            <div className="teacher-copy"><span className="label">Ваш преподаватель</span><h2>НИКИТА<br /><span>ОСАДЧУК</span></h2><p className="teacher-lead">Основатель онлайн-школы<br />«Струны будущего»</p><p>Преподаю с 2019 года. Раньше руководил музыкальным направлением детского центра «Зебра» в Санкт-Петербурге.</p><p>На уроках соединяем технику с музыкой, которую вам хочется играть. Разбираем движения спокойно и подробно, пока они не станут понятны.</p><div className="teacher-facts"><div><strong>2019</strong><span>начало преподавания</span></div><div><strong>1:1</strong><span>внимание к каждому</span></div></div><button className="button outline" onClick={() => openBooking()}>Познакомиться на уроке <Icon name="arrow" /></button></div>
          </div>
        </section>


        <section className="section rev-cases" id="cases">
          <div className="wrap">
            <div className="rev-cases-head">
              <div>
                <h2>НАШИ КЕЙСЫ</h2>
              </div>
              <div className="rev-case-controls" aria-label="Управление каруселью">
                <button type="button" aria-label="Предыдущий кейс" disabled={!caseNav.back} onClick={() => scrollCases(-1)}><Icon name="arrow" /></button>
                <button type="button" aria-label="Следующий кейс" disabled={!caseNav.forward} onClick={() => scrollCases(1)}><Icon name="arrow" /></button>
              </div>
            </div>
            <div className="case-story-track" ref={caseTrackRef} onScroll={updateCaseNav} role="region" aria-roledescription="карусель" aria-label="Пять видео-кейсов учеников" tabIndex={0}>
              {cases.map((item) => <StudentVideoCase key={item.id} item={item} onOpen={(selected) => setModal({ type: "case", item: selected })} />)}
            </div>
            <div className="case-story-hint" aria-hidden="true">ЛИСТАЙТЕ <span>↔</span> 01 — 05</div>
          </div>
        </section>

        <section className="section reviews pale rev-reviews" id="reviews">
          <div className="wrap rev-reviews-grid">
            <div><span className="rev-kicker">05 / ОТЗЫВЫ</span><h2>Отзывы <span>учеников</span></h2><p>Отзывы об уроках можно прочитать в моём профиле на Профи.ру. Фотографии отзывов добавим в этот раздел.</p><OutLink className="button outline" href={reviews}>Читать отзывы на Профи.ру <Icon name="external" /></OutLink></div>
            {reviewPhotos.length ? <div className="rev-review-gallery">{reviewPhotos.map((src, i) => <img key={src} src={src} alt={`Отзыв ученика №${i + 1}`} loading="lazy" />)}</div> : <div className="rev-review-visual"><SectionIcon name="reviews" /><div><span>Отзывы учеников</span><strong>Профи.ру</strong><small>Ссылка на независимый профиль</small></div></div>}
          </div>
        </section>

        <section className="section rev-contact" id="contact">
          <div className="wrap rev-contact-grid">
            <div className="rev-contact-photo"><img src="./nikita-hero.webp" alt="Никита Осадчук с гитарой" loading="lazy" width="1000" height="1245" /><span>Напишите, что хотите сыграть. Я отвечу сам.</span></div>
            <div className="rev-contact-card"><span className="rev-kicker">06 / НАЧНИТЕ ЗДЕСЬ</span><h2>Оставить заявку</h2><p>Расскажите немного о себе — подготовлю сообщение для Telegram.</p>
              <form onSubmit={submitLead}>
                <label>Ваше имя<input value={leadName} onChange={(e) => setLeadName(e.target.value)} required maxLength="80" autoComplete="given-name" placeholder="Как к вам обращаться" /></label>
                <label>Как с вами связаться <small>необязательно</small><input value={leadContact} onChange={(e) => setLeadContact(e.target.value)} maxLength="120" placeholder="@username или телефон" autoComplete="off" /></label>
                <label>Что интересует<select value={leadFormat} onChange={(e) => setLeadFormat(e.target.value)}><option>Курс «Базовый минимум»</option><option>Курс с проверкой заданий</option><option>Индивидуальные онлайн-уроки</option><option>Абонемент «2+2»</option><option>Разборы песен и табы</option><option>Помогите выбрать</option></select></label>
                <label>Какая музыка нравится? <small>необязательно</small><textarea value={leadGoal} onChange={(e) => setLeadGoal(e.target.value)} maxLength="300" placeholder="Песня или цель занятий" rows="2" /></label>
                <button className="button lime full" type="submit">Открыть заявку в Telegram <Icon name="arrow" /></button>
                <p className="rev-form-note">Откроется готовое сообщение. Отправьте его, чтобы я получил заявку.</p>
              </form>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer wrap"><div className="footer-top"><a href="#top" aria-label="Струны будущего — к началу"><Logo /></a><p>Курс гитары, уроки и разборы песен<br />Никита Осадчук</p><div className="footer-socials"><OutLink href={channel}>Канал Telegram <Icon name="external" className="inline-icon" /></OutLink><OutLink href="https://vk.com/strunib">ВКонтакте <Icon name="external" className="inline-icon" /></OutLink><OutLink href={reviews}>Профи.ру <Icon name="external" className="inline-icon" /></OutLink></div></div><div className="footer-bottom"><span>© 2026 «Струны будущего»</span><a href="./student-info/">Памятка ученика</a><a href="#top">Наверх ↑</a></div></footer>
      <a className="hub-mobile-cta" href="#contact">Оставить заявку <Icon name="arrow" /></a>
      {detailView === "course" && <Dialog title="Курс «Базовый минимум»" wide details onClose={() => setDetailView(null)}><div className="rev-details-content"><div className="rev-detail-panel" id="course-details">
                <div className="rev-detail-top"><div><span className="rev-kicker">ПОДРОБНЕЕ О КУРСЕ</span><p>Полная программа в обоих тарифах. Самостоятельный доступ на год; в тарифе с проверкой я проверяю задания в течение шести месяцев.</p></div></div>
        <div className="program pale rev-program-detail" id="program">
          <div className="rev-detail-inner">
            <div className="section-title"><div><span className="rev-kicker">03 / КУРС ГИТАРЫ</span><h2>Что ты <span>сыграешь?</span></h2></div></div>
            <div className="course-showcase">
              <div className="showcase-card showcase-rhythm"><SectionIcon name="rhythm" className="showcase-art" /><span className="showcase-kicker">Ритм</span><strong>10 боёв</strong><p>Разбираем десять вариантов боя на песнях из курса.</p></div>
              <div className="showcase-card showcase-song"><SectionIcon name="catalog" className="showcase-art" /><span className="showcase-kicker">Репертуар</span><strong>Любимые песни</strong><p>Разбираем аккорды и играем песню целиком.</p></div>
              <div className="showcase-card showcase-hands"><SectionIcon name="chords" className="showcase-art" /><span className="showcase-kicker">Техника</span><strong>Переборы и приёмы</strong><p>Учимся играть перебором и менять ритм без остановок.</p></div>
            </div>
            <div className="song-picker">
              <div className="song-picker-copy">
                <span className="gift-kicker">Репертуар видеокурса</span><h3>Песни из курса</h3>
                <div className="song-spotlight" aria-live="polite">
                  <img key={courseSongs[songIndex].cover} className="song-cover" src={`./song-covers/${courseSongs[songIndex].cover}.webp`} alt={`Обложка релиза «${courseSongs[songIndex].release}»`} width="600" height="600" />
                  <div><span>{courseSongs[songIndex].artist}</span><strong>{courseSongs[songIndex].title}</strong></div>
                </div>
                <button className="button primary" onClick={() => openBooking("Курс «Базовый минимум» — хочу сыграть «" + courseSongs[songIndex].title + "»", true)}>Хочу научиться <Icon name="arrow" /></button>
              </div>
              <div className="song-picker-list" role="group" aria-label="Выберите песню из курса">
                {courseSongs.map((song, i) => <button key={song.artist + song.title} className={"song-pick" + (songIndex === i ? " active" : "")} aria-pressed={songIndex === i} onClick={() => setSongIndex(i)}><span>{String(i + 1).padStart(2, "0")}</span><strong>{song.title}</strong><small>{song.artist}</small></button>)}
              </div>
            </div>
          </div>
        </div>
        <div className="rev-gift rev-gift-detail" id="gift">
          <div className="course-gift">
            <div className="gift-story"><span className="gift-kicker">✦ БОНУС К ОБУЧЕНИЮ</span><h2>Подарок к курсу</h2><p>В подарок — тренажёры боя и аккордов, а также PDF со схемами для занятий.</p><div className="rev-gift-links"><a href="https://strunibb.github.io/boi/">Тренажёр боя <Icon name="external" /></a><a href="https://strunibb.github.io/akkordi_guitarpro/">Тренажёр аккордов <Icon name="external" /></a></div></div>
            <div className="gift-gallery" aria-label="Подарки к курсу">
              <div className="gift-item gift-present"><SectionIcon name="gift" className="gift-art" /><strong>Подарок</strong><small>К каждому тарифу</small></div>
              <div className="gift-item gift-pdf"><SectionIcon name="pdf" className="gift-art" /><strong>PDF-блокнот</strong><small>Схемы и упражнения</small></div>
              <div className="gift-item gift-practice"><SectionIcon name="practice" className="gift-art" /><strong>Тренажёры</strong><small>Ритм и аккорды</small></div>
            </div>
          </div>
        </div>
              </div></div></Dialog>}
      {detailView === "personal" && <Dialog title="Личные уроки и «2+2»" wide details onClose={() => setDetailView(null)}><div className="rev-details-content"><div className="rev-detail-panel rev-personal-detail" id="personal-details">
                <div className="rev-detail-top"><div><span className="rev-kicker">ФОРМАТЫ И ЦЕНЫ</span><p>Выберите удобный ритм занятий. Каждый личный урок длится 40 минут.</p></div></div>
                <div className="rev-personal-detail-grid">
                  <img src="./winter-tariffs.png" alt="Зимние тарифы: разовое занятие 1 150 ₽; четыре урока 3 990 ₽ в месяц или 7 490 ₽ за два месяца; абонемент «2+2» 2 990 ₽ в месяц; восемь уроков 7 490 ₽" loading="lazy" width="1200" height="1344" />
                  <div className="rev-detail-plans">
                    <div><strong>Разовое занятие — 1 150 ₽</strong><p>Один онлайн-урок на 40 минут: разберём конкретный вопрос или песню.</p></div>
                    <div><strong>4 занятия — 3 990 ₽ / месяц</strong><p>Личный урок раз в неделю. Абонемент на два месяца — 7 490 ₽ за 8 занятий.</p></div>
                    <div><strong>«2+2» — 2 990 ₽ / месяц</strong><p>В течение четырёх недель чередуются видеоуроки и личные онлайн-встречи: два урока по видеосвязи и две недели по видеоматериалам.</p></div>
                    <div><strong>8 занятий — 7 490 ₽ / месяц</strong><p>Два личных урока в неделю по 40 минут.</p></div>
                    <button className="button lime" onClick={() => openBooking("Индивидуальные уроки — подобрать абонемент")}>Выбрать абонемент <Icon name="arrow" /></button>
                  </div>
                </div>
                <Techniques />
              </div></div></Dialog>}
      {detailView === "catalog" && <Dialog title="Разборы песен и табы" wide details onClose={() => setDetailView(null)}><div className="rev-details-content"><div className="rev-detail-panel" id="catalog-details"><div className="rev-detail-top"><div><span className="rev-kicker">КАТАЛОГ ПЕСЕН</span><p>В каталоге есть разборы песен и табы. На странице каждой песни указан состав материалов и цена.</p></div></div><a className="button lime" href={catalog}>Перейти к песням <Icon name="arrow" /></a></div></div></Dialog>}
      {modal?.type === "booking" && <BookingDialog selection={modal.selection} instrument={modal.instrument} initialLevel={modal.initialLevel} guitarOnly={modal.guitarOnly} onClose={() => setModal(null)} />}
      {modal?.type === "case" && <Dialog title={"Кейс " + modal.item.id} wide onClose={() => setModal(null)}><video className="case-story-player" src={modal.item.video} controls autoPlay playsInline preload="auto">Ваш браузер не поддерживает воспроизведение видео.</video></Dialog>}
    </div>
  );
}
