import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "../dictionaries";
import ContactForm from "@/components/ContactForm";

export default async function ContactPage({ params }: PageProps<"/[lang]/contact">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const t = dict.contact;

  const addressCommaIndex = t.address_val.lastIndexOf(",");
  const addressLine1 = t.address_val.slice(0, addressCommaIndex + 1);
  const addressLine2 = t.address_val.slice(addressCommaIndex + 1).trim();

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

      {/* Contact Section */}
      <section className="py-20 px-4 bg-[#f8f4ee]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Form */}
          <div className="lg:col-span-3 bg-white p-10 shadow-sm">
            <h2
              className="text-[#1a1a1a] mb-8"
              style={{
                fontFamily: "'Noto Serif KR', serif",
                fontSize: "1.8rem",
                fontWeight: 400,
              }}
            >
              {t.form_title}
            </h2>
            <ContactForm t={t} rooms={dict.rooms} />
          </div>

          {/* Info */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <h2
                className="text-[#1a1a1a] mb-6"
                style={{
                  fontFamily: "'Noto Serif KR', serif",
                  fontSize: "1.8rem",
                  fontWeight: 400,
                }}
              >
                {t.info_title}
              </h2>
              <div className="w-12 h-px bg-[#c9a84c] mb-8" />
            </div>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <span className="text-[#c9a84c] text-lg">📍</span>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
                    {t.address}
                  </p>
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {addressLine1}
                    <br />
                    {addressLine2}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <span className="text-[#c9a84c] text-lg">📞</span>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
                    Phone
                  </p>
                  <a
                    href={`tel:${t.phone_val}`}
                    className="text-sm text-gray-700 hover:text-[#c9a84c] transition-colors"
                  >
                    {t.phone_val}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <span className="text-[#c9a84c] text-lg">✉️</span>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
                    Email
                  </p>
                  <a
                    href={`mailto:${t.email_val}`}
                    className="text-sm text-gray-700 hover:text-[#c9a84c] transition-colors"
                  >
                    {t.email_val}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <span className="text-[#c9a84c] text-lg">💬</span>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
                    {t.kakao}
                  </p>
                  <p className="text-sm text-gray-700">{t.kakao_val}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-[#1a1a1a] flex items-center justify-center shrink-0">
                  <span className="text-[#c9a84c] text-lg">🕐</span>
                </div>
                <div>
                  <p className="text-xs tracking-widest uppercase text-gray-400 mb-1">
                    {t.hours}
                  </p>
                  <p className="text-sm text-gray-700">{t.hours_val}</p>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="h-48 mt-8">
              <iframe
                title="Empire Hotel location"
                className="w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps?q=Hotel+Empire%2C+Fr%C3%BDdek-M%C3%ADstek&output=embed"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
