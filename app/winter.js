const flakes = Array.from({ length: 64 }, (_, index) => {
  const seed = (index * 73 + 19) % 101;
  return {
    id: index,
    left: `${(index * 47 + 13) % 101}%`,
    size: `${index % 9 === 0 ? 15 : index % 4 === 0 ? 11 : 3 + (seed % 5)}px`,
    duration: `${16 + (index * 7) % 19}s`,
    delay: `${-((index * 17) % 35)}s`,
    drift: `${(index % 2 ? 1 : -1) * (25 + seed * 0.9)}px`,
    opacity: 0.24 + (seed % 7) * 0.08,
    symbol: index % 9 === 0 ? "❄" : index % 6 === 0 ? "✧" : "•",
  };
});

export default function WinterAtmosphere() {
  return (
    <div className="winter-atmosphere" aria-hidden="true">
      {flakes.map((flake) => (
        <span
          key={flake.id}
          className={`winter-flake${flake.symbol === "❄" ? " winter-flake-crystal" : ""}`}
          style={{
            "--snow-left": flake.left,
            "--snow-size": flake.size,
            "--snow-duration": flake.duration,
            "--snow-delay": flake.delay,
            "--snow-drift": flake.drift,
            "--snow-opacity": flake.opacity,
          }}
        >
          {flake.symbol}
        </span>
      ))}
    </div>
  );
}
