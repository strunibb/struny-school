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

const faq = [
  ["Подойдёт ли обучение полному новичку?", "Да. В модуле «Базовый минимум» начинаем со знакомства с инструментом, посадки и постановки рук, затем переходим к аккордам, ритму и первым песням."],
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
  },
  {
    id: "battles", label: "Бои и песни",
    intro: "Новый рисунок боя — песни для закрепления. Основные и бонусные композиции разделены так, как указано в интеллект-карте.",
    modules: [
      { no: "B1", title: "Четвёрка с глушением", desc: "Закрепляем базовый рисунок на знакомых композициях.", songs: "Основные: Кино — «Звезда по имени Солнце», «Пачка сигарет». Бонус: Сплин — «Орбит без сахара»." },
      { no: "B2", title: "Шестёрка с глушением", desc: "Разбираем рисунок шестёрки с глушением и переносим его в песни.", songs: "Dabro — «Юность»; Кино — «Закрой за мной дверь»; Агата Кристи — «Как на войне»." },
      { no: "B3", title: "Шестёрка", desc: "Отрабатываем рисунок боя и закрепляем его на музыкальном материале.", songs: "Король и Шут — «Кукла колдуна»; Кино — «Когда твоя девушка больна»." },
      { no: "B4", title: "Рок 4 / Рок 5", desc: "Изучаем схемы и применяем рок-бо́й в песне.", songs: "Основная: Звери — «Районы-кварталы». По желанию: Земфира — «Искала»." },
      { no: "B5", title: "Восьмёрка", desc: "Осваиваем восьмёрку и отрабатываем рисунок на песнях.", songs: "Амега — «Лететь»; Баста — «Сансара». Бонус: Бумбокс — «Вахтёрам»." },
      { no: "B6", title: "Четвёрка с акцентом", desc: "Разбираем акцентированный рисунок и закрепляем его на примерах из репертуара.", songs: "Кино — «Кукушка», «Группа крови». Бонус: Кино — «Невесёлая песня»." },
      { no: "B7", title: "Шестёрка с делением", desc: "Учимся распределять один бой между двумя аккордами.", songs: "Виктор Салтыков — «Белая ночь»; Сплин — «Моё сердце»." },
      { no: "B8", title: "Восьмёрка с делением", desc: "Разбираем восьмёрку с делением. Привязку всех песен к конкретному уроку стоит сверить перед окончательной публикацией.", songs: "Материалы: Ария — «Я свободен»; Женя Трофимов — «Поезда»." },
      { no: "B9", title: "Песни на выбор", desc: "Для закрепления можно выбрать композицию из каталога разборов и отправить название в личный чат.", songs: "Каталог PDF-разборов и возможность заказать выбранную песню." }
    ]
  },
  {
    id: "tech", label: "Техники",
    intro: "Дополнительные технические блоки из авторской карты. Они расширяют базу и библиотеку боёв.",
    modules: [
      { no: "T1", title: "Деление боёв", desc: "Шестёрка и восьмёрка с делением между двумя аккордами. Отдельно разбираем, что означает деление рисунка.", result: "Понимать, как распределить движения боя между двумя аккордами." },
      { no: "T2", title: "Дворовый бой: два варианта", desc: "Сравниваем два варианта дворового боя и применяем подходящий рисунок в песне.", songs: "Братья Грим — «Кустурица»; Звери — «До скорой встречи». Также доступна песня на выбор." },
      { no: "T3", title: "Первый перебор: «Четвёрка»", desc: "Положение пальцев правой руки, бас, перебираемые струны и одновременное извлечение нот.", songs: "В материалах также есть Жуки — «Батарейка». Точную связь песни с рисунком нужно сверить с исходным уроком." }
    ]
  },
  {
    id: "tools", label: "Материалы",
    intro: "Материалы, которые сопровождают занятия и помогают повторять технику самостоятельно.",
    modules: [
      { no: "M1", title: "Видеоразборы", desc: "Объяснение, демонстрация крупным планом и исполнение песни. Видео можно замедлять.", result: "Разбирать движения и фрагменты песни в удобном темпе." },
      { no: "M2", title: "Схемы и PDF", desc: "Аппликатуры, направления ударов, акценты, табулатура и разборы песен.", result: "Иметь визуальную опору во время самостоятельной практики." },
      { no: "M3", title: "Тренажёры и ссылки", desc: "Метроном, тренажёр аккордов и тренажёр боя для самостоятельной практики.", result: "Отрабатывать конкретный навык отдельно от песни." },
      { no: "M4", title: "Завершение блока", desc: "В материалах используются поздравления о прохождении раздела.", result: "Отметить завершение учебного блока." }
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


const chordLibrary = {
  Em: { fingers: [{string:1,fret:2,finger:2},{string:2,fret:2,finger:3}], frequencies:[82.41,123.47,164.81,196,246.94,329.63], detail:"Два пальца на втором ладу. Остальные струны звучат открытыми." },
  Am: { fingers:[{string:2,fret:2,finger:2},{string:3,fret:2,finger:3},{string:4,fret:1,finger:1}], frequencies:[null,110,164.81,220,261.63,329.63], detail:"Три прижатые струны и три открытые. Шестую струну не играем." },
  C: { fingers:[{string:1,fret:3,finger:3},{string:2,fret:2,finger:2},{string:4,fret:1,finger:1}], frequencies:[null,130.81,164.81,196,261.63,329.63], detail:"Три прижатые струны и три открытые. Шестую струну не играем." },
  D: { fingers:[{string:3,fret:2,finger:1},{string:4,fret:3,finger:3},{string:5,fret:2,finger:2}], frequencies:[null,null,146.83,220,293.66,369.99], detail:"Играем четыре нижние струны. Пальцы образуют треугольник." }
};

function ChordTrainer() {
  const [activeChord, setActiveChord] = useState("Em");
  const [playing, setPlaying] = useState(false);
  const playChord = async () => {
    if (playing) return;
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    setPlaying(true);
    const ctx = new Audio();
    try {
      await ctx.resume();
      chordLibrary[activeChord].frequencies.filter(Boolean).forEach((hz,i) => {
        const start = ctx.currentTime + i * 0.035;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.value = hz;
        gain.gain.setValueAtTime(0.0001,start);
        gain.gain.exponentialRampToValueAtTime(0.12,start+0.012);
        gain.gain.exponentialRampToValueAtTime(0.0001,start+0.8);
        osc.connect(gain); gain.connect(ctx.destination);
        osc.start(start); osc.stop(start+0.85);
      });
    } finally {
      window.setTimeout(() => { ctx.close().catch(() => {}); setPlaying(false); }, 950);
    }
  };
  const chord = chordLibrary[activeChord];
  const strings = ["E","A","D","G","B","e"];
  return (
    <div className="chord-lab">
      <div className="chord-lab-top"><span>АППЛИКАТУРЫ · ОТКРЫТАЯ ПОЗИЦИЯ</span><b>01—04</b></div>
      <div className="chord-picker" role="tablist" aria-label="Выбрать аккорд">
        {Object.keys(chordLibrary).map(name => <button key={name} role="tab" aria-selected={activeChord===name} className={activeChord===name?"active":""} onClick={() => setActiveChord(name)}>{name}</button>)}
      </div>
      <div className="fretboard-wrap">
        <svg className="fretboard" viewBox="0 0 340 258" role="img" aria-label={"Аппликатура аккорда "+activeChord}>
          <text x="18" y="18" className="fretboard-label">СТРУНЫ</text>
          {strings.map((name,i) => {
            const x = 40 + i*44;
            const note = chord.frequencies[i];
            const finger = chord.fingers.find(f => f.string===i);
            return <g key={name}>
              <text x={x} y="43" textAnchor="middle" className={"string-mark "+(!note?"muted":!finger?"open":"")}>{!note?"×":!finger?"○":""}</text>
              <text x={x} y="224" textAnchor="middle" className="string-name">{name}</text>
              <line x1={x} y1="56" x2={x} y2="211" className="guitar-string" style={{strokeWidth:1+i*.16}} />
            </g>;
          })}
          {[0,1,2,3,4].map(fret => <line key={fret} x1="18" y1={56+fret*38} x2="282" y2={56+fret*38} className={fret===0?"fret-line nut":"fret-line"} />)}
          {[1,2,3].map(fret => <text key={fret} x="294" y={78+(fret-1)*38} className="fret-number">{fret}</text>)}
          {chord.fingers.map(({string,fret,finger}) => {
            const x = 40+string*44;
            const y = 56+(fret-.5)*38;
            return <g key={string+"-"+fret}><circle cx={x} cy={y} r="13" className="finger-dot"/><text x={x} y={y+3.8} textAnchor="middle" className="finger-number">{finger}</text></g>;
          })}
        </svg>
        <div className="chord-note"><span>{activeChord}</span><p>{chord.detail}</p></div>
      </div>
      <div className="chord-lab-bottom">
        <span>ЗВУЧАНИЕ — СИНТЕЗИРОВАННОЕ ПРЕВЬЮ</span>
        <button className="play-chord" disabled={playing} onClick={playChord}><span>{playing?"Ⅱ":"▶"}</span>{playing?"Звучит аккорд…":"Послушать аккорд"}</button>
      </div>
    </div>
  );
}

function MetronomeDemo() {
  const [bpm,setBpm] = useState(60);
  const [running,setRunning] = useState(false);
  const [beat,setBeat] = useState(0);
  const audioRef = useRef(null);
  const ensureAudio = async () => {
    if (!audioRef.current) {
      const Audio = window.AudioContext || window.webkitAudioContext;
      if (Audio) audioRef.current = new Audio();
    }
    if (audioRef.current?.state==="suspended") await audioRef.current.resume();
  };
  useEffect(() => {
    if (!running || !audioRef.current) return undefined;
    const ctx = audioRef.current;
    let count = 0;
    const tick = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const now = ctx.currentTime;
      osc.type = "sine";
      osc.frequency.value = count%4===0 ? 1050 : 720;
      gain.gain.setValueAtTime(0.0001,now);
      gain.gain.exponentialRampToValueAtTime(0.17,now+0.006);
      gain.gain.exponentialRampToValueAtTime(0.0001,now+0.055);
      osc.connect(gain); gain.connect(ctx.destination);
      osc.start(now); osc.stop(now+0.06);
      setBeat(count%4);
      count++;
    };
    tick();
    const timer = window.setInterval(tick,60000/bpm);
    return () => window.clearInterval(timer);
  },[running,bpm]);
  useEffect(() => () => { if(audioRef.current) audioRef.current.close().catch(()=>{}); },[]);
  const toggle = async () => {
    if(running){setRunning(false);return;}
    await ensureAudio();
    if(audioRef.current)setRunning(true);
  };
  return (
    <div className={"metronome-demo "+(running?"is-running":"")}>
      <div className="metronome-meta"><span>ТРЕНАЖЁР РИТМА</span><span>4/4</span></div>
      <div className="metronome-display">
        <div className="beat-indicators">{[0,1,2,3].map(n=><span key={n} className={running&&beat===n?"active":""}/>)}</div>
        <div className="tempo-number">{bpm}<small>BPM</small></div>
        <div className="tempo-caption">{running?"МЕТРОНОМ РАБОТАЕТ":"ВЫБЕРИ УДОБНЫЙ ТЕМП"}</div>
      </div>
      <div className="tempo-control">
        <label htmlFor="tempo-range">Темп <b>{bpm} ударов/мин</b></label>
        <input id="tempo-range" type="range" min="40" max="120" step="5" value={bpm} onChange={e=>setBpm(Number(e.target.value))}/>
        <div className="tempo-minmax"><span>40</span><span>120</span></div>
      </div>
      <button className="metronome-toggle" onClick={toggle}><span>{running?"Ⅱ":"▶"}</span>{running?"Остановить":"Запустить метроном"}</button>
      <p className="metronome-note">Сначала находим ровный пульс. Повышаем скорость, только когда получается играть без остановок.</p>
    </div>
  );
}


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
    { role: "bot", text: "Привет! Помогу подобрать формат музыкального обучения под твои цели. Это всего три коротких вопроса." },
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
      "Привет! Я прошёл подбор обучения на сайте «Струны будущего».",
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
        return clean.concat([{ role: "bot", text: "Судя по ответам, стоит начать с формата «" + recommendation.title + "». " + recommendation.text }]);
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
      { role: "bot", text: "Привет! Помогу подобрать формат музыкального обучения под твои цели. Это всего три коротких вопроса." },
      { role: "bot", text: questions[0].title }
    ]);
  };

  return (
    <div className="modal chat-modal" role="dialog" aria-modal="true" aria-label="Чат подбора обучения">
      <button className="modal-backdrop" onClick={onClose} aria-label="Закрыть чат" />
      <div className="modal-card chat-card">
        <div className="chat-header">
          <div className="chat-brand-avatar">С<span>♪</span></div>
          <div className="chat-person"><b>Струны будущего</b><small><i /> Подбор обучения · обычно 1 минута</small></div>
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
            <a className="btn btn-primary chat-send" href={link} target="_blank" rel="noreferrer">Отправить ответы Никите <Icon name="arrow" /></a>
            <button className="text-button" onClick={restart}>Пройти заново</button>
          </div>}
        </div>
        {!done && <div className="chat-replies">
          {pending
            ? <div className="chat-wait">Подбираем следующий вопрос…</div>
            : <>
                <span className="chat-reply-label">ВЫБЕРИ ОТВЕТ</span>
                {questions[step].options.map((option) => (
                  <button key={option} className="chat-reply" onClick={() => chooseOption(option)}>
                    {option}<span>↗</span>
                  </button>
                ))}
              </>}
        </div>}
        <div className="chat-footer-note"><span>🔒</span> Ответы никуда не отправятся, пока ты сам не нажмёшь кнопку в конце.</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [quiz, setQuiz] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [programTrack, setProgramTrack] = useState("base");
  const [expandedModule, setExpandedModule] = useState("");
  const activeProgram = programTracks.find((track) => track.id === programTrack) || programTracks[0];

  useEffect(() => {
    document.documentElement.classList.add("motion-enabled");

    const animated = document.querySelectorAll([
      ".hero-copy", ".hero-visual", ".curriculum-card", ".format-card",
      ".lesson-feature", ".about-visual", ".about-copy", ".proof-panel > div",
      ".accordion article"
    ].join(","));

    animated.forEach((element, index) => {
      element.classList.add("motion-reveal");
      element.style.setProperty("--motion-index", String(index % 8));
    });

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -5% 0px" });
    animated.forEach((element) => revealObserver.observe(element));

    const onPointer = (event) => {
      const target = event.target.closest("[data-pointer-depth]");
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const x = (event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5;
      const y = (event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5;
      target.style.setProperty("--pointer-x", String(x * 2));
      target.style.setProperty("--pointer-y", String(y * 2));
    };
    const resetPointer = (event) => {
      const target = event.target.closest("[data-pointer-depth]");
      if (!target || (event.relatedTarget && target.contains(event.relatedTarget))) return;
      target.style.setProperty("--pointer-x", "0");
      target.style.setProperty("--pointer-y", "0");
    };
    document.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerout", resetPointer, { passive: true });

    return () => {
      document.documentElement.classList.remove("motion-enabled");
      revealObserver.disconnect();
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerout", resetPointer);
    };
  }, []);


  return (
    <main>
      <div className="noise" />
      <header className="header">
        <a href="#top" className="brand" aria-label="Струны будущего — на главную">
          <span className="brand-mark"><span /><span /><span /><span /></span>
          <span><b>СТРУНЫ</b><small>БУДУЩЕГО</small></span>
        </a>
        <nav className={menu ? "nav open" : "nav"}>
          <a href="#program" onClick={() => setMenu(false)}>Программа</a>
          <a href="#formats" onClick={() => setMenu(false)}>Стоимость</a>
          <a href="#free" onClick={() => setMenu(false)}>Бесплатный урок</a>
          <a href="#reviews" onClick={() => setMenu(false)}>Отзывы</a>
          <button className="nav-cta" onClick={() => { setQuiz(true); setMenu(false); }}>Записаться</button>
        </nav>
        <button className="menu-button" onClick={() => setMenu(!menu)} aria-label="Открыть меню"><Icon name={menu ? "close" : "menu"} /></button>
      </header>

      <section className="hero" id="top">
        <div className="hero-glow glow-one" /><div className="hero-glow glow-two" />
        <div className="hero-copy reveal">
          <div className="hero-label"><span className="live-dot" /> Онлайн-школа гитары · Никита Осадчук</div>
          <h1>Научитесь играть<br/><em>на гитаре</em></h1>
          <p className="hero-lead">Акустическая и электрогитара. Понятная программа, любимые песни и обратная связь от преподавателя.</p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={() => setQuiz(true)}>Записаться на занятие <Icon name="arrow" /></button>
            <a className="btn btn-ghost" href="#program">Программа обучения</a>
          </div>
          <div className="hero-proof"><p><b>500+ учеников</b><span> · </span>с 2019 года</p></div>
        </div>
        <div className="hero-visual reveal delay" data-pointer-depth>
          <div className="photo-frame">
            <div className="photo-overlay" />
            <div className="photo-placeholder"><img className="hero-guitar-image" src="./nikita-hero.webp" alt="Никита Осадчук с акустической гитарой" fetchPriority="high" /></div>
            <div className="teacher-tag"><span>Никита Осадчук</span><small>преподаватель гитары</small></div>
          </div>
        </div>
      </section>

      <section className="section program" id="program">
        <div className="program-aside">
          <span className="eyebrow">обучение игре на гитаре</span>
          <h2>Программа <em>обучения</em></h2>
          <p>От первых упражнений до исполнения песен. Выберите раздел, чтобы посмотреть темы и результаты уроков.</p>
        </div>
        <div className="curriculum">
          <div className="curriculum-topline"><span>ПРОГРАММА ПО ГИТАРЕ</span><b>7 базовых этапов + дополнительные темы</b></div>
          <div className="curriculum-tabs" role="tablist" aria-label="Разделы программы">
            {programTracks.map((track) => (
              <button key={track.id} role="tab" aria-selected={programTrack === track.id} className={programTrack === track.id ? "curriculum-tab active" : "curriculum-tab"} onClick={() => { setProgramTrack(track.id); setExpandedModule(""); }}>
                {track.label}<span>{track.modules.length.toString().padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div className="curriculum-intro"><p>{activeProgram.intro}</p></div>
          <div className="curriculum-grid" role="tabpanel" key={activeProgram.id} aria-label={activeProgram.label}>
            {activeProgram.modules.map((module, index) => (
              <article className={"curriculum-card " + (expandedModule === module.no ? "expanded" : "")} key={module.no}>
                <div className="curriculum-card-top">
                  <div className="curriculum-card-head"><span>{activeProgram.id === "base" ? "УРОК" : activeProgram.id === "tools" ? "МАТЕРИАЛ" : "ТЕМА"} {module.no}</span><i>{String(index + 1).padStart(2, "0")}</i></div>
                  <h3>{module.title}</h3>
                </div>
                <div className="curriculum-card-body">
                  <p className="program-card-desc">{module.desc}</p>
                  <button className="curriculum-expand" type="button" aria-expanded={expandedModule === module.no} onClick={() => setExpandedModule(expandedModule === module.no ? "" : module.no)}>
                    {expandedModule === module.no ? "Скрыть подробности" : "Содержание урока"}<span>{expandedModule === module.no ? "−" : "+"}</span>
                  </button>
                  {expandedModule === module.no && <div className="curriculum-expanded">
                    {activeProgram.id === "base" && module.no === "01" && <div className="lesson-image-grid">
                      <figure><img src="./hero-guitar.webp" alt="Акустическая гитара" loading="lazy" /><figcaption>Акустическая гитара</figcaption></figure>
                      <figure><img src="./material-rhythm.webp" alt="Учебный материал по ритму" loading="lazy" /><figcaption>Ритм и упражнения</figcaption></figure>
                      <figure><img src="./lesson-planning.webp" alt="Материалы к занятиям по гитаре" loading="lazy" /><figcaption>План занятий</figcaption></figure>
                    </div>}
                    {module.result && <div className="curriculum-result"><span>РЕЗУЛЬТАТ</span><p>{module.result}</p></div>}
                    {module.songs && <div className="curriculum-songs"><span>ПЕСНИ И МАТЕРИАЛЫ</span><p>{module.songs}</p></div>}
                    {!module.songs && programDetails[module.no]?.materials && <div className="curriculum-songs"><span>МАТЕРИАЛЫ</span><p>{programDetails[module.no].materials}</p></div>}
                    {programDetails[module.no]?.check && <div className="curriculum-result"><span>ЧТО ДОЛЖНО ПОЛУЧИТЬСЯ</span><p>{programDetails[module.no].check}</p></div>}
                  </div>}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section formats" id="formats">
        <div className="section-head centered">
          <span className="eyebrow">форматы и стоимость</span>
          <h2>Как будем <em>заниматься</em></h2>
          <p>Выберите подходящий формат. Если сомневаетесь, поможем определиться на первом разговоре.</p>
        </div>
        <div className="format-grid">
          {formats.map((f) => <article key={f.title} className={"format-card " + f.accent + " " + (f.featured ? "featured" : "")}>
            {f.featured && <span className="popular">ПОПУЛЯРНО</span>}
            <span className="card-tag">{f.tag}</span>
            <h3>{f.title}</h3><p>{f.text}</p>
            <ul>{f.points.map(x => <li key={x}><Icon name="check" />{x}</li>)}</ul>
            <div className="card-bottom"><strong>{f.price}</strong><button aria-label={"Выбрать " + f.title} onClick={() => setQuiz(true)}><Icon name="arrow" /></button></div>
          </article>)}
        </div>
      </section>

      <section className="section free" id="free">
        <div className="section-head centered">
          <span className="eyebrow">бесплатно</span>
          <h2>Первый урок <em>по гитаре</em></h2>
          <p>Посмотрите, как устроен урок, и попробуйте первые шаги перед началом обучения.</p>
        </div>
        <div className="lesson-feature">
          <div className="lesson-video">
            <img className="lesson-preview-image" src="./material-rhythm.webp" alt="Фрагмент бесплатного видеоурока по гитаре" loading="lazy" />
            <a className="big-play" href="https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" target="_blank" rel="noreferrer" aria-label="Смотреть бесплатный урок"><Icon name="play" /></a>
          </div>
          <div className="lesson-info">
            <span className="card-tag">БЕСПЛАТНЫЙ ВИДЕОУРОК</span>
            <h3>Знакомство с гитарой</h3>
            <p>Основы посадки, инструмента и первых движений.</p>
            <a className="btn btn-primary" href="https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" target="_blank" rel="noreferrer">Смотреть урок <Icon name="arrow" /></a>
          </div>
        </div>
      </section>

      <section className="section about" id="about">
        <div className="about-visual">
          <img className="about-portrait" src="./nikita-about.webp" alt="Никита Осадчук с гитарой" loading="lazy" />
          <div className="experience-badge"><b>500+</b><span>учеников</span></div>
        </div>
        <div className="about-copy">
          <span className="eyebrow">преподаватель</span><h2>Никита Осадчук</h2>
          <p className="about-lead">Преподаватель гитары и аранжировщик. Руководитель отделения «Музыка» в детском центре «Зебра» в Санкт-Петербурге.</p>
          <div className="about-points">
            <div><b>С 2019 года</b><span>преподаю детям и взрослым</span></div>
            <div><b>500+ учеников</b><span>от новичков до продолжающих</span></div>
            <div><b>Два направления</b><span>акустическая и электрогитара</span></div>
          </div>
          <button className="btn btn-primary" onClick={() => setQuiz(true)}>Записаться на занятие <Icon name="arrow" /></button>
        </div>
      </section>

      <section className="section reviews" id="reviews">
        <div className="section-head centered">
          <span className="eyebrow">отзывы и результаты</span>
          <h2>Ученики и их <em>результаты</em></h2>
          <p>Посмотрите отзывы или запросите примеры игры учеников у преподавателя.</p>
        </div>
        <div className="proof-panel">
          <div><span className="stars">★★★★★</span><h3>Отзывы учеников</h3><p>Реальные оценки и отзывы в профиле на Profi.ru.</p><a className="btn btn-ghost" href="https://profi.ru/profile/OsadchukNA2" target="_blank" rel="noreferrer">Читать отзывы <Icon name="arrow" /></a></div>
          <div><span className="eyebrow">видео учеников</span><h3>Результаты обучения</h3><p>Попросите примеры игры учеников и подберите свой формат занятий.</p><a className="btn btn-ghost" href={tg + "?text=" + encodeURIComponent("Здравствуйте! Хочу посмотреть видео с результатами учеников и узнать об обучении гитаре.")} target="_blank" rel="noreferrer">Посмотреть результаты <Icon name="arrow" /></a></div>
        </div>
      </section>

      <section className="section faq" id="faq">
        <div className="faq-head"><span className="eyebrow">вопросы и ответы</span><h2>Коротко о главном</h2><p>Не нашли ответ? Напишите напрямую.</p><a className="btn btn-ghost" href={tg} target="_blank" rel="noreferrer"><Icon name="message"/> Написать в Telegram</a></div>
        <div className="accordion">{faq.slice(0,4).map(([q,a], i) => <article key={q} className={openFaq === i ? "open" : ""}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span><i>{openFaq === i ? "−" : "+"}</i></button><div className="answer"><p>{a}</p></div></article>)}</div>
      </section>

      <footer>
        <div className="footer-top"><a href="#top" className="brand"><span className="brand-mark"><span/><span/><span/><span/></span><span><b>СТРУНЫ</b><small>БУДУЩЕГО</small></span></a><p>Онлайн-обучение гитаре с Никитой Осадчуком.<br/>Акустическая и электрогитара.</p><div className="socials"><a href="https://t.me/nikguita" target="_blank" rel="noreferrer">TG</a><a href="https://vk.com/strunib?from=groups" target="_blank" rel="noreferrer">VK</a><a href="https://www.instagram.com/osadchukguitar" target="_blank" rel="noreferrer">IG</a></div></div>
        <div className="footer-bottom"><span>© 2026 «Струны будущего»</span><div><a href="#formats">Форматы</a><a href="#about">О преподавателе</a><a href={tg}>Контакты</a></div></div>
      </footer>

      <div className="mobile-sticky-cta">
        <button type="button" onClick={() => setQuiz(true)} aria-label="Подобрать формат обучения">
          <span><b>Подобрать обучение</b><small>3 вопроса · бесплатно</small></span>
          <Icon name="arrow" />
        </button>
      </div>
      {quiz && <Quiz onClose={() => setQuiz(false)} />}
    </main>
  );
}
