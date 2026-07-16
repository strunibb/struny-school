import "./globals.css";

export const metadata = {
  title: "Струны будущего — научись играть любимые песни",
  description: "Онлайн-занятия по гитаре, электрогитаре, укулеле и фортепиано с Никитой Осадчуком. Понятный маршрут, любимые песни и личная обратная связь.",
  metadataBase: new URL("https://struny-budushchego.chatgpt.site"),
  openGraph: {
    title: "Струны будущего",
    description: "Не упражнения ради упражнений — любимые песни с первых недель.",
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
