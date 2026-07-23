"use client";

import { useMemo, useState } from "react";

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
    text: "Занятия по гитаре, электрогитаре, фортепиано или укулеле с разбором техники и домашних заданий.",
    points: ["Гитара: 4 урока — 3 790 ₽", "Фортепиано: 4 занятия — 3 190 ₽", "Укулеле: 4 занятия — 3 390 ₽"],
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

const faq = [
  ["Подойдёт ли обучение полному новичку?", "Да. В модуле «Базовый минимум» начинаем со знакомства с инструментом, посадки и постановки рук, затем переходим к аккордам, ритму и первым песням."],
  ["Что делать, если нет постоянного расписания?", "Можно выбрать наставничество: вы занимаетесь в удобное время, отправляете домашнее задание в Telegram и получаете личные правки."],
  ["Можно заказать разбор, если я почти не играю?", "Да. Начнём с одной простой песни, сложные места можно упростить, а материал будет подготовлен под ваш уровень."],
  ["Сколько готовится разбор песни?", "Обычно от 2 до 5 рабочих дней. Срок зависит от сложности песни и количества треков."],
  ["Можно попробовать бесплатно?", "Да. На сайте собраны бесплатные уроки по гитаре и электрогитаре, укулеле и фортепиано." ]
];

function Quiz({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ experience: "", goal: "", pace: "" });
  const questions = [
    { key: "experience", kicker: "1 / 3", title: "Какой у вас опыт?", options: ["Никогда не играл(а)", "Знаю несколько аккордов", "Играю, но застрял(а)"] },
    { key: "goal", kicker: "2 / 3", title: "Что хочется получить?", options: ["Сыграть первые песни", "Улучшить технику и ритм", "Разобрать конкретные песни"] },
    { key: "pace", kicker: "3 / 3", title: "Как удобнее заниматься?", options: ["Личные онлайн-занятия", "Самостоятельно с проверкой", "Разбор выбранных песен"] }
  ];
  const q = questions[step];
  const isDone = step === questions.length;
  const link = useMemo(() => {
    const msg = `Здравствуйте! Прошёл(ла) подбор формата на сайте.%0AОпыт: ${answers.experience}%0AЦель: ${answers.goal}%0AФормат: ${answers.pace}`;
    return `${tg}?text=${encodeURI(msg)}`;
  }, [answers]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label="Подбор формата">
      <button className="modal-backdrop" onClick={onClose} aria-label="Закрыть" />
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Закрыть"><Icon name="close" /></button>
        {!isDone ? <>
          <span className="eyebrow">{q.kicker} · подбор обучения</span>
          <h2>{q.title}</h2>
          <div className="quiz-options">
            {q.options.map(option => (
              <button key={option} className={answers[q.key] === option ? "selected" : ""} onClick={() => setAnswers({ ...answers, [q.key]: option })}>
                <span>{option}</span><span className="radio" />
              </button>
            ))}
          </div>
          <button className="btn btn-primary quiz-next" disabled={!answers[q.key]} onClick={() => setStep(step + 1)}>
            {step === 2 ? "Получить рекомендацию" : "Дальше"}<Icon name="arrow" />
          </button>
        </> : <div className="quiz-result">
          <span className="result-icon"><Icon name="spark" /></span>
          <span className="eyebrow">Ответы заполнены</span>
          <h2>Отправьте ответы Никите</h2>
          <p>Сообщение уже сформировано. В Telegram Никита уточнит детали и предложит подходящий формат обучения.</p>
          <a className="btn btn-primary" href={link} target="_blank" rel="noreferrer">Написать Никите <Icon name="arrow" /></a>
          <button className="text-button" onClick={() => setStep(0)}>Пройти ещё раз</button>
        </div>}
      </div>
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [instrument, setInstrument] = useState("Гитара");

  return (
    <main>
      <div className="noise" />
      <header className="header">
        <a href="#top" className="brand" aria-label="Струны будущего — на главную">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span><b>СТРУНЫ</b><small>БУДУЩЕГО</small></span>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          <a href="#formats" onClick={() => setMenu(false)}>Форматы</a>
          <a href="#program" onClick={() => setMenu(false)}>Как учимся</a>
          <a href="#free" onClick={() => setMenu(false)}>Бесплатно</a>
          <a href="#about" onClick={() => setMenu(false)}>О преподавателе</a>
          <button className="nav-cta" onClick={() => { setQuiz(true); setMenu(false); }}>Подобрать обучение</button>
        </nav>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Открыть меню"><Icon name={menu ? "close" : "menu"} /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-copy reveal">
          <div className="hero-label"><span className="live-dot" /> Онлайн-школа Никиты Осадчука</div>
          <h1>Научитесь играть<br/><em>на гитаре</em></h1>
          <p className="hero-lead">Пошаговое обучение для новичков и продолжающих: постановка рук, аккорды, ритм, любимые песни и личная обратная связь.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setQuiz(true)}>Получить бесплатную диагностику <Icon name="arrow" /></button>
            <a className="btn btn-ghost" href="#formats">Посмотреть форматы</a>
          </div>
          <div className="hero-proof">
            <div className="avatars"><span>🎸</span><span>🎹</span><span>🎶</span><span>500+</span></div>
            <p><b>Более 500 учеников</b><br/>прошли обучение с 2019 года</p>
          </div>
        </div>
        <div className="hero-visual reveal delay">
          <div className="photo-frame">
            <div className="photo-overlay" />
            <div className="photo-placeholder" aria-label="Акустическая гитара">
              <img className="hero-guitar-image" src="./hero-guitar.webp" alt="Акустическая гитара" />
            </div>
            <div className="floating-card fc-top"><span className="mini-icon"><Icon name="music" /></span><div><small>Наставничество</small><b>1–3 песни в неделю</b></div></div>
            <div className="floating-card fc-bottom"><span className="wave"><i/><i/><i/><i/><i/><i/></span><div><small>Обратная связь</small><b>личная проверка ДЗ</b></div></div>
            <div className="teacher-tag"><span>Никита Осадчук</span><small>мультиинструменталист · аранжировщик</small></div>
          </div>
        </div>
        <div className="scroll-hint"><span /> листайте</div>
      </section>

      <section className="marquee" aria-label="Направления обучения">
        <div className="marquee-track">
          {Array(2).fill(["АКУСТИЧЕСКАЯ ГИТАРА", "ЭЛЕКТРОГИТАРА", "УКУЛЕЛЕ", "ФОРТЕПИАНО", "РАЗБОР ПЕСЕН"]).flat().map((x, i) => <span key={i}>{x}<b>✦</b></span>)}
        </div>
      </section>

      <section className="section problem-section">
        <div className="section-head split-head">
          <div><span className="eyebrow">кому подойдёт обучение</span><h2>Если хотите играть,<br/>но не знаете, <em>с чего начать</em></h2></div>
          <p>На занятиях есть понятный порядок: от постановки рук и первых аккордов до песен, которые вы сможете сыграть целиком.</p>
        </div>
        <div className="problem-grid">
          <article><span>01</span><h3>Давно хотите научиться</h3><p>Но каждый раз откладываете начало и не понимаете, какой шаг должен быть первым.</p></article>
          <article><span>02</span><h3>Пробовали учиться по YouTube</h3><p>Роликов много, объяснения разные, а цельной программы и обратной связи нет.</p></article>
          <article><span>03</span><h3>Знаете несколько аккордов</h3><p>Но переходы и ритм пока мешают сыграть песню уверенно от начала до конца.</p></article>
        </div>
      </section>

      <section className="section program" id="program">
        <div className="program-aside">
          <span className="eyebrow">модуль «Базовый минимум»</span>
          <h2>От первого занятия до <em>3–5 песен</em></h2>
          <p>Четыре недели коротких уроков по 10–20 минут. Занимаетесь по понятному плану и последовательно собираете базу.</p>
          <button className="link-arrow" onClick={() => setQuiz(true)}>Записаться на модуль <Icon name="arrow" /></button>
        </div>
        <div className="timeline">
          <article><span className="timeline-no">01</span><div><h3>Знакомство с инструментом</h3><p>Посадка за гитарой, базовая постановка правой и левой рук, исправление ошибок, из-за которых появляется напряжение.</p><small>1–3 урок</small></div></article>
          <article><span className="timeline-no">02</span><div><h3>Первые открытые аккорды</h3><p>Пошаговая техника зажатия без лишнего напряжения и упражнения на чистое звучание струн.</p><small>4–5 урок</small></div></article>
          <article><span className="timeline-no">03</span><div><h3>Ритм и смена аккордов</h3><p>Рабочий рисунок боя, ровный пульс, переходы под метроном и устранение пауз между аккордами.</p><small>6–9 урок</small></div></article>
          <article><span className="timeline-no">04</span><div><h3>Сборка первых песен</h3><p>Выбираем 3–5 треков под ваш вкус и доводим каждую песню до исполнения от начала до конца.</p><small>10–12 урок</small></div></article>
        </div>
      </section>

      <section className="section formats" id="formats">
        <div className="section-head centered">
          <span className="eyebrow">форматы обучения</span>
          <h2>Выберите подходящий <em>вариант занятий</em></h2>
          <p>Личные уроки по расписанию, наставничество в удобном темпе или готовый разбор выбранных песен.</p>
        </div>
        <div className="format-grid">
          {formats.map((f) => <article key={f.title} className={`format-card ${f.accent} ${f.featured ? "featured" : ""}`}>
            {f.featured && <span className="popular">ПОПУЛЯРНО</span>}
            <span className="card-tag">{f.tag}</span>
            <h3>{f.title}</h3><p>{f.text}</p>
            <ul>{f.points.map(x => <li key={x}><Icon name="check" />{x}</li>)}</ul>
            <div className="card-bottom"><strong>{f.price}</strong><button aria-label={`Выбрать ${f.title}`} onClick={() => setQuiz(true)}><Icon name="arrow" /></button></div>
          </article>)}
        </div>
        <p className="format-note">Не знаете, что выбрать? <button onClick={() => setQuiz(true)}>Ответьте на 3 вопроса</button> — Никита предложит подходящий формат.</p>
      </section>

      <section className="section course-strip">
        <div className="course-visual">
          <div className="chord-card chord-a"><small>урок 04</small><b>Am</b><span>● ● ●</span></div>
          <div className="chord-card chord-c"><small>урок 07</small><b>C</b><span>● ● ●</span></div>
          <div className="pick-shape">SF</div>
        </div>
        <div className="course-copy">
          <span className="eyebrow">курс «базовый минимум»</span>
          <h2>С нуля до<br/><em>первых 3–5 песен</em></h2>
          <p>За четыре недели вы поставите руки, выучите первые аккорды, освоите простой бой и соберёте песни целиком.</p>
          <div className="course-stats"><div><b>4</b><span>недели</span></div><div><b>12</b><span>коротких уроков</span></div><div><b>3–5</b><span>песен</span></div></div>
          <a className="btn btn-light" href={`${tg}?text=${encodeURIComponent("Здравствуйте! Хочу узнать о курсе «Базовый минимум»")}`} target="_blank" rel="noreferrer">Узнать о курсе <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="section free" id="free">
        <div className="section-head split-head">
          <div><span className="eyebrow">бесплатные материалы</span><h2>Выберите инструмент<br/>и <em>посмотрите урок</em></h2></div>
          <div className="instrument-tabs" role="tablist">
            {["Гитара", "Укулеле", "Фортепиано"].map(x => <button key={x} className={instrument === x ? "active" : ""} onClick={() => setInstrument(x)}>{x}</button>)}
          </div>
        </div>
        <div className="lesson-feature">
          <div className="lesson-video">
            <div className="lesson-art"><span>{instrument === "Гитара" ? "G" : instrument === "Укулеле" ? "U" : "P"}</span><div className="art-lines" /></div>
            <a className="big-play" href={instrument === "Гитара" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" : instrument === "Укулеле" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239064" : "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239059&hd=3"} target="_blank" rel="noreferrer"><Icon name="play" /></a>
          </div>
          <div className="lesson-info"><span className="card-tag">БЕСПЛАТНЫЙ УРОК · {instrument.toUpperCase()}</span><h3>{instrument === "Фортепиано" ? "Первый урок по фортепиано" : instrument === "Укулеле" ? "Первый урок по укулеле" : "Знакомство с гитарой"}</h3><p>{instrument === "Гитара" ? "Знакомство с инструментом, правильная посадка и первые шаги перед началом игры." : "Откройте первый урок по выбранному инструменту и попробуйте формат обучения до покупки."}</p><ul><li><Icon name="play"/> Видео открывается сразу</li><li><Icon name="music"/> Практический материал</li><li><Icon name="message"/> Можно задать вопрос преподавателю</li></ul><a className="link-arrow" href={instrument === "Гитара" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" : instrument === "Укулеле" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239064" : "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239059&hd=3"} target="_blank" rel="noreferrer">Смотреть бесплатно <Icon name="arrow" /></a></div>
        </div>
      </section>

      <section className="section results">
        <div className="results-copy"><span className="eyebrow">результат базового модуля</span><h2>Что вы сможете<br/>после <em>четырёх недель</em></h2></div>
        <div className="result-cards"><article><b>01</b><p>Правильно сидеть и держать гитару без лишнего напряжения</p></article><article><b>02</b><p>Стабильно брать 5–7 базовых аккордов</p></article><article><b>03</b><p>Играть простой ритм и менять аккорды без долгих пауз</p></article><article><b>04</b><p>Сыграть 3–5 песен от начала до конца</p></article></div>
      </section>

      <section className="section about" id="about">
        <div className="about-visual">
          <div className="portrait-placeholder"><span>NO</span><small>Никита<br/>Осадчук</small></div>
          <div className="experience-badge"><b>500+</b><span>учеников</span></div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">ваш преподаватель</span><h2>Никита Осадчук</h2>
          <p className="about-lead">Мультиинструменталист и аранжировщик. Руководитель отделения «Музыка» в детском центре «Зебра» в Санкт-Петербурге.</p>
          <div className="about-points"><div><b>с 2019 года</b><span>преподаёт музыку детям и взрослым</span></div><div><b>более 500 учеников</b><span>от полных новичков до продолжающих музыкантов</span></div><div><b>несколько направлений</b><span>гитара, электрогитара, укулеле и фортепиано</span></div></div>
        </div>
      </section>

      <section className="section reviews">
        <div className="section-head split-head"><div><span className="eyebrow">отзывы и результаты</span><h2>Посмотрите работы<br/><em>учеников</em></h2></div><p>Отзывы не переписаны и не придуманы для сайта: они опубликованы в подтверждённом профиле преподавателя на Profi.ru.</p></div>
        <div className="proof-panel">
          <div><span className="stars">★★★★★</span><h3>Отзывы учеников</h3><p>Оценки и тексты реальных клиентов находятся в профиле Никиты Осадчука.</p><a className="btn btn-ghost" href="https://profi.ru/profile/OsadchukNA2" target="_blank" rel="noreferrer">Открыть отзывы на Profi.ru <Icon name="arrow" /></a></div>
          <div><span className="eyebrow">видео</span><h3>Результаты учеников</h3><p>Примеры игры учеников можно запросить у преподавателя вместе с подбором формата.</p><a className="btn btn-ghost" href={`${tg}?text=${encodeURIComponent("Здравствуйте! Хочу посмотреть результаты учеников и подобрать формат обучения.")}`} target="_blank" rel="noreferrer">Запросить примеры <Icon name="arrow" /></a></div>
        </div>
      </section>

      <section className="section faq">
        <div className="faq-head"><span className="eyebrow">без неудобных вопросов</span><h2>Коротко о главном</h2><p>Если вашего вопроса нет — напишите, отвечу лично.</p><a className="btn btn-ghost" href={tg} target="_blank" rel="noreferrer"><Icon name="message"/> Задать вопрос</a></div>
        <div className="accordion">{faq.map(([q,a], i) => <article key={q} className={openFaq === i ? "open" : ""}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><i>{openFaq === i ? "−" : "+"}</i></button><div className="answer"><p>{a}</p></div></article>)}</div>
      </section>

      <section className="final-cta">
        <div className="cta-note">♪</div><div className="cta-note n2">♫</div>
        <span className="eyebrow">бесплатная диагностика</span>
        <h2>Подберём формат и план<br/><em>на первые недели</em></h2>
        <p>Ответьте на три коротких вопроса об опыте, цели и удобном темпе занятий. После этого сможете отправить ответы Никите в Telegram.</p>
        <button className="btn btn-dark" onClick={() => setQuiz(true)}>Подобрать обучение <Icon name="arrow" /></button>
        <small>Диагностика занимает около 15 минут</small>
      </section>

      <footer>
        <div className="footer-top"><a href="#top" className="brand"><span className="brand-mark"><span/><span/><span/><span/></span><span><b>СТРУНЫ</b><small>БУДУЩЕГО</small></span></a><p>Онлайн-школа музыки Никиты Осадчука.<br/>Гитара, электрогитара, укулеле и фортепиано.</p><div className="socials"><a href="https://t.me/nikguita" target="_blank" rel="noreferrer">TG</a><a href="https://vk.com/strunib?from=groups" target="_blank" rel="noreferrer">VK</a><a href="https://www.instagram.com/osadchukguitar" target="_blank" rel="noreferrer">IG</a></div></div>
        <div className="footer-bottom"><span>© 2026 «Струны будущего»</span><div><a href="#formats">Форматы</a><a href="#about">О преподавателе</a><a href={tg}>Контакты</a></div></div>
      </footer>

      {quiz && <Quiz onClose={() => setQuiz(false)} />}
    </main>
  );
}
