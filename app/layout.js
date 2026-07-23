import "./globals.css";

export const metadata = {
  title: "Струны будущего — онлайн-обучение музыке",
  description: "Онлайн-занятия по гитаре, электрогитаре, укулеле и фортепиано с Никитой Осадчуком: личные уроки, наставничество и разборы песен.",
  metadataBase: new URL("https://strunibb.github.io/struny-school/"),
  openGraph: {
    title: "Струны будущего — школа Никиты Осадчука",
    description: "Личные онлайн-занятия, наставничество, разборы песен и бесплатные уроки.",
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
