"use client";

import { useEffect, useMemo, useRef, useState } from "react";

const tg = "https://t.me/nikguita";

const Icon = ({ name }) => {
  const icons = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6"/></>,
    play: <path d="m9 7 8 5-8 5V7Z"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    spark: <><path d="m12 3 1.4 4.1L17.5 9l-4.1 1.4L12 15l-1.4-4.6L6.5 9l4.1-1.9L12 3Z"/><path d="m19 15 .7 2.1L22 18l-2.3.9L19 21l-.7-2.1L16 18l2.3-.9L19 15Z"/></>,
    message: <path d="M20 15a4 4 0 0 1-4 4H8l-5 3 1.5-5A7 7 0 0 1 3 13V8a4 4 0 0 1 4-4h9a4 4 0 0 1 4 4v7Z"/>,
    clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    music: <><path d="M9 18V5l10-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="16" cy="16" r="3"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    menu: <><path d="M4 7h16M4 12h16M4 17h16"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>
  };
  return <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[name]}</svg>;
};

const formats = [
  {
    tag: "Индивидуально",
    title: "Личные онлайн-занятия",
    text: "Индивидуальные занятия по акустической и электрогитаре: техника, ритм, аккорды, песни и разбор домашних заданий.",
    points: ["4 урока по гитаре — 3 790 ₽"],
    price: "разовое занятие — 1 100 ₽",
    accent: "cyan"
  },
  {
    tag: "Без жёсткого расписания",
    title: "Личное наставничество",
    text: "Персональные видеоуроки под ваш уровень, проверка домашних заданий и помощь в Telegram.",
    points: ["1–3 песни в неделю", "Видео, PDF и фото остаются навсегда", "Личная проверка ДЗ и ответы в чате"],
    price: "1 месяц — 1 990 ₽",
    accent: "violet",
    featured: true
  },
  {
    tag: "Под ваш уровень",
    title: "Разбор любимых песен",
    text: "PDF с аккордами, боем или перебором и подробный видеоразбор левой и правой руки.",
    points: ["1 песня — 990 ₽", "Мини-сет, 3 песни — 2 390 ₽", "VIP, 5 песен — 3 290 ₽"],
    price: "срок подготовки — 2–5 рабочих дней",
    accent: "yellow"
  }
];


const learningDirections = [
  { id: "beginner", title: "Гитара с нуля", tag: "01 / НАЧИНАЮЩИМ", image: "./hero-guitar.webp", summary: "Посадка, настройка гитары, первые аккорды и песни.", result: "Освоите основы и сыграете учебную версию первой песни.", topics: ["Знакомство с гитарой", "Ритм и метроном", "Первые аккорды", "Аккорды, бой и песня"], program: "base" },
  { id: "rhythm", title: "Аккорды и бой", tag: "02 / РИТМ", image: "./material-rhythm.webp", summary: "Четвёрка, шестёрка, восьмёрка и смена аккордов.", result: "Научитесь применять разные рисунки боя в песнях.", topics: ["Четвёрка с глушением", "Шестёрка и восьмёрка", "Деление боя", "Работа над песнями"], program: "rhythm" },
  { id: "picking", title: "Переборы", tag: "03 / ТЕХНИКА", image: "./material-trainer.webp", summary: "Правая рука, басовые струны, перебор и координация.", result: "Разберёте основные движения и сможете применить их в песнях.", topics: ["Постановка правой руки", "Перебор «четвёрка»", "Смена баса", "Практика под метроном"], program: "technique" },
  { id: "fingerstyle", title: "Фингерстайл", tag: "04 / НАПРАВЛЕНИЕ", image: "./personal-lesson.webp", summary: "Мелодия и аккомпанемент на одной гитаре.", result: "Подберём упражнения и композиции с учётом уровня.", topics: ["Мелодия и бас", "Независимость пальцев", "Чтение табулатур", "Разбор композиций"], program: null },
  { id: "electric", title: "Электрогитара", tag: "05 / ЭЛЕКТРОГИТАРА", image: "./nikita-hero.webp", summary: "Риффы, ритм, постановка рук и техника.", result: "Составим индивидуальную программу под ваш музыкальный стиль.", topics: ["Звукоизвлечение", "Риффы и ритм", "Техника обеих рук", "Любимые композиции"], program: null },
  { id: "songs", title: "Разбор песен", tag: "06 / ПО ВЫБОРУ", image: "./material-song.webp", summary: "Аккорды, бой, перебор и разбор конкретной песни.", result: "Получите материал под ваш уровень и запрос.", topics: ["Подбор песни", "Аккорды и табулатуры", "Разбор сложных мест", "Практика исполнения"], program: "materials" }
];

const faq = [
  ["Подойдёт ли обучение полному новичку?", "Да. Начинаем со знакомства с гитарой и постановки рук, затем учимся играть аккорды, держать ритм и исполнять первые песни."],
  ["Что делать, если нет постоянного расписания?", "Можно выбрать наставничество: вы занимаетесь в удобное время, отправляете домашнее задание в Telegram и получаете личные правки."],
  ["Можно заказать разбор, если я почти не играю?", "Да. Начнём с одной простой песни, сложные места можно упростить, а материал будет подготовлен под ваш уровень."],
  ["Сколько готовится разбор песни?", "Обычно от 2 до 5 рабочих дней. Срок зависит от сложности песни и количества треков."],
  ["Можно попробовать бесплатно?", "Да. На сайте есть бесплатный урок по гитаре, чтобы познакомиться с форматом обучения до покупки." ]
];


const programTracks = [
  {
    id: "base", label: "База",
    intro: "Семь последовательных этапов: от знакомства с инструментом до исполнения первой песни целиком.",
    modules: [
      { no: "01", title: "Знакомство с гитарой", desc: "Строение инструмента, посадка, пальцы и струны. Настройка, постановка рук, табулатура и первая практика на открытых струнах.", result: "Настроить гитару и сыграть первое упражнение на открытых струнах." },
      { no: "02", title: "Метроном и координация", desc: "Хроматическое упражнение и координация обеих рук. Начинаем с 60 BPM, затем постепенно повышаем скорость.", result: "Играть упражнение ровно под метроном. В материалах указан ориентир до 120 BPM." },
      { no: "03", title: "Первые аккорды", desc: "Em, Am, C и D: изучаем схемы аппликатур и тренируем смену аккордов в отдельном тренажёре.", result: "Ставить основные аккорды и отрабатывать переходы между ними." },
      { no: "04", title: "Аккорды и слова", desc: "На песне «Кино — Пачка сигарет» учимся менять аккорды по тексту. На этом этапе играем по одному удару вниз на аккорд, пока без боя.", result: "Соединять текст песни с последовательностью аккордов." },
      { no: "05", title: "Первый бой: четвёрка с глушением", desc: "Рисунок ↓ ↑ X ↑, счёт «1-и-2-и». Сначала разбираем движения, затем закрепляем их по видео и в тренажёре боя.", result: "Повторять рисунок боя ровно и циклически." },
      { no: "06", title: "Аккорды и бой без слов", desc: "Упражнение «Скакалка»: сначала работаем на одном аккорде, затем соединяем переходы Em–Am, Am–C, C–D и D–Em.", result: "Менять аккорды без остановки движения правой руки." },
      { no: "07", title: "Финал базового старта", desc: "Объединяем аккорды, бой и слова в учебной версии «Пачки сигарет» и отрабатываем исполнение вместе с преподавателем по видео.", result: "Сыграть учебную версию песни целиком." }
    ]
  }
];

const programDetails = {
  "01": { label: "Знакомство с гитарой", content: "Строение инструмента; посадка; пальцы левой руки и струны; настройка; постановка рук; табулатура; первое упражнение на открытых струнах.", materials: "Схемы и иллюстрации, табулатура, упражнения и видеоурок.", check: "Настроить инструмент и сыграть упражнение на открытых струнах." },
  "02": { label: "Метроном и координация", content: "Хроматическое упражнение и координация обеих рук. Постепенно увеличиваем скорость от комфортного темпа.", materials: "Метроном и технические упражнения. В карте указан старт 60 BPM и ориентир до 120 BPM.", check: "Сохранять ровный пульс; повышать темп постепенно." },
  "03": { label: "Аккорды и тренажёр", content: "Аппликатуры Em, Am, C, D и смена аккордов в отдельном тренажёре.", materials: "Схемы аппликатур и ссылка на тренажёр аккордов.", check: "Поставить аккорды и выполнить переходы между ними." },
  "04": { label: "Работа с текстом", content: "Песня «Пачка сигарет»; один удар вниз на аккорд; смена аккордов в соответствующих местах текста.", materials: "Текст песни, последовательность аккордов и видео для практики.", check: "Менять аккорды по тексту без боя." },
  "05": { label: "Первый бой", content: "Четвёрка с глушением: ↓ ↑ X ↑. Разбираем движения и счёт «1-и-2-и».", materials: "Видео и тренажёр боя.", check: "Ровно повторять рисунок боя." },
  "06": { label: "Упражнение «Скакалка»", content: "Переходы на одном аккорде, затем пары Em–Am, Am–C, C–D, D–Em.", materials: "Техническое упражнение и видеоразбор.", check: "Сменять аккорды без паузы в движении правой руки." },
  "07": { label: "Финал базы", content: "Аккорды, бой и слова объединяются в учебной версии «Пачки сигарет».", materials: "Видео для совместной отработки с преподавателем.", check: "Сыграть учебную версию песни целиком." },
  B1: { label: "Четвёрка с глушением", content: "Новый рисунок → песни для закрепления.", materials: "Основные песни: «Звезда по имени Солнце», «Пачка сигарет». Бонусная: «Орбит без сахара».", check: "Песни разделены на основные и бонусные согласно карте." },
  B2: { label: "Шестёрка с глушением", content: "Изучаем рисунок и переносим его на песни из списка.", materials: "Dabro — «Юность»; Кино — «Закрой за мной дверь»; Агата Кристи — «Как на войне».", check: "Критерий прохождения в карте отдельно не указан." },
  B3: { label: "Шестёрка", content: "Закрепляем рисунок на песнях.", materials: "Король и Шут — «Кукла колдуна»; Кино — «Когда твоя девушка больна».", check: "Критерий прохождения в карте отдельно не указан." },
  B4: { label: "Рок 4 / Рок 5", content: "Схемы рок-боя и песни для практики.", materials: "Звери — «Районы-кварталы»; Земфира — «Искала» по желанию.", check: "«Искала» указана как необязательная песня." },
  B5: { label: "Восьмёрка", content: "Новый рисунок и музыкальный материал для закрепления.", materials: "Амега — «Лететь»; Баста — «Сансара»; бонус — Бумбокс «Вахтёрам».", check: "«Вахтёрам» отмечена как бонус." },
  B6: { label: "Четвёрка с акцентом", content: "Рисунок с акцентом и песни для закрепления.", materials: "Кино — «Кукушка», «Группа крови»; бонус — «Невесёлая песня».", check: "Список песен приведён по мастер-карте." },
  B7: { label: "Шестёрка с делением", content: "На один рисунок боя приходится два аккорда.", materials: "Виктор Салтыков — «Белая ночь»; Сплин — «Моё сердце».", check: "Сохранять общий счёт при смене аккорда." },
  B8: { label: "Восьмёрка с делением", content: "Восьмёрка, разделённая между аккордами.", materials: "Ария — «Я свободен»; Женя Трофимов — «Поезда».", check: "Распределение всех песен по конкретным урокам требует сверки." },
  B9: { label: "Песни на выбор", content: "Можно выбрать песню, чтобы закрепить изученные приёмы.", materials: "Каталог PDF-разборов и отправка выбранного названия в личный чат.", check: "Список подбирается по выбору ученика." },
  T1: { label: "Деление боёв", content: "Шестёрка и восьмёрка; распределение рисунка между двумя аккордами; отдельное объяснение «Что такое деление?».", materials: "Схемы и вводное объяснение.", check: "Понимать, где меняется аккорд в рисунке." },
  T2: { label: "Дворовый бой", content: "Два варианта дворового рисунка.", materials: "Братья Грим — «Кустурица»; Звери — «До скорой встречи»; песня на выбор.", check: "Сопоставить рисунок и песню." },
  T3: { label: "Перебор «Четвёрка»", content: "Положение пальцев правой руки, бас, перебираемые струны и одновременные ноты.", materials: "Видео по переборам; в карте также упомянута «Батарейка».", check: "Связь песни с конкретным рисунком требует проверки." },
  M1: { label: "Видеоразборы", content: "Объяснение, демонстрация крупным планом и исполнение песни с возможностью замедления.", materials: "Видеоуроки и разборы песен.", check: "Использовать замедление для разбора сложного движения." },
  M2: { label: "Схемы и PDF", content: "Аппликатуры, направления ударов, акценты, табулатуры и разборы.", materials: "Схемы, табулатуры и PDF.", check: "Повторять приём по визуальной подсказке." },
  M3: { label: "Тренажёры и ссылки", content: "Метроном, тренажёр аккордов и тренажёр боя.", materials: "Ссылки на инструменты для самостоятельной практики.", check: "Тренировать один навык отдельно от исполнения песни." },
  M4: { label: "Завершение блока", content: "В материалах предусмотрены поздравления о прохождении раздела.", materials: "Сообщение о завершении блока.", check: "Отметить прохождение раздела." }
};


const extendedTracks = [
  { id: "rhythm", label: "Бои и песни", intro: "Новые рисунки боя и песни для закрепления.", keys: ["B1","B2","B3","B4","B5","B6","B7","B8","B9"] },
  { id: "technique", label: "Техники", intro: "Деление боёв, дворовый бой и переборы.", keys: ["T1","T2","T3"] },
  { id: "materials", label: "Материалы", intro: "Видеоуроки, схемы, табулатуры и тренажёры.", keys: ["M1","M2","M3","M4"] }
].map(({ keys, ...track }) => ({
  ...track,
  modules: keys.map(no => ({
    no,
    title: programDetails[no].label,
    desc: programDetails[no].content,
    songs: programDetails[no].materials,
    result: programDetails[no].check
  }))
}));


function Quiz({ onClose }) {
  const questions = [
    { key: "experience", title: "Какой у тебя сейчас опыт?", options: ["Начинаю с нуля", "Знаю несколько аккордов", "Уже играю, но упёрся(лась) в потолок"] },
    { key: "goal", title: "Что хочется уметь в первую очередь?", options: ["Играть любимые песни", "Прокачать ритм и технику", "Разобрать конкретные песни"] },
    { key: "pace", title: "Какой формат тебе ближе?", options: ["Заниматься с преподавателем", "Учиться в своём темпе с проверкой", "Получать готовые разборы песен"] }
  ];
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ experience: "", goal: "", pace: "" });
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [messages, setMessages] = useState([
    { role: "bot", text: "Привет! Помогу подобрать формат обучения гитаре под твои цели. Это всего три коротких вопроса." },
    { role: "bot", text: questions[0].title }
  ]);
  const historyRef = useRef(null);
  useEffect(() => {
    const history = historyRef.current;
    if (history) history.scrollTo({ top: history.scrollHeight, behavior: "smooth" });
  }, [messages, done]);
  const recommendation = useMemo(() => {
    if (answers.pace === "Учиться в своём темпе с проверкой") return { title: "Личное наставничество", text: "Уроки в удобное время, обратная связь по домашним заданиям и поддержка в Telegram." };
    if (answers.pace === "Получать готовые разборы песен") return { title: "Разбор любимых песен", text: "Подготовим материал под твой уровень: аккорды, бой или перебор и видеоразбор." };
    return { title: "Личные онлайн-занятия", text: "Индивидуальная работа с преподавателем, чтобы пройти сложные места вместе и выстроить понятный план." };
  }, [answers.pace]);
  const link = useMemo(() => {
    const msg = [
      "Привет! Я прошёл подбор занятий гитарой на сайте «Струны будущего».",
      "Опыт: " + answers.experience,
      "Цель: " + answers.goal,
      "Формат: " + answers.pace,
      "Рекомендация сайта: " + recommendation.title
    ].join("\n");
    return tg + "?text=" + encodeURIComponent(msg);
  }, [answers, recommendation.title]);

  useEffect(() => {
    if (!pending) return undefined;
    const timer = setTimeout(() => {
      setMessages((previous) => {
        const clean = previous.filter((message) => message.role !== "typing");
        if (step < questions.length - 1) {
          return clean.concat([{ role: "bot", text: "Понял! Ещё один момент." }, { role: "bot", text: questions[step + 1].title }]);
        }
        return clean.concat([{ role: "bot", text: "По твоим ответам подойдёт формат «" + recommendation.title + "». " + recommendation.text }]);
      });
      if (step < questions.length - 1) setStep(step + 1);
      else setDone(true);
      setPending(false);
    }, 620);
    return () => clearTimeout(timer);
  }, [pending, step, answers, recommendation, questions.length]);

  const chooseOption = (option) => {
    if (pending || done) return;
    setAnswers((previous) => ({ ...previous, [questions[step].key]: option }));
    setMessages((previous) => previous.concat([{ role: "user", text: option }, { role: "typing", text: "набирает сообщение" }]));
    setPending(true);
  };

  const restart = () => {
    setStep(0);
    setAnswers({ experience: "", goal: "", pace: "" });
    setPending(false);
    setDone(false);
    setMessages([
      { role: "bot", text: "Привет! Помогу подобрать формат обучения гитаре под твои цели. Это всего три коротких вопроса." },
      { role: "bot", text: questions[0].title }
    ]);
  };

  return (
    <div className="modal chat-modal" role="dialog" aria-modal="true" aria-label="Чат подбора обучения">
      <button className="modal-backdrop" onClick={onClose} aria-label="Закрыть чат" />
      <div className="modal-card chat-card">
        <div className="chat-header">
          <div className="chat-brand-avatar">С<span>♪</span></div>
          <div className="chat-person"><b>Струны будущего</b><small><i /> Автоматический помощник · 3 вопроса</small></div>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть"><Icon name="close" /></button>
        </div>
        <div className="chat-progress" aria-label={"Вопрос " + (done ? 3 : step + 1) + " из 3"}>
          <span style={{ width: ((done ? 3 : step + (pending ? 1 : 0)) / questions.length * 100) + "%" }} />
        </div>
        <div className="chat-history" ref={historyRef} aria-live="polite">
          <div className="chat-day">СЕГОДНЯ</div>
          {messages.map((message, index) => (
            <div className={"chat-line " + message.role} key={index}>
              {message.role === "bot" && <span className="chat-mini-avatar">С</span>}
              {message.role === "typing"
                ? <div className="chat-bubble typing-bubble"><span /><span /><span /></div>
                : <div className="chat-bubble">{message.text}</div>}
              {message.role === "user" && <span className="chat-read">✓✓</span>}
            </div>
          ))}
          {done && <div className="chat-result-actions">
            <div className="chat-recommendation"><small>ТВОЯ РЕКОМЕНДАЦИЯ</small><b>{recommendation.title}</b><p>{recommendation.text}</p></div>
            <a className="btn btn-primary chat-send" href={link} target="_blank" rel="noreferrer">Открыть Telegram с ответами <Icon name="arrow" /></a>
            <button className="text-button" onClick={restart}>Пройти заново</button>
          </div>}
        </div>
        {!done && <div className="chat-replies">
          {pending
            ? <div className="chat-wait">Готовлю следующий вопрос…</div>
            : <>
                <span className="chat-reply-label">ВЫБЕРИ ОТВЕТ</span>
                {questions[step].options.map((option) => (
                  <button key={option} className="chat-reply" onClick={() => chooseOption(option)}>
                    {option}<span>↗</span>
                  </button>
                ))}
              </>}
        </div>}
        <div className="chat-footer-note"><span>🔒</span> После выбора откроется Telegram с готовым сообщением. Отправляешь его сам.</div>
      </div>
    </div>
  );
}


const programImages = [
  "./hero-guitar.webp",
  "./material-trainer.webp",
  "./material-song.webp",
  "./material-song.webp",
  "./material-rhythm.webp",
  "./material-trainer.webp",
  "./personal-lesson.webp"
];

function MiniArrow(){return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6"/></svg>}
function ExternalArrow(){return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>}
function Logo(){return <span className="logo-wrap"><span className="logo-bars" aria-hidden="true"><i/><i/><i/><i/></span><span className="logo-words"><strong>СТРУНЫ</strong><small>БУДУЩЕГО</small></span></span>}

export default function Home(){
  const [menuOpen,setMenuOpen]=useState(false);
  const [chatOpen,setChatOpen]=useState(false);
  const [programMode,setProgramMode]=useState("base");
  const [lessonIndex,setLessonIndex]=useState(0);
  const [advancedIndex,setAdvancedIndex]=useState(0);
  const [advancedOpen,setAdvancedOpen]=useState(null);
  const [openFaq,setOpenFaq]=useState(-1);
  const [selectedCourse,setSelectedCourse]=useState(null);
  const [leadName,setLeadName]=useState("");
  const [leadContact,setLeadContact]=useState("");
  const [leadDirection,setLeadDirection]=useState("Гитара с нуля");
  const [headerScrolled,setHeaderScrolled]=useState(false);
  const base=programTracks[0].modules;
  const extra=extendedTracks;
  const module=base[lessonIndex];
  const advanced=extra[advancedIndex];
  const currentImage=programImages[lessonIndex];
  useEffect(()=>{
    document.documentElement.classList.add("js-motion");
    const handleScroll=()=>setHeaderScrolled(window.scrollY>24);
    window.addEventListener("scroll",handleScroll,{passive:true});handleScroll();
    const obs=typeof IntersectionObserver==="undefined"?null:new IntersectionObserver(entries=>{
      entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("in-view");obs.unobserve(entry.target)}});
    },{threshold:.08,rootMargin:"0px 0px -25px 0px"});
    document.querySelectorAll(".appear").forEach(el=>obs?obs.observe(el):el.classList.add("in-view"));
    return ()=>{window.removeEventListener("scroll",handleScroll);obs?.disconnect();document.documentElement.classList.remove("js-motion")};
  },[]);
  useEffect(()=>{
    const onKey=(e)=>{if(e.key==="Escape"){setChatOpen(false);setMenuOpen(false)}};
    window.addEventListener("keydown",onKey);
    if(chatOpen){document.body.style.overflow="hidden"}
    return ()=>{window.removeEventListener("keydown",onKey);document.body.style.overflow=""};
  },[chatOpen]);
  const closeMenu=()=>setMenuOpen(false);
  const openChat=()=>{setMenuOpen(false);setChatOpen(true)};
  const leadMessage=()=>[
    "Здравствуйте! Хочу записаться на урок в школу «Струны будущего».",
    "Имя: "+leadName.trim(),
    "Контакт: "+leadContact.trim(),
    "Направление: "+leadDirection
  ].join("\n");
  const sendLead=(event)=>{
    event.preventDefault();
    if(!leadName.trim()||!leadContact.trim())return;
    window.open(tg+"?text="+encodeURIComponent(leadMessage()),"_blank","noopener,noreferrer");
  };
  useEffect(()=>{
    if(selectedCourse!==null)document.getElementById("course-detail")?.scrollIntoView({behavior:"smooth",block:"nearest"});
  },[selectedCourse]);
  return <div className="site-shell">
    <header className={"site-header"+(headerScrolled?" scrolled":"")}>
      <div className="wrap header-layout">
        <a href="#top" className="site-logo" aria-label="Струны будущего, на главную"><Logo/></a>
        <nav className={"main-nav"+(menuOpen?" open":"")} aria-label="Навигация">
          <a onClick={closeMenu} href="#why">Об академии</a>
          <a onClick={closeMenu} href="#courses">Наши курсы</a>
          <a onClick={closeMenu} href="#program">Программа</a>
          <a onClick={closeMenu} href="#prices">Стоимость</a>
          <a onClick={closeMenu} href="#students">Отзывы и кейсы</a>
          <button className="nav-mobile-action" onClick={openChat}>Подобрать занятия <MiniArrow/></button>
        </nav>
        <button className="header-action" onClick={openChat}>Начать обучение <MiniArrow/></button>
        <button className={"menu-toggle"+(menuOpen?" active":"")} type="button" onClick={()=>setMenuOpen(v=>!v)} aria-expanded={menuOpen} aria-label={menuOpen?"Закрыть меню":"Открыть меню"}><span/><span/></button>
      </div>
    </header>

    <main>
      <section className="hero" id="top">
        <div className="hero-haze" aria-hidden="true"/>
        <div className="wrap hero-grid">
          <div className="hero-content appear">
            <div className="eyebrow hero-eyebrow"><span className="status-dot"/> Авторская онлайн-школа гитары</div>
            <h1>НАУЧИСЬ<br/><span>ИГРАТЬ</span><br/>НА ГИТАРЕ</h1>
            <p className="hero-intro">Индивидуальные онлайн-уроки для начинающих и тех, кто уже играет.</p>
            <div className="hero-buttons">
              <button className="button button-primary" onClick={openChat}>Подобрать обучение <MiniArrow/></button>
              <a className="button button-secondary" href="#program">Посмотреть программу</a>
            </div>
            <div className="hero-facts"><span>С 2019 года</span><i/><span>Индивидуальные занятия</span><i/><span>Онлайн</span></div>
          </div>
          <div className="hero-visual appear">
            <div className="hero-image-frame">
              <img src="./nikita-hero.webp" alt="Преподаватель Никита Осадчук с гитарой" fetchPriority="high"/>
              <div className="hero-photo-wash"/>
              <div className="photo-name"><span className="mini-wave" aria-hidden="true"><i/><i/><i/><i/><i/></span><div><strong>Никита Осадчук</strong><small>преподаватель гитары</small></div></div>
            </div>
            <button className="hero-chat-peek" onClick={openChat} aria-label="Открыть чат подбора занятий">
              <span className="chat-peek-icon">♪</span>
              <span><strong>Не знаете, с чего начать?</strong><small>Подберём формат за 3 вопроса</small></span>
              <MiniArrow/>
            </button>
            <span className="hero-side-label">ОНЛАЙН-ШКОЛА ГИТАРЫ</span>
          </div>
        </div>
      </section>


      <section className="why-section" id="why">
        <div className="wrap">
          <div className="why-head appear">
            <div><span className="eyebrow">АКАДЕМИЯ «СТРУНЫ БУДУЩЕГО»</span><h2>ПОЧЕМУ МЫ</h2></div>
            <p>Обучение акустической и электрогитаре онлайн. Занятия с преподавателем и практика на песнях.</p>
          </div>
          <div className="why-grid">
            <article className="why-card appear"><img src="./nikita-about.webp" loading="lazy" alt="Никита с гитарой"/><div className="why-card-content"><b>ИНДИВИДУАЛЬНЫЕ УРОКИ</b><small>Занятия под ваш уровень и задачи</small></div></article>
            <article className="why-card appear"><img src="./personal-lesson.webp" loading="lazy" alt="Практический урок гитары"/><div className="why-card-content"><b>РАЗБОРЫ ПЕСЕН</b><small>Аккорды, бой, перебор и техника</small></div></article>
            <article className="why-card appear"><div className="why-card-content"><b>ОБУЧЕНИЕ С НУЛЯ</b><small>Пошаговая программа</small></div></article>
            <a href="#students" className="why-card appear"><img src="./students-group.webp" loading="lazy" alt="Ученики музыкальной школы"/><div className="why-card-content"><b>ОТЗЫВЫ УЧЕНИКОВ</b><small>Отзывы и примеры занятий</small></div></a>
          </div>
        </div>
      </section>


      <section className="academy-stats" aria-label="Академия в цифрах">
        <div className="wrap academy-stats-grid">
          <div><strong>2019</strong><span>Преподаю с 2019 года</span></div>
          <div><strong>1:1</strong><span>Индивидуальный формат</span></div>
          <div><strong>7</strong><span>Этапов базового курса</span></div>
        </div>
      </section>

      <section className="section directions-section" id="courses">
        <div className="wrap">
          <div className="section-heading appear">
            <div><span className="eyebrow">НАПРАВЛЕНИЯ ОБУЧЕНИЯ</span><h2>НАШИ <em>КУРСЫ</em></h2></div>
            <p>Выберите направление. Программу и сложность подбираем под ваш уровень.</p>
          </div>
          <div className="direction-grid">
            {learningDirections.map((item,index)=><article key={item.id} className={"direction-card appear"+(selectedCourse===index?" direction-selected":"")}>
              <div className="direction-photo"><img src={item.image} alt={item.title} loading="lazy"/><span className="direction-tag">{item.tag}</span></div>
              <div className="direction-content">
                <h3>{item.title}</h3>
                <p>{item.summary}</p>
                <span className="direction-learn">Чему вы научитесь:</span>
                <ul>{item.topics.slice(0,3).map(topic=><li key={topic}>{topic}</li>)}</ul>
                <button type="button" onClick={()=>setSelectedCourse(v=>v===index?null:index)} aria-expanded={selectedCourse===index} aria-controls="course-detail">Подробнее <MiniArrow/></button>
              </div>
            </article>)}
          </div>
          <div id="course-detail" className={"direction-detail"+(selectedCourse!==null?" direction-detail-open":"")} aria-live="polite">
            {selectedCourse!==null&&<div className="direction-detail-body">
              <div className="direction-detail-copy">
                <span className="eyebrow">ПОДРОБНЕЕ О НАПРАВЛЕНИИ</span>
                <h3>{learningDirections[selectedCourse].title}</h3>
                <p>{learningDirections[selectedCourse].result}</p>
                <ul>{learningDirections[selectedCourse].topics.map(topic=><li key={topic}><Icon name="check"/>{topic}</li>)}</ul>
              </div>
              <div className="direction-detail-actions">
                {learningDirections[selectedCourse].program&&<a href="#program" className="button button-secondary" onClick={()=>{
                  const section=learningDirections[selectedCourse].program;
                  if(section==="base"){setProgramMode("base");setLessonIndex(0)}
                  else {setProgramMode("more");setAdvancedIndex(section==="rhythm"?0:section==="technique"?1:2);setAdvancedOpen(null)}
                }}>Посмотреть программу <MiniArrow/></a>}
                <button className="button button-primary" type="button" onClick={openChat}>Подобрать занятия <MiniArrow/></button>
                <button className="direction-detail-close" type="button" onClick={()=>setSelectedCourse(null)}>Закрыть</button>
              </div>
            </div>}
          </div>
        </div>
      </section>

      <section className="section program-section" id="program">
        <div className="wrap">
          <div className="section-heading appear">
            <div><span className="eyebrow">ПРОГРАММА</span><h2>ПРОГРАММА<br/><em>ОБУЧЕНИЯ</em></h2></div>
            <p>7 этапов: от знакомства с гитарой до исполнения первой песни.</p>
          </div>
          <div className="course-shell appear">
            <div className="course-header">
              <div className="course-tabs" role="tablist" aria-label="Раздел программы">
                <button type="button" role="tab" aria-selected={programMode==="base"} className={programMode==="base"?"chosen":""} onClick={()=>setProgramMode("base")}>Базовый минимум</button>
                <button type="button" role="tab" aria-selected={programMode==="more"} className={programMode==="more"?"chosen":""} onClick={()=>setProgramMode("more")}>Что дальше</button>
              </div>
              <span className="course-subtitle">{programMode==="base"?"7 последовательных этапов":"Бои · переборы · разборы"}</span>
            </div>
            {programMode==="base"?<div className="course-layout">
              <div className="lesson-list" aria-label="Этапы базовой программы">
                {base.map((item,index)=><button key={item.no} className={"lesson-item"+(lessonIndex===index?" chosen":"")} type="button" onClick={()=>setLessonIndex(index)} aria-current={lessonIndex===index?"step":undefined}>
                  <span className="lesson-number">{String(index+1).padStart(2,"0")}</span>
                  <span className="lesson-list-title">{item.title}</span>
                  <span className="lesson-indicator"><MiniArrow/></span>
                </button>)}
              </div>
              <div className="lesson-display" key={module.no}>
                <div className="lesson-photo">
                  <img src={currentImage} alt={module.title} loading="lazy"/>
                  <span className="photo-caption">{lessonIndex===0?"Устройство гитары":lessonIndex===1?"Практика под метроном":lessonIndex===2?"Первые аккорды":lessonIndex===6?"Играем песню целиком":"Программа на практике"}</span>
                </div>
                <div className="lesson-info">
                  <span className="lesson-kicker">ЭТАП {String(lessonIndex+1).padStart(2,"0")} / 07</span>
                  <h3>{module.title}</h3>
                  <p>{module.desc}</p>
                  <div className="lesson-outcome"><span><Icon name="check"/></span><div><small>ЧТО В ИТОГЕ</small><p>{module.result}</p></div></div>
                  <div className="lesson-nav">
                    <button type="button" onClick={()=>setLessonIndex(i=>(i+6)%7)} aria-label="Предыдущий этап">←</button>
                    <span>{String(lessonIndex+1).padStart(2,"0")} / 07</span>
                    <button type="button" onClick={()=>setLessonIndex(i=>(i+1)%7)} aria-label="Следующий этап">→</button>
                  </div>
                </div>
              </div>
            </div>:<div className="course-layout">
              <div className="lesson-list" aria-label="Дополнительные темы">
                {extra.map((item,index)=><button key={item.id} className={"lesson-item"+(advancedIndex===index?" chosen":"")} type="button" onClick={()=>{setAdvancedIndex(index);setAdvancedOpen(null)}}>
                  <span className="lesson-number">{String(index+1).padStart(2,"0")}</span>
                  <span className="lesson-list-title">{item.label==="Бои и песни"?"Бои и песни":item.label==="Техники"?"Другие приёмы":"Материалы"}</span>
                  <span className="lesson-indicator"><MiniArrow/></span>
                </button>)}
              </div>
              <div className="advanced-panel" key={advanced.id}>
                <span className="lesson-kicker">ПОСЛЕ БАЗОВОГО СТАРТА</span>
                <h3>{advanced.label}</h3>
                <p>{advanced.intro}</p>
                <div className="advanced-list">
                  {advanced.modules.map(item=><div key={item.no} className={"advanced-entry"+(advancedOpen===item.no?" is-open":"")}>
                    <button type="button" onClick={()=>setAdvancedOpen(v=>v===item.no?null:item.no)} aria-expanded={advancedOpen===item.no}><span>{item.title}</span><b>{advancedOpen===item.no?"−":"+"}</b></button>
                    {advancedOpen===item.no&&<div className="advanced-details"><p>{item.desc}</p>{item.songs&&<p>{item.songs}</p>}{item.result&&<p>{item.result}</p>}</div>}
                  </div>)}
                </div>
              </div>
            </div>}
          </div>
        </div>
      </section>

      <section className="section formats-section" id="prices">
        <div className="wrap">
          <div className="section-heading appear"><div><span className="eyebrow">ФОРМАТЫ ОБУЧЕНИЯ</span><h2>СТОИМОСТЬ<br/><em>ЗАНЯТИЙ</em></h2></div><p>Индивидуальные уроки, наставничество и разборы песен.</p></div>
          <div className="format-grid">
            {formats.map((item,index)=><article key={item.title} className={"price-card appear price-"+index}>
              <div className="price-top"><span className="price-index">0{index+1} / 03</span><span className="price-ornament" aria-hidden="true">{index===0?"◉":index===1?"♫":"↗"}</span></div>
              <span className="price-category">{item.tag}</span><h3>{item.title}</h3><p>{item.text}</p>
              <div className="price-bottom"><strong>{item.price}</strong><span>{item.points[0]}</span><button onClick={openChat} className="price-cta" type="button">Подобрать <MiniArrow/></button></div>
            </article>)}
          </div>
        </div>
      </section>

      <section className="section proof-section" id="students">
        <div className="wrap proof-grid">
          <div className="proof-heading appear"><span className="eyebrow">РЕЗУЛЬТАТЫ ОБУЧЕНИЯ</span><h2>ОТЗЫВЫ<br/><em>И РЕЗУЛЬТАТЫ</em></h2><p>Можно посмотреть отзывы на независимой площадке и запросить видео с игрой учеников.</p></div>
          <div className="proof-cards">
            <a className="proof-card proof-review appear" href="https://profi.ru/profile/OsadchukNA2/" target="_blank" rel="noreferrer">
              <div className="proof-card-top"><span>01 / ОТЗЫВЫ</span><ExternalArrow/></div>
              <div className="review-stars" aria-label="Отзывы на Профи.ру">★★★★★</div>
              <h3>Отзывы<br/>на Профи.ру</h3><p>Реальные оценки и впечатления учеников.</p>
              <span className="proof-link">Читать отзывы <MiniArrow/></span>
            </a>
            <button type="button" className="proof-card proof-results appear" onClick={()=>{openChat()}}>
              <div className="proof-card-top"><span>02 / РЕЗУЛЬТАТЫ</span><MiniArrow/></div>
              <div className="proof-mini-photo"><img src="./students-group.webp" alt="Преподаватель с группой учеников" loading="lazy"/></div>
              <h3>Как играют<br/>ученики</h3><p>Примеры выступлений и домашних записей можно запросить лично.</p>
              <span className="proof-link">Запросить примеры <MiniArrow/></span>
            </button>
          </div>
        </div>
      </section>


      <section className="section cases-section" id="cases">
        <div className="wrap">
          <div className="section-heading appear">
            <div><span className="eyebrow">ПРИМЕРЫ ИЗ ОБУЧЕНИЯ</span><h2>НАШИ <em>КЕЙСЫ</em></h2></div>
            <p>Примеры занятий, учебных материалов и работы с учениками.</p>
          </div>
          <div className="cases-grid">
            <article className="case-card appear"><img src="./students-group.webp" loading="lazy" alt="Ученики музыкальной школы"/><div><span>01 / УЧЕНИКИ</span><h3>Работа с учениками</h3></div></article>
            <article className="case-card appear"><img src="./personal-lesson.webp" loading="lazy" alt="Пример видеоурока"/><div><span>02 / УРОКИ</span><h3>Видеоуроки</h3></div></article>
            <article className="case-card appear"><img src="./material-song.webp" loading="lazy" alt="Материал по разбору песни"/><div><span>03 / МАТЕРИАЛЫ</span><h3>Разборы песен</h3></div></article>
          </div>
          <div className="cases-action"><p>Видео с игрой учеников можно запросить лично.</p><button className="button button-secondary" onClick={openChat}>Запросить примеры <MiniArrow/></button></div>
        </div>
      </section>

      <section className="section teacher-section" id="teacher">
        <div className="wrap teacher-layout">
          <div className="teacher-photo appear"><img src="./nikita-about.webp" alt="Никита Осадчук, преподаватель гитары" loading="lazy"/><div className="teacher-photo-label"><span>НИКИТА ОСАДЧУК</span><span>С 2019 ГОДА</span></div></div>
          <div className="teacher-content appear">
            <span className="eyebrow">ТВОЙ ПРЕПОДАВАТЕЛЬ</span>
            <h2>ОБО<br/><em>МНЕ</em></h2>
            <p>Преподаю гитару с 2019 года. Раньше руководил музыкальным направлением детского центра «Зебра» в Санкт-Петербурге.</p>
            <p>На занятиях соединяем технику с музыкой, которую вам действительно хочется играть.</p>
            <div className="teacher-tags"><span>Акустическая гитара</span><span>Электрогитара</span><span>Онлайн</span></div>
            <button className="text-link" onClick={openChat}>Обсудить занятия <MiniArrow/></button>
          </div>
        </div>
      </section>

      <section className="section sample-section" id="free">
        <div className="wrap sample-layout">
          <div className="sample-copy appear">
            <span className="eyebrow">ПЕРВОЕ ЗНАКОМСТВО</span>
            <h2>БЕСПЛАТНЫЙ<br/><em>УРОК</em></h2>
            <p>Посмотрите знакомство с гитарой и оцените подачу материала до записи.</p>
            <a className="button button-primary" href="https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" target="_blank" rel="noreferrer">Смотреть урок <ExternalArrow/></a>
          </div>
          <a className="sample-preview appear" href="https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" target="_blank" rel="noreferrer" aria-label="Открыть бесплатный видеоурок">
            <img src="./personal-lesson.webp" alt="Видеоурок по гитаре" loading="lazy"/>
            <span className="video-play"><Icon name="play"/></span>
            <span className="sample-video-caption">БЕСПЛАТНЫЙ ВИДЕОУРОК / ГИТАРА</span>
          </a>
        </div>
      </section>

      <section className="closing-section" id="contact">
        <div className="wrap closing-layout">
          <div className="closing-copy"><span className="eyebrow">СВЯЗАТЬСЯ С ПРЕПОДАВАТЕЛЕМ</span><h2>ОСТАВИТЬ<br/><em>ЗАЯВКУ</em></h2><p>Оставьте контакт и выберите направление. Откроется Telegram с заполненной заявкой, которую вы отправите самостоятельно.</p><div className="closing-links"><a href="https://n1313298.yclients.ru" target="_blank" rel="noreferrer">Онлайн-запись <ExternalArrow/></a><a href="https://t.me/nikguita" target="_blank" rel="noreferrer">Написать напрямую <ExternalArrow/></a></div></div>
          <form className="lead-form" onSubmit={sendLead}>
            <h3>Запись на занятия</h3>
            <label htmlFor="lead-name">Ваше имя</label>
            <input id="lead-name" type="text" required autoComplete="name" value={leadName} onChange={e=>setLeadName(e.target.value)} placeholder="Как к вам обращаться?"/>
            <label htmlFor="lead-contact">Telegram или телефон</label>
            <input id="lead-contact" type="text" required value={leadContact} onChange={e=>setLeadContact(e.target.value)} placeholder="@username или номер"/>
            <label htmlFor="lead-direction">Направление</label>
            <select id="lead-direction" value={leadDirection} onChange={e=>setLeadDirection(e.target.value)}>{learningDirections.map(item=><option key={item.id}>{item.title}</option>)}</select>
            <button className="button button-primary" type="submit">Отправить заявку <MiniArrow/></button>
            <small>Сообщение отправляется только после вашего подтверждения в Telegram.</small>
          </form>
        </div>
      </section>
    </main>

    <footer className="footer"><div className="wrap footer-layout">
      <a href="#top" className="site-logo" aria-label="Вернуться к началу"><Logo/></a>
      <p>Онлайн-уроки игры на гитаре<br/>© 2026 «Струны будущего»</p>
      <div className="footer-links"><a href="https://t.me/nikguita" target="_blank" rel="noreferrer">Telegram</a><a href="https://vk.com/strunib" target="_blank" rel="noreferrer">ВКонтакте</a><a href="https://profi.ru/profile/OsadchukNA2/" target="_blank" rel="noreferrer">Отзывы</a></div>
    </div></footer>
    <button className="sticky-mobile-button" onClick={openChat}>Подобрать обучение <MiniArrow/></button>
    {chatOpen&&<Quiz onClose={()=>setChatOpen(false)}/>}
  </div>
}
