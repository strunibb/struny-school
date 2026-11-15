// Studio cutouts share the same visual language as the instrument cards.
export default function SectionIcon({ name, className = "" }) {
  return (
    <span className={`section-icon section-icon-${name} ${className}`} aria-hidden="true">
      <img src={`./icons/${name}.webp`} alt="" loading="lazy" decoding="async" width="640" height="640" />
    </span>
  );
}
