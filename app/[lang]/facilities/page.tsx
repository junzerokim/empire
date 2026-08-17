import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function FacilitiesPage({ params }: PageProps<"/[lang]/facilities">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.facilities;

  const facilities = [
    { icon: "🍽️", title: t.f1_title, desc: t.f1_desc },
    { icon: "🧺", title: t.f6_title, desc: t.f6_desc, note: t.f6_note },
    { icon: "🅿️", title: t.f5_title, desc: t.f5_desc },
    { icon: "🚙", title: t.f3_title, desc: t.f3_desc, note: t.f3_note },
    { icon: "💪🏻", title: t.f2_title, desc: t.f2_desc, note: t.f2_note },
    { icon: "🎤", title: t.f4_title, desc: t.f4_desc },
  ];

  return (
    <>
      {/* Page Header */}
      <section
        className="pt-40 pb-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)" }}
      >
        <p className="text-[#c9a84c] text-sm tracking-[0.4em] uppercase mb-4">
          Empire Hotel
        </p>
        <h1
          className="text-white font-light"
          style={{
            fontFamily: "'Noto Serif KR', serif",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
          }}
        >
          {t.title}
        </h1>
        <div className="w-16 h-px bg-[#c9a84c] mx-auto mt-6" />
        <p className="text-gray-400 mt-6 max-w-xl mx-auto leading-relaxed">
          {t.subtitle}
        </p>
      </section>

      {/* Facilities Grid */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {facilities.map((f) => (
            <div
              key={f.title}
              className="relative p-10 bg-white border border-gray-100 hover:border-[#c9a84c] transition-colors group"
            >
              <div className="text-5xl mb-6">{f.icon}</div>
              <h2
                className="mb-4 text-[#1a1a1a] group-hover:text-[#c9a84c] transition-colors"
                style={{
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                }}
              >
                {f.title}
              </h2>
              <p className="text-sm leading-relaxed text-gray-500">
                {f.desc}
              </p>
              {f.note && (
                <span className="absolute bottom-4 right-6 text-xs text-[#c9a84c]">
                  {f.note}
                </span>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Visual Divider */}
      <section
        className="py-20 px-4 text-center"
        style={{ background: "linear-gradient(135deg, #2d2d2d 0%, #1a1a1a 100%)" }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="text-[#c9a84c]/20 font-light mb-4 select-none"
            style={{ fontFamily: "'Noto Serif KR', serif", fontSize: "6rem" }}
          >
            ✦
          </div>
          <p className="text-gray-400 text-lg leading-relaxed italic" style={{ fontFamily: "'Noto Serif KR', serif" }}>
            "Where every detail is crafted to exceed your expectations."
          </p>
          <p className="text-[#c9a84c] text-sm tracking-widest uppercase mt-4">
            — Empire Hotel
          </p>
        </div>
      </section>
    </>
  );
}
