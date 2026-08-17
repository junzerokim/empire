import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, hasLocale } from "./dictionaries";
import "../../app/globals.css";

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ko" }, { lang: "cz" }];
}

export default async function LangLayout({
  children,
  params,
}: LayoutProps<"/[lang]"> & { children: React.ReactNode }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen flex flex-col" style={{ fontFamily: "'Inter', sans-serif" }}>
        <Navbar dict={dict.nav} lang={lang} />
        <main className="flex-1">{children}</main>
        <Footer
          dict={dict.footer}
          nav={dict.nav}
          contact={dict.contact}
          lang={lang}
        />
      </body>
    </html>
  );
}
