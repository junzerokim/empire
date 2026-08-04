import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale } from "./dictionaries";

export default async function HomePage({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.home;

  const highlights = [
    { icon: "📍", title: t.h1_title, desc: t.h1_desc },
    { icon: "🛏️", title: t.h2_title, desc: t.h2_desc },
    { icon: "⭐", title: t.h3_title, desc: t.h3_desc },
    { icon: "🍽️", title: t.h4_title, desc: t.h4_desc },
  ];

  return (
    <>
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)",
        }}
      >
        {/* Decorative pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              #c9a84c 0px,
              #c9a84c 1px,
              transparent 1px,
              transparent 60px
            )`,
          }}
        />

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          <p className="text-[#c9a84c] text-sm tracking-[0.4em] uppercase mb-6">
            Frýdek-Místek, Czech Republic
          </p>
          <h1
            className="text-white mb-4 font-light"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(3rem, 8vw, 6rem)",
              lineHeight: 1.1,
            }}
          >
            {t.hero_title}
          </h1>
          <h2
            className="text-[#c9a84c] mb-8 font-light"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
            }}
          >
            {t.hero_subtitle}
          </h2>
          <p className="text-gray-300 text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.hero_desc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={`/${lang}/contact`}
              className="px-10 py-4 bg-[#c9a84c] text-[#1a1a1a] text-sm tracking-widest uppercase font-semibold hover:bg-[#e8c97a] transition-colors"
            >
              {t.book_now}
            </Link>
            <Link
              href={`/${lang}/rooms`}
              className="px-10 py-4 border border-[#c9a84c] text-[#c9a84c] text-sm tracking-widest uppercase hover:bg-[#c9a84c] hover:text-[#1a1a1a] transition-colors"
            >
              {t.explore_rooms}
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50">
          <div className="w-px h-12 bg-[#c9a84c]" />
        </div>
      </section>

      {/* Welcome Section */}
      <section className="py-24 px-4 bg-[#f8f4ee]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-px bg-[#c9a84c] mx-auto mb-8" />
          <h2
            className="text-[#1a1a1a] mb-6"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
            }}
          >
            {t.welcome_title}
          </h2>
          <div className="w-16 h-px bg-[#c9a84c] mx-auto mb-8" />
          <p className="text-gray-600 text-lg leading-relaxed max-w-2xl mx-auto">
            {t.welcome_text}
          </p>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2
            className="text-center text-[#1a1a1a] mb-16"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              fontWeight: 400,
            }}
          >
            {t.highlights_title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="text-center p-8 border border-gray-100 hover:border-[#c9a84c] transition-colors group"
              >
                <div className="text-4xl mb-4">{h.icon}</div>
                <h3
                  className="text-[#1a1a1a] mb-3 group-hover:text-[#c9a84c] transition-colors"
                  style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "1.3rem" }}
                >
                  {h.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section
        className="py-24 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}
      >
        <p className="text-[#c9a84c] text-sm tracking-[0.4em] uppercase mb-4">
          Empire Hotel
        </p>
        <h2
          className="text-white mb-8"
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
          }}
        >
          Frýdek-Místek, Czech Republic
        </h2>
        <Link
          href={`/${lang}/contact`}
          className="inline-block px-12 py-4 bg-[#c9a84c] text-[#1a1a1a] text-sm tracking-widest uppercase font-semibold hover:bg-[#e8c97a] transition-colors"
        >
          {t.book_now}
        </Link>
      </section>
    </>
  );
}
