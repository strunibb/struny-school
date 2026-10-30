import "./globals.css";

export const metadata = {
  title: "Струны будущего — уроки гитары онлайн с Никитой Осадчуком",
  description:
    "Индивидуальные онлайн-уроки гитары, электрогитары, укулеле и фортепиано с Никитой Осадчуком. Программа обучения, стоимость занятий и запись на пробный урок.",
  metadataBase: new URL("https://strunibb.github.io/struny-school/"),
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
