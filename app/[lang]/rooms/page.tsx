import { notFound } from "next/navigation";
import Link from "next/link";
import { getDictionary, hasLocale } from "../dictionaries";

export default async function RoomsPage({ params }: PageProps<"/[lang]/rooms">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.rooms;

  const rooms = [
    {
      name: t.room1_name,
      desc: t.room1_desc,
      price: "89",
      currency: "€",
      size: "25m²",
      beds: "2 Single",
      capacity: t.room1_capacity,
      gradient: "from-stone-200 to-stone-300",
    },
    {
      name: t.room2_name,
      desc: t.room2_desc,
      price: "139",
      currency: "€",
      size: "35m²",
      beds: "1 King",
      gradient: "from-zinc-200 to-zinc-300",
    },
  ];

  const amenities = [t.a1, t.a2, t.a3, t.a4, t.a5, t.a6];

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

      {/* Rooms Grid */}
      <section className="py-20 px-4 bg-[#f8f4ee]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {rooms.map((room) => (
            <div
              key={room.name}
              className="bg-white overflow-hidden shadow-sm hover:shadow-lg transition-shadow group"
            >
              {/* Room Visual Placeholder */}
              <div
                className={`h-64 bg-gradient-to-br ${room.gradient} flex items-center justify-center relative`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-[#1a1a1a]/20 font-light"
                    style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: "5rem",
                    }}
                  >
                    ✦
                  </span>
                </div>
                <div className="absolute bottom-4 right-4 bg-[#1a1a1a] text-[#c9a84c] px-4 py-2 text-sm">
                  {room.size}
                </div>
              </div>

              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h2
                    className="text-[#1a1a1a] group-hover:text-[#c9a84c] transition-colors"
                    style={{
                      fontFamily: "'Noto Serif KR', serif",
                      fontSize: "1.6rem",
                      fontWeight: 400,
                    }}
                  >
                    {room.name}
                  </h2>
                  <div className="text-right">
                    <div className="text-xs text-gray-400 uppercase tracking-wider">
                      {t.from}
                    </div>
                    <div className="text-2xl font-light text-[#1a1a1a]">
                      {room.currency}{room.price}
                      <span className="text-sm text-gray-400">{t.per_night}</span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">{room.desc}</p>

                <div className="flex items-center gap-2 mb-6 text-sm text-gray-400">
                  <span>🛏️</span>
                  <span>{room.beds}</span>
                </div>

                {room.capacity && (
                  <div className="text-right text-sm text-[#1a1a1a] mb-2">
                    {room.capacity}
                  </div>
                )}

                <Link
                  href={`/${lang}/contact`}
                  className="block text-center py-3 px-6 bg-[#1a1a1a] text-[#c9a84c] text-sm tracking-widest uppercase hover:bg-[#c9a84c] hover:text-[#1a1a1a] transition-colors"
                >
                  {t.book}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Amenities */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2
            className="text-[#1a1a1a] mb-12"
            style={{
              fontFamily: "'Noto Serif KR', serif",
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              fontWeight: 400,
            }}
          >
            {t.amenities_title}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {amenities.map((a) => (
              <div
                key={a}
                className="flex items-center gap-3 p-4 border border-gray-100 hover:border-[#c9a84c] transition-colors"
              >
                <span className="text-[#c9a84c] text-lg">✓</span>
                <span className="text-gray-600 text-sm">{a}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
