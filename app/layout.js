import "./globals.css";
import "./interactive.css";
import "./hub.css";
import "./winter.css";
import "./revamp.css";

export const metadata = {
  title: "Струны будущего — курс гитары и онлайн-уроки музыки",
  description:
    "Полный курс гитары «Базовый минимум», формат 2+2 и индивидуальные занятия с Никитой Осадчуком. Гитара, электрогитара, укулеле, фортепиано и каталог песен.",
  metadataBase: new URL(
    process.env.SITE_URL || "https://strunibb.github.io/struny-school/",
  ),
  openGraph: {
    title: "Струны будущего — школа Никиты Осадчука",
    description:
      "Индивидуальные уроки музыки для детей и взрослых. Гитара, электрогитара, укулеле и фортепиано.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}
