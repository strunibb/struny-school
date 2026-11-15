const artwork = {
  course: <><path d="M18 22Q36 17 56 27v54Q36 71 18 76Z" fill="url(#paper)" stroke="#65408d" strokeWidth="3"/><path d="M56 27Q76 17 94 22v54Q76 71 56 81Z" fill="url(#paper)" stroke="#65408d" strokeWidth="3"/><path d="M56 28v53M28 34q10-1 19 2M28 43q10-1 19 2M66 36q9-4 18-4M66 45q9-4 18-4" fill="none" stroke="#bd9ccf" strokeWidth="2" strokeLinecap="round"/><path d="M53 8l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" fill="#c9e876" stroke="#668243" strokeWidth="2"/></>,
  hybrid: <><rect x="14" y="22" width="84" height="59" rx="12" fill="url(#face)" stroke="#65408d" strokeWidth="4"/><path d="M14 40h84M35 22v59M56 22v59M77 22v59" stroke="#ad83ca" strokeWidth="3"/><rect x="23" y="48" width="25" height="25" rx="5" fill="#cfed8d"/><path d="m31 54 11 7-11 7Z" fill="#62438c"/><path d="M68 51h19M68 60h15M68 69h19" stroke="#7f62a8" strokeWidth="3" strokeLinecap="round"/><circle cx="34" cy="17" r="5" fill="#d3b7ec"/><circle cx="78" cy="17" r="5" fill="#d3b7ec"/></>,
  lesson: <><path d="M21 51V42a35 35 0 0 1 70 0v9" fill="none" stroke="#7750a6" strokeWidth="11" strokeLinecap="round"/><path d="M21 51V42a35 35 0 0 1 70 0v9" fill="none" stroke="#d8b7ed" strokeWidth="6"/><rect x="12" y="44" width="21" height="30" rx="9" fill="url(#face)" stroke="#65408d" strokeWidth="3"/><rect x="79" y="44" width="21" height="30" rx="9" fill="url(#face)" stroke="#65408d" strokeWidth="3"/><path d="M90 71q-3 17-24 17" fill="none" stroke="#65408d" strokeWidth="4"/><rect x="58" y="82" width="14" height="8" rx="4" fill="#c9e876" stroke="#65408d" strokeWidth="2"/></>,
  catalog: <><rect x="20" y="16" width="71" height="76" rx="7" fill="url(#face)" stroke="#65408d" strokeWidth="3" transform="rotate(-7 56 54)"/><rect x="26" y="21" width="60" height="67" rx="4" fill="url(#paper)" transform="rotate(-7 56 54)"/><circle cx="57" cy="54" r="25" fill="#30283f" stroke="#5e4f6b" strokeWidth="4"/><circle cx="57" cy="54" r="10" fill="#cfed8d"/><circle cx="57" cy="54" r="3" fill="#f9f5e7"/><path d="M36 50a22 22 0 0 1 12-16M66 74a23 23 0 0 0 11-12" fill="none" stroke="#71657c" strokeWidth="2"/></>,
  students: <><path d="M16 39 56 18l40 21v35L56 95 16 74Z" fill="url(#face)" stroke="#65408d" strokeWidth="3"/><path d="m16 39 40 21 40-21M56 60v35" fill="none" stroke="#74529a" strokeWidth="3"/><circle cx="56" cy="43" r="9" fill="#cfed8d"/><path d="m55 27 2-7m-17 10-5-5m39 5 5-5" stroke="#875eaa" strokeWidth="3" strokeLinecap="round"/></>,
  reviews: <><path d="M15 19h83v55H48L28 91V74H15Z" fill="url(#face)" stroke="#65408d" strokeWidth="4" strokeLinejoin="round"/><path d="m57 30 5 10 11 2-8 8 2 11-10-5-10 5 2-11-8-8 11-2Z" fill="#c9e876" stroke="#688041" strokeWidth="2"/><path d="M77 60h12M26 63h12" stroke="#a077c2" strokeWidth="3" strokeLinecap="round"/></>,
  practice: <><path d="M45 17h22l17 68H28Z" fill="url(#face)" stroke="#65408d" strokeWidth="4" strokeLinejoin="round"/><path d="M49 29h14l9 44H40Z" fill="url(#paper)"/><path d="m56 37-19 34" stroke="#5b4382" strokeWidth="4" strokeLinecap="round"/><circle cx="37" cy="71" r="6" fill="#c9e876" stroke="#65408d" strokeWidth="2"/><path d="M22 88h68" stroke="#65408d" strokeWidth="6" strokeLinecap="round"/></>,
  faq: <><rect x="24" y="14" width="64" height="77" rx="9" fill="url(#face)" stroke="#65408d" strokeWidth="4" transform="rotate(7 56 52)"/><path d="M49 40c0-10 17-13 20-3 2 7-8 10-10 17M59 67h.1" fill="none" stroke="#65408d" strokeWidth="5" strokeLinecap="round"/><path d="m18 29 3-7 3 7 7 3-7 3-3 7-3-7-7-3Z" fill="#c9e876"/></>,
};

export default function SectionIcon({ name, className = "" }) {
  return (
    <span className={`section-icon section-icon-${name} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 112 112" fill="none" focusable="false">
        <defs>
          <linearGradient id="face" x1="15" y1="17" x2="97" y2="91" gradientUnits="userSpaceOnUse"><stop stopColor="#f6eaff"/><stop offset=".52" stopColor="#be98d9"/><stop offset="1" stopColor="#8b62b4"/></linearGradient>
          <linearGradient id="paper" x1="30" y1="20" x2="80" y2="85" gradientUnits="userSpaceOnUse"><stop stopColor="#fffef5"/><stop offset="1" stopColor="#e6d8ef"/></linearGradient>
        </defs>
        <ellipse cx="59" cy="98" rx="37" ry="7" fill="#583a7750"/>
        {artwork[name]}
      </svg>
    </span>
  );
}
