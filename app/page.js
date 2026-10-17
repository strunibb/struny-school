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


const programTracks = [
  {
    id: "base",
    label: "Базовый старт",
    intro: "Семь этапов в подтверждённом авторском порядке: от знакомства с инструментом до первой песни.",
    modules: [
      { no: "01", title: "Знакомство с гитарой", desc: "Устройство инструмента, посадка, руки и струны, настройка через тюнер, табулатура и первое упражнение на открытых струнах.", result: "Могу настроить гитару и выполнить первое упражнение." },
      { no: "02", title: "Чувство ритма и метроном", desc: "Хроматические упражнения и лады 1–4 под ровный пульс. Начинаем примерно с 60 BPM и повышаем темп шагами по 5–10 BPM после удачного выполнения.", result: "Сохраняю ровный пульс на комфортной скорости." },
      { no: "03", title: "Первые аккорды", desc: "Аппликатуры Em, Am, C и D, чистое звучание и последовательность переходов. Для тренировки используется тренажёр смены аккордов.", result: "Ставлю четыре аккорда и постепенно сокращаю паузы между ними." },
      { no: "04", title: "Аккорды соединяются со словами", desc: "На песне «Пачка сигарет» учимся менять Em → Am → C → D в нужных местах текста. Пока играем по одному удару вниз на аккорд, не добавляя бой.", result: "Не теряю последовательность аккордов в тексте." },
      { no: "05", title: "Первый бой с глушением", desc: "Разбираем знак глушения X, счёт «1-и-2-и» и рисунок: вниз → вверх → глушение → вверх. Сначала тренируем правую руку отдельно.", result: "Повторяю рисунок боя циклически." },
      { no: "06", title: "Соединяем бой и аккорды", desc: "Упражнение «Скакалка»: освобождаем и возвращаем аккорд, не останавливая движение правой руки. Затем тренируем пары Em–Am, Am–C, C–D и D–Em.", result: "Выполняю «Скакалку» минимум 4 раза подряд и тренирую переходы." },
      { no: "07", title: "Первая песня целиком", desc: "Собираем аккорды, бой и текст в учебной версии «Пачки сигарет». Петь одновременно необязательно: главное — сыграть без остановок между аккордами.", result: "Исполняю учебную версию песни без пауз между аккордами." }
    ]
  },
  {
    id: "battles",
    label: "Бои и песни",
    intro: "Расширяем репертуар, осваивая разные рисунки боя. Эти темы есть в материалах, но их точная последовательность не подтверждена, поэтому они не пронумерованы как обязательная лестница.",
    modules: [
      { no: "A1", title: "Четвёрка с глушением", desc: "Закрепляем знакомый рисунок боя и переносим его на другие песни.", songs: "Основные: Кино — «Звезда по имени Солнце», «Пачка сигарет». Бонус: Сплин — «Орбит без сахара»." },
      { no: "A2", title: "Шестёрка с глушением", desc: "Разбираем схему, глушение и движения правой руки, затем пробуем их в песнях.", songs: "Dabro — «Юность»; Кино — «Закрой за мной дверь»; Агата Кристи — «Как на войне»." },
      { no: "A3", title: "Бой «шестёрка»", desc: "Осваиваем рисунок, повторяем его в ровном темпе и соединяем с аккордами.", songs: "Король и Шут — «Кукла колдуна»; Кино — «Когда твоя девушка больна»." },
      { no: "A4", title: "Рок-бой: варианты 4 и 5", desc: "Работаем со схемой, счётом и акцентом на доле, затем переносим рисунок в песню.", songs: "Основная: «Районы-кварталы». По желанию: Земфира — «Искала»." },
      { no: "A5", title: "Восьмёрка", desc: "Считаем восемь долей, отрабатываем рисунок и постепенно добавляем аккорды.", songs: "Амега — «Лететь»; Баста — «Сансара». Бонус: Бумбокс — «Вахтёрам»." },
      { no: "A6", title: "Четвёрка с акцентом", desc: "Знакомимся с вариантом боя, в котором важно выделять нужную долю. Конкретную песню привязываем после сверки исходного урока.", songs: "В материалах песни для этого блока пока не подтверждены." },
      { no: "A7", title: "Дворовый бой: два варианта", desc: "Сравниваем два варианта дворового рисунка и применяем выбранный в песне.", songs: "Братья Грим — «Кустурица»; Звери — «До скорой встречи»." }
    ]
  },
  {
    id: "division",
    label: "Деление боёв",
    intro: "Учимся распределять рисунок между аккордами, чтобы менять гармонию вовремя и не терять общий счёт.",
    modules: [
      { no: "D1", title: "Что такое деление боя", desc: "Понимаем, в какой точке рисунка меняется аккорд. Это вводная тема перед отдельными вариантами деления.", songs: "Схемы и графические примеры; материал готовит к шестёрке и восьмёрке с делением." },
      { no: "D2", title: "Шестёрка с делением", desc: "Распределяем движения между двумя аккордами. В варианте без глушения: ↓↓ на первый аккорд, ↑↑↑ — на второй; с глушением: ↓X и затем ↑↑X↑.", songs: "Виктор Салтыков — «Белая ночь»; Сплин — «Моё сердце»." },
      { no: "D3", title: "Восьмёрка с делением", desc: "Переносим принцип деления на восьмёрку и сравниваем с исполнением целым боем.", songs: "Ария — «Я свободен». Связь песни «Поезда» с этим блоком требует проверки." }
    ]
  },
  {
    id: "picking",
    label: "Переборы",
    intro: "Отдельная тематическая ветка. В мастер-карте точное место переборов в общем маршруте пока не установлено.",
    modules: [
      { no: "P1", title: "Первый перебор «Четвёрка»", desc: "Знакомимся с пальцами правой руки, выбором басовой струны и последовательностью нот. Сначала играем рисунок на одном аккорде, затем переносим его в песню.", songs: "Жуки — «Батарейка»; также предусмотрены песни на выбор." }
    ]
  }
];;

const programDetails = {
  "01": { label: "Внутри блока", content: "Устройство гитары; удобная посадка; нумерация пальцев левой руки и струн; настройка через приложение-тюнер; место прижатия струн; положение левой руки; чтение табулатуры; обозначения пальцев правой руки. Первая практика на открытых струнах: по четыре раза на струну пальцами I/M.", materials: "Схемы и иллюстрации, нотный стан и табулатура, упражнение на открытых струнах, итоговое видео около 15 минут.", check: "Показать части гитары, настроить инструмент тюнером и сыграть упражнение." },
  "02": { label: "Практика и темп", content: "Обсуждаем, зачем нужен метроном. Играем хроматическое упражнение поперёк грифа, затем упражнение в пределах ладов 1–4 соответствующими пальцами левой руки.", materials: "Метроном и технические упражнения. В материалах указан старт с 60 BPM, повышение на 5–10 BPM после удачного выполнения и ориентир до 120 BPM.", check: "Сохранять ровный пульс на своей скорости; повышать темп только после стабильного повторения." },
  "03": { label: "Аккорды и тренажёр", content: "Разбираем упрощённые обозначения мажора и минора, смотрим аппликатуры Em, Am, C и D, затем проходим переходы по порядку Em → Am → C → D.", materials: "Схемы аппликатур и тренажёр смены аккордов с ручным порядком переходов.", check: "Ставить каждый аккорд и постепенно сокращать паузу перед следующим." },
  "04": { label: "Практика на песне", content: "Берём «Пачку сигарет», проговариваем слова и меняем Em → Am → C → D там, где это требуется. На этом этапе полноценный бой намеренно не добавляем.", materials: "Песня «Пачка сигарет» и последовательность аккордов.", check: "Не терять место в тексте и вовремя менять аккорд." },
  "05": { label: "Рисунок боя", content: "Объясняем знак X и глушение, считаем «1-и-2-и», разбираем движение вниз, вверх, глушение, вверх. Сначала техника отдельно, затем повторение под видео с регулируемой скоростью.", materials: "Схема боя, видеоурок и онлайн-тренажёр боя.", check: "Повторять рисунок циклически в ровном темпе." },
  "06": { label: "Упражнение «Скакалка»", content: "Играем вниз → вверх → глушение, отпускаем зажим левой руки и выполняем удар вверх по открытым струнам, возвращаем аккорд и повторяем. Затем отдельно отрабатываем переходы Em–Am, Am–C, C–D и D–Em.", materials: "Техническое упражнение без слов и видео для отработки.", check: "Сохранять движение правой руки при отпускании и возврате аккорда." },
  "07": { label: "Финальная сборка", content: "Играем вместе с преподавателем учебную версию «Пачки сигарет», соединяя аккорды, бой и слова. Пение необязательно: главная цель — пройти песню без остановок на смене аккордов.", materials: "Финальное видео и отдельная запись для дополнительной практики.", check: "Исполнить учебную версию, объединив аккорды и бой без пауз." },
  A1: { label: "Материалы и практика", content: "Переносим уже знакомую четвёрку с глушением на разные песни. Для каждой композиции предусмотрены отдельные материалы.", materials: "PDF, видеоразборы и видео для отработки. Также доступна песня на выбор.", check: "Порядок относительно базового блока и точная последовательность песен требуют сверки." },
  A2: { label: "Материалы и практика", content: "Изучаем направление движений и схему шестёрки с глушением, затем применяем рисунок в песнях.", materials: "Вводное видео, схема, демонстрация движений и отдельные разборы песен.", check: "Критерий прохождения в исходных материалах не зафиксирован." },
  A3: { label: "Материалы и практика", content: "Разбираем схему шестёрки по направлениям правой руки. При необходимости снижаем скорость видео и постепенно возвращаемся к обычному темпу.", materials: "Видеоурок «Бой шестёрка», схема и разборы песен.", check: "Полное содержание блока требует дополнительной сверки." },
  A4: { label: "Материалы и практика", content: "Смотрим схемы на счёт «1-и-2-и-3-и-4-и», направления ударов и акценты, затем закрепляем рисунок на песне.", materials: "Видео «Рок 5», схемы, PDF и короткие видео по песням. Основная композиция — «Районы-кварталы», «Искала» — дополнительная по желанию.", check: "Не добавлять дополнительные песни как обязательные без отдельного решения." },
  A5: { label: "Материалы и практика", content: "Разбираем восьмёрку, считаем восемь долей, повторяем рисунок под видео, затем используем его на песнях.", materials: "Схема боя, видео объяснения/разбора и демонстрация рисунка. Есть песни на выбор; «Вахтёрам» отмечена как бонус.", check: "Точный порядок внутри расширенной программы не подтверждён." },
  A6: { label: "Материалы и практика", content: "Изучаем схему с ударами по басовым струнам и акцентированным ударом.", materials: "Схема и видео «Бой 4 с акцентом».", check: "Точный рисунок нужно сверить с оригинальным видео. Песни к этому блоку пока не привязаны." },
  A7: { label: "Материалы и практика", content: "Смотрим короткое вводное видео и сравниваем два варианта дворового боя: движения вниз, вверх и глушение.", materials: "Видео «Бой дворовый» и схема двух вариантов. В репертуаре можно выбрать песню.", check: "Положение блока относительно других расширенных тем не подтверждено." },
  D1: { label: "Материалы и практика", content: "Разбираемся, что значит делить рисунок боя между аккордами и как распределять движения, чтобы смена гармонии приходилась на нужное место.", materials: "Отдельная вводная тема и графические схемы.", check: "Это вводный материал перед шестёркой и восьмёркой с делением." },
  D2: { label: "Материалы и практика", content: "В варианте без глушения: ↓↓ играем на первый аккорд, ↑↑↑ — на второй. В варианте с глушением: ↓X на первый, затем ↑↑X↑ на второй.", materials: "PDF, видео разбора «Белая ночь» и отдельное видео по теме.", check: "Следить за точкой смены аккорда, не теряя общий счёт." },
  D3: { label: "Материалы и практика", content: "Разбираем восьмёрку с делением и сравниваем её с исполнением того же рисунка целиком.", materials: "Схемы и видео с разбором «Я свободен», плюс сравнение с цельным боем.", check: "Привязка песни «Поезда» к этому блоку пока требует подтверждения." },
  P1: { label: "Материалы и практика", content: "Знакомимся с опорой пальцев, выбором басовой струны и одновременным извлечением нот, изучаем рисунок перебора и пробуем применить его в песне.", materials: "Видео «Переборы» и короткое видео, схемы пальцев правой руки; «Батарейка» и песни на выбор.", check: "Положение переборов в общем маршруте пока не установлено." }
};



const chordLibrary = {
  Em: { notes: [0, 2, 2, 0, 0, 0], fingers: [{ string: 1, fret: 2, finger: 2 }, { string: 2, fret: 2, finger: 3 }], frequencies: [82.41, 123.47, 164.81, 196.0, 246.94, 329.63], detail: "Два пальца на втором ладу. Остальные струны звучат открытыми." },
  Am: { notes: [-1, 0, 2, 2, 1, 0], fingers: [{ string: 2, fret: 2, finger: 2 }, { string: 3, fret: 2, finger: 3 }, { string: 4, fret: 1, finger: 1 }], frequencies: [null, 110.0, 164.81, 220.0, 261.63, 329.63], detail: "Пять струн, три пальца. Шестую струну не играем." },
  C: { notes: [-1, 3, 2, 0, 1, 0], fingers: [{ string: 1, fret: 3, finger: 3 }, { string: 2, fret: 2, finger: 2 }, { string: 4, fret: 1, finger: 1 }], frequencies: [null, 130.81, 164.81, 196.0, 261.63, 329.63], detail: "Три прижатые струны и три открытые. Шестую струну не играем." },
  D: { notes: [-1, -1, 0, 2, 3, 2], fingers: [{ string: 3, fret: 2, finger: 1 }, { string: 4, fret: 3, finger: 3 }, { string: 5, fret: 2, finger: 2 }], frequencies: [null, null, 146.83, 220.0, 293.66, 369.99], detail: "Играем четыре нижние струны. Пальцы собираются в треугольник." }
};

function ChordTrainer() {
  const [activeChord, setActiveChord] = useState("Em");
  const [playing, setPlaying] = useState(false);

  const playChord = async () => {
    if (playing) return;
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) {
      setPlaying(false);
      return;
    }
    setPlaying(true);
    const context = new AudioContextClass();
    await context.resume();
    const frequencies = chordLibrary[activeChord].frequencies.filter(Boolean);
    frequencies.forEach((frequency, index) => {
      const startAt = context.currentTime + index * 0.035;
      const oscillator = context.createOscillator();
      const overtone = context.createOscillator();
      const gain = context.createGain();
      const overtoneGain = context.createGain();
      oscillator.type = "triangle";
      oscillator.frequency.value = frequency;
      overtone.type = "sine";
      overtone.frequency.value = frequency * 2.01;
      overtoneGain.gain.value = 0.13;
      gain.gain.setValueAtTime(0.0001, startAt);
      gain.gain.exponentialRampToValueAtTime(0.11, startAt + 0.012);
      gain.gain.exponentialRampToValueAtTime(0.0001, startAt + 0.85);
      oscillator.connect(gain);
      overtone.connect(overtoneGain);
      overtoneGain.connect(gain);
      gain.connect(context.destination);
      oscillator.start(startAt);
      overtone.start(startAt);
      oscillator.stop(startAt + 0.9);
      overtone.stop(startAt + 0.9);
    });
    window.setTimeout(() => {
      context.close().catch(() => {});
      setPlaying(false);
    }, 1050);
  };

  const data = chordLibrary[activeChord];
  const stringNames = ["E", "A", "D", "G", "B", "e"];
  const fingerByString = new Map(data.fingers.map((f) => [f.string, f]));

  return (
    <div className="chord-lab">
      <div className="chord-lab-top"><span>АППЛИКАТУРЫ · ОТКРЫТАЯ ПОЗИЦИЯ</span><b>01 — 04</b></div>
      <div className="chord-picker" role="tablist" aria-label="Выбрать аккорд">
        {Object.keys(chordLibrary).map((chord) => (
          <button key={chord} role="tab" aria-selected={activeChord === chord} className={activeChord === chord ? "active" : ""} onClick={() => setActiveChord(chord)}>{chord}</button>
        ))}
      </div>
      <div className={"fretboard-wrap " + (playing ? "playing" : "")}>
        <svg className="fretboard" viewBox="0 0 340 258" role="img" aria-label={"Аппликатура аккорда " + activeChord}>
          <text x="18" y="18" className="fretboard-label">СТРУНЫ</text>
          {stringNames.map((name, i) => {
            const x = 40 + i * 44;
            const note = data.notes[i];
            return <g key={name}>
              <text x={x} y="43" textAnchor="middle" className={"string-mark " + (note === -1 ? "muted" : note === 0 ? "open" : "")}>{note === -1 ? "×" : note === 0 ? "○" : ""}</text>
              <text x={x} y="224" textAnchor="middle" className="string-name">{name}</text>
              <line x1={x} y1="56" x2={x} y2="211" className="guitar-string" style={{ strokeWidth: 1 + i * 0.16 }} />
            </g>;
          })}
          {[0,1,2,3,4].map((fret) => <line key={fret} x1="18" y1={56 + fret * 38} x2="282" y2={56 + fret * 38} className={fret === 0 ? "fret-line nut" : "fret-line"} />)}
          {[1,2,3].map((fret) => <text key={fret} x="294" y={78 + (fret - 1) * 38} className="fret-number">{fret}</text>)}
          {data.fingers.map(({string, fret, finger}) => {
            const x = 40 + string * 44;
            const y = 56 + (fret - 0.5) * 38;
            return <g key={string + "-" + fret}>
              <circle cx={x} cy={y} r="13.5" className="finger-dot" />
              <text x={x} y={y + 3.8} textAnchor="middle" className="finger-number">{finger}</text>
            </g>;
          })}
          <text x="294" y="210" className="fretboard-label">ЛАДЫ</text>
        </svg>
        <div className="chord-note"><span>{activeChord}</span><p>{data.detail}</p></div>
      </div>
      <div className="chord-lab-bottom">
        <span>ЗВУЧАНИЕ — СИНТЕЗИРОВАННОЕ ПРЕВЬЮ</span>
        <button className="play-chord" onClick={playChord} disabled={playing}><span>{playing ? "Ⅱ" : "▶"}</span>{playing ? "Звучит аккорд…" : "Послушать аккорд"}</button>
      </div>
    </div>
  );
}

function MetronomeDemo() {
  const [bpm, setBpm] = useState(60);
  const [running, setRunning] = useState(false);
  const [beat, setBeat] = useState(0);
  const audioRef = useRef(null);

  const ensureAudio = async () => {
    if (!audioRef.current) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) audioRef.current = new AudioContextClass();
    }
    if (audioRef.current && audioRef.current.state === "suspended") await audioRef.current.resume();
  };

  useEffect(() => {
    if (!running || !audioRef.current) return undefined;
    const context = audioRef.current;
    let currentBeat = 0;
    const tick = () => {
      const now = context.currentTime;
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = "sine";
      oscillator.frequency.value = currentBeat % 4 === 0 ? 1100 : 760;
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.16, now + 0.008);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.055);
      oscillator.connect(gain);
      gain.connect(context.destination);
      oscillator.start(now);
      oscillator.stop(now + 0.06);
      setBeat(currentBeat % 4);
      currentBeat += 1;
    };
    tick();
    const timer = window.setInterval(tick, 60000 / bpm);
    return () => window.clearInterval(timer);
  }, [running, bpm]);

  useEffect(() => () => {
    if (audioRef.current) audioRef.current.close().catch(() => {});
  }, []);

  const toggle = async () => {
    if (running) {
      setRunning(false);
      return;
    }
    await ensureAudio();
    setRunning(true);
  };

  return (
    <div className={"metronome-demo " + (running ? "is-running" : "")}>
      <div className="metronome-meta"><span>ТРЕНАЖЁР РИТМА</span><span>4/4</span></div>
      <div className="metronome-display">
        <div className="beat-indicators">{[0,1,2,3].map((n) => <span key={n} className={running && beat === n ? "active" : ""} />)}</div>
        <div className="tempo-number">{bpm}<small>BPM</small></div>
        <div className="tempo-caption">{running ? "МЕТРОНОМ РАБОТАЕТ" : "ВЫБЕРИ УДОБНЫЙ ТЕМП"}</div>
      </div>
      <div className="tempo-control">
        <label htmlFor="tempo-range">Темп <b>{bpm} ударов/мин</b></label>
        <input id="tempo-range" type="range" min="40" max="120" step="5" value={bpm} onChange={(event) => setBpm(Number(event.target.value))} />
        <div className="tempo-minmax"><span>40</span><span>120</span></div>
      </div>
      <button className="metronome-toggle" onClick={toggle}><span>{running ? "Ⅱ" : "▶"}</span>{running ? "Остановить" : "Запустить метроном"}</button>
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
  const [instrument, setInstrument] = useState("Гитара");
  const [programTrack, setProgramTrack] = useState("base");
  const [expandedModule, setExpandedModule] = useState("");
  const activeProgram = programTracks.find((track) => track.id === programTrack) || programTracks[0];
  const [storyScene, setStoryScene] = useState(0);

  useEffect(() => {
    document.documentElement.classList.add("motion-enabled");

    const animated = document.querySelectorAll([
      ".hero-copy", ".hero-visual", ".problem-grid article", ".curriculum-card",
      ".format-card", ".real-learning-photo", ".course-strip", ".lesson-feature",
      ".materials-gallery figure", ".result-cards article", ".about-visual",
      ".about-copy", ".proof-panel > div", ".student-group", ".accordion article",
      ".final-cta"
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

    const story = document.querySelector(".music-story");
    let raf = 0;
    let lastScene = -1;
    const updateScroll = () => {
      raf = 0;
      if (!story) return;
      const rect = story.getBoundingClientRect();
      const travel = Math.max(1, story.offsetHeight - window.innerHeight);
      const progress = Math.max(0, Math.min(1, -rect.top / travel));
      story.style.setProperty("--story-progress", (progress * 100) + "%");

      // Cross-fade the four scenes continuously with scroll progress; no snap between panels.
      const scenePosition = Math.max(0, Math.min(3, progress * 4 - 0.5));
      const scenes = story.querySelectorAll(".story-scene");
      scenes.forEach((scene, index) => {
        const opacity = Math.max(0, 1 - Math.abs(scenePosition - index));
        scene.style.setProperty("--scene-opacity", String(opacity));
        scene.style.transform = "translate3d(0," + ((1 - opacity) * 15) + "px,0) scale(" + (0.992 + opacity * 0.008) + ")";
        scene.style.visibility = opacity > 0.005 ? "visible" : "hidden";
      });

      const nextScene = Math.min(3, Math.floor(progress * 4));
      if (nextScene !== lastScene) {
        lastScene = nextScene;
        setStoryScene(nextScene);
      }
    };
    const onScroll = () => {
      if (!raf) raf = window.requestAnimationFrame(updateScroll);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    updateScroll();

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
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      document.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerout", resetPointer);
      if (raf) window.cancelAnimationFrame(raf);
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
          <a href="#formats" onClick={() => setMenu(false)}>Форматы</a>
          <a href="#program" onClick={() => setMenu(false)}>Как учимся</a>
          <a href="#free" onClick={() => setMenu(false)}>Бесплатно</a>
          <a href="#about" onClick={() => setMenu(false)}>О преподавателе</a>
          <button className="nav-cta" onClick={() => { setQuiz(true); setMenu(false); }}>Помочь с выбором</button>
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
        <div className="hero-visual reveal delay" data-pointer-depth>
          <div className="photo-frame">
            <div className="photo-overlay" />
            <div className="photo-placeholder">
              <img className="hero-guitar-image" src="./nikita-hero.webp" alt="Никита Осадчук с акустической гитарой" fetchPriority="high" />
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
      <section className="music-story" aria-label="Этапы обучения">
        <div className="music-story-stage" data-scene={storyScene} data-pointer-depth>
          <div className="story-stage-top"><span>БАЗОВЫЙ МИНИМУМ / ЭТАПЫ ОБУЧЕНИЯ</span><b>0{storyScene + 1}<i> / 04</i></b></div>
          <div className="story-progress"><span /></div>

          <div className={"story-scene " + (storyScene === 0 ? "active" : "")} aria-hidden={storyScene !== 0}>
            <div className="story-copy">
              <small>ЭТАП 01 / ПОДГОТОВКА</small>
              <h2>Знакомство<br/>с гитарой</h2>
              <p>Устройство инструмента, удобная посадка, положение рук, настройка и первое упражнение на открытых струнах.</p>
              <button className="story-link" onClick={() => { setProgramTrack("base"); document.getElementById("program")?.scrollIntoView({ behavior: "smooth" }); }}>Содержание первого этапа <Icon name="arrow" /></button>
            </div>
            <div className="story-art story-art-portrait" data-pointer-depth>
              <img src="./nikita-hero.webp" alt="Никита Осадчук во время занятия с гитарой" loading="lazy" />
              <div className="story-art-caption"><span>01</span><i /> ПОСТАНОВКА РУК И НАСТРОЙКА</div>
            </div>
          </div>

          <div className={"story-scene " + (storyScene === 1 ? "active" : "")} aria-hidden={storyScene !== 1}>
            <div className="story-copy">
              <small>ЭТАП 02 / АККОРДЫ</small>
              <h2>Первые аккорды<br/>и переходы</h2>
              <p>Разбираем аппликатуры Em, Am, C и D. Затем учимся менять их вовремя, не теряя ритм.</p>
              <button className="story-link" onClick={() => { setProgramTrack("base"); document.getElementById("program")?.scrollIntoView({ behavior: "smooth" }); }}>Посмотреть уроки и упражнения <Icon name="arrow" /></button>
            </div>
            <div className="story-art story-art-chords"><ChordTrainer /></div>
          </div>

          <div className={"story-scene " + (storyScene === 2 ? "active" : "")} aria-hidden={storyScene !== 2}>
            <div className="story-copy">
              <small>ЭТАП 03 / РИТМ</small>
              <h2>Ритм, бой<br/>и координация</h2>
              <p>Работаем с метрономом, осваиваем бой с глушением, затем соединяем движение правой руки со сменой аккордов.</p>
              <button className="story-link" onClick={() => { setProgramTrack("battles"); document.getElementById("program")?.scrollIntoView({ behavior: "smooth" }); }}>Открыть раздел с боями <Icon name="arrow" /></button>
            </div>
            <div className="story-art story-art-rhythm"><MetronomeDemo /></div>
          </div>

          <div className={"story-scene " + (storyScene === 3 ? "active" : "")} aria-hidden={storyScene !== 3}>
            <div className="story-copy">
              <small>ЭТАП 04 / РЕПЕРТУАР</small>
              <h2>Собираем<br/>песню целиком</h2>
              <p>На примере учебной версии «Пачки сигарет» соединяем аккорды, бой и текст. Дальше можно переходить к другим песням и техникам.</p>
              <button className="story-link" onClick={() => { setProgramTrack("base"); document.getElementById("program")?.scrollIntoView({ behavior: "smooth" }); }}>Вся программа курса <Icon name="arrow" /></button>
            </div>
            <div className="story-art story-art-finish">
              <img className="story-sheet" src="./material-song.webp" alt="Учебные материалы с аккордами и текстом песни" loading="lazy" />
              <div className="story-sheet-caption"><span>УЧЕБНЫЕ МАТЕРИАЛЫ</span><b>Аккорды · ритм · текст песни</b></div>
              <span className="story-sheet-index">04 / 07</span>
            </div>
          </div>

          <div className="story-stage-bottom"><span>БАЗОВЫЙ МИНИМУМ</span><i>↓</i><div className="story-progress-track"><span /></div><span>ПРОКРУТИТЕ</span></div>
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
          <h2>От первых аккордов до <em>первой песни</em></h2>
          <p>Сначала проходим 7 последовательных этапов базового старта и собираем первую песню. Дальше — разные виды боя, деление рисунка между аккордами и переборы. Расширенные темы можно подбирать по уровню: их точная очерёдность в исходной карте не везде подтверждена.</p>
          <button className="link-arrow" onClick={() => setQuiz(true)}>Подобрать формат обучения <Icon name="arrow" /></button>
          <figure className="program-photo">
            <img src="./lesson-planning.webp" alt="Учебные материалы и подготовка урока по гитаре" loading="lazy" />
            <figcaption>Видео, схемы, PDF и практические упражнения</figcaption>
          </figure>
        </div>
        <div className="curriculum">
          <div className="curriculum-topline"><span>ПРОГРАММА ОБУЧЕНИЯ</span><b>18 учебных блоков</b></div>
          <div className="curriculum-tabs" role="tablist" aria-label="Разделы программы">
            {programTracks.map((track) => (
              <button key={track.id} role="tab" aria-selected={programTrack === track.id} className={programTrack === track.id ? "curriculum-tab active" : "curriculum-tab"} onClick={() => setProgramTrack(track.id)}>
                {track.label}<span>{track.modules.length.toString().padStart(2, "0")}</span>
              </button>
            ))}
          </div>
          <div className="curriculum-intro"><span className="curriculum-status">{activeProgram.id === "base" ? "ПОРЯДОК ПОДТВЕРЖДЁН" : "ТЕМАТИЧЕСКИЙ РАЗДЕЛ"}</span><p>{activeProgram.intro}</p></div>
          <div className="curriculum-grid" role="tabpanel" key={activeProgram.id} aria-label={activeProgram.label}>
            {activeProgram.modules.map((module, index) => (
              <article className={"curriculum-card " + (expandedModule === module.no ? "expanded" : "")} key={module.no}>
                <div className="curriculum-card-head"><span>{module.no}</span><i>{String(index + 1).padStart(2, "0")} / {String(activeProgram.modules.length).padStart(2, "0")}</i></div>
                <h3>{module.title}</h3>
                <p>{module.desc}</p>
                <button className="curriculum-expand" type="button" aria-expanded={expandedModule === module.no} onClick={() => setExpandedModule(expandedModule === module.no ? "" : module.no)}>
                  {expandedModule === module.no ? "Свернуть содержание" : "Посмотреть содержание"}<span>{expandedModule === module.no ? "−" : "+"}</span>
                </button>
                {expandedModule === module.no && <div className="curriculum-expanded">
                  <b>{programDetails[module.no]?.label || "Внутри блока"}</b>
                  <p>{programDetails[module.no]?.content || module.desc}</p>
                  <small>МАТЕРИАЛЫ</small><p>{programDetails[module.no]?.materials || "Материалы и порядок раздела уточняются по исходному уроку."}</p>
                  <small>ПРОВЕРКА / ПРИМЕЧАНИЕ</small><p>{programDetails[module.no]?.check || module.result || "Содержание зафиксировано; точный критерий прохождения требует сверки."}</p>
                </div>}
                {module.result && <div className="curriculum-result"><span>↗ РЕЗУЛЬТАТ</span>{module.result}</div>}
                {module.songs && <div className="curriculum-songs"><span>♪ РЕПЕРТУАР</span>{module.songs}</div>}
              </article>
            ))}
          </div>
          <div className="curriculum-footnote"><span>i</span><p><b>Без выдуманного порядка.</b> Последовательность базовых семи этапов подтверждена. Для расширенных тем мастер-карта фиксирует содержание и репертуар, но точный порядок некоторых уроков требует сверки с исходными материалами.</p></div>
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

      <section className="section real-learning">
        <div className="real-learning-photo">
          <img src="./personal-lesson.webp" alt="Индивидуальное занятие Никиты Осадчука с учеником" loading="lazy" />
          <span>Личная работа с учеником</span>
        </div>
        <div className="real-learning-copy">
          <span className="eyebrow">как проходят занятия</span>
          <h2>Разбираем именно то, что мешает <em>играть увереннее</em></h2>
          <p>На личных онлайн-занятиях Никита проверяет посадку, постановку рук, технику, ритм и домашнее задание. Материал подбирается под инструмент, уровень и цель ученика.</p>
          <ul>
            <li><Icon name="check" /> Гитара и электрогитара</li>
            <li><Icon name="check" /> Укулеле и фортепиано</li>
            <li><Icon name="check" /> Обратная связь по домашним заданиям</li>
          </ul>
          <button className="btn btn-primary" onClick={() => setQuiz(true)}>Подобрать формат <Icon name="arrow" /></button>
        </div>
      </section>

      <section className="section course-strip">
        <div className="course-visual course-photo">
          <img src="./lesson-planning.webp" alt="Подготовка урока по гитаре" loading="lazy" />
          <span>Практика · аккорды · ритм · песни</span>
        </div>
        <div className="course-copy">
          <span className="eyebrow">курс «базовый минимум»</span>
          <h2>С нуля до<br/><em>первой песни</em></h2>
          <p>Пошагово познакомитесь с гитарой, освоите первые аккорды и простой бой, а затем соедините навыки в учебной версии песни «Пачка сигарет». Так вы поймёте основу игры и сможете дальше разучивать песни самостоятельно.</p>
          <div className="course-stats"><div><b>4</b><span>недели в плане</span></div><div><b>7</b><span>этапов обучения</span></div><div><b>4</b><span>первых аккорда</span></div></div>
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
            {instrument === "Гитара"
              ? <img className="lesson-preview-image" src="./material-rhythm.webp" alt="Фрагмент видеоурока по гитарному бою" loading="lazy" />
              : <div className="lesson-art"><span>{instrument === "Укулеле" ? "U" : "P"}</span><div className="art-lines" /></div>}
            <a className="big-play" href={instrument === "Гитара" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" : instrument === "Укулеле" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239064" : "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239059&hd=3"} target="_blank" rel="noreferrer"><Icon name="play" /></a>
          </div>
          <div className="lesson-info"><span className="card-tag">БЕСПЛАТНЫЙ УРОК · {instrument.toUpperCase()}</span><h3>{instrument === "Фортепиано" ? "Первый урок по фортепиано" : instrument === "Укулеле" ? "Первый урок по укулеле" : "Знакомство с гитарой"}</h3><p>{instrument === "Гитара" ? "Знакомство с инструментом, правильная посадка и первые шаги перед началом игры." : "Откройте первый урок по выбранному инструменту и попробуйте формат обучения до покупки."}</p><ul><li><Icon name="play"/> Видео открывается сразу</li><li><Icon name="music"/> Практический материал</li><li><Icon name="message"/> Можно задать вопрос преподавателю</li></ul><a className="link-arrow" href={instrument === "Гитара" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239048&hd=4" : instrument === "Укулеле" ? "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239064" : "https://vkvideo.ru/video_ext.php?oid=-215347372&id=456239059&hd=3"} target="_blank" rel="noreferrer">Смотреть бесплатно <Icon name="arrow" /></a></div>
        </div>
        <div className="materials-head">
          <span className="eyebrow">примеры материалов</span>
          <h3>Не только видео: схемы и готовые подсказки остаются у ученика</h3>
        </div>
        <div className="materials-gallery">
          <figure><img src="./material-song.webp" alt="Материал с текстом песни и аккордами" loading="lazy" /><figcaption><b>Разбор песни</b><span>Текст, аккорды и последовательность</span></figcaption></figure>
          <figure><img src="./material-rhythm.webp" alt="Схема гитарного боя в видеоуроке" loading="lazy" /><figcaption><b>Схема ритма</b><span>Движения правой руки по счёту</span></figcaption></figure>
          <figure><img src="./material-trainer.webp" alt="Тренажёр гитарного боя в видеоуроке" loading="lazy" /><figcaption><b>Тренажёр боя</b><span>Практика под метроном</span></figcaption></figure>
        </div>
      </section>

      <section className="section results">
        <div className="results-copy"><span className="eyebrow">результат базового модуля</span><h2>Что вы освоите<br/>в <em>базовом модуле</em></h2></div>
        <div className="result-cards"><article><b>01</b><p>Правильно сидеть и держать гитару без лишнего напряжения</p></article><article><b>02</b><p>Ставить первые аккорды и добиваться чистого звучания струн</p></article><article><b>03</b><p>Играть простой бой и менять аккорды без долгих остановок</p></article><article><b>04</b><p>Соединить аккорды, бой и текст в учебной версии «Пачки сигарет»</p></article></div>
      </section>

      <section className="section about" id="about">
        <div className="about-visual">
          <img className="about-portrait" src="./nikita-about.webp" alt="Никита Осадчук играет на акустической гитаре" loading="lazy" />
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
        <figure className="student-group">
          <img src="./students-group.webp" alt="Никита Осадчук с группой учеников" loading="lazy" />
          <figcaption><span>Опыт работы</span><b>Индивидуальные и групповые занятия с детьми и взрослыми</b></figcaption>
        </figure>
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
