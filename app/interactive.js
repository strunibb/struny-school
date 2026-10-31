"use client";

import { useEffect, useRef } from "react";

export function Motion() {
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const progress = document.querySelector(".reading-progress");
    const techniques = document.querySelector(".techniques");
    const rows = [...document.querySelectorAll(".technique-row")];
    const hero = document.querySelector(".hero-instrument");
    let frame = 0;
    const render = () => {
      frame = 0;
      const height = window.innerHeight;
      const total = document.documentElement.scrollHeight - height;
      progress?.style.setProperty(
        "--progress",
        String(total > 0 ? window.scrollY / total : 0),
      );
      if (preference.matches) {
        rows.forEach((row) => row.style.removeProperty("transform"));
        hero?.style.removeProperty("--parallax");
        return;
      }
      if (techniques) {
        const bounds = techniques.getBoundingClientRect();
        if (bounds.top < height && bounds.bottom > 0) {
          const fraction = Math.min(
            1,
            Math.max(0, (height - bounds.top) / (height + bounds.height)),
          );
          rows.forEach(
            (row, i) =>
              (row.style.transform = `translate3d(${(fraction - 0.5) * (i % 2 ? 220 : -220)}px,0,0)`),
          );
        }
      }
      if (hero && window.scrollY < height)
        hero.style.setProperty("--parallax", `${window.scrollY * 0.06}px`);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(render);
    };
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    const targets = document.querySelectorAll(
      ".section h2, .benefit, .how-grid article, .outcome, .level-card, .direction-card, .teacher-image, .teacher-copy, .price-card, .student-grid, .review-card, .material-card, .trial",
    );
    targets.forEach((el, i) => {
      if (
        el.getBoundingClientRect().top > window.innerHeight &&
        !preference.matches
      ) {
        el.classList.add("reveal-ready");
        el.style.setProperty("--reveal-delay", `${(i % 3) * 65}ms`);
        observer.observe(el);
      }
    });
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    preference.addEventListener("change", schedule);
    render();
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      targets.forEach((el) =>
        el.classList.remove("reveal-ready", "is-revealed"),
      );
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      preference.removeEventListener("change", schedule);
    };
  }, []);
  return <div className="reading-progress" aria-hidden="true" />;
}

export function SwitchCTA({
  onClick,
  label = "Хочу на урок",
  note = "Пробный урок — 650\u00a0₽",
  className = "",
}) {
  return (
    <button className={`switch-cta ${className}`} onClick={onClick}>
      <span className="switch-label">
        {label}
        <span aria-hidden="true">↗</span>
      </span>
      <span className="switch-note">{note}</span>
      <span className="switch-check" aria-hidden="true">
        ✓
      </span>
    </button>
  );
}

export function InstrumentArt({ kind, className = "" }) {
  if (kind < 3)
    return (
      <img
        className={`instrument-cutout cutout-${kind} ${className}`}
        src={`./instruments/${["acoustic", "electric", "ukulele"][kind]}.png`}
        alt=""
        loading="lazy"
        draggable="false"
      />
    );
  return (
    <svg
      className={`instrument-cutout cutout-3 ${className}`}
      viewBox="0 0 500 240"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="piano-case" x2="0" y2="1">
          <stop stopColor="#34323c" />
          <stop offset="1" stopColor="#101015" />
        </linearGradient>
      </defs>
      <rect x="4" y="18" width="490" height="210" rx="14" fill="#15121b" />
      <rect
        x="4"
        y="10"
        width="490"
        height="190"
        rx="14"
        fill="url(#piano-case)"
      />
      <rect x="194" y="28" width="100" height="24" rx="3" fill="#72848d" />
      {[0, 1, 2, 3, 4].map((i) => (
        <circle key={i} cx={40 + i * 25} cy="40" r="5" fill="#928d9a" />
      ))}
      <circle cx="460" cy="41" r="7" fill="#d3ff22" />
      {Array.from({ length: 21 }, (_, i) => (
        <rect
          key={i}
          x={17 + i * 22}
          y="66"
          width="21"
          height="124"
          rx="2"
          fill={i % 2 ? "#eeeaf2" : "#fff"}
        />
      ))}
      {Array.from({ length: 20 }, (_, i) =>
        [2, 6].includes(i % 7) ? null : (
          <rect
            key={i}
            x={32 + i * 22}
            y="66"
            width="14"
            height="75"
            rx="2"
            fill="#15131a"
            stroke="#55505d"
          />
        ),
      )}
    </svg>
  );
}

export function DirectionCard({ item, index, selected, onSelect }) {
  const ref = useRef(null);
  const move = (e) => {
    if (
      e.pointerType !== "mouse" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const rect = e.currentTarget.getBoundingClientRect();
    ref.current.style.setProperty(
      "--pointer-turn",
      `${((e.clientX - rect.left - rect.width / 2) / rect.width) * 8}deg`,
    );
  };
  return (
    <button
      ref={ref}
      className={`direction-card direction-${index}${selected ? " selected" : ""}`}
      aria-pressed={selected}
      aria-controls="instrument-panel"
      onClick={onSelect}
      onPointerMove={move}
      onPointerLeave={() =>
        ref.current?.style.setProperty("--pointer-turn", "0deg")
      }
    >
      <span className="direction-surface" />
      <span className="direction-name">
        {index === 1 ? (
          <>
            Электро
            <br />
            гитара
          </>
        ) : (
          item.name
        )}
      </span>
      <InstrumentArt kind={index} />
      <span className="direction-action">
        <span className="direction-action-label">
          {selected ? "Выбрано" : "Подробнее"}
        </span>
        <span aria-hidden="true">↗</span>
      </span>
    </button>
  );
}

const techniques = [
  ["бой", "перебор", "аккорды", "квинты", "фингерстайл", "легато", "бенды"],
  ["палм-мьют", "слэп", "вибрато", "тэппинг", "мелодии", "баррэ", "флажолеты"],
  [
    "игра медиатором",
    "ритм",
    "динамика",
    "арпеджио",
    "аккомпанемент",
    "импровизация",
  ],
];
export function Techniques() {
  return (
    <section className="techniques section" aria-labelledby="techniques-title">
      <div className="wrap">
        <h2 id="techniques-title">
          И РАЗНЫМ <span>ПРИЁМАМ ИГРЫ</span>
        </h2>
      </div>
      <div className="technique-window" aria-hidden="true">
        {techniques.map((row, i) => (
          <div className={`technique-row row-${i}`} key={i}>
            {[...row, ...row, ...row].map((word, j) => (
              <span key={j} className={`technique-chip chip-${(j + i) % 4}`}>
                {word}
              </span>
            ))}
          </div>
        ))}
      </div>
      <p className="sr-only">{techniques.flat().join(", ")}.</p>
      <p className="technique-caption wrap">
        От первого чистого аккорда — к выразительному исполнению.
      </p>
    </section>
  );
}
