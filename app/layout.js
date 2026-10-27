import "./globals.css";

export const metadata = {
  title: "Струны будущего — уроки гитары онлайн с Никитой Осадчуком",
  description: "Онлайн-уроки акустической и электрогитары с Никитой Осадчуком. Индивидуальные занятия, обратная связь, программа с нуля и разборы песен.",
  metadataBase: new URL("https://strunibb.github.io/struny-school/"),
  openGraph: {
    title: "Струны будущего — школа Никиты Осадчука",
    description: "Уроки акустической и электрогитары онлайн: с нуля до любимых песен. Программа, цены и примеры занятий.",
    type: "website",
    locale: "ru_RU"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
