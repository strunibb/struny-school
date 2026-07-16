"use client";

import { useMemo, useState } from "react";

const tg = "https://t.me/nikguitar";

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
    tag: "Живой формат",
    title: "Личные занятия",
    text: "Встречаемся онлайн, разбираем технику и сразу исправляем ошибки. Для тех, кому нужен живой контакт и чёткий график.",
    points: ["40 минут один на один", "План под ваш уровень", "Гитара, электро, укулеле, фортепиано"],
    price: "от 3 690 ₽ / месяц",
    accent: "cyan"
  },
  {
    tag: "Самый гибкий",
    title: "Наставничество",
    text: "Получаете персональные видеоразборы, задания и обратную связь. Занимаетесь в удобное время, но не остаётесь один.",
    points: ["1–5 песен в неделю", "Проверка домашних видео", "Материалы остаются у вас"],
    price: "маршрут под вашу цель",
    accent: "violet",
    featured: true
  },
  {
    tag: "Быстрый результат",
    title: "Разбор песни",
    text: "Ваша песня, адаптированная под ваш уровень: PDF, бой или перебор, схемы аккордов и подробный видеоразбор.",
    points: ["Готово за 2–5 дней", "Можно упростить сложные места", "От одной песни до сет-листа"],
    price: "от 990 ₽",
    accent: "yellow"
  }
];

const reviews = [
  { name: "Анастасия", role: "начала с нуля", text: "Через несколько занятий уже сыграла песню целиком. Самое ценное — Никита объясняет спокойно и сразу видит, где именно я ошибаюсь." },
  { name: "Михаил", role: "вернулся к гитаре", text: "До занятий знал аккорды, но всё разваливалось в ритме. Появилась система, и песни наконец стали звучать уверенно." },
  { name: "Елена", role: "мама ученика", text: "Ребёнок ждёт уроков и занимается сам, без напоминаний. Программа построена вокруг музыки, которую ему действительно хочется играть." }
];

const faq = [
  ["Подойдёт ли обучение полному новичку?", "Да. Начинаем с посадки, настройки инструмента и простых движений. Музыкальная школа и знание нот не нужны."],
  ["Что нужно для онлайн-занятия?", "Инструмент, телефон или компьютер с камерой и стабильный интернет. Гитару и базовое оборудование помогу выбрать до старта."],
  ["Можно ли ребёнку?", "Да. Программа адаптируется под возраст, внимание и музыкальный вкус ребёнка. Родитель понимает, что и зачем мы делаем на каждом этапе."],
  ["Если график постоянно меняется?", "Подойдёт наставничество: уроки и задания проходите в своём темпе, а проверку присылаете в Telegram."],
  ["Какие песни будем играть?", "Те, которые нравятся вам. Я оцениваю сложность, адаптирую партии и выстраиваю порядок так, чтобы результат был посильным." ]
];

function Quiz({ onClose }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ experience: "", goal: "", pace: "" });
  const questions = [
    { key: "experience", kicker: "1 / 3", title: "Какой у вас опыт?", options: ["Никогда не играл(а)", "Знаю несколько аккордов", "Играю, но застрял(а)"] },
    { key: "goal", kicker: "2 / 3", title: "Что хочется получить?", options: ["Сыграть первые песни", "Улучшить технику и ритм", "Разобрать конкретные песни"] },
    { key: "pace", kicker: "3 / 3", title: "Как удобнее заниматься?", options: ["Вживую по расписанию", "Самостоятельно с проверкой", "Пока не знаю"] }
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
          <span className="eyebrow">Маршрут готов</span>
          <h2>Обсудим вашу цель лично</h2>
          <p>Ответы уже собраны в сообщение. Отправьте его в Telegram — я предложу подходящий формат и первый шаг без обязательств.</p>
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
          <div className="hero-label"><span className="live-dot" /> Онлайн и очно в Нячанге</div>
          <h1>Не учи гитару.<br/><em>Играй музыку.</em></h1>
          <p className="hero-lead">Любимые песни с первых недель — без скучной теории, хаотичных роликов и ощущения, что «у меня не получится».</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setQuiz(true)}>Подобрать формат <Icon name="arrow" /></button>
            <a className="btn btn-ghost" href="#free"><span className="play-mini"><Icon name="play" /></span> Попробовать бесплатно</a>
          </div>
          <div className="hero-proof">
            <div className="avatars"><span>М</span><span>А</span><span>Д</span><span>+1к</span></div>
            <p><b>Более 1000 учеников</b><br/>уже прошли через занятия</p>
          </div>
        </div>
        <div className="hero-visual reveal delay">
          <div className="photo-frame">
            <div className="photo-overlay" />
            <div className="photo-placeholder" aria-label="Никита Осадчук с гитарой">
              <span className="huge-note">♪</span>
              <div className="guitar-line"><i /><i /><i /><i /><i /><i /></div>
            </div>
            <div className="floating-card fc-top"><span className="mini-icon"><Icon name="music" /></span><div><small>Сегодня разбираем</small><b>вашу любимую песню</b></div></div>
            <div className="floating-card fc-bottom"><span className="wave"><i/><i/><i/><i/><i/><i/></span><div><small>Личный фидбэк</small><b>по вашему видео</b></div></div>
            <div className="teacher-tag"><span>Никита Осадчук</span><small>преподаватель · музыкант</small></div>
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
          <div><span className="eyebrow">знакомая ситуация?</span><h2>Уроков много.<br/>Прогресса — <em>не всегда.</em></h2></div>
          <p>Проблема обычно не в способностях. Нужны правильный порядок, музыка, которая цепляет, и человек, который вовремя поправит.</p>
        </div>
        <div className="problem-grid">
          <article><span>01</span><h3>Смотрю ролики — путаюсь</h3><p>Каждый объясняет по-своему, а целостной картины нет.</p></article>
          <article><span>02</span><h3>Аккорды знаю — песня не звучит</h3><p>Ритм сбивается, переходы тормозят, руки зажимаются.</p></article>
          <article><span>03</span><h3>Начинаю — потом бросаю</h3><p>Нет понятного следующего шага и обратной связи.</p></article>
        </div>
      </section>

      <section className="section program" id="program">
        <div className="program-aside">
          <span className="eyebrow">система вместо хаоса</span>
          <h2>Маршрут строится вокруг <em>вашей музыки</em></h2>
          <p>Не ждём месяцами до первой песни. Каждый новый навык сразу закрепляем в реальной музыке.</p>
          <button className="link-arrow" onClick={() => setQuiz(true)}>Узнать свой первый шаг <Icon name="arrow" /></button>
        </div>
        <div className="timeline">
          <article><span className="timeline-no">01</span><div><h3>Диагностика</h3><p>Определяем опыт, вкус, цель и реальные сложности. Выбираем песню, которая даст быстрый и честный первый результат.</p><small>15 минут · бесплатно</small></div></article>
          <article><span className="timeline-no">02</span><div><h3>Понятная база</h3><p>Посадка, руки, аккорды, табы и ритм — только то, что понадобится именно сейчас.</p><small>без перегруза теорией</small></div></article>
          <article><span className="timeline-no">03</span><div><h3>Любимые песни</h3><p>Адаптирую материал под ваш уровень, чтобы было посильно, но не скучно.</p><small>3–5 песен в первом модуле</small></div></article>
          <article><span className="timeline-no">04</span><div><h3>Обратная связь</h3><p>Исправляем конкретные ошибки до того, как они превратятся в привычку.</p><small>видео, голосом или на уроке</small></div></article>
        </div>
      </section>

      <section className="section formats" id="formats">
        <div className="section-head centered">
          <span className="eyebrow">выберите свой темп</span>
          <h2>Три способа <em>начать играть</em></h2>
          <p>Можно идти по расписанию, заниматься гибко или заказать разбор одной песни.</p>
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
        <p className="format-note">Не знаете, что выбрать? <button onClick={() => setQuiz(true)}>Ответьте на 3 вопроса</button> — подскажу без навязывания.</p>
      </section>

      <section className="section course-strip">
        <div className="course-visual">
          <div className="chord-card chord-a"><small>урок 04</small><b>Am</b><span>● ● ●</span></div>
          <div className="chord-card chord-c"><small>урок 07</small><b>C</b><span>● ● ●</span></div>
          <div className="pick-shape">SF</div>
        </div>
        <div className="course-copy">
          <span className="eyebrow">курс «базовый минимум»</span>
          <h2>От «как держать?»<br/>до <em>первых 3–5 песен</em></h2>
          <p>Четыре недели коротких шагов: постановка рук, аккорды, ритм, переходы и сборка песен целиком.</p>
          <div className="course-stats"><div><b>4</b><span>недели</span></div><div><b>12</b><span>уроков</span></div><div><b>5</b><span>песен</span></div></div>
          <a className="btn btn-light" href={`${tg}?text=${encodeURIComponent("Здравствуйте! Хочу узнать о курсе «Базовый минимум»")}`} target="_blank" rel="noreferrer">Узнать о курсе <Icon name="arrow" /></a>
        </div>
      </section>

      <section className="section free" id="free">
        <div className="section-head split-head">
          <div><span className="eyebrow">попробуйте до оплаты</span><h2>Первый урок —<br/><em>прямо сейчас</em></h2></div>
          <div className="instrument-tabs" role="tablist">
            {["Гитара", "Укулеле", "Фортепиано"].map(x => <button key={x} className={instrument === x ? "active" : ""} onClick={() => setInstrument(x)}>{x}</button>)}
          </div>
        </div>
        <div className="lesson-feature">
          <div className="lesson-video">
            <div className="lesson-art"><span>{instrument === "Гитара" ? "G" : instrument === "Укулеле" ? "U" : "P"}</span><div className="art-lines" /></div>
            <a className="big-play" href="https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" target="_blank" rel="noreferrer"><Icon name="play" /></a>
            <span className="duration">08:42</span>
          </div>
          <div className="lesson-info"><span className="card-tag">УРОК 01 · {instrument.toUpperCase()}</span><h3>{instrument === "Фортепиано" ? "Знакомство с клавиатурой" : "Знакомство с инструментом"}</h3><p>Разберём, как устроен инструмент, как правильно сесть и извлечь первый чистый звук без лишнего напряжения.</p><ul><li><Icon name="clock"/> Короткий урок</li><li><Icon name="music"/> Практика сразу</li><li><Icon name="message"/> Можно задать вопрос</li></ul><a className="link-arrow" href="https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" target="_blank" rel="noreferrer">Смотреть бесплатно <Icon name="arrow" /></a></div>
        </div>
      </section>

      <section className="section results">
        <div className="results-copy"><span className="eyebrow">что меняется</span><h2>Вы не «учите упражнения».<br/>Вы становитесь <em>музыкантом.</em></h2></div>
        <div className="result-cards"><article><b>01</b><p>Берёте инструмент без страха ошибиться</p></article><article><b>02</b><p>Держите ритм и не останавливаетесь на переходах</p></article><article><b>03</b><p>Собираете личный репертуар, а не чужой список</p></article><article><b>04</b><p>Понимаете, как разбирать новые песни самостоятельно</p></article></div>
      </section>

      <section className="section about" id="about">
        <div className="about-visual">
          <div className="portrait-placeholder"><span>NO</span><small>Никита<br/>Осадчук</small></div>
          <div className="experience-badge"><b>1000+</b><span>учеников</span></div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">ваш преподаватель</span><h2>Никита Осадчук</h2>
          <p className="about-lead">Преподаватель, мультиинструменталист и аранжировщик. Учу не «правильно проходить программу», а свободнее выражать себя через музыку.</p>
          <div className="about-points"><div><b>с 2019</b><span>преподаю детям и взрослым</span></div><div><b>4 инструмента</b><span>гитара, электро, укулеле, фортепиано</span></div><div><b>Санкт-Петербург</b><span>руководил музыкальным отделением детского центра</span></div></div>
          <blockquote>«Моя задача — сделать так, чтобы после урока вам хотелось взять инструмент ещё раз, а не убрать его до следующей недели».</blockquote>
        </div>
      </section>

      <section className="section reviews">
        <div className="section-head split-head"><div><span className="eyebrow">говорят ученики</span><h2>Прогресс, который<br/><em>слышно</em></h2></div><a className="link-arrow" href="https://profi.ru/profile/OsadchukNA2" target="_blank" rel="noreferrer">Больше отзывов на Profi.ru <Icon name="arrow" /></a></div>
        <div className="review-grid">{reviews.map((r,i) => <article key={r.name}><div className="stars">★★★★★</div><p>«{r.text}»</p><div className="reviewer"><span>{r.name[0]}</span><div><b>{r.name}</b><small>{r.role}</small></div></div><span className="quote">“</span></article>)}</div>
      </section>

      <section className="section faq">
        <div className="faq-head"><span className="eyebrow">без неудобных вопросов</span><h2>Коротко о главном</h2><p>Если вашего вопроса нет — напишите, отвечу лично.</p><a className="btn btn-ghost" href={tg} target="_blank" rel="noreferrer"><Icon name="message"/> Задать вопрос</a></div>
        <div className="accordion">{faq.map(([q,a], i) => <article key={q} className={openFaq === i ? "open" : ""}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><i>{openFaq === i ? "−" : "+"}</i></button><div className="answer"><p>{a}</p></div></article>)}</div>
      </section>

      <section className="final-cta">
        <div className="cta-note">♪</div><div className="cta-note n2">♫</div>
        <span className="eyebrow">первый шаг — самый лёгкий</span>
        <h2>Какую песню вы давно<br/>хотите <em>сыграть?</em></h2>
        <p>Расскажите о своей цели. За 15 минут подберём маршрут и поймём, с чего начать именно вам.</p>
        <button className="btn btn-dark" onClick={() => setQuiz(true)}>Получить бесплатный план <Icon name="arrow" /></button>
        <small>Без оплаты и обязательств · отвечаю лично</small>
      </section>

      <footer>
        <div className="footer-top"><a href="#top" className="brand"><span className="brand-mark"><span/><span/><span/><span/></span><span><b>СТРУНЫ</b><small>БУДУЩЕГО</small></span></a><p>Онлайн-школа музыки Никиты Осадчука.<br/>Играйте то, что действительно любите.</p><div className="socials"><a href="https://t.me/nikguitar" target="_blank" rel="noreferrer">TG</a><a href="https://vk.com/strunib" target="_blank" rel="noreferrer">VK</a><a href="https://www.instagram.com/osadchukguitar" target="_blank" rel="noreferrer">IG</a></div></div>
        <div className="footer-bottom"><span>© 2026 «Струны будущего»</span><div><a href="#formats">Форматы</a><a href="#about">О преподавателе</a><a href={tg}>Контакты</a></div></div>
      </footer>

      {quiz && <Quiz onClose={() => setQuiz(false)} />}
    </main>
  );
}
